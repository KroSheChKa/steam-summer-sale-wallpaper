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

const settings = {
  digitWidth: 40*1440/765, //40
  digitHeight: 47*1440/765, //47
  digitSpacing: 4,
  posX: 3440/2,
  posY: 435,
  bgOffsetX: 84,
  bgOffsetY: 0,
  blinkIntervalMs: 600,
};

const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");
const colon = document.getElementById("colon");
const timer = document.getElementById("timer");

function applySettings() {
  document.documentElement.style.setProperty(
    "--digit-width",
    `${settings.digitWidth}px`
  );
  document.documentElement.style.setProperty(
    "--digit-height",
    `${settings.digitHeight}px`
  );
  document.documentElement.style.setProperty(
    "--digit-spacing",
    `${settings.digitSpacing}px`
  );
  document.documentElement.style.setProperty(
    "--bg-offset-x",
    `${settings.bgOffsetX}px`
  );
  document.documentElement.style.setProperty(
    "--bg-offset-y",
    `${settings.bgOffsetY}px`
  );

  positionTimer();
}

function positionTimer() {
  const totalWidth = settings.digitWidth * 5 + settings.digitSpacing * 4;
  const left = Math.round(settings.posX - totalWidth / 2);
  const top = Math.round(settings.posY - settings.digitHeight / 2);

  timer.style.left = `${left}px`;
  timer.style.top = `${top}px`;
}

function updateTimer() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  h1.src = DIGIT_PATHS[hours[0]];
  h2.src = DIGIT_PATHS[hours[1]];
  m1.src = DIGIT_PATHS[minutes[0]];
  m2.src = DIGIT_PATHS[minutes[1]];
}

function scheduleUpdates() {
  updateTimer();

  const now = new Date();
  const msToNextMinute =
    (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateTimer();
    setInterval(updateTimer, 60 * 1000);
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
    if (properties.digitWidth) {
      settings.digitWidth = Math.max(1, properties.digitWidth.value);
    }
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
    if (properties.bgOffsetX) {
      settings.bgOffsetX = properties.bgOffsetX.value;
    }
    if (properties.bgOffsetY) {
      settings.bgOffsetY = properties.bgOffsetY.value;
    }
    if (properties.blinkIntervalMs) {
      settings.blinkIntervalMs = Math.max(0, properties.blinkIntervalMs.value);
    }

    applySettings();
    startColonBlink();
  },
};

applySettings();
scheduleUpdates();
startColonBlink();
