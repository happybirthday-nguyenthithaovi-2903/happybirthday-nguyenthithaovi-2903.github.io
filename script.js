/* ═══════════════════════════════════════
   STARS CANVAS
═══════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createStars(n) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 1.6 + 0.3,
        a:  Math.random(),
        da: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1)
      });
    }
  }
  createStars(220);

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // gradient bg
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,    '#0d0010');
    grad.addColorStop(0.45, '#1a0030');
    grad.addColorStop(1,    '#0d0020');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
})();


/* ═══════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════ */
(function () {
  const container = document.getElementById('particles');
  const colors = ['#d4af37', '#bda689', '#f8ecd1', '#aa8529', '#e0c98f', '#ffdf73', '#996515'];
  const shapes = ['●', '✦', '★', '✧', '♦', '✨'];

  function spawnParticle() {
    const el    = document.createElement('div');
    el.className = 'particle';
    const size  = Math.random() * 18 + 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const dur   = Math.random() * 10 + 8;
    const delay = Math.random() * 6;

    el.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      font-size: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      background: transparent;
    `;
    el.style.borderRadius    = '0';
    el.textContent           = shape;
    el.style.color           = color;
    el.style.display         = 'flex';
    el.style.alignItems      = 'center';
    el.style.justifyContent  = 'center';
    container.appendChild(el);

    setTimeout(() => el.remove(), (dur + delay) * 1000 + 500);
  }

  setInterval(spawnParticle, 600);
  for (let i = 0; i < 16; i++) spawnParticle();
})();


/* ═══════════════════════════════════════
   AGE + COUNTDOWN
═══════════════════════════════════════ */
(function () {
  const birthday = new Date(2000, 2, 29); // month 0-indexed → March
  const today    = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) age--;

  const ageNumEl  = document.getElementById('ageNum');
  const ageTextEl = document.getElementById('ageText');
  if (ageNumEl)  ageNumEl.textContent  = age;
  if (ageTextEl) ageTextEl.textContent = age;

  function updateCountdown() {
    const now  = new Date();
    let next   = new Date(now.getFullYear(), 2, 29);
    if (now >= next) next = new Date(now.getFullYear() + 1, 2, 29);

    const diff = next - now;
    const d    = Math.floor(diff / 86400000);
    const h    = Math.floor((diff % 86400000) / 3600000);
    const mn   = Math.floor((diff % 3600000) / 60000);
    const s    = Math.floor((diff % 60000) / 1000);
    const pad  = n => String(n).padStart(2, '0');

    const cdTitle = document.querySelector('.countdown-title');

    if (diff <= 0) {
      document.getElementById('cDays').textContent  = '🎂';
      document.getElementById('cHours').textContent = '🎉';
      document.getElementById('cMins').textContent  = '🌟';
      document.getElementById('cSecs').textContent  = '💛';
      if (cdTitle) cdTitle.textContent = '🎊 Hôm nay chính là sinh nhật của bạn! 🎊';
    } else {
      document.getElementById('cDays').textContent  = pad(d);
      document.getElementById('cHours').textContent = pad(h);
      document.getElementById('cMins').textContent  = pad(mn);
      document.getElementById('cSecs').textContent  = pad(s);
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();


/* ═══════════════════════════════════════
   CONFETTI ON CLICK
═══════════════════════════════════════ */
document.addEventListener('click', function (e) {
  if (e.target.closest('.gift-screen')) return; // Ignore if clicking on gift

  const colors = ['#d4af37', '#bda689', '#f8ecd1', '#aa8529', '#e0c98f', '#ffdf73'];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left           = e.clientX + 'px';
    el.style.top            = e.clientY + 'px';
    el.style.background     = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = Math.random() * 0.1 + 's';
    el.style.borderRadius   = Math.random() > 0.5 ? '50%' : '2px';
    
    // Set random translation paths
    const tx = (Math.random() - 0.5) * 150 + 'px';
    const ty = (Math.random() - 0.5) * 150 + 'px';
    el.style.setProperty('--tx', tx);
    el.style.setProperty('--ty', ty);
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
});


/* ═══════════════════════════════════════
   WEB AUDIO – BIRTHDAY MELODY
═══════════════════════════════════════ */
let audioCtx  = null;
let playing   = false;
let gainNode  = null;
let noteTimer = null;

/* Happy Birthday notes [frequency Hz, beat duration] */
const SONG = [
  [261.63, 0.5],  [261.63, 0.25], [293.66, 0.75], [261.63, 0.75], [349.23, 0.75], [329.63, 1.5],
  [261.63, 0.5],  [261.63, 0.25], [293.66, 0.75], [261.63, 0.75], [392.00, 0.75], [349.23, 1.5],
  [261.63, 0.5],  [261.63, 0.25], [523.25, 0.75], [440.00, 0.75], [349.23, 0.75], [329.63, 0.75], [293.66, 0.75],
  [466.16, 0.5],  [466.16, 0.25], [440.00, 0.75], [349.23, 0.75], [392.00, 0.75], [349.23, 1.5]
];

function playNote(freq, dur, when, vol) {
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, when);
  gain.gain.setValueAtTime(vol, when);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + dur * 0.9);
  osc.connect(gain);
  gain.connect(gainNode);
  osc.start(when);
  osc.stop(when + dur);
}

function playMelody() {
  if (!audioCtx) return;
  let when     = audioCtx.currentTime + 0.05;
  const BPM    = 100;
  const beat   = 60 / BPM;

  function scheduleBatch(start) {
    for (const [freq, beats] of SONG) {
      playNote(freq, beats * beat * 0.95, start, 0.35);
      start += beats * beat;
    }
    return start;
  }

  const end = scheduleBatch(when);
  if (playing) {
    noteTimer = setTimeout(() => { if (playing) playMelody(); },
      (end - audioCtx.currentTime) * 1000 - 200);
  }
}

function toggleMusic() {
  const btn = document.getElementById('musicBtn');

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    gainNode.connect(audioCtx.destination);
  }

  if (!playing) {
    playing          = true;
    btn.textContent  = '⏸ Tạm dừng';
    playMelody();
  } else {
    playing = false;
    clearTimeout(noteTimer);
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
    setTimeout(() => {
      if (!playing) {
        audioCtx.close();
        audioCtx = null;
        gainNode  = null;
      }
    }, 500);
    btn.textContent = '🎵 Phát nhạc sinh nhật';
  }
}

/* ═══════════════════════════════════════
   GIFT OPENING
═══════════════════════════════════════ */
function openGift() {
  const giftBox = document.querySelector('.gift-box');
  if (giftBox.classList.contains('open')) return;
  
  giftBox.classList.add('open');

  // Trigger grand confetti
  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = ['#d4af37', '#bda689', '#f8ecd1', '#aa8529', '#e0c98f', '#ffdf73', '#ffffff', '#ff6b6b'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left           = centerX + 'px';
    el.style.top            = centerY + 'px';
    el.style.background     = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = Math.random() * 0.2 + 's';
    el.style.borderRadius   = Math.random() > 0.5 ? '50%' : '3px';
    el.style.zIndex         = '10001';
    
    // Much larger spread for gift open
    const tx = (Math.random() - 0.5) * 350 + 'px';
    const ty = (Math.random() - 0.5) * 350 + 'px';
    el.style.setProperty('--tx', tx);
    el.style.setProperty('--ty', ty);
    
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }

  setTimeout(() => {
    document.getElementById('gift-screen').classList.add('hidden');
    
    // Show main content
    const wrapper = document.getElementById('main-wrapper');
    wrapper.style.opacity = '1';
    wrapper.style.transform = 'scale(1)';
    wrapper.style.pointerEvents = 'auto';
    
    // Auto-play music since the user interacted with the page
    if (!playing && typeof toggleMusic === 'function') {
      toggleMusic();
    }
  }, 1200);
}
