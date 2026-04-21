const DIGIT_PATHS = {
  0: "assets/digits/0.png",
  1: "assets/digits/1.png",
  2: "assets/digits/2.png",
  3: "assets/digits/3.png",
  4: "assets/digits/4.png",
  5: "assets/digits/5.png",
  6: "assets/digits/6.png",
  7: "assets/digits/7.png",
  8: "assets/digits/8.png",
  9: "assets/digits/9.png",
};

const SMALL_DIGIT_PATHS = {
  0: "assets/small_digits/0.png",
  1: "assets/small_digits/1.png",
  2: "assets/small_digits/2.png",
  3: "assets/small_digits/3.png",
  4: "assets/small_digits/4.png",
  5: "assets/small_digits/5.png",
  6: "assets/small_digits/6.png",
  7: "assets/small_digits/7.png",
  8: "assets/small_digits/8.png",
  9: "assets/small_digits/9.png",
};

const SMALL_LETTER_PATHS = {
  A: "assets/small_upper_case_letters/A.png",
  B: "assets/small_upper_case_letters/B.png",
  C: "assets/small_upper_case_letters/C.png",
  D: "assets/small_upper_case_letters/D.png",
  E: "assets/small_upper_case_letters/E.png",
  F: "assets/small_upper_case_letters/F.png",
  G: "assets/small_upper_case_letters/G.png",
  H: "assets/small_upper_case_letters/H.png",
  I: "assets/small_upper_case_letters/I.png",
  J: "assets/small_upper_case_letters/J.png",
  K: "assets/small_upper_case_letters/K.png",
  L: "assets/small_upper_case_letters/L.png",
  M: "assets/small_upper_case_letters/M.png",
  N: "assets/small_upper_case_letters/N.png",
  O: "assets/small_upper_case_letters/O.png",
  P: "assets/small_upper_case_letters/P.png",
  Q: "assets/small_upper_case_letters/Q.png",
  R: "assets/small_upper_case_letters/R.png",
  S: "assets/small_upper_case_letters/S.png",
  T: "assets/small_upper_case_letters/T.png",
  U: "assets/small_upper_case_letters/U.png",
  V: "assets/small_upper_case_letters/V.png",
  W: "assets/small_upper_case_letters/W.png",
  X: "assets/small_upper_case_letters/X.png",
  Y: "assets/small_upper_case_letters/Y.png",
  Z: "assets/small_upper_case_letters/Z.png",
};

const BAR_PATHS = {
  1: "assets/spectrum_bars/1.png",
  2: "assets/spectrum_bars/2.png",
  3: "assets/spectrum_bars/3.png",
  4: "assets/spectrum_bars/4.png",
  5: "assets/spectrum_bars/5.png",
  6: "assets/spectrum_bars/6.png",
  7: "assets/spectrum_bars/7.png",
};

const EQ_BARS_PER_SIDE = 12;
const EQ_TOTAL_BARS = EQ_BARS_PER_SIDE * 2;
const EQ_LEVELS = 7;

const WEEKDAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const BASE_VIEWPORT_WIDTH = 3440;
const BASE_VIEWPORT_HEIGHT = 1440;

const settings = {
  digitHeight: 47*1440/765, //47
  digitSpacing: 12,
  posX: 3440/2,
  posY: 400,
  smallHeight: 21*1440/765,
  smallSpacing: 2,
  smallSpaceWidth: 6,
  dateOffsetX: 0,
  dateOffsetY: 16,
  bgOffsetX: 84,
  bgOffsetY: 0,
  blinkIntervalMs: 600,
  timeFormat24: true,
  useLocalTime: true,
  timeZoneOffsetHours: 0,
  showSeconds: false,
  showEqualizer: true,
  eqBarSpacing: 1,
  eqOffsetX: 67,
  eqOffsetY: 40,
  eqSensitivity: 2,
};

