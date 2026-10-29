import { d as calcGeneratorDuration, e as maxGeneratorDuration, f as millisecondsToSeconds, u as useConstant, g as motionValue, r as reactExports, M as MotionConfigContext, i as isMotionValue, h as frame, k as useIsomorphicLayoutEffect, l as frameData, n as animateValue, o as animateVisualElement, s as setTarget, p as isEasingArray, q as resolveElements, t as mixNumber, v as removeItem, w as defaultOffset, x as fillOffset, y as isGenerator, z as secondsToMilliseconds, B as progress, V as VisualElement, C as createBox, D as isSVGElement, S as SVGVisualElement, H as HTMLVisualElement, E as visualElementStore, F as animateSingleValue, G as animateTarget, I as spring, J as GroupPlaybackControls, c as createLucideIcon, j as jsxRuntimeExports, m as motion, A as AnimatePresence, X, a as client, R as React } from "./x-D_GsiFEI.js";
import { P as Play, M as MemoryStick, S as Sparkles, a as Settings, D as DEFAULT_MASCOT_HOTKEY, f as formatMascotHotkey, r as requestUiLaunchToken, _ as __vitePreload } from "./uiTokenRequest-NBUTHrRg.js";
function createGeneratorEasing(options, scale = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress2) => {
      return generator.next(duration * progress2).value / scale;
    },
    duration: millisecondsToSeconds(duration)
  };
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function toNumber(v) {
  if (typeof v === "number")
    return v;
  return parseFloat(v);
}
function useSpring(source, config = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const activeSpringAnimation = reactExports.useRef(null);
  const value = useMotionValue(isMotionValue(source) ? toNumber(source.get()) : source);
  const latestValue = reactExports.useRef(value.get());
  const latestSetter = reactExports.useRef(() => {
  });
  const startAnimation = () => {
    const animation = activeSpringAnimation.current;
    if (animation && animation.time === 0) {
      animation.sample(frameData.delta);
    }
    stopAnimation2();
    activeSpringAnimation.current = animateValue({
      keyframes: [value.get(), latestValue.current],
      velocity: value.getVelocity(),
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...config,
      onUpdate: latestSetter.current
    });
  };
  const stopAnimation2 = () => {
    if (activeSpringAnimation.current) {
      activeSpringAnimation.current.stop();
    }
  };
  reactExports.useInsertionEffect(() => {
    return value.attach((v, set) => {
      if (isStatic)
        return set(v);
      latestValue.current = v;
      latestSetter.current = set;
      frame.update(startAnimation);
      return value.get();
    }, stopAnimation2);
  }, [JSON.stringify(config)]);
  useIsomorphicLayoutEffect(() => {
    if (isMotionValue(source)) {
      return source.on("change", (v) => value.set(toNumber(v)));
    }
  }, [value]);
  return value;
}
function stopAnimation(visualElement) {
  visualElement.values.forEach((value) => value.stop());
}
function setVariants(visualElement, variantLabels) {
  const reversedLabels = [...variantLabels].reverse();
  reversedLabels.forEach((key) => {
    const variant = visualElement.getVariant(key);
    variant && setTarget(visualElement, variant);
    if (visualElement.variantChildren) {
      visualElement.variantChildren.forEach((child) => {
        setVariants(child, variantLabels);
      });
    }
  });
}
function setValues(visualElement, definition) {
  if (Array.isArray(definition)) {
    return setVariants(visualElement, definition);
  } else if (typeof definition === "string") {
    return setVariants(visualElement, [definition]);
  } else {
    setTarget(visualElement, definition);
  }
}
function animationControls() {
  const subscribers = /* @__PURE__ */ new Set();
  const controls = {
    subscribe(visualElement) {
      subscribers.add(visualElement);
      return () => void subscribers.delete(visualElement);
    },
    start(definition, transitionOverride) {
      const animations = [];
      subscribers.forEach((visualElement) => {
        animations.push(animateVisualElement(visualElement, definition, {
          transitionOverride
        }));
      });
      return Promise.all(animations);
    },
    set(definition) {
      return subscribers.forEach((visualElement) => {
        setValues(visualElement, definition);
      });
    },
    stop() {
      subscribers.forEach((visualElement) => {
        stopAnimation(visualElement);
      });
    },
    mount() {
      return () => {
        controls.stop();
      };
    }
  };
  return controls;
}
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
function isDOMKeyframes(keyframes) {
  return typeof keyframes === "object" && !Array.isArray(keyframes);
}
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject;
  } else {
    return [subject];
  }
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}
function calcNextTime(current, next, prev, labels) {
  var _a;
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else {
    return (_a = labels.get(next)) !== null && _a !== void 0 ? _a : current;
  }
}
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators === null || generators === void 0 ? void 0 : generators[type];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = { ...remainingTransition };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease = springEasing.ease;
        duration = springEasing.duration;
      }
      duration !== null && duration !== void 0 ? duration : duration = defaultDuration;
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease = Array.isArray(ease) ? [...ease] : [ease];
        const originalEase = [...ease];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes = keyframes;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes) {
          resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes;
      definition.transition[key] = {
        ...defaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes) {
  return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
function isSingleValue(subject, keyframes) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes);
}
function animateSubject(subject, keyframes, options, scope) {
  const animations = [];
  if (isSingleValue(subject, keyframes)) {
    animations.push(animateSingleValue(subject, isDOMKeyframes(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    const subjects = resolveSubjects(subject, keyframes, scope);
    const numSubjects = subjects.length;
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
    }
  }
  return animations;
}
function animateSequence(sequence, options, scope) {
  const animations = [];
  const animationDefinitions = createAnimationsFromSequence(sequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations.push(...animateSubject(subject, keyframes, transition));
  });
  return animations;
}
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(scope) {
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options) {
    let animations = [];
    if (isSequence(subjectOrSequence)) {
      animations = animateSequence(subjectOrSequence, optionsOrKeyframes, scope);
    } else {
      animations = animateSubject(subjectOrSequence, optionsOrKeyframes, options, scope);
    }
    const animation = new GroupPlaybackControls(animations);
    return animation;
  }
  return scopedAnimate;
}
const animate = createScopedAnimate();
function useAnimationControls() {
  const controls = useConstant(animationControls);
  useIsomorphicLayoutEffect(controls.mount, []);
  return controls;
}
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 5v16", key: "1f6ucr" }],
  [
    "path",
    {
      d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
      key: "1fyvmf"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$1);
/**
 * @license lucide-react v1.34.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
];
const ListTodo = createLucideIcon("list-todo", __iconNode);
const BODY = "M120 8 C180 8 230 42 231 108 C232 172 196 212 120 212 C44 212 8 172 9 108 C10 42 60 8 120 8 Z";
const EYE_Y = 120;
const EYES = [
  { cx: 86, side: "left" },
  { cx: 154, side: "right" }
];
const INK = "#121316";
const OVAL_EYE_MOODS = ["idle", "curious", "surprised", "sleepy", "wink"];
function useAutoBlink(enabled) {
  const [closed, setClosed] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!enabled) {
      setClosed(false);
      return;
    }
    let alive = true;
    let timer;
    const blinkOnce = (after) => {
      setClosed(true);
      timer = setTimeout(() => {
        if (!alive) return;
        setClosed(false);
        after();
      }, 110);
    };
    const schedule = () => {
      timer = setTimeout(
        () => {
          if (!alive) return;
          blinkOnce(() => {
            if (Math.random() < 0.25) timer = setTimeout(() => alive && blinkOnce(schedule), 170);
            else schedule();
          });
        },
        1800 + Math.random() * 4200
      );
    };
    schedule();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [enabled]);
  return closed;
}
function spiralPath(cx, cy) {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const angle = t * Math.PI * 5;
    const r = 2 + t * 15;
    pts.push(`${(cx + Math.cos(angle) * r).toFixed(1)} ${(cy + Math.sin(angle) * r).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}
const strokeProps = {
  stroke: INK,
  strokeWidth: 7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none"
};
function Eye({
  cx,
  side,
  mood,
  closed,
  gradient
}) {
  const cy = EYE_Y;
  const pop = { initial: { scale: 0.4, opacity: 0 }, animate: { scale: 1, opacity: 1 } };
  if (mood === "happy" || mood === "wink" && side === "left") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.path, { ...pop, d: `M${cx - 15} ${cy + 6} Q${cx} ${cy - 16} ${cx + 15} ${cy + 6}`, ...strokeProps }, "happy");
  }
  if (mood === "sleep") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.path, { ...pop, d: `M${cx - 15} ${cy + 2} Q${cx} ${cy + 14} ${cx + 15} ${cy + 2}`, ...strokeProps, strokeWidth: 6 }, "sleep");
  }
  if (mood === "dragged") {
    const d = side === "left" ? `M${cx - 11} ${cy - 13} L${cx + 9} ${cy} L${cx - 11} ${cy + 13}` : `M${cx + 11} ${cy - 13} L${cx - 9} ${cy} L${cx + 11} ${cy + 13}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.path, { ...pop, d, ...strokeProps }, "dragged");
  }
  if (mood === "dizzy") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d: spiralPath(cx, cy),
        ...strokeProps,
        strokeWidth: 5,
        initial: { rotate: 0 },
        animate: { rotate: side === "left" ? 360 : -360 },
        transition: { repeat: Infinity, duration: 1.1, ease: "linear" }
      },
      "dizzy"
    );
  }
  if (mood === "love") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d: `M${cx} ${cy + 13} C${cx - 24} ${cy - 2} ${cx - 15} ${cy - 22} ${cx} ${cy - 10} C${cx + 15} ${cy - 22} ${cx + 24} ${cy - 2} ${cx} ${cy + 13} Z`,
        fill: "#ff3d6e",
        initial: { scale: 0.3 },
        animate: { scale: [1, 1.18, 1] },
        transition: { repeat: Infinity, duration: 0.7, ease: "easeInOut" }
      },
      "love"
    );
  }
  const scaleY = closed ? 0.08 : mood === "sleepy" ? 0.38 : 1;
  const scale = mood === "surprised" ? 1.22 : mood === "curious" ? 1.1 : 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.g,
    {
      initial: false,
      animate: { scaleY, scale },
      transition: { duration: closed ? 0.07 : 0.16 },
      style: { originY: 0.7 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx, cy: cy + 1, rx: "17.5", ry: "23.5", fill: "#d8d3cc" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx, cy, rx: "16", ry: "22", fill: gradient }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: cx - 5, cy: cy - 11, rx: "4.5", ry: "7", fill: "#fff", opacity: "0.5", transform: `rotate(-15 ${cx - 5} ${cy - 11})` })
      ]
    },
    "oval"
  );
}
function Mouth({ mood }) {
  if (mood === "surprised") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.ellipse, { cx: 120, cy: 160, rx: 6, ry: 7, fill: INK, initial: { scale: 0 }, animate: { scale: 1 } });
  }
  if (mood === "happy" || mood === "love") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.path, { d: "M108 156 Q120 167 132 156", ...strokeProps, strokeWidth: 4.5, initial: { opacity: 0 }, animate: { opacity: 1 } });
  }
  if (mood === "sleepy") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.ellipse,
      {
        cx: 120,
        cy: 161,
        rx: 7,
        fill: INK,
        initial: { ry: 0.5 },
        animate: { ry: [0.5, 0.5, 9, 9, 0.5] },
        transition: { duration: 4, times: [0, 0.45, 0.6, 0.8, 1], repeat: Infinity }
      }
    );
  }
  return null;
}
function MascotSVG({ size = 96, variant = "emblem", mood = "idle", look, autoBlink = true, style }) {
  const uid = reactExports.useId().replace(/:/g, "");
  const id = (name) => `${name}-${uid}`;
  const closed = useAutoBlink(autoBlink && OVAL_EYE_MOODS.includes(mood));
  const lookX = mood === "sleep" || mood === "dizzy" ? 0 : look?.x ?? 0;
  const lookY = mood === "sleep" || mood === "dizzy" ? 0 : look?.y ?? 0;
  const blush = mood === "happy" || mood === "love" || mood === "dragged";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.svg,
    {
      width: size,
      height: size * 220 / 240,
      viewBox: "0 0 240 220",
      style: { display: "block", overflow: "visible", ...style },
      "aria-label": "NeoTerra mascot",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: id("body"), cx: "38%", cy: "22%", r: "85%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#5b5e64" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "45%", stopColor: "#2e3034" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#111214" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: id("green"), x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#7ef0a0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "45%", stopColor: "#2fd36a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#13873d" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: id("greenSoft"), x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#8fdca4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "#4bb56c" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#2a7a45" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: id("rim"), x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#0c0d0f" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#2a2c30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: id("face"), x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "70%", stopColor: "#f6f4f1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#e4dfd8" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: id("faceGlow"), cx: "50%", cy: "40%", r: "65%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#ffffff", stopOpacity: "0" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: id("eye"), cx: "40%", cy: "30%", r: "80%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#3a3a3a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "55%", stopColor: "#0b0b0b" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#000" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("clipPath", { id: id("clip"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: BODY }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: id("shadow"), x: "-20%", y: "-20%", width: "140%", height: "150%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feDropShadow", { dx: "0", dy: "8", stdDeviation: "8", floodColor: "#000", floodOpacity: "0.45" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("filter", { id: id("glow"), x: "-30%", y: "-30%", width: "160%", height: "160%", children: /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: `url(#${id("shadow")})`, children: [
          variant === "emblem" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.g,
            {
              filter: `url(#${id("glow")})`,
              animate: { opacity: mood === "sleep" ? 0.12 : blush ? 0.85 : 0.55 },
              transition: { duration: 0.8 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M58 30 C30 55 14 85 14 120", stroke: "#2bff6e", strokeWidth: "10", fill: "none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M182 30 C210 55 226 85 226 120", stroke: "#2bff6e", strokeWidth: "10", fill: "none" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: BODY, fill: `url(#${id("body")})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { clipPath: `url(#${id("clip")})`, children: [
            variant === "emblem" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M-10 150 C-6 96 22 46 74 14 L88 10 C54 38 32 80 24 122 C21 136 20 148 20 160 Z",
                  fill: `url(#${id("green")})`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M250 150 C246 96 218 46 166 14 L152 10 C186 38 208 80 216 122 C219 136 220 148 220 160 Z",
                  fill: `url(#${id("green")})`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M88 10 C54 38 32 80 24 122", stroke: "#000", strokeOpacity: "0.35", strokeWidth: "2", fill: "none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M152 10 C186 38 208 80 216 122", stroke: "#000", strokeOpacity: "0.35", strokeWidth: "2", fill: "none" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M-5 -5 L150 -5 C146 16 128 26 100 32 C70 38 50 48 40 74 C32 96 30 116 -5 128 Z",
                  fill: `url(#${id("greenSoft")})`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M245 92 C226 106 212 136 204 166 C194 198 172 208 128 222 L245 240 Z",
                  fill: `url(#${id("greenSoft")})`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "110", cy: "34", rx: "70", ry: "22", fill: "#fff", opacity: "0.07" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 150 C30 205 80 214 120 214 C160 214 210 205 231 150 L231 230 L9 230 Z", fill: "#000", opacity: "0.25" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "31", y: "36", width: "178", height: "156", rx: "54", fill: `url(#${id("rim")})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "31.5", y: "36.5", width: "177", height: "155", rx: "53.5", fill: "none", stroke: "#fff", strokeOpacity: "0.08" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "40", y: "44", width: "160", height: "140", rx: "46", fill: `url(#${id("face")})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "40", y: "44", width: "160", height: "140", rx: "46", fill: `url(#${id("faceGlow")})` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "40.5", y: "44.5", width: "159", height: "139", rx: "45.5", fill: "none", stroke: "#000", strokeOpacity: "0.12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.rect,
            {
              x: "40",
              y: "44",
              width: "160",
              height: "140",
              rx: "46",
              fill: "#1b2340",
              initial: false,
              animate: { opacity: mood === "sleep" ? 0.09 : 0 },
              transition: { duration: 1.2 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.g, { initial: false, animate: { opacity: blush ? 0.55 : 0 }, transition: { duration: 0.3 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "150", rx: "13", ry: "7", fill: "#ff7a9a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "180", cy: "150", rx: "13", ry: "7", fill: "#ff7a9a" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.g,
            {
              initial: false,
              animate: { x: lookX * 9, y: lookY * 7 },
              transition: { type: "spring", stiffness: 140, damping: 15 },
              children: EYES.map(({ cx, side }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { cx, side, mood, closed, gradient: `url(#${id("eye")})` }, side))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mouth, { mood })
        ] })
      ]
    }
  );
}
const BUBBLE_FONT_FAMILY = "'Inter', 'Segoe UI', system-ui, sans-serif";
const BUBBLE_FONT_SIZE = 11.5;
const BUBBLE_FONT_WEIGHT = 500;
const BUBBLE_LINE_HEIGHT = 1.25;
const MAX_LINES = 3;
const CHAR_MS = 28;
const PAUSE_MS = { ",": 90, ";": 110, ":": 110, ".": 170, "!": 170, "?": 170 };
const HOLD_BASE_MS = 500;
const HOLD_PER_CHAR_MS = 14;
const HOLD_MIN_MS = 900;
const HOLD_MAX_MS = 2400;
const END_HOLD_MS = 2e3;
const charDelay = (ch) => CHAR_MS + (PAUSE_MS[ch] ?? 0);
const pageTypeMs = (page) => Array.from(page).reduce((sum, ch) => sum + charDelay(ch), 0);
const pageHoldMs = (page) => Math.min(HOLD_MAX_MS, Math.max(HOLD_MIN_MS, HOLD_BASE_MS + HOLD_PER_CHAR_MS * Array.from(page).length));
function typingTotalMs(pages) {
  return pages.reduce((sum, page, i) => sum + pageTypeMs(page) + (i < pages.length - 1 ? pageHoldMs(page) : 0), 0);
}
function visibleMs(pages, durationMs) {
  return Math.max(durationMs, typingTotalMs(pages) + END_HOLD_MS);
}
function longestPrefix(word, limit, countLines) {
  let lo = 1;
  let hi = word.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (countLines(word.slice(0, mid)) <= limit) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
function paginate(text, countLines, maxLines = MAX_LINES) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const pages = [];
  let i = 0;
  while (i < words.length) {
    const rest = words.slice(i).join(" ");
    const restLines = countLines(rest);
    if (restLines <= maxLines) {
      pages.push(rest);
      break;
    }
    const pagesLeft = Math.ceil(restLines / maxLines);
    const limit = Math.min(maxLines, Math.ceil(restLines / pagesLeft));
    let page = "";
    while (i < words.length) {
      const candidate = page ? `${page} ${words[i]}` : words[i];
      if (countLines(candidate) <= limit) {
        page = candidate;
        i++;
        continue;
      }
      if (!page) {
        const cut = longestPrefix(words[i], limit, countLines);
        page = words[i].slice(0, cut);
        words[i] = words[i].slice(cut);
        if (!words[i]) i++;
      }
      break;
    }
    pages.push(page);
  }
  return pages;
}
let probe = null;
function createLineCounter(innerWidth) {
  if (!probe || !probe.isConnected) {
    probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    Object.assign(probe.style, {
      position: "fixed",
      left: "-10000px",
      top: "0",
      visibility: "hidden",
      pointerEvents: "none",
      boxSizing: "content-box",
      padding: "0",
      border: "0",
      margin: "0",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      textAlign: "center",
      fontFamily: BUBBLE_FONT_FAMILY,
      fontSize: `${BUBBLE_FONT_SIZE}px`,
      fontWeight: String(BUBBLE_FONT_WEIGHT),
      lineHeight: String(BUBBLE_LINE_HEIGHT)
    });
    document.body.appendChild(probe);
  }
  const el = probe;
  const lineHeight = BUBBLE_FONT_SIZE * BUBBLE_LINE_HEIGHT;
  return (text) => {
    el.style.width = `${innerWidth}px`;
    el.textContent = text;
    return Math.max(1, Math.round(el.getBoundingClientRect().height / lineHeight));
  };
}
const ACTIONS = [
  { key: "play", Icon: Play, label: "Minecraftga kirish" },
  { key: "ram", Icon: MemoryStick, label: "RAM tozalash" },
  { key: "ai", Icon: Sparkles, label: "AI yordamchi" },
  {
    key: "launcher",
    Icon: Settings,
    label: "Launcherni ochish"
  }
];
const NAMES_ACTION = { key: "names", Icon: BookOpen, label: "Ollohning 99 ismi" };
const PLANS_ACTION = { key: "plans", Icon: ListTodo, label: "Rejalarim" };
const DEFAULT_HOTKEY = DEFAULT_MASCOT_HOTKEY;
const SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.9
};
const HIDDEN = {
  opacity: 0,
  scale: 0.15,
  rotate: -14,
  transition: { duration: 0.34, ease: [0.55, 0.05, 0.9, 0.45] }
};
const SHOWN = {
  opacity: 1,
  scale: 1,
  rotate: 0,
  transition: { type: "spring", stiffness: 300, damping: 14, mass: 0.9, opacity: { duration: 0.15 } }
};
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
  exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    // blur spring bilan manfiy qiymatga "oshib ketmasin" - u alohida, oddiy tween
    transition: { default: { type: "spring", stiffness: 420, damping: 28 }, filter: { duration: 0.2 } }
  },
  exit: { opacity: 0, y: 6, scale: 0.96, filter: "blur(3px)", transition: { duration: 0.1 } }
};
function ActionButton({ action, onSelect }) {
  const { Icon, label } = action;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      variants: itemVariants,
      whileHover: { scale: 1.015, backgroundColor: "rgba(255,255,255,0.17)", borderColor: "rgba(255,255,255,0.16)" },
      whileTap: { scale: 0.97 },
      transition: { type: "spring", stiffness: 500, damping: 28 },
      onClick: (e) => {
        e.stopPropagation();
        onSelect(action.key);
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        width: "100%",
        height: 46,
        padding: "0 11px",
        borderRadius: 11,
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.28)",
        color: "rgba(255,255,255,0.92)",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "inherit",
        outline: "none",
        WebkitTapHighlightColor: "transparent"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              width: 28,
              height: 28,
              display: "grid",
              placeItems: "center",
              borderRadius: 8,
              background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
              border: "0.5px solid rgba(255,255,255,0.22)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)",
              backdropFilter: "blur(8px)",
              boxSizing: "border-box",
              flexShrink: 0
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                size: 16,
                color: "rgba(255,255,255,0.92)",
                strokeWidth: 2,
                fill: Icon === Play ? "rgba(255,255,255,0.92)" : "none"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }, children: label })
      ]
    }
  );
}
const SLEEPY_AFTER_S = 45;
const SLEEP_AFTER_S = 60;
const CURSOR_FRESH_MS = 2500;
const COLLAPSE_DELAY_MS = 900;
const OFFSET_X = 30;
const OFFSET_BOTTOM = 12;
const OFFSET_TOP = 79;
const COLLAPSED_H = 176;
const MASCOT_SIZE = 82;
const MASCOT_SIZE_OPEN = 48;
const PANEL_WIDTH = 246;
const BUBBLE_MAX_W = 140;
const BUBBLE_PAD_X = 10;
const BUBBLE_PAD_Y = 5;
const BUBBLE_BORDER = 1;
const BUBBLE_EDGE = 4;
const WINDOW_W = 150;
const ROOM_RELEASE_MS = 220;
const bubbleWidth = (space) => Math.max(96, Math.min(BUBBLE_MAX_W, space.right - space.left - BUBBLE_EDGE * 2));
function planPages(text, width) {
  const pages = paginate(text, createLineCounter(width - BUBBLE_PAD_X * 2 - BUBBLE_BORDER * 2));
  return pages.length > 0 ? pages : [text];
}
function SpeechBubble({
  view,
  below,
  space,
  onClose
}) {
  const chars = reactExports.useMemo(() => view.pages.map((p) => Array.from(p)), [view.pages]);
  const last = chars.length - 1;
  const [pos, setPos] = reactExports.useState(
    () => view.instant ? { page: last, typed: chars[last]?.length ?? 0 } : { page: 0, typed: 0 }
  );
  reactExports.useEffect(() => {
    if (view.instant) {
      setPos({ page: last, typed: chars[last]?.length ?? 0 });
      return;
    }
    let alive = true;
    let timer;
    const step = (page2, typed) => {
      if (!alive) return;
      setPos({ page: page2, typed });
      const cs2 = chars[page2];
      if (typed < cs2.length) timer = setTimeout(() => step(page2, typed + 1), charDelay(cs2[typed]));
      else if (page2 < last) timer = setTimeout(() => step(page2 + 1, 0), pageHoldMs(view.pages[page2]));
    };
    step(0, 0);
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, [view.id, view.instant, view.pages, chars, last]);
  const page = Math.min(pos.page, last);
  const cs = chars[page] ?? [];
  const typedText = cs.slice(0, pos.typed).join("");
  const restText = cs.slice(pos.typed).join("");
  const wrapRef = reactExports.useRef(null);
  const boxRef = reactExports.useRef(null);
  const [shift, setShift] = reactExports.useState(0);
  reactExports.useLayoutEffect(() => {
    const parent = wrapRef.current?.parentElement;
    const box = boxRef.current;
    if (!parent || !box) return;
    const pr = parent.getBoundingClientRect();
    const w = box.offsetWidth;
    const desired = pr.left + pr.width / 2 - w / 2;
    const lo = space.left + BUBBLE_EDGE;
    const hi = space.right - BUBBLE_EDGE - w;
    const left = hi < lo ? lo : Math.min(Math.max(desired, lo), hi);
    const next = Math.round(left - desired);
    setShift((prev) => prev === next ? prev : next);
  }, [page, view.id, view.pages, space.left, space.right]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: wrapRef,
      style: {
        position: "absolute",
        left: "50%",
        [below ? "top" : "bottom"]: "100%",
        width: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateX(${shift}px)`,
        zIndex: 2,
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          ref: boxRef,
          initial: { opacity: 0, y: below ? -6 : 6, scale: 0.85 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 24 } },
          exit: { opacity: 0, y: below ? -4 : 4, scale: 0.9, transition: { duration: 0.15 } },
          onPointerDown: (e) => e.stopPropagation(),
          onClick: (e) => {
            e.stopPropagation();
            onClose();
          },
          style: {
            // Maskot boshidan (oyoqlaridan) biroz uzoqroqda turadi - yopiq oyna shu xabar uchun joy qoldirgan
            [below ? "marginTop" : "marginBottom"]: 6,
            width: "max-content",
            maxWidth: view.width,
            // 0 enli flex konteyner ichida bo'lgani uchun siqilib qolmasin (aks holda matn har belgidan keyin qatorga o'tadi)
            flexShrink: 0,
            boxSizing: "border-box",
            padding: `${BUBBLE_PAD_Y}px ${BUBBLE_PAD_X}px`,
            transformOrigin: below ? "50% 0%" : "50% 100%",
            borderRadius: 11,
            background: "rgba(10,13,12,0.62)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `${BUBBLE_BORDER}px solid rgba(255,255,255,0.16)`,
            boxShadow: "0 4px 14px -6px rgba(0,0,0,0.5)",
            color: "rgba(255,255,255,0.95)",
            fontFamily: BUBBLE_FONT_FAMILY,
            fontSize: BUBBLE_FONT_SIZE,
            fontWeight: BUBBLE_FONT_WEIGHT,
            lineHeight: BUBBLE_LINE_HEIGHT,
            textAlign: "center",
            overflowWrap: "anywhere",
            cursor: "pointer",
            pointerEvents: "auto"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.span,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { duration: 0.12 } },
              style: { display: "block" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: typedText }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, style: { visibility: "hidden" }, children: restText })
              ]
            },
            page
          )
        }
      )
    }
  );
}
const clamp = (v, lim = 1) => Math.max(-lim, Math.min(lim, v));
function useMascotTicks(bridge, onTick) {
  const cb = reactExports.useRef(onTick);
  cb.current = onTick;
  reactExports.useEffect(() => {
    if (bridge) return bridge.onTick((t) => cb.current(t));
    let last = { cx: 0, cy: 0, sx: 0, sy: 0 };
    let lastActivity = performance.now();
    const onMove = (e) => {
      last = { cx: e.clientX, cy: e.clientY, sx: e.screenX, sy: e.screenY };
      lastActivity = performance.now();
    };
    const onActivity = () => {
      lastActivity = performance.now();
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("pointerdown", onActivity);
    const timer = setInterval(() => cb.current({ ...last, idle: (performance.now() - lastActivity) / 1e3 }), 50);
    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("pointerdown", onActivity);
    };
  }, [bridge]);
}
function Snore() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: -14, right: -2, width: 40, height: 40, pointerEvents: "none" }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: { opacity: 0, x: 0, y: 0 },
      animate: { opacity: [0, 1, 1, 0], x: [0, 6, 12, 16], y: [10, -2, -14, -24] },
      transition: { duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: "easeOut" },
      style: {
        position: "absolute",
        left: 0,
        bottom: 0,
        fontSize: 12 + i * 3,
        fontWeight: 800,
        color: "#bfe9ff",
        textShadow: "0 0 6px rgba(80,180,255,0.9)",
        fontFamily: "inherit"
      },
      children: "z"
    },
    i
  )) });
}
function FloatingMascot({
  variant = "emblem",
  defaultOpen = false,
  bridge,
  focusNames = false,
  focusPlans = false
}) {
  const actions = reactExports.useMemo(() => {
    const extra = [...focusNames ? [NAMES_ACTION] : [], ...focusPlans ? [PLANS_ACTION] : []];
    return [...ACTIONS.slice(0, -1), ...extra, ...ACTIONS.slice(-1)];
  }, [focusNames, focusPlans]);
  const [open, setOpenState] = reactExports.useState(defaultOpen);
  const [anchor, setAnchor] = reactExports.useState({ h: "right", v: "bottom" });
  const [hover, setHover] = reactExports.useState(false);
  const [dragging, setDragging] = reactExports.useState(false);
  const [morphing, setMorphing] = reactExports.useState(false);
  const [sleepLevel, setSleepLevel] = reactExports.useState(0);
  const [transient, setTransient] = reactExports.useState(null);
  const [look, setLook] = reactExports.useState({ x: 0, y: 0 });
  const [idleRound, setIdleRound] = reactExports.useState(0);
  const [flying, setFlying] = reactExports.useState(false);
  const [bubble, setBubble] = reactExports.useState(null);
  const bubbleRef = reactExports.useRef(null);
  const bubbleSeq = reactExports.useRef(0);
  const bubbleTimer = reactExports.useRef(null);
  const [space, setSpace] = reactExports.useState({ below: false, left: 0, right: WINDOW_W });
  const spaceRef = reactExports.useRef(space);
  spaceRef.current = space;
  const [roomReady, setRoomReady] = reactExports.useState(false);
  const [shown, setShown] = reactExports.useState(true);
  const mascotRef = reactExports.useRef(null);
  const body = useAnimationControls();
  const swing = useSpring(0, { stiffness: 140, damping: 9 });
  const spin = useMotionValue(0);
  const openRef = reactExports.useRef(open);
  openRef.current = open;
  const draggingRef = reactExports.useRef(false);
  const hoverRef = reactExports.useRef(false);
  const sleepRef = reactExports.useRef(0);
  const transientRef = reactExports.useRef(null);
  const transientTimer = reactExports.useRef(null);
  const collapseTimer = reactExports.useRef(null);
  const lookOverride = reactExports.useRef(false);
  const lastCursorMove = reactExports.useRef(0);
  const lastTick = reactExports.useRef(null);
  const shakes = reactExports.useRef([]);
  const lastVxSign = reactExports.useRef(0);
  const pet = reactExports.useRef({ x: 0, dir: 0, turns: [] });
  const pointerDown = reactExports.useRef(null);
  const closeBubble = reactExports.useCallback(() => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = null;
    bubbleRef.current = null;
    setBubble(null);
  }, []);
  const flash = reactExports.useCallback((m, ms) => {
    if (transientTimer.current) clearTimeout(transientTimer.current);
    transientRef.current = m;
    setTransient(m);
    transientTimer.current = setTimeout(() => {
      transientTimer.current = null;
      transientRef.current = null;
      setTransient(null);
    }, ms);
  }, []);
  reactExports.useEffect(
    () => () => {
      if (transientTimer.current) clearTimeout(transientTimer.current);
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    },
    []
  );
  const mood = dragging || flying ? "dragged" : transient === "dizzy" || transient === "love" || transient === "surprised" ? transient : hover ? "happy" : sleepLevel === 2 ? "sleep" : sleepLevel === 1 ? "sleepy" : transient ?? "idle";
  const wakeUp = reactExports.useCallback(() => {
    flash("surprised", 900);
    body.start({ y: [0, -14, 0], scaleY: [1, 1.12, 1], scaleX: [1, 0.94, 1], transition: { duration: 0.5 } });
  }, [body, flash]);
  useMascotTicks(bridge, (t) => {
    const now = performance.now();
    const prev = lastTick.current;
    const moved = !prev || Math.abs(t.sx - prev.sx) + Math.abs(t.sy - prev.sy) > 1;
    if (moved) lastCursorMove.current = now;
    if (draggingRef.current && prev) {
      const vx = (t.sx - prev.sx) / Math.max(16, now - prev.t) * 50;
      swing.set(clamp(-vx * 0.5, 30));
      const sign = Math.abs(vx) > 18 ? Math.sign(vx) : 0;
      if (sign && sign !== lastVxSign.current) {
        if (lastVxSign.current) shakes.current.push(now);
        lastVxSign.current = sign;
      }
      shakes.current = shakes.current.filter((ts) => now - ts < 1500);
    }
    lastTick.current = { sx: t.sx, sy: t.sy, t: now };
    if (moved && !lookOverride.current && mascotRef.current) {
      const r = mascotRef.current.getBoundingClientRect();
      setLook({
        x: clamp((t.cx - (r.left + r.width / 2)) / 260),
        y: clamp((t.cy - (r.top + r.height / 2)) / 220)
      });
    }
    const level = t.idle >= SLEEP_AFTER_S ? 2 : t.idle >= SLEEPY_AFTER_S ? 1 : 0;
    if (level !== sleepRef.current) {
      const wasAsleep = sleepRef.current === 2;
      sleepRef.current = level;
      setSleepLevel(level);
      if (wasAsleep && level === 0) wakeUp();
    }
  });
  reactExports.useEffect(() => {
    if (!bridge?.onFlight) return;
    let peak = 0;
    let spinning = null;
    const off = bridge.onFlight((f) => {
      if (f.phase === "start") {
        peak = Math.hypot(f.vx, f.vy);
        setFlying(true);
        spinning?.stop();
        const dir = f.vx >= 0 ? 1 : -1;
        spinning = animate(spin, spin.get() + 360 * dir, {
          duration: Math.max(0.3, 0.9 - peak / 90),
          ease: "linear",
          repeat: Infinity
        });
      } else if (f.phase === "bounce") {
        body.start({ scaleX: [1, 0.84, 1.06, 1], scaleY: [1, 1.12, 0.95, 1], transition: { duration: 0.3 } });
      } else {
        spinning?.stop();
        spinning = null;
        const r = (spin.get() % 360 + 360) % 360;
        spin.set(r > 180 ? r - 360 : r);
        animate(spin, 0, { type: "spring", stiffness: 220, damping: 14 });
        setFlying(false);
        body.start({
          y: [0, -6, 0],
          scaleX: [1, 1.14, 0.96, 1],
          scaleY: [1, 0.86, 1.04, 1],
          transition: { duration: 0.5 }
        });
        if (peak > 22) flash("dizzy", 3e3);
      }
    });
    return () => {
      spinning?.stop();
      off();
    };
  }, [bridge, body, spin, flash]);
  const calm = !open && !hover && !dragging && !flying && sleepLevel === 0 && transient === null;
  reactExports.useEffect(() => {
    if (!calm) return;
    let alive = true;
    const timers = [];
    const later = (fn, ms) => {
      timers.push(setTimeout(() => alive && fn(), ms));
    };
    const next = (ms) => later(() => setIdleRound((n) => n + 1), ms);
    later(
      () => {
        const cursorFresh = performance.now() - lastCursorMove.current < CURSOR_FRESH_MS;
        const r = Math.random();
        if (r < 0.25 && !cursorFresh) {
          lookOverride.current = true;
          const seq = [
            { x: -0.95, y: -0.1 },
            { x: 0.95, y: 0.05 },
            { x: 0.2, y: -0.7 },
            { x: 0, y: 0 }
          ];
          seq.forEach((p, i) => later(() => setLook(p), i * 650));
          later(() => {
            lookOverride.current = false;
          }, seq.length * 650);
          next(seq.length * 650 + 50);
        } else if (r < 0.45) {
          body.start({
            y: [0, -16, 0, -6, 0],
            scaleY: [1, 1.08, 0.9, 1.03, 1],
            scaleX: [1, 0.95, 1.08, 0.98, 1],
            transition: { duration: 0.9, ease: "easeOut" }
          });
          next(950);
        } else if (r < 0.65) {
          flash("curious", 1800);
          body.start({ rotate: [0, 13, 13, 0], transition: { duration: 1.8, times: [0, 0.15, 0.8, 1] } });
        } else if (r < 0.8) {
          flash("wink", 700);
          body.start({ rotate: [0, -6, 0], transition: { duration: 0.7 } });
        } else {
          body.start({ rotate: [0, -9, 8, -6, 4, 0], transition: { duration: 0.8 } });
          next(850);
        }
      },
      4500 + Math.random() * 6500
    );
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      lookOverride.current = false;
    };
  }, [calm, idleRound, body, flash]);
  const finishCollapse = reactExports.useCallback(() => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = null;
    setMorphing(false);
    if (!openRef.current) bridge?.setExpanded(false);
  }, [bridge]);
  reactExports.useEffect(() => {
    if (!bridge?.onBubble) return;
    const off = bridge.onBubble((b) => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      bubbleTimer.current = null;
      if (!b.text) {
        bubbleRef.current = null;
        setBubble(null);
        return;
      }
      const prev = bubbleRef.current;
      const width = bubbleWidth(spaceRef.current);
      const pages = planPages(b.text, width);
      const isUpdate = b.kind === "launch" && prev?.kind === "launch";
      const instant = isUpdate && pages.length === 1;
      const view = {
        id: isUpdate && prev ? prev.id : ++bubbleSeq.current,
        kind: b.kind,
        pages,
        instant,
        width
      };
      bubbleRef.current = view;
      setBubble(view);
      if (!isUpdate) flash("happy", b.durationMs > 0 ? Math.min(b.durationMs, 2500) : 1800);
      if (b.durationMs > 0) {
        bubbleTimer.current = setTimeout(
          () => {
            bubbleTimer.current = null;
            bubbleRef.current = null;
            setBubble(null);
          },
          instant ? b.durationMs : visibleMs(pages, b.durationMs)
        );
      }
    });
    bridge.ready?.();
    return () => {
      off();
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    };
  }, [bridge, flash]);
  reactExports.useEffect(() => {
    if (!bridge?.onBubbleSpace) return;
    return bridge.onBubbleSpace(setSpace);
  }, [bridge]);
  const [hotkey, setHotkey] = reactExports.useState(DEFAULT_HOTKEY);
  reactExports.useEffect(() => {
    if (!bridge?.onHotkey) return;
    return bridge.onHotkey(({ key }) => setHotkey(key));
  }, [bridge]);
  const hotkeyText = hotkey ? formatMascotHotkey(hotkey) : "";
  const hotkeyIsCombo = !!hotkey && hotkey.includes("+");
  const wantRoom = !!bubble && !open && shown && space.below;
  reactExports.useEffect(() => {
    if (!bridge?.setBubbleRoom) {
      setRoomReady(true);
      return;
    }
    if (wantRoom) {
      let alive = true;
      void bridge.setBubbleRoom(true).then(() => alive && setRoomReady(true));
      return () => {
        alive = false;
      };
    }
    setRoomReady(false);
    const t = setTimeout(() => void bridge.setBubbleRoom?.(false), ROOM_RELEASE_MS);
    return () => clearTimeout(t);
  }, [bridge, wantRoom]);
  reactExports.useEffect(() => {
    if (!bridge?.onVisibility) return;
    return bridge.onVisibility(({ visible }) => {
      if (!visible) {
        if (collapseTimer.current) clearTimeout(collapseTimer.current);
        collapseTimer.current = null;
        setOpenState(false);
        setMorphing(false);
        closeBubble();
      } else {
        flash("happy", 1600);
        body.start({
          y: [0, -16, 0, -6, 0],
          scaleY: [1, 1.08, 0.9, 1.03, 1],
          scaleX: [1, 0.95, 1.08, 0.98, 1],
          transition: { duration: 0.9, ease: "easeOut" }
        });
      }
      setShown(visible);
    });
  }, [bridge, body, flash, closeBubble]);
  const setOpen = reactExports.useCallback(
    async (next) => {
      if (collapseTimer.current) {
        clearTimeout(collapseTimer.current);
        collapseTimer.current = null;
      }
      if (next) {
        const a = await bridge?.setExpanded(true);
        if (a) setAnchor(a);
        setMorphing(true);
        setOpenState(true);
      } else {
        setOpenState(false);
        setMorphing(true);
        collapseTimer.current = setTimeout(finishCollapse, COLLAPSE_DELAY_MS);
      }
    },
    [bridge, finishCollapse]
  );
  const onAction = reactExports.useCallback(
    (key) => {
      if (key === "play") {
        setOpen(false);
        if (bridge?.launchGame) bridge.launchGame();
        else console.log("bosildi", key);
      } else if (key === "launcher") {
        setOpen(false);
        if (bridge?.openLauncher) bridge.openLauncher();
        else console.log("bosildi", key);
      } else if (key === "ram") {
        setOpen(false);
        if (bridge?.cleanRam) bridge.cleanRam();
        else console.log("bosildi", key);
      } else if (key === "names" || key === "plans") {
        setOpen(false);
        if (bridge?.openFocus) bridge.openFocus(key);
        else console.log("bosildi", key);
      } else {
        console.log("bosildi", key);
      }
    },
    [bridge, setOpen]
  );
  reactExports.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onBlur = () => {
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("blur", onBlur);
    };
  }, [open, setOpen]);
  const startDrag = () => {
    draggingRef.current = true;
    setDragging(true);
    shakes.current = [];
    lastVxSign.current = 0;
    bridge?.dragStart();
    body.start({
      y: -4,
      scaleY: 1.07,
      scaleX: 0.95,
      rotate: 0,
      transition: { type: "spring", stiffness: 400, damping: 15 }
    });
  };
  const endDrag = () => {
    draggingRef.current = false;
    setDragging(false);
    bridge?.dragEnd();
    swing.set(0);
    const dizzy = shakes.current.length >= 5;
    shakes.current = [];
    if (dizzy) flash("dizzy", 3200);
    body.start({
      y: [-4, 0, -5, 0],
      scaleX: [0.95, 1.16, 0.96, 1],
      scaleY: [1.07, 0.84, 1.04, 1],
      transition: { duration: 0.6 }
    }).then(() => {
      if (dizzy) body.start({ rotate: [0, -7, 7, -5, 5, 0], transition: { duration: 1.4, repeat: 1 } });
    });
  };
  const onPointerEnter = () => {
    hoverRef.current = true;
    setHover(true);
    pet.current = { x: 0, dir: 0, turns: [] };
    if (!draggingRef.current) {
      body.start({ scaleX: [1, 1.07, 0.98, 1], scaleY: [1, 0.93, 1.03, 1], transition: { duration: 0.45 } });
    }
  };
  const onPointerLeave = () => {
    hoverRef.current = false;
    setHover(false);
  };
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    pointerDown.current = { x: e.screenX, y: e.screenY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const now = performance.now();
    const d = pointerDown.current;
    if (d && !draggingRef.current && !openRef.current && Math.hypot(e.screenX - d.x, e.screenY - d.y) > 5) {
      startDrag();
      return;
    }
    if (!hoverRef.current || draggingRef.current) return;
    const p = pet.current;
    const dx = e.clientX - p.x;
    p.x = e.clientX;
    if (Math.abs(dx) >= 2) {
      const dir = Math.sign(dx);
      if (p.dir && dir !== p.dir) p.turns.push(now);
      p.dir = dir;
    }
    p.turns = p.turns.filter((ts) => now - ts < 1200);
    if (p.turns.length >= 4 && transientRef.current !== "love") {
      p.turns = [];
      flash("love", 2600);
      body.start({ y: [0, -8, 0], transition: { duration: 0.4 } });
    }
  };
  const onPointerUp = () => {
    const d = pointerDown.current;
    pointerDown.current = null;
    if (draggingRef.current) endDrag();
    else if (d) setOpen(!openRef.current);
  };
  const onLostPointerCapture = () => {
    pointerDown.current = null;
    if (draggingRef.current) endDrag();
  };
  const breathing = mood === "sleep" ? { scale: 1, scaleY: [1, 1.06, 1], scaleX: [1, 0.985, 1], y: [0, 1.5, 0] } : { scale: [1, 1.045, 1], scaleY: 1, scaleX: 1, y: [0, -2, 0] };
  const statusText = mood === "sleep" ? "Uxlayapti" : mood === "sleepy" ? "Uyqusi kelyapti" : mood === "love" ? "Xursand" : "Tayyor";
  const edgeV = space.below && !open && !morphing ? "top" : anchor.v;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      transition: SPRING,
      initial: false,
      animate: shown ? SHOWN : HIDDEN,
      onLayoutAnimationComplete: () => {
        if (openRef.current) setMorphing(false);
        else if (collapseTimer.current) finishCollapse();
      },
      "data-mascot-root": "",
      "data-anchor-v": edgeV,
      style: {
        // `mascot.css`: xabar maskot ostida chiqishi uchun oyna pastga kengayganda ham maskot oyna tepasiga nisbatan joyida turadi
        "--mascot-bottom": `${OFFSET_BOTTOM}px`,
        "--mascot-win-h": `${COLLAPSED_H}px`,
        pointerEvents: shown ? "auto" : "none",
        position: "fixed",
        [anchor.h]: OFFSET_X,
        [edgeV]: edgeV === "bottom" ? OFFSET_BOTTOM : OFFSET_TOP,
        boxSizing: "border-box",
        width: open ? PANEL_WIDTH : MASCOT_SIZE + 8,
        borderRadius: open ? 17 : 52,
        padding: open ? 10 : 4,
        overflow: open || morphing ? "hidden" : "visible",
        fontFamily: BUBBLE_FONT_FAMILY,
        userSelect: "none",
        border: "1px solid rgba(0,0,0,0)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            layout: true,
            transition: SPRING,
            initial: false,
            animate: { opacity: open ? 1 : 0 },
            style: {
              position: "absolute",
              inset: -1,
              borderRadius: open ? 17 : 52,
              pointerEvents: "none",
              background: "rgba(10,13,12,0.5)",
              backdropFilter: "blur(16px) saturate(1.2)",
              WebkitBackdropFilter: "blur(16px) saturate(1.2)",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow: "0 8px 24px -8px rgba(0,0,0,0.45)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            layout: true,
            transition: SPRING,
            style: { position: "relative", display: "flex", alignItems: "center", gap: 11, padding: open ? "0 2px" : 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  ref: mascotRef,
                  layout: true,
                  transition: SPRING,
                  onPointerEnter,
                  onPointerLeave,
                  onPointerDown,
                  onPointerMove,
                  onPointerUp,
                  onLostPointerCapture,
                  style: {
                    position: "relative",
                    width: open ? MASCOT_SIZE_OPEN : MASCOT_SIZE,
                    flexShrink: 0,
                    cursor: dragging ? "grabbing" : "pointer",
                    touchAction: "none"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        animate: breathing,
                        transition: { duration: mood === "sleep" ? 4.4 : 3.4, repeat: Infinity, ease: "easeInOut" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            animate: { rotate: mood === "sleep" ? -4 : look.x * 5, x: look.x * 2 },
                            transition: { type: "spring", stiffness: 90, damping: 14 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: body, style: { originY: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { rotate: swing, originY: 0.1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { rotate: spin }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MascotSVG, { size: open ? MASCOT_SIZE_OPEN : MASCOT_SIZE, variant, mood, look }) }) }) })
                          }
                        )
                      }
                    ),
                    mood === "sleep" && !open && !bubble && /* @__PURE__ */ jsxRuntimeExports.jsx(Snore, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: bubble && !open && shown && (!space.below || roomReady) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SpeechBubble,
                      {
                        view: bubble,
                        below: space.below,
                        space,
                        onClose: closeBubble
                      },
                      `${bubble.kind}-${space.below ? "below" : "above"}`
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  layout: "position",
                  initial: { opacity: 0, x: -10 },
                  animate: { opacity: 1, x: 0, transition: { delay: 0.1 } },
                  exit: { opacity: 0, x: -6, transition: { duration: 0.1 } },
                  style: { flex: 1, minWidth: 0, color: "#fff", whiteSpace: "nowrap" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 16, fontWeight: 600 }, children: "NeoTerra" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: { fontSize: 13.5, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 5 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 7, height: 7, borderRadius: 99, background: "#4ade80" } }),
                          statusText
                        ]
                      }
                    )
                  ]
                },
                "title"
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  layout: "position",
                  initial: { opacity: 0, scale: 0.6 },
                  animate: { opacity: 1, scale: 1, transition: { delay: 0.12 } },
                  exit: { opacity: 0, scale: 0.6, transition: { duration: 0.1 } },
                  whileHover: { scale: 1.12, backgroundColor: "rgba(255,255,255,0.18)" },
                  whileTap: { scale: 0.9 },
                  onClick: (e) => {
                    e.stopPropagation();
                    setOpen(false);
                  },
                  "aria-label": "Yopish",
                  style: {
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, strokeWidth: 2.4 })
                },
                "close"
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            layout: "position",
            variants: listVariants,
            initial: "hidden",
            animate: "show",
            exit: "exit",
            style: { position: "relative", display: "grid", gridTemplateColumns: "1fr", gap: 7, marginTop: 12 },
            children: [
              actions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { action: a, onSelect: onAction }, a.key)),
              hotkey && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  variants: itemVariants,
                  style: {
                    marginTop: 3,
                    padding: "0 6px",
                    textAlign: "center",
                    fontSize: 11.5,
                    lineHeight: 1.3,
                    color: "rgba(255,255,255,0.62)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "kbd",
                      {
                        style: {
                          fontFamily: "inherit",
                          fontSize: 10.5,
                          fontWeight: 600,
                          padding: "1px 5px",
                          borderRadius: 5,
                          border: "1px solid rgba(255,255,255,0.24)",
                          background: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.88)"
                        },
                        children: hotkeyText
                      }
                    ),
                    " ",
                    hotkeyIsCombo ? "tugmalari" : "tugmasi",
                    " bilan maskotni yopish va ochish mumkin"
                  ]
                }
              )
            ]
          },
          "actions"
        ) })
      ]
    }
  );
}
const NO_ACCOUNT = { userId: null, sessionToken: null, uiToken: null };
const BUDGET_MS = 6500;
let clientPromise = null;
function getClient() {
  if (!clientPromise) {
    const url = "https://hhpnhwfzovbttorprudl.supabase.co";
    const anonKey = "sb_publishable_U89tdM9Z213q1fWmx6jNUQ_TnoqX7Mf";
    clientPromise = __vitePreload(async () => {
      const { createClient } = await import("./index-DZI2mFQS.js");
      return { createClient };
    }, true ? [] : void 0, import.meta.url).then(
      ({ createClient }) => createClient(url, anonKey, {
        auth: { persistSession: true, autoRefreshToken: false, detectSessionInUrl: false }
      })
    );
    clientPromise.catch(() => {
      clientPromise = null;
    });
  }
  return clientPromise;
}
function within(work, ms, fallback) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(fallback), Math.max(0, ms));
    work.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        console.warn("[mascot] hisob tokenlari olinmadi:", err);
        resolve(fallback);
      }
    );
  });
}
async function readSession(client2) {
  for (let attempt = 0; attempt < 2; attempt++) {
    const { data, error } = await client2.auth.getSession();
    if (data.session) return data.session;
    if (!error) return null;
    console.warn("[mascot] sessiya o'qilmadi:", error.message);
  }
  return null;
}
async function collectLaunchExtras(nick) {
  const deadline = Date.now() + BUDGET_MS;
  const left = () => deadline - Date.now();
  const client2 = await within(getClient(), left(), null);
  if (!client2) return NO_ACCOUNT;
  const session = await within(readSession(client2), left(), null);
  if (!session) return NO_ACCOUNT;
  const uiToken = await within(requestUiLaunchToken(client2, nick), left(), null);
  return { userId: session.user.id, sessionToken: session.access_token, uiToken };
}
function MascotApp() {
  reactExports.useEffect(() => {
    const api = window.launcher?.mascot;
    if (!api?.onPrepareLaunch) return;
    return api.onPrepareLaunch(({ requestId, nick }) => {
      void collectLaunchExtras(nick).then((extras) => api.sendLaunchExtras({ requestId, ...extras }));
    });
  }, []);
  const [namesEnabled, setNamesEnabled] = reactExports.useState(false);
  const [plansEnabled, setPlansEnabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const focus = window.launcher?.focus;
    if (!focus) return;
    let cancelled = false;
    void focus.getState().then((res) => {
      if (!cancelled && res.ok && res.data) {
        setNamesEnabled(res.data.asmaulHusna);
        setPlansEnabled(res.data.plans);
      }
    });
    const offState = focus.onState((s) => {
      setNamesEnabled(s.asmaulHusna);
      setPlansEnabled(s.plans);
    });
    const offPrayer = focus.onPrayerSoon((r) => focus.showReminder(r.id));
    return () => {
      cancelled = true;
      offState();
      offPrayer();
    };
  }, []);
  const bridge = reactExports.useMemo(() => {
    const api = window.launcher?.mascot;
    if (!api) return void 0;
    return {
      setExpanded: async (expanded) => (await api.setExpanded(expanded)).data,
      dragStart: () => api.drag("start"),
      dragEnd: () => api.drag("end"),
      onTick: (cb) => api.onTick(cb),
      onFlight: (cb) => api.onFlight(cb),
      onBubble: (cb) => api.onBubble(cb),
      onBubbleSpace: (cb) => api.onBubbleSpace(cb),
      setBubbleRoom: async (room) => {
        await api.setBubbleRoom(room);
      },
      onVisibility: (cb) => api.onVisibility(cb),
      onHotkey: (cb) => api.onHotkey(cb),
      ready: () => api.ready(),
      launchGame: () => api.launchGame(),
      openLauncher: () => api.openLauncher(),
      cleanRam: () => api.cleanRam(),
      openFocus: (kind) => window.launcher?.focus?.open(kind)
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingMascot, { bridge, focusNames: namesEnabled, focusPlans: plansEnabled });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MascotApp, {}) })
);
