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
};

const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");
const colon = document.getElementById("colon");
const timer = document.getElementById("timer");
const dateContainer = document.getElementById("date");

function applySettings() {
  document.documentElement.style.setProperty(
    "--digit-height",
    `${settings.digitHeight}px`
  );
  document.documentElement.style.setProperty(
    "--digit-spacing",
    `${settings.digitSpacing}px`
  );
  document.documentElement.style.setProperty(
    "--small-height",
    `${settings.smallHeight}px`
  );
  document.documentElement.style.setProperty(
    "--small-spacing",
    `${settings.smallSpacing}px`
  );
  document.documentElement.style.setProperty(
    "--small-space-width",
    `${settings.smallSpaceWidth}px`
  );
  document.documentElement.style.setProperty(
    "--bg-offset-x",
    `${settings.bgOffsetX}px`
  );
  document.documentElement.style.setProperty(
    "--bg-offset-y",
    `${settings.bgOffsetY}px`
  );

  schedulePositionTimer();
  schedulePositionDate();
}

let positionRaf = null;

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

  const left = Math.round(settings.posX - width / 2);
  const top = Math.round(settings.posY - settings.digitHeight / 2);

  timer.style.left = `${left}px`;
  timer.style.top = `${top}px`;
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

  const timerTop = Math.round(settings.posY - settings.digitHeight / 2);
  const timerBottom = timerTop + settings.digitHeight;
  const left = Math.round(settings.posX + settings.dateOffsetX - width / 2);
  const top = Math.round(timerBottom + settings.dateOffsetY);

  dateContainer.style.left = `${left}px`;
  dateContainer.style.top = `${top}px`;
}

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

  h1.src = DIGIT_PATHS[hours[0]];
  h2.src = DIGIT_PATHS[hours[1]];
  m1.src = DIGIT_PATHS[minutes[0]];
  m2.src = DIGIT_PATHS[minutes[1]];

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

function scheduleUpdates() {
  updateTimer();
  updateDate();

  const now = new Date();
  const msToNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateTimer();
    updateDate();
    setInterval(() => {
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
    if (blinkTimerId !== null) {
      clearInterval(blinkTimerId);
      blinkTimerId = null;
    }
    return;
  }

  let visible = true;
  colon.style.visibility = "visible";

  if (blinkTimerId !== null) {
    clearInterval(blinkTimerId);
  }

  blinkTimerId = setInterval(() => {
    visible = !visible;
    colon.style.visibility = visible ? "visible" : "hidden";
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

    applySettings();
    updateTimer();
    updateDate();
    startColonBlink();
  },
};

applySettings();
scheduleUpdates();
startColonBlink();

[h1, h2, m1, m2, colon].forEach((img) => {
  img.addEventListener("load", schedulePositionTimer);
});

window.addEventListener("resize", schedulePositionTimer);
window.addEventListener("resize", schedulePositionDate);