const background = document.getElementById("background");
const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");
const colon = document.getElementById("colon");
const colon2 = document.getElementById("colon2");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
const timer = document.getElementById("timer");
const dateContainer = document.getElementById("date");
const eqLeft = document.getElementById("eq-left");
const eqRight = document.getElementById("eq-right");
const eqLeftBars = eqLeft ? Array.from(eqLeft.querySelectorAll(".eq-bar")) : [];
const eqRightBars = eqRight ? Array.from(eqRight.querySelectorAll(".eq-bar")) : [];

function getLayoutScale() {
  return window.innerHeight / BASE_VIEWPORT_HEIGHT;
}

function getScaledValue(value) {
  return value * getLayoutScale();
}

function getScaledCenterX() {
  return window.innerWidth / 2;
}

function getScaledPosX() {
  const baseCenterX = BASE_VIEWPORT_WIDTH / 2;
  return getScaledCenterX() + (settings.posX - baseCenterX) * getLayoutScale();
}

function getScaledPosY() {
  return settings.posY * getLayoutScale();
}

function applySettings() {
  document.documentElement.style.setProperty(
    "--digit-height",
    `${Math.round(getScaledValue(settings.digitHeight))}px`
  );
  document.documentElement.style.setProperty(
    "--digit-spacing",
    `${Math.round(getScaledValue(settings.digitSpacing))}px`
  );
  document.documentElement.style.setProperty(
    "--small-height",
    `${Math.round(getScaledValue(settings.smallHeight))}px`
  );
  document.documentElement.style.setProperty(
    "--small-spacing",
    `${Math.round(getScaledValue(settings.smallSpacing))}px`
  );
  document.documentElement.style.setProperty(
    "--small-space-width",
    `${Math.round(getScaledValue(settings.smallSpaceWidth))}px`
  );
  document.documentElement.style.setProperty(
    "--eq-bar-spacing",
    `${Math.round(getScaledValue(settings.eqBarSpacing))}px`
  );

  const eqHeight = `${Math.round(getScaledValue(settings.digitHeight))}px`;
  if (eqLeft) {
    eqLeft.style.display = settings.showEqualizer ? "flex" : "none";
    eqLeft.style.height = eqHeight;
  }
  if (eqRight) {
    eqRight.style.display = settings.showEqualizer ? "flex" : "none";
    eqRight.style.height = eqHeight;
  }

  schedulePositionBackground();
  schedulePositionTimer();
  schedulePositionDate();
  schedulePositionEq();
}

let positionRaf = null;
let backgroundRaf = null;

function schedulePositionTimer() {
  if (positionRaf !== null) {
    cancelAnimationFrame(positionRaf);
  }

  positionRaf = requestAnimationFrame(() => {
    positionRaf = null;
    positionTimer();
  });
}

function positionTimer() {
  const width = timer.getBoundingClientRect().width;
  if (!width) {
    schedulePositionTimer();
    return;
  }

  const scaledPosX = getScaledPosX();
  const scaledPosY = getScaledPosY();
  const scaledDigitHeight = getScaledValue(settings.digitHeight);
  const left = Math.round(scaledPosX - width / 2);
  const top = Math.round(scaledPosY - scaledDigitHeight / 2);

  timer.style.left = `${left}px`;
  timer.style.top = `${top}px`;
}

function schedulePositionBackground() {
  if (!background) {
    return;
  }

  if (backgroundRaf !== null) {
    cancelAnimationFrame(backgroundRaf);
  }

  backgroundRaf = requestAnimationFrame(() => {
    backgroundRaf = null;
    positionBackground();
  });
}

function positionBackground() {
  if (!background) {
    return;
  }

  const naturalWidth = background.naturalWidth;
  const naturalHeight = background.naturalHeight;
  if (!naturalWidth || !naturalHeight) {
    schedulePositionBackground();
    return;
  }

  const scale = window.innerHeight / naturalHeight;
  const layoutScale = getLayoutScale();
  const scaledWidth = Math.round(naturalWidth * scale);
  const scaledHeight = Math.round(naturalHeight * scale);
  const left = Math.round(
    (window.innerWidth - scaledWidth) / 2 + settings.bgOffsetX * layoutScale
  );
  const top = Math.round(
    (window.innerHeight - scaledHeight) / 2 + settings.bgOffsetY * layoutScale
  );

  background.style.width = `${scaledWidth}px`;
  background.style.height = `${scaledHeight}px`;
  background.style.left = `${left}px`;
  background.style.top = `${top}px`;
}

let datePositionRaf = null;

function schedulePositionDate() {
  if (datePositionRaf !== null) {
    cancelAnimationFrame(datePositionRaf);
  }

  datePositionRaf = requestAnimationFrame(() => {
    datePositionRaf = null;
    positionDate();
  });
}

function positionDate() {
  if (!dateContainer) {
    return;
  }

  const width = dateContainer.getBoundingClientRect().width;
  if (!width) {
    schedulePositionDate();
    return;
  }

  const scaledPosX = getScaledPosX();
  const scaledPosY = getScaledPosY();
  const scaledDigitHeight = getScaledValue(settings.digitHeight);
  const scaledDateOffsetX = getScaledValue(settings.dateOffsetX);
  const scaledDateOffsetY = getScaledValue(settings.dateOffsetY);
  const timerTop = Math.round(scaledPosY - scaledDigitHeight / 2);
  const timerBottom = timerTop + scaledDigitHeight;
  const left = Math.round(scaledPosX + scaledDateOffsetX - width / 2);
  const top = Math.round(timerBottom + scaledDateOffsetY);

  dateContainer.style.left = `${left}px`;
  dateContainer.style.top = `${top}px`;
}

let eqRaf = null;

function schedulePositionEq() {
  if (eqRaf !== null) {
    cancelAnimationFrame(eqRaf);
  }
  eqRaf = requestAnimationFrame(() => {
    eqRaf = null;
    positionEq();
  });
}

function positionEq() {
  if (!eqLeft || !eqRight || !settings.showEqualizer) {
    return;
  }

  const scaledPosX = getScaledPosX();
  const scaledPosY = getScaledPosY();
  const scaledDigitHeight = getScaledValue(settings.digitHeight);
  const scaledDateOffsetY = getScaledValue(settings.dateOffsetY);
  const scaledEqOffsetX = getScaledValue(settings.eqOffsetX);
  const scaledEqOffsetY = getScaledValue(settings.eqOffsetY);

  const timerTop = Math.round(scaledPosY - scaledDigitHeight / 2);
  const timerBottom = timerTop + scaledDigitHeight;
  const dateTop = Math.round(timerBottom + scaledDateOffsetY);
  const eqBottom = Math.round(dateTop + scaledEqOffsetY);
  const eqTop = Math.round(eqBottom - scaledDigitHeight);

  const timerWidth = timer.getBoundingClientRect().width;
  const timerLeft = Math.round(scaledPosX - timerWidth / 2);
  const timerRight = timerLeft + timerWidth;

  const leftGroupWidth = eqLeft.getBoundingClientRect().width;
  eqLeft.style.left = `${Math.round(timerLeft - scaledEqOffsetX - leftGroupWidth)}px`;
  eqLeft.style.top = `${eqTop}px`;

  eqRight.style.left = `${Math.round(timerRight + scaledEqOffsetX)}px`;
  eqRight.style.top = `${eqTop}px`;
}

const EQ_DECAY = 0.85;
const PEAK_DECAY = 0.97;
const smoothLevels = new Array(EQ_TOTAL_BARS).fill(0);
const currentDisplayLevel = new Array(EQ_TOTAL_BARS).fill(1);
let runningPeak = 0;

function amplitudeToSmooth(raw, prev) {
  const amplified = raw * settings.eqSensitivity;
  const clamped = Math.max(0, Math.min(1, amplified));
  return clamped > prev ? clamped : prev * EQ_DECAY;
}

function smoothToLevel(value) {
  if (value <= 0.01) return 1;
  const level = Math.ceil(value * EQ_LEVELS);
  return Math.min(EQ_LEVELS, Math.max(1, level));
}

