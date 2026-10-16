import type { BlockType } from "./blocks";

export type Snippet = { name: string; hint: string; code: string; types?: BlockType[] };
export type SnippetKind = "html" | "css" | "js";

const TEXTY: BlockType[] = ["hero", "heading", "text", "section", "testimonial", "cards", "pricing", "footer"];
const BTN: BlockType[] = ["button", "hero", "navbar", "pricing", "login", "register"];

/** Ready-made snippets per block. In CSS, "&" means "this block". In JS, `el` is the block. */
export const SNIPPETS: Record<SnippetKind, Snippet[]> = {
  html: [
    { name: "Badge", hint: "Small label in the corner", code: `<span style="position:absolute;top:12px;right:12px;padding:4px 10px;border-radius:999px;background:var(--wc-primary);color:var(--wc-surface);font:600 12px system-ui">New</span>` },
    { name: "Note line", hint: "Extra line of small text", code: `<p style="margin:8px 0 0;font:13px system-ui;opacity:.65">Add a short note here.</p>`, types: [...TEXTY, "image", "video", "login", "register"] },
    { name: "Social icons", hint: "Links to your profiles", code: `<p style="display:flex;gap:12px;margin:8px 0 0;font:14px system-ui"><a href="https://instagram.com" style="color:inherit">Instagram</a><a href="https://linkedin.com" style="color:inherit">LinkedIn</a></p>`, types: ["footer", "navbar", "section", "text"] },
    { name: "Checklist", hint: "Three ticked benefits", code: `<ul style="list-style:none;padding:0;margin:12px 0 0;font:15px/1.8 system-ui"><li>✓ Fast to set up</li><li>✓ Works on every screen</li><li>✓ Friendly support</li></ul>`, types: [...TEXTY, "stack", "flex", "grid"] },
    { name: "Countdown text", hint: "Placeholder filled by the Countdown script", code: `<p data-countdown="2026-12-31" style="margin:12px 0 0;font:600 18px system-ui">Loading…</p>`, types: [...TEXTY] },
  ],
  css: [
    { name: "Lift on hover", hint: "Rises with a shadow when pointed at", code: `& { transition: transform .25s ease, box-shadow .25s ease; }\n&:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -20px rgba(0,0,0,.35); }` },
    { name: "Fade in", hint: "Gently appears when the page opens", code: `& { animation: wc-fade .8s ease both; }\n@keyframes wc-fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }` },
    { name: "Frosted glass", hint: "See-through blurred background", code: `& { background: color-mix(in srgb, var(--wc-surface) 70%, transparent) !important; backdrop-filter: blur(14px); }` },
    { name: "Gradient text", hint: "Colour fade across headings", code: `& h1, & h2, & h3 { background: linear-gradient(90deg, var(--wc-primary), var(--wc-accent)); -webkit-background-clip: text; background-clip: text; color: transparent; }`, types: TEXTY },
    { name: "Rounded card", hint: "Soft corners and border", code: `& { border-radius: 20px; border: 1px solid color-mix(in srgb, var(--wc-ink) 12%, transparent); overflow: hidden; }` },
    { name: "Pill buttons", hint: "Fully rounded buttons", code: `& .wc-btn { border-radius: 999px; padding: 0 28px; }`, types: BTN },
    { name: "Zoom image", hint: "Photo zooms slightly on hover", code: `& img { transition: transform .5s ease; }\n&:hover img { transform: scale(1.05); }`, types: ["image", "hero"] },
    { name: "Card hover", hint: "Each card highlights on hover", code: `& .wc-card, & .wc-plan { transition: background .2s; }\n& .wc-card:hover, & .wc-plan:hover { background: color-mix(in srgb, var(--wc-primary) 8%, transparent); }`, types: ["cards", "pricing"] },
  ],
  js: [
    { name: "Reveal on scroll", hint: "Fades in when scrolled into view", code: `el.style.opacity = "0";\nel.style.transition = "opacity .7s ease, transform .7s ease";\nel.style.transform = "translateY(24px)";\nnew IntersectionObserver(([e], o) => {\n  if (!e.isIntersecting) return;\n  el.style.opacity = "1"; el.style.transform = "none"; o.disconnect();\n}).observe(el);` },
    { name: "Thank-you message", hint: "Shows a message when clicked", code: `el.addEventListener("click", () => {\n  document.getElementById("wc-live").textContent = "Thanks! We'll be in touch.";\n  alert("Thanks! We'll be in touch.");\n});`, types: BTN },
    { name: "Countdown", hint: "Fills [data-countdown] with days left", code: `const t = el.querySelector("[data-countdown]");\nif (t) {\n  const end = new Date(t.dataset.countdown);\n  const tick = () => { const d = Math.max(0, Math.ceil((end - Date.now()) / 864e5)); t.textContent = d + " days to go"; };\n  tick(); setInterval(tick, 60000);\n}` },
    { name: "Typewriter heading", hint: "Types the heading letter by letter", code: `const h = el.querySelector("h1, h2");\nif (h) {\n  const full = h.textContent; h.textContent = "";\n  let i = 0; const id = setInterval(() => { h.textContent = full.slice(0, ++i); if (i >= full.length) clearInterval(id); }, 45);\n}`, types: ["hero", "heading", "section"] },
    { name: "Email check", hint: "Warns when the email looks wrong", code: `input.type = "email";\ninput.addEventListener("input", () => {\n  el.querySelector(".wc-field-msg").textContent = input.validity.valid ? "" : "Please enter a valid email.";\n});`, types: ["input"] },
    { name: "Required field", hint: "Asks people to fill it in", code: `input.required = true;\ninput.addEventListener("blur", () => {\n  el.querySelector(".wc-field-msg").textContent = input.value.trim() ? "" : "This field is required.";\n});`, types: ["input"] },
    { name: "Play on hover", hint: "Video plays while pointed at", code: `const v = el.querySelector("video");\nif (v) { v.muted = true; el.addEventListener("mouseenter", () => v.play()); el.addEventListener("mouseleave", () => v.pause()); }`, types: ["video"] },
    { name: "Open in new tab", hint: "Links open in a new tab", code: `el.querySelectorAll("a").forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });`, types: [...BTN, "footer"] },
  ],
};

export const snippetsFor = (kind: SnippetKind, type: BlockType) => SNIPPETS[kind].filter((s) => !s.types || s.types.includes(type));
export const snippet = (kind: SnippetKind, name: string) => SNIPPETS[kind].find((s) => s.name === name)!.code;
