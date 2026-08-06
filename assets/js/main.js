(() => {
  const root = document.documentElement;
  const progress = document.querySelector('.scroll-progress');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setYear = () => {
    document.querySelectorAll('[data-year]').forEach((element) => {
      element.textContent = new Date().getFullYear();
    });
  };

  const updateProgress = () => {
    if (!progress) return;
    const height = root.scrollHeight - window.innerHeight;
    const value = height > 0 ? (window.scrollY / height) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, value))}%`;
  };

  const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
  };

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks?.classList.toggle('open', !expanded);
  });

  navAnchors.forEach((anchor) => anchor.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!navLinks?.classList.contains('open')) return;
    if (navLinks.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((anchor) => {
          anchor.classList.toggle('active', anchor.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-42% 0px -48% 0px', threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('will-reveal');
    revealObserver.observe(element);
  });

  const initLatentField = () => {
    if (reduceMotion) return;
    const canvas = document.querySelector('#latent-field');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let ratio = Math.min(window.devicePixelRatio || 1, 2);
    let points = [];
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(18, Math.min(width < 700 ? 34 : 54, Math.floor(width / 26)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.7 + 0.7,
      }));
    };

    let lastFrame = 0;
    let running = true;

    const draw = (time = 0) => {
      if (!running) return;
      if (time - lastFrame < 33) { raf = window.requestAnimationFrame(draw); return; }
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -10) point.x = width + 10;
        if (point.x > width + 10) point.x = -10;
        if (point.y < -10) point.y = height + 10;
        if (point.y > height + 10) point.y = -10;
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 122) continue;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = `rgba(117, 236, 248, ${0.12 * (1 - distance / 122)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(117, 236, 248, 0.42)';
        ctx.fill();
      });

      raf = window.requestAnimationFrame(draw);
    };

    const hero = canvas.closest('.hero');
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      if (running) raf = window.requestAnimationFrame(draw);
      else window.cancelAnimationFrame(raf);
    }, { threshold: 0.01 });
    if (hero) visibilityObserver.observe(hero);

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      running = !document.hidden && (!hero || hero.getBoundingClientRect().bottom > 0);
      if (!running) window.cancelAnimationFrame(raf);
      else raf = window.requestAnimationFrame(draw);
    });
  };

  setYear();
  updateProgress();
  initLatentField();
  window.addEventListener('scroll', updateProgress, { passive: true });
})();
