/* ============================================
     MUHAMMED HUSSEIN PORTFOLIO - JAVASCRIPT
     ENHANCED WITH DYNAMIC PROJECT VISUALS
     ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    /* ============================================
       PROJECTS DATA WITH VISUAL METADATA
       ============================================ */
    const projects = [
        {
            title: "Sales Data Analysis Dashboard",
            description: "Analyzed real sales data using Microsoft Excel to identify trends and performance gaps. Identified top-selling products and most profitable customers to guide business strategy.",
            tools: ["Excel", "Pivot Tables", "Charts", "Dashboards"],
            file: "files/sales_dashboard.xlsx",
            icon: "fa-chart-bar",
            color1: "#3d7ce3",
            color2: "#4a95ff",
            inProgress: false
        },
        {
            title: "HR Analytics Dashboard",
            description: "Built a comprehensive HR analytics dashboard to track headcount, attendance, leave balances, and payroll summaries. Provides management with a clear overview of workforce metrics.",
            tools: ["Excel", "Pivot Tables", "HR Metrics", "Charts"],
            file: "files/hr_analytics_dashboard.xlsx",
            icon: "fa-users",
            color1: "#1a7f5c",
            color2: "#34d399",
            inProgress: false
        },
        {
            title: "Inventory Tracking Dashboard",
            description: "Creating an interactive inventory tracking dashboard to monitor stock levels, track COGS, and provide real-time visibility into inventory movements for better decision making.",
            tools: ["Excel", "COGS Analysis", "Inventory Formulas", "Charts"],
            file: "files/inventory_tracker.xlsx",
            icon: "fa-warehouse",
            color1: "#b85900",
            color2: "#d97706",
            inProgress: true
        },
        {
            title: "Financial Reporting Template",
            description: "Designing a professional financial reporting template with automated income statements, balance sheets, and cash flow reports. Includes variance analysis and trend charts.",
            tools: ["Excel", "Financial Modeling", "Power Query", "Automation"],
            file: "files/financial_reports.xlsx",
            icon: "fa-chart-pie",
            color1: "#dc2626",
            color2: "#f87171",
            inProgress: true
        },
        {
            title: "Expense Tracking & Budgeting",
            description: "Building an expense tracking workbook with budget vs actual analysis, category breakdowns, and spending alerts. Helps identify cost-saving opportunities and optimize expenses.",
            tools: ["Excel", "Budgeting", "Pivot Tables", "Conditional Formatting"],
            file: "files/expense_tracker.xlsx",
            icon: "fa-wallet",
            color1: "#7c3aed",
            color2: "#a78bfa",
            inProgress: true
        },
        {
            title: "Supplier Reconciliation System",
            description: "Developing an automated Excel-based reconciliation system to compare supplier statements with internal records, reducing discrepancies and improving payment accuracy.",
            tools: ["Excel", "VLOOKUP", "Power Query", "Financial Analysis"],
            file: "files/supplier_reconciliation.xlsx",
            icon: "fa-file-invoice-dollar",
            color1: "#0891b2",
            color2: "#22d3ee",
            inProgress: true
        }
    ];

    /* ============================================
       TOAST NOTIFICATION
       ============================================ */
    function showToast(message) {
        const existing = document.getElementById('coming-soon-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'coming-soon-toast';
        toast.setAttribute('role', 'status');
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #1e293b;
            color: #f1f5f9;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            border-left: 4px solid #0055cc;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            white-space: nowrap;
        `;
        toast.innerHTML = `<i class="fas fa-clock" style="color:#0055cc; font-size:1.1rem;"></i> ${message}`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    /* ============================================
       GENERATE PROJECT CARDS WITH VISUALS
       ============================================ */
    function generateProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projects.map((project, index) => {
            const toolsHtml = project.tools.map(tool =>
                `<span class="tool-tag">${tool}</span>`
            ).join('');

            const downloadBtn = project.inProgress
                ? `<button class="btn-project-download" data-in-progress="true" aria-label="Coming soon">
                       <i class="fas fa-download"></i> Download Excel
                   </button>`
                : `<a href="${project.file}" download class="btn-project-download">
                       <i class="fas fa-download"></i> Download Excel
                   </a>`;

            return `
                <div class="project-card fade-in" style="animation-delay: ${index * 0.1}s;">
                    <div class="project-image" style="background: linear-gradient(135deg, ${project.color1}, ${project.color2});">
                        <div class="project-image-content">
                            <i class="fas ${project.icon}"></i>
                            <span class="project-image-label">${project.title.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tools">
                            ${toolsHtml}
                        </div>
                        <div class="project-actions">
                            ${downloadBtn}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        projectsGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-in-progress="true"]');
            if (btn) {
                e.preventDefault();
                showToast('Project in progress — coming soon! 🚀');
            }
        });
    }

    generateProjects();

    /* ============================================
       NAVIGATION
       ============================================ */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    /* ============================================
       ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    /* ============================================
       SCROLL TO TOP BUTTON
       ============================================ */
    const scrollTopBtn = document.getElementById('scrollTop');

    function toggleScrollTop() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollTop);

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ============================================
       FADE IN ON SCROLL
       ============================================ */
    const fadeElements = document.querySelectorAll('.section-header, .skill-card, .project-card, .timeline-item, .education-card, .contact-item, .contact-form-wrapper, .highlight-item');

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    /* ============================================
       CONTACT FORM
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #1a7f5c, #2ba878)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 90;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============================================
       TYPING EFFECT ON HERO TITLE
       ============================================ */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.minHeight = '1.5em';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        }
        setTimeout(typeWriter, 500);
    }

    /* ============================================
       CONSOLE WELCOME MESSAGE
       ============================================ */
    console.log('%c👋 Welcome to Muhammed Hussein\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #0055cc;');
    console.log('%cProfessional Junior Accountant & Data Analyst | Built with ❤️ using HTML, CSS & Vanilla JS', 'font-size: 12px; color: #64748b;');

});