function updateEqBars() {
  for (let i = 0; i < EQ_TOTAL_BARS; i++) {
    const level = smoothToLevel(smoothLevels[i]);
    if (level === currentDisplayLevel[i]) continue;

    currentDisplayLevel[i] = level;
    if (i < EQ_BARS_PER_SIDE) {
      if (eqLeftBars[i]) {
        eqLeftBars[i].src = BAR_PATHS[level];
      }
    } else {
      const ri = i - EQ_BARS_PER_SIDE;
      if (eqRightBars[ri]) {
        eqRightBars[ri].src = BAR_PATHS[level];
      }
    }
  }
}

const PINK_NOISE = [
  1.176,0.852,0.688,0.638,0.545,0.507,0.468,0.442,0.420,0.415,0.413,0.406,
  0.399,0.382,0.383,0.375,0.366,0.376,0.398,0.394,0.379,0.394,0.385,0.391,
  0.381,0.402,0.402,0.400,0.398,0.511,0.662,0.663,0.742,0.746,0.848,0.857,
  0.964,0.998,1.063,1.106,1.182,1.257,1.323,1.374,1.495,1.531,1.619,1.709,
  1.771,1.849,1.924,2.014,2.079,2.158,2.220,2.266,2.321,2.357,2.399,2.404,
  2.428,2.392,2.403,2.361
];

let audioListenerRegistered = false;
let lastAudioCallbackTime = 0;
const AUDIO_HEALTH_INTERVAL = 5000;
const AUDIO_STALE_THRESHOLD = 3000;

function initAudioListener() {
  if (audioListenerRegistered) {
    return;
  }

  if (!window.wallpaperRegisterAudioListener) {
    setTimeout(initAudioListener, 500);
    return;
  }

  audioListenerRegistered = true;

  window.wallpaperRegisterAudioListener((audioArray) => {
    lastAudioCallbackTime = Date.now();

    if (!settings.showEqualizer) {
      return;
    }

    const NOISE_FLOOR = 0.0005;

    let framePeak = 0;
    for (let i = 0; i < audioArray.length; i++) {
      if (audioArray[i] > framePeak) {
        framePeak = audioArray[i];
      }
    }

    if (framePeak > runningPeak) {
      runningPeak = framePeak;
    } else {
      runningPeak = runningPeak * PEAK_DECAY;
    }

    if (runningPeak < NOISE_FLOOR) {
      for (let i = 0; i < EQ_TOTAL_BARS; i++) {
        smoothLevels[i] = smoothLevels[i] * EQ_DECAY;
      }
      updateEqBars();
      return;
    }

    const merged = new Array(64);
    for (let i = 0; i < 64; i++) {
      merged[i] = ((audioArray[i] + audioArray[64 + i]) / 2) / PINK_NOISE[i];
    }

    const normFactor = 1 / runningPeak;
    const binsPerBar = Math.floor(64 / EQ_TOTAL_BARS);

    for (let i = 0; i < EQ_TOTAL_BARS; i++) {
      const start = i * binsPerBar;
      const end = (i === EQ_TOTAL_BARS - 1) ? 64 : start + binsPerBar;
      const count = end - start;

      let sum = 0;
      for (let j = start; j < end; j++) {
        sum += merged[j];
      }

      const norm = (sum / count) * normFactor;
      smoothLevels[i] = amplitudeToSmooth(norm, smoothLevels[i]);
    }

    updateEqBars();
  });
}

function resetAudioState() {
  for (let i = 0; i < EQ_TOTAL_BARS; i++) {
    smoothLevels[i] = 0;
    currentDisplayLevel[i] = 1;
  }
  runningPeak = 0;
  eqLeftBars.forEach((bar) => { bar.src = BAR_PATHS[1]; });
  eqRightBars.forEach((bar) => { bar.src = BAR_PATHS[1]; });
}

function tryReRegisterAudio() {
  audioListenerRegistered = false;
  initAudioListener();
}

setInterval(() => {
  if (!audioListenerRegistered || !settings.showEqualizer) {
    return;
  }
  if (lastAudioCallbackTime > 0 && Date.now() - lastAudioCallbackTime > AUDIO_STALE_THRESHOLD) {
    resetAudioState();
    tryReRegisterAudio();
  }
}, AUDIO_HEALTH_INTERVAL);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    resetAudioState();
    if (!audioListenerRegistered) {
      initAudioListener();
    }
  }
});

