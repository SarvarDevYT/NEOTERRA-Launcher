import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./x-D_GsiFEI.js";
import { aW as useRenderAsleep, aX as IdleAnimation, aY as WalkingAnimation, V as useProxiedImageUrl, aZ as SkinViewer } from "./index-BgnzSiMf.js";
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const SkinDetailViewer = reactExports.forwardRef(function SkinDetailViewer2({ skinUrl, model, onError, paused: pausedProp = false, maxFps = 0 }, ref) {
  const asleep = useRenderAsleep();
  const paused = pausedProp || asleep;
  const wrapRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const viewerRef = reactExports.useRef(null);
  const idleRef = reactExports.useRef(new IdleAnimation());
  const walkRef = reactExports.useRef(new WalkingAnimation());
  const onErrorRef = reactExports.useRef(onError);
  onErrorRef.current = onError;
  const maxFpsRef = reactExports.useRef(maxFps);
  maxFpsRef.current = maxFps;
  const resolvedUrl = useProxiedImageUrl(skinUrl, { strict: true });
  reactExports.useImperativeHandle(
    ref,
    () => ({
      resetCamera: () => viewerRef.current?.resetCameraPose(),
      setWalking: (walking) => {
        if (!viewerRef.current) return;
        viewerRef.current.animation = walking ? walkRef.current : idleRef.current;
      }
    }),
    []
  );
  reactExports.useEffect(() => {
    if (!canvasRef.current || !wrapRef.current) return;
    const viewer = new SkinViewer({
      canvas: canvasRef.current,
      width: wrapRef.current.clientWidth,
      height: wrapRef.current.clientHeight,
      zoom: 0.85,
      fov: 45,
      // ModelViewer3D.tsx bilan bir xil, to'g'ri naqsh - SkinViewer3D.tsx'dagi izohga qarang.
      pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      animation: idleRef.current
    });
    viewer.controls.enableZoom = true;
    viewer.controls.enablePan = false;
    viewerRef.current = viewer;
    const fullRender = viewer.render.bind(viewer);
    let lastRenderAt = 0;
    viewer.render = () => {
      const cap = maxFpsRef.current;
      if (cap > 0 && !viewer.renderPaused) {
        const now = performance.now();
        if (now - lastRenderAt < 1e3 / cap - 2) return;
        lastRenderAt = now;
      }
      fullRender();
    };
    const resize = () => {
      if (!wrapRef.current) return;
      viewer.width = wrapRef.current.clientWidth;
      viewer.height = wrapRef.current.clientHeight;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(wrapRef.current);
    return () => {
      observer.disconnect();
      viewer.dispose();
      viewerRef.current = null;
    };
  }, []);
  reactExports.useEffect(() => {
    if (viewerRef.current) viewerRef.current.renderPaused = paused;
  }, [paused]);
  reactExports.useEffect(() => {
    if (!viewerRef.current || !resolvedUrl) return;
    viewerRef.current.loadSkin(resolvedUrl, { model: model === "classic" ? "default" : "slim" }).catch(() => {
      onErrorRef.current();
    });
  }, [resolvedUrl, model]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: wrapRef, className: "skin-viewer-wrap h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", { ref: canvasRef }) });
});
export {
  Flame as F,
  SkinDetailViewer as S,
  Video as V
};
