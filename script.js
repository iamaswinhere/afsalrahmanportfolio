/**
 * AFSAL RAHMAN — MINIMAL PORTFOLIO SCRIPT
 * Refined Micro-Interactions, Ambient Canvas, Smooth Scroll Physics & Command Deck
 */

document.addEventListener('DOMContentLoaded', () => {

  // Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 1. REFINED WEB AUDIO SYNTHESIZER (SUBTLE MICRO-SOUNDS)
  // =========================================================================
  class MinimalAudioEngine {
    constructor() {
      this.enabled = false;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.init();
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playHover() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
      } catch (e) {}
    }

    playClick() {
      if (!this.enabled || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
      } catch (e) {}
    }
  }

  const audio = new MinimalAudioEngine();
  const audioToggle = document.getElementById('audioToggle');

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      const active = audio.toggle();
      const stateLabel = audioToggle.querySelector('.audio-state');
      if (active) {
        audioToggle.classList.add('audio-active');
        stateLabel.textContent = 'Audio On';
        audio.playClick();
        showToast('Subtle audio cues activated');
      } else {
        audioToggle.classList.remove('audio-active');
        stateLabel.textContent = 'Audio Off';
        showToast('Audio muted');
      }
    });
  }

  // Bind sound triggers
  document.querySelectorAll('[data-sound]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (el.getAttribute('data-sound') === 'hover') {
        audio.playHover();
      }
    });
    el.addEventListener('click', () => {
      audio.playClick();
    });
  });

  // =========================================================================
  // 2. SUBTLE AMBIENT CANVAS PARTICLES
  // =========================================================================
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 22000), 50);
    const mouse = { x: -1000, y: -1000, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    class MinimalParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.6 + 0.6;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.4 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new MinimalParticle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        particles[a].update();
        particles[a].draw();
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // =========================================================================
  // 3. MINIMAL CURSOR
  // =========================================================================
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    function loopCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    const hoverables = document.querySelectorAll('a, button, input, textarea, select, .filter-tab, .quick-chip, [data-tilt]');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-active'));
    });
  }

  // =========================================================================
  // 4. SUBTLE 3D CARD TILT
  // =========================================================================
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)`;
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  // =========================================================================
  // 5. SUBTITLE TYPING LOOP
  // =========================================================================
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const roles = [
      'Social Media Marketing Strategist',
      'High-Impact Content Creator',
      'Short-Form Video & Reels Ideator',
      'SEO & Google Analytics Specialist',
      'BSc Computer Science Analytical Thinker'
    ];
    let rIdx = 0;
    let cIdx = 0;
    let deleting = false;
    let speed = 75;

    function tick() {
      const target = roles[rIdx];
      if (deleting) {
        typingEl.textContent = target.substring(0, cIdx - 1);
        cIdx--;
        speed = 30;
      } else {
        typingEl.textContent = target.substring(0, cIdx + 1);
        cIdx++;
        speed = 75;
      }

      if (!deleting && cIdx === target.length) {
        speed = 2000;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
        speed = 300;
      }
      setTimeout(tick, speed);
    }
    tick();
  }

  // =========================================================================
  // 6. SCROLL PROGRESS & REVEALS
  // =========================================================================
  const header = document.getElementById('siteHeader');
  const scrollProg = document.getElementById('scrollProgress');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const top = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (top / height) * 100;

    if (header) {
      if (top > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    if (scrollProg) {
      scrollProg.style.width = `${progress}%`;
    }

    // Scrollspy
    let activeSec = '';
    sections.forEach(sec => {
      const sTop = sec.offsetTop - 160;
      if (top >= sTop) {
        activeSec = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${activeSec}`) {
        item.classList.add('active');
      }
    });
  });

  // Intersection Observer
  const reveals = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        if (entry.target.id === 'skillsGrid' || entry.target.classList.contains('minimal-skills-grid')) {
          entry.target.classList.add('in-view');
        }

        const metrics = entry.target.querySelectorAll('.metric-number');
        metrics.forEach(m => animateNumber(m));

        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(r => observer.observe(r));

  function animateNumber(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    let start = performance.now();
    const duration = 1400;
    const isDec = target % 1 !== 0;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;

      if (isDec) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  // =========================================================================
  // 7. SKILLS FILTERING
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-pill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 8. MINIMAL COMMAND DECK (CLI)
  // =========================================================================
  const termInput = document.getElementById('terminalInput');
  const termHistory = document.getElementById('terminalHistory');
  const termScreen = document.getElementById('terminalScreen');
  const quickChips = document.querySelectorAll('.quick-chip');

  const commandResponses = {
    help: `
      <div class="deck-line cyan">Available Commands:</div>
      <div class="deck-line muted">&nbsp;&nbsp;· <strong>about</strong> — Background overview &amp; degree</div>
      <div class="deck-line muted">&nbsp;&nbsp;· <strong>experience</strong> — Commercial experience (Garvo Clothing &amp; H&amp;H)</div>
      <div class="deck-line muted">&nbsp;&nbsp;· <strong>skills</strong> — Marketing, SEO &amp; analytics competencies</div>
      <div class="deck-line muted">&nbsp;&nbsp;· <strong>contact</strong> — Email, LinkedIn and availability</div>
      <div class="deck-line muted">&nbsp;&nbsp;· <strong>clear</strong> — Clear console output</div>
    `,
    about: `
      <div class="deck-line white"><strong>Afsal Rahman</strong></div>
      <div class="deck-line muted">BSc Computer Science graduate specializing in Social Media Marketing, Content Creation, and SEO.</div>
      <div class="deck-line muted">Philosophy: Clean, audience-focused, brand-consistent content driven by analytical insight.</div>
    `,
    experience: `
      <div class="deck-line white"><strong>Field Experience:</strong></div>
      <div class="deck-line muted">1. <strong>Garvo Clothing</strong> (1 Year) — Freelance Social Media Executive (brand identity, apparel content, feed curation).</div>
      <div class="deck-line muted">2. <strong>H&amp;H Premium Fitness Center</strong> (6 Months) — Content Creator (reels, gym offers, facility showcases).</div>
    `,
    skills: `
      <div class="deck-line white"><strong>Primary Skills &amp; Tools:</strong></div>
      <div class="deck-line muted">Social Media Marketing · Content Creation &amp; Reels · SEO · Canva · WordPress · Google Analytics 4 · Google Search Console · Meta Ads · Google Ads · Mailchimp</div>
    `,
    contact: `
      <div class="deck-line white"><strong>Direct Transmission:</strong></div>
      <div class="deck-line muted">Email: afsalrahman768@gmail.com</div>
      <div class="deck-line muted">LinkedIn: linkedin.com/in/afsalrahman-a-5b635034a/</div>
      <div class="deck-line emerald">Status: Open for full-time and freelance roles.</div>
    `,
    clear: ''
  };

  function runCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    audio.playClick();

    if (cmd === 'clear') {
      termHistory.innerHTML = '';
      if (termInput) termInput.value = '';
      return;
    }

    const echo = document.createElement('div');
    echo.className = 'deck-line';
    echo.innerHTML = `<span class="deck-prompt">&gt;</span> <span class="white">${rawCmd}</span>`;
    termHistory.appendChild(echo);

    const res = document.createElement('div');
    if (commandResponses[cmd]) {
      res.innerHTML = commandResponses[cmd];
    } else if (cmd !== '') {
      res.className = 'deck-line err';
      res.innerHTML = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }
    termHistory.appendChild(res);

    termScreen.scrollTop = termScreen.scrollHeight;
    if (termInput) termInput.value = '';
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runCommand(termInput.value);
      }
    });
  }

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });

  // =========================================================================
  // 9. CASE STUDY MODALS
  // =========================================================================
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloses = document.querySelectorAll('[data-close]');
  const modals = document.querySelectorAll('.minimal-modal');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('active');
        audio.playClick();
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('active');
    });
  });

  modals.forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        m.classList.remove('active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => m.classList.remove('active'));
      const drawer = document.getElementById('mobileDrawer');
      if (drawer) drawer.classList.remove('open');
    }
  });

  // Mobile Drawer
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      audio.playClick();
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });
  });

  // =========================================================================
  // 10. COPY EMAIL WITH MINIMAL TOAST
  // =========================================================================
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-copy');
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard');
        audio.playClick();
      }).catch(() => {
        showToast('Email: afsalrahman768@gmail.com');
      });
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('minimalToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 11. CONTACT FORM
  // =========================================================================
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      audio.playClick();

      const name = document.getElementById('userName').value;
      const email = document.getElementById('userEmail').value;
      const type = document.getElementById('projectType').value;
      const message = document.getElementById('userMessage').value;

      if (feedback) {
        feedback.style.color = 'var(--accent-blue)';
        feedback.textContent = 'Preparing message dispatch...';
      }

      setTimeout(() => {
        const subject = encodeURIComponent(`[Inquiry] ${type} — from ${name}`);
        const body = encodeURIComponent(`Name / Organization: ${name}\nEmail: ${email}\nInquiry Type: ${type}\n\nMessage:\n${message}`);

        if (feedback) {
          feedback.style.color = 'var(--accent-emerald)';
          feedback.textContent = 'Opening default email client...';
        }

        showToast('Launching email composer...');
        window.location.href = `mailto:afsalrahman768@gmail.com?subject=${subject}&body=${body}`;
        form.reset();
      }, 700);
    });
  }

  // Back to Top
  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