eqLeftBars.forEach((bar) => { bar.src = BAR_PATHS[1]; });
eqRightBars.forEach((bar) => { bar.src = BAR_PATHS[1]; });

function getCurrentDate() {
  if (settings.useLocalTime) {
    return new Date();
  }

  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const offsetMs = settings.timeZoneOffsetHours * 60 * 60 * 1000;
  return new Date(utcMs + offsetMs);
}

function updateTimer() {
  const now = getCurrentDate();
  let hoursValue = now.getHours();
  if (!settings.timeFormat24) {
    hoursValue %= 12;
    if (hoursValue === 0) {
      hoursValue = 12;
    }
  }

  const hours = hoursValue.toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  h1.src = DIGIT_PATHS[hours[0]];
  h2.src = DIGIT_PATHS[hours[1]];
  m1.src = DIGIT_PATHS[minutes[0]];
  m2.src = DIGIT_PATHS[minutes[1]];

  if (settings.showSeconds) {
    if (colon2) {
      colon2.style.display = "";
    }
    if (s1) {
      s1.style.display = "";
      s1.src = DIGIT_PATHS[seconds[0]];
    }
    if (s2) {
      s2.style.display = "";
      s2.src = DIGIT_PATHS[seconds[1]];
    }
  } else {
    if (colon2) {
      colon2.style.display = "none";
    }
    if (s1) {
      s1.style.display = "none";
    }
    if (s2) {
      s2.style.display = "none";
    }
  }

  schedulePositionTimer();
}

function updateDate() {
  if (!dateContainer) {
    return;
  }

  const now = getCurrentDate();
  const weekday = WEEKDAYS[now.getDay()];
  const month = MONTHS[now.getMonth()];
  const day = now.getDate().toString().padStart(2, "0");
  const text = `${weekday} ${month} ${day}`;

  dateContainer.textContent = "";

  for (const rawChar of text) {
    if (rawChar === " ") {
      const spacer = document.createElement("span");
      spacer.className = "space";
      dateContainer.appendChild(spacer);
      continue;
    }

    const char = rawChar.toUpperCase();
    const isDigit = char >= "0" && char <= "9";
    const isLetter = char >= "A" && char <= "Z";

    if (!isDigit && !isLetter) {
      continue;
    }

    const img = document.createElement("img");
    img.className = "small-glyph";
    img.alt = char;
    img.src = isDigit ? SMALL_DIGIT_PATHS[char] : SMALL_LETTER_PATHS[char];
    img.addEventListener("load", schedulePositionDate);
    dateContainer.appendChild(img);
  }

  schedulePositionDate();
}

let updateTimeoutId = null;
let updateIntervalId = null;

function clearUpdateTimers() {
  if (updateTimeoutId !== null) {
    clearTimeout(updateTimeoutId);
    updateTimeoutId = null;
  }
  if (updateIntervalId !== null) {
    clearInterval(updateIntervalId);
    updateIntervalId = null;
  }
}

function scheduleUpdates() {
  clearUpdateTimers();

  updateTimer();
  updateDate();

  const now = getCurrentDate();
  if (settings.showSeconds) {
    const msToNextSecond = 1000 - now.getMilliseconds();
    updateTimeoutId = setTimeout(() => {
      updateTimer();
      if (getCurrentDate().getSeconds() === 0) {
        updateDate();
      }
      updateIntervalId = setInterval(() => {
        updateTimer();
        if (getCurrentDate().getSeconds() === 0) {
          updateDate();
        }
      }, 1000);
    }, msToNextSecond);
    return;
  }

  const msToNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  updateTimeoutId = setTimeout(() => {
    updateTimer();
    updateDate();
    updateIntervalId = setInterval(() => {
      updateTimer();
      updateDate();
    }, 60 * 1000);
  }, msToNextMinute);
}

let blinkTimerId = null;

