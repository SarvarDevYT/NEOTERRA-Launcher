import { r as reactExports } from "./x-D_GsiFEI.js";
function useScrollingClass(ref, idleMs = 140) {
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return void 0;
    let timer = 0;
    let on = false;
    const onScroll = () => {
      if (!on) {
        on = true;
        el.classList.add("is-scrolling");
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        on = false;
        el.classList.remove("is-scrolling");
      }, idleMs);
    };
    el.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("scroll", onScroll, { capture: true });
      el.classList.remove("is-scrolling");
    };
  }, [ref, idleMs]);
}
export {
  useScrollingClass as u
};
