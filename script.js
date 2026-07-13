/* ════════════════════════════════════════════
   MUHAMMED HUSSEIN PORTFOLIO - JAVASCRIPT
   Modern, Clean & Performant
════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function() {

  /* ════════════════════════════════════════════
     PROJECTS DATA
  ════════════════════════════════════════════ */
  const projects = [
    {
      title: "Sales Data Analysis Dashboard",
      description: "Analyzed real sales data using Microsoft Excel to identify trends and performance gaps. Identified top-selling products and most profitable customers.",
      tools: ["Excel", "Pivot Tables", "Charts"],
      file: "files/sales_dashboard.xlsx",
      icon: "fa-chart-bar",
      inProgress: false,
      image: "Images/sales.png"
    },
    {
      title: "HR Analytics Dashboard",
      description: "Built a comprehensive HR analytics dashboard to track headcount, attendance, leave balances, and payroll summaries. Provides management with a clear overview.",
      tools: ["Excel", "Pivot Tables", "HR Metrics"],
      file: "files/hr_analytics_dashboard.xlsx",
      icon: "fa-users",
      inProgress: false,
      image: "Images/hr.png"
    },
    {
      title: "Inventory Tracking Dashboard",
      description: "Creating an interactive inventory tracking dashboard to monitor stock levels, track COGS, and provide real-time visibility into inventory movements.",
      tools: ["Excel", "COGS Analysis", "Inventory"],
      file: "files/inventory_tracker.xlsx",
      icon: "fa-warehouse",
      inProgress: true,
      image: "Images/inventory.png"
    },
    {
      title: "Financial Reporting Template",
      description: "Designing a professional financial reporting template with automated income statements, balance sheets, and cash flow reports.",
      tools: ["Excel", "Financial Modeling", "Power Query"],
      file: "files/financial_reports.xlsx",
      icon: "fa-chart-pie",
      inProgress: true,
      image: "Images/financial.png"
    },
    {
      title: "Expense Tracking & Budgeting",
      description: "Building an expense tracking workbook with budget vs actual analysis, category breakdowns, and spending alerts.",
      tools: ["Excel", "Budgeting", "Conditional Formatting"],
      file: "files/expense_tracker.xlsx",
      icon: "fa-wallet",
      inProgress: true,
      image: "Images/expense.png"
    },
    {
      title: "Yasser Ramadan Inventory Management App",
      description: "A mobile business automation application developed using AppSheet to manage inventory and streamline the returns process.",
      tools: ["AppSheet", "Google Sheets", "Apps Script"],
      file: "https://www.appsheet.com/newshortcut/b3d9df53-8f3f-4b7d-acc2-07af1f7ec7c6",
      icon: "fa-mobile-alt",
      inProgress: false,
      image: "Images/mobile.png"
    }
  ];

  /* ════════════════════════════════════════════
     VIDEOS DATA
  ════════════════════════════════════════════ */
  const videos = [
    {
      title: "Sales Dashboard Walkthrough",
      description: "Complete walkthrough of the sales data analysis dashboard, showing real-time insights and KPIs.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Excel Pivot Table Tutorial",
      description: "Step-by-step tutorial on building advanced pivot tables for financial analysis and data summarization.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Financial Reporting Automation",
      description: "Learn how to automate financial reports using Excel formulas, Power Query, and dynamic dashboards.",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ════════════════════════════════════════════
     GENERATE PROJECTS (WITH 3D FLIP)
  ════════════════════════════════════════════ */
  function generateProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    if (!Array.isArray(projects) || projects.length === 0) {
      grid.innerHTML = '<p class="no-content">No projects available yet.</p>';
      return;
    }

    grid.innerHTML = projects.map((project, idx) => {
      if (!project || typeof project !== 'object') return '';

      const tagsHtml = Array.isArray(project.tools)
        ? project.tools.map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('')
        : '';

      const btnHtml = project.inProgress
        ? `<button class="btn-card btn-card-primary" data-coming-soon="true">
             <i class="fas fa-download"></i> Download
           </button>`
        : `<a href="${escapeHtml(project.file)}" download class="btn-card btn-card-primary">
             <i class="fas fa-download"></i> Download
           </a>`;

      const badgeHtml = project.inProgress
        ? `<div class="project-in-progress-badge">In Progress</div>`
        : '';

      const num = String(idx + 1).padStart(2, '0');
      const bgImg = escapeHtml(project.image || 'Images/image.jpg');

      return `
        <div class="project-card fade-in" style="animation-delay:${idx * 0.1}s">
          <div class="project-card-inner">
            
            <!-- Front Card Face -->
            <div class="project-card-front">
              <div class="project-thumb">
                ${badgeHtml}
                <div class="project-thumb-icon"><i class="fas ${escapeHtml(project.icon || 'fa-file')}"></i></div>
                <div class="project-thumb-num">${num}</div>
              </div>
              <div class="project-body">
                <div class="project-tags">${tagsHtml}</div>
                <h3 class="project-title">${escapeHtml(project.title || '')}</h3>
                <p class="project-desc">${escapeHtml(project.description || '')}</p>
                <div class="project-footer">
                  ${btnHtml}
                  <button class="btn-card btn-card-ghost flip-btn"><i class="fas fa-arrow-right"></i></button>
                </div>
              </div>
            </div>

            <!-- Back Card Face -->
            <div class="project-card-back">
              <img src="${bgImg}" alt="Project Preview" class="project-back-img">
              <div class="project-back-overlay"></div>
              <div class="project-back-content">
                <button class="flip-back-btn"><i class="fas fa-undo"></i> Go Back</button>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('[data-coming-soon="true"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Coming soon! 🚀');
      });
    });

    grid.querySelectorAll('.flip-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardInner = e.target.closest('.project-card-inner');
        if (cardInner) cardInner.classList.add('is-flipped');
      });
    });

    grid.querySelectorAll('.flip-back-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cardInner = e.target.closest('.project-card-inner');
        if (cardInner) cardInner.classList.remove('is-flipped');
      });
    });

    grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════
     GENERATE VIDEOS
  ════════════════════════════════════════════ */
  function generateVideos() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;

    if (!Array.isArray(videos) || videos.length === 0) {
      grid.innerHTML = '<p class="no-content">No videos available yet.</p>';
      return;
    }

    grid.innerHTML = videos.map((video, idx) => {
      if (!video || typeof video !== 'object') return '';
      return `
        <div class="video-card fade-in" style="animation-delay:${idx * 0.1}s">
          <div class="video-wrapper">
            <iframe
              src="${escapeHtml(video.embedUrl || '')}"
              title="${escapeHtml(video.title || 'Video')}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <div class="video-info">
            <h3 class="video-title">${escapeHtml(video.title || '')}</h3>
            <p class="video-desc">${escapeHtml(video.description || '')}</p>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /* ════════════════════════════════════════════
     TOAST NOTIFICATION
  ════════════════════════════════════════════ */
  function showToast(message) {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0f172a;
      color: #fff;
      padding: 12px 24px;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 500;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      pointer-events: none;
      box-shadow: 0 12px 40px rgba(15,23,42,0.1);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ════════════════════════════════════════════
     SCROLL PROGRESS BAR
  ════════════════════════════════════════════ */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

  /* ════════════════════════════════════════════
     CUSTOM CURSOR
  ════════════════════════════════════════════ */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button, .project-card, .skill-card, .highlight-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ════════════════════════════════════════════
     PARTICLES BACKGROUND
  ════════════════════════════════════════════ */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    function getAccentColor() {
      const theme = document.documentElement.getAttribute('data-theme');
      return theme === 'dark' ? '59,130,246' : '0,85,204';
    }
    function initParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.4,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          opacity: Math.random() * 0.5 + 0.15
        });
      }
    }
    initParticles();
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getAccentColor();
      particles.forEach((p, i) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
    const themeObserver = new MutationObserver(() => initParticles());
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  /* ════════════════════════════════════════════
     TYPING EFFECT
  ════════════════════════════════════════════ */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const phrases = ['Junior Accountant', 'Data Analyst', 'Excel Specialist', 'Financial Expert'];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function type() {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        typedEl.textContent = phrase.substring(0, ++charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
        setTimeout(type, 75);
      } else {
        typedEl.textContent = phrase.substring(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1000);
  }

  /* ════════════════════════════════════════════
     ANIMATED STAT NUMBER COUNTER
  ════════════════════════════════════════════ */
  function animateCounter(el, target, suffix) {
    let current = 0;
    const duration = 1800;
    const stepTime = 22;
    const step = Math.ceil(target / (duration / stepTime));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, stepTime);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.getAttribute('data-target') || '0');
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) statsObserver.observe(statsContainer);

  /* ════════════════════════════════════════════
     3D CARD HOVER TILT
     Applied after projects are generated dynamically
  ════════════════════════════════════════════ */
  function init3DTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -8;
        const rotY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // Hook into project generation to trigger 3D Tilt setup
  const originalGenProjects = generateProjects;
  generateProjects = function() {
    originalGenProjects();
    init3DTilt();
  };

  /* ════════════════════════════════════════════
     NAVBAR FUNCTIONALITY
  ════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  if (hamburger && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ════════════════════════════════════════════
     ACTIVE NAV LINK
  ════════════════════════════════════════════ */
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  /* ════════════════════════════════════════════
     FADE IN ON SCROLL
  ════════════════════════════════════════════ */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  /* ════════════════════════════════════════════
     SMOOTH SCROLL
  ════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ════════════════════════════════════════════
     CONTACT FORM
  ════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameEl    = document.getElementById('name');
      const emailEl   = document.getElementById('email');
      const subjectEl = document.getElementById('subject');
      const messageEl = document.getElementById('message');

      if (!nameEl || !emailEl || !subjectEl || !messageEl) {
        showToast('Form fields not found. Please refresh and try again.');
        return;
      }

      const name    = nameEl.value.trim();
      const email   = emailEl.value.trim();
      const subject = subjectEl.value.trim();
      const message = messageEl.value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields before sending.');
        return;
      }

      const mailtoLink = `mailto:muhammed.hussien128@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.location.href = mailtoLink;

      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          contactForm.reset();
        }, 2000);
      }
    });
  }

  /* ════════════════════════════════════════════
     SCROLL TO TOP BUTTON
  ════════════════════════════════════════════ */
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.classList.toggle('show', window.scrollY > 300);
    });

    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ════════════════════════════════════════════
     INITIALIZE
  ════════════════════════════════════════════ */
  generateProjects();
  generateVideos();

});