function startColonBlink() {
  if (!colon) {
    return;
  }

  if (settings.blinkIntervalMs <= 0) {
    colon.style.visibility = "visible";
    if (colon2) {
      colon2.style.visibility = "visible";
    }
    if (blinkTimerId !== null) {
      clearInterval(blinkTimerId);
      blinkTimerId = null;
    }
    return;
  }

  let visible = true;
  colon.style.visibility = "visible";
  if (colon2) {
    colon2.style.visibility = "visible";
  }

  if (blinkTimerId !== null) {
    clearInterval(blinkTimerId);
  }

  blinkTimerId = setInterval(() => {
    visible = !visible;
    colon.style.visibility = visible ? "visible" : "hidden";
    if (colon2) {
      colon2.style.visibility = visible ? "visible" : "hidden";
    }
  }, settings.blinkIntervalMs);
}

window.wallpaperPropertyListener = {
  applyUserProperties: (properties) => {
    if (properties.digitHeight) {
      settings.digitHeight = Math.max(1, properties.digitHeight.value);
    }
    if (properties.digitSpacing) {
      settings.digitSpacing = Math.max(0, properties.digitSpacing.value);
    }
    if (properties.posX) {
      settings.posX = properties.posX.value;
    }
    if (properties.posY) {
      settings.posY = properties.posY.value;
    }
    if (properties.smallHeight) {
      settings.smallHeight = Math.max(1, properties.smallHeight.value);
    }
    if (properties.smallSpacing) {
      settings.smallSpacing = Math.max(0, properties.smallSpacing.value);
    }
    if (properties.smallSpaceWidth) {
      settings.smallSpaceWidth = Math.max(0, properties.smallSpaceWidth.value);
    }
    if (properties.dateOffsetX) {
      settings.dateOffsetX = properties.dateOffsetX.value;
    }
    if (properties.dateOffsetY) {
      settings.dateOffsetY = properties.dateOffsetY.value;
    }
    if (properties.bgOffsetX) {
      settings.bgOffsetX = properties.bgOffsetX.value;
    }
    if (properties.bgOffsetY) {
      settings.bgOffsetY = properties.bgOffsetY.value;
    }
    if (properties.blinkIntervalMs) {
      settings.blinkIntervalMs = Math.max(0, properties.blinkIntervalMs.value);
    }
    if (properties.timeFormat24) {
      settings.timeFormat24 = properties.timeFormat24.value;
    }
    if (properties.useLocalTime) {
      settings.useLocalTime = properties.useLocalTime.value;
    }
    if (properties.timeZoneOffsetHours) {
      settings.timeZoneOffsetHours = properties.timeZoneOffsetHours.value;
    }
    if (properties.showSeconds) {
      settings.showSeconds = properties.showSeconds.value;
    }
    if (properties.showEqualizer) {
      settings.showEqualizer = properties.showEqualizer.value;
    }
    if (properties.eqBarSpacing) {
      settings.eqBarSpacing = Math.max(0, properties.eqBarSpacing.value);
    }
    if (properties.eqOffsetX) {
      settings.eqOffsetX = properties.eqOffsetX.value;
    }
    if (properties.eqOffsetY) {
      settings.eqOffsetY = properties.eqOffsetY.value;
    }
    if (properties.eqSensitivity) {
      settings.eqSensitivity = Math.max(1, properties.eqSensitivity.value);
    }

    applySettings();
    updateTimer();
    updateDate();
    startColonBlink();
    scheduleUpdates();
  },
};

applySettings();
scheduleUpdates();
startColonBlink();
initAudioListener();

[h1, h2, m1, m2, colon, colon2, s1, s2].forEach((img) => {
  if (!img) {
    return;
  }
  img.addEventListener("load", schedulePositionTimer);
});

if (background) {
  background.addEventListener("load", schedulePositionBackground);
}

window.addEventListener("resize", schedulePositionTimer);
window.addEventListener("resize", schedulePositionDate);
window.addEventListener("resize", schedulePositionBackground);
window.addEventListener("resize", schedulePositionEq);
