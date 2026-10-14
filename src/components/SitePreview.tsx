import { useEffect, useRef, useState } from "react";
import { BLOCK_CSS, BREAKPOINTS, blockHtml, boxStyle, isFlow, styleObj, themeVars, DEFAULT_THEME, type Theme } from "@/lib/blocks";
import { pageHeight, type NodeView } from "@/lib/model";

/** Scaled, non-interactive thumbnail of a canvas page. */
export function SitePreview({ nodes, theme = DEFAULT_THEME, height = 180, className = "" }: { nodes: NodeView[]; theme?: Theme; height?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(300);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth || 300));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const pageW = BREAKPOINTS.desktop.width;
  const scale = w / pageW;
  const vars: Record<string, string> = {};
  for (const part of themeVars(theme).split(";")) { const [k, v] = part.split(":"); if (k && v) vars[k] = v; }
  const ids = new Set(nodes.map((n) => n.id));
  const childMap = new Map<string, NodeView[]>();
  const top: NodeView[] = [];
  for (const n of nodes) {
    if (n.parent && ids.has(n.parent)) {
      const arr = childMap.get(n.parent) ?? [];
      arr.push(n);
      childMap.set(n.parent, arr);
    } else top.push(n);
  }
  const byOrder = (a: NodeView, b: NodeView) => (a.order < b.order ? -1 : 1);
  top.sort(byOrder);
  for (const arr of childMap.values()) arr.sort(byOrder);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const renderNode = (n: NodeView): React.ReactNode => {
    const g = n.geo.desktop;
    const par = n.parent ? byId.get(n.parent) : undefined;
    const inFlow = !!par && isFlow(par.type);
    const kids = (childMap.get(n.id) ?? []).map(renderNode);
    return (
      <div key={n.id} className="wc-el" style={{ ...(inFlow ? {} : { left: g.x, top: g.y }), width: g.w, height: g.h, ...(styleObj(n.style) as React.CSSProperties) }}>
        {isFlow(n.type) ? (
          <div className={`wc-box wc-box-${n.type} wc-flow`} ref={(el) => { if (el) el.setAttribute("style", boxStyle(n.type, n.box)); }}>{kids}</div>
        ) : (
          <>
            <div className="h-full w-full overflow-hidden" dangerouslySetInnerHTML={{ __html: blockHtml(n.type, n, "pv" + n.id.slice(0, 6)) }} />
            {kids}
          </>
        )}
      </div>
    );
  };
  return (
    <div ref={ref} className={`relative overflow-hidden bg-muted ${className}`} style={{ height }} aria-hidden>
      <style>{BLOCK_CSS}</style>
      {nodes.length === 0 ? (
        <div className="grid h-full place-items-center bg-dotgrid text-xs text-muted-foreground">Empty page</div>
      ) : (
        <div className="wc-page pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: pageW, height: pageHeight(nodes, "desktop"), transform: `scale(${scale})`, ...(vars as React.CSSProperties) }}>
          {top.map(renderNode)}
        </div>
      )}
    </div>
  );
}
