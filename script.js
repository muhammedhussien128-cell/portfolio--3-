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
      inProgress: false
    },
    {
      title: "HR Analytics Dashboard",
      description: "Built a comprehensive HR analytics dashboard to track headcount, attendance, leave balances, and payroll summaries. Provides management with a clear overview.",
      tools: ["Excel", "Pivot Tables", "HR Metrics"],
      file: "files/hr_analytics_dashboard.xlsx",
      icon: "fa-users",
      inProgress: false
    },
    {
      title: "Inventory Tracking Dashboard",
      description: "Creating an interactive inventory tracking dashboard to monitor stock levels, track COGS, and provide real-time visibility into inventory movements.",
      tools: ["Excel", "COGS Analysis", "Inventory"],
      file: "files/inventory_tracker.xlsx",
      icon: "fa-warehouse",
      inProgress: true
    },
    {
      title: "Financial Reporting Template",
      description: "Designing a professional financial reporting template with automated income statements, balance sheets, and cash flow reports.",
      tools: ["Excel", "Financial Modeling", "Power Query"],
      file: "files/financial_reports.xlsx",
      icon: "fa-chart-pie",
      inProgress: true
    },
    {
      title: "Expense Tracking & Budgeting",
      description: "Building an expense tracking workbook with budget vs actual analysis, category breakdowns, and spending alerts.",
      tools: ["Excel", "Budgeting", "Conditional Formatting"],
      file: "files/expense_tracker.xlsx",
      icon: "fa-wallet",
      inProgress: true
    },
    {
      title: "Supplier Reconciliation System",
      description: "Developing an automated Excel-based reconciliation system to compare supplier statements with internal records.",
      tools: ["Excel", "VLOOKUP", "Power Query"],
      file: "files/supplier_reconciliation.xlsx",
      icon: "fa-file-invoice-dollar",
      inProgress: true
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

  /* ════════════════════════════════════════════
     GENERATE PROJECTS
  ════════════════════════════════════════════ */
  function generateProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map((project, idx) => {
      const tagsHtml = project.tools.map(t => `<span class="project-tag">${t}</span>`).join('');
      const btnHtml = project.inProgress
        ? `<button class="btn-card btn-card-primary" data-coming-soon="true"><i class="fas fa-download"></i> Download</button>`
        : `<a href="${project.file}" download class="btn-card btn-card-primary"><i class="fas fa-download"></i> Download</a>`;

      return `
        <div class="project-card fade-in" style="animation-delay:${idx * 0.1}s">
          <div class="project-thumb">
            <div class="project-thumb-icon"><i class="fas ${project.icon}"></i></div>
            <div class="project-thumb-num">0${idx + 1}</div>
          </div>
          <div class="project-body">
            <div class="project-tags">${tagsHtml}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-footer">
              ${btnHtml}
              <button class="btn-card btn-card-ghost"><i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Handle coming soon clicks
    grid.querySelectorAll('[data-coming-soon="true"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Coming soon! 🚀');
      });
    });
  }

  /* ════════════════════════════════════════════
     GENERATE VIDEOS
  ════════════════════════════════════════════ */
  function generateVideos() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;

    grid.innerHTML = videos.map((video, idx) => `
      <div class="video-card fade-in" style="animation-delay:${idx * 0.1}s">
        <div class="video-wrapper">
          <iframe src="${video.embedUrl}" title="${video.title}" allowfullscreen></iframe>
        </div>
        <div class="video-info">
          <h3 class="video-title">${video.title}</h3>
          <p class="video-desc">${video.description}</p>
        </div>
      </div>
    `).join('');
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
     NAVBAR FUNCTIONALITY - FIXED WITH NULL SAFETY
  ════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle - with null safety
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click - with null safety
  if (hamburger && navMenu) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar scroll effect - with null safety
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
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
        
        document.querySelector(`a[href="#${id}"]`)?.classList.add('active');
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

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ════════════════════════════════════════════
     SMOOTH SCROLL
  ════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href !== '#') {
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
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

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
      if (window.scrollY > 300) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
    });

    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ════════════════════════════════════════════
     INITIALIZE
  ════════════════════════════════════════════ */
  generateProjects();
  generateVideos();

  console.log('%c👋 Welcome to Muhammed Hussein\'s Portfolio!', 'font-size: 18px; font-weight: bold; color: #2563eb;');
  console.log('%cBuilt with modern web technologies - HTML, CSS & Vanilla JavaScript', 'font-size: 12px; color: #64748b;');

});