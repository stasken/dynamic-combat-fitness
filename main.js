// ---------- Nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const iosUrl = "https://apps.apple.com/be/app/myclubplanner/id1330009940";
const androidUrl = "https://play.google.com/store/apps/details?id=com.myclubplanner.app&pcampaignid=web_share";
const androidUrl2 = "https://play.google.com/store/apps/details?id=com.myclubplanner.app&hl=nl"

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

document.querySelectorAll('.bio-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);

    if (!target) return;

    const isVisible = target.classList.toggle('open');
    btn.textContent = isVisible ? 'Hide bio' : 'Read bio';
  });
});


// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Countdown: "Next class starts in Xh Ym" ----------
function getNextClass() {
  const rows = document.querySelectorAll('#scheduleTable tbody tr');
  const now = new Date();
  let best = null;

  rows.forEach(row => {
    const day = parseInt(row.dataset.day, 10); // 0 = Sunday
    const [h, m] = row.dataset.start.split(':').map(Number);
    const label = row.querySelector('.class-tag').textContent.trim();

    for (let add = 0; add < 8; add++) {
      const candidate = new Date(now);
      candidate.setDate(now.getDate() + add);
      candidate.setHours(h, m, 0, 0);

      if (candidate.getDay() === day && candidate > now) {
        if (!best || candidate < best.date) {
          best = { date: candidate, label };
        }
        break;
      }
    }
  });

  return best;
}

function updateCountdown() {
  const next = getNextClass();
  const timerEl = document.getElementById('countdownTimer');
  const nameEl = document.getElementById('nextClassName');

  if (!next) {
    timerEl.textContent = 'soon';
    return;
  }

  const diffMs = next.date - new Date();
  const hrs = Math.floor(diffMs / 3600000);
  const mins = Math.floor((diffMs % 3600000) / 60000);

  nameEl.textContent = next.label;
  timerEl.textContent = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}

function getMobileOS() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  return "other";
}

function openApp() {
  const os = getMobileOS();

  if (os === "android") {
    window.location.href = "myapp://open";

    setTimeout(() => {
      window.location.href = androidUrl;
    }, 1200);
  }

  else if (os === "ios") {
    window.location.href = "myapp://open";

    setTimeout(() => {
      window.location.href = iosUrl;
    }, 1200);
  }

  else {
    alert("Open this link on a mobile device to launch the app.");
  }
}


updateCountdown()