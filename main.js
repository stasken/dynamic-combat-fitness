// ---------- Nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

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
  console.log("xx")
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

updateCountdown()