/* ============================================
   MUHAMMED HUSSEIN PORTFOLIO - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // PROJECTS DATA ARRAY
    // ============================================
    // ===== HOW TO ADD NEW PROJECT =====
    // 1. Copy an object inside the projects array below
    // 2. Change: title, description, tools, file name
    // 3. Upload your Excel file into the /files folder
    // 4. Make sure the "file" path matches your uploaded file
    // ============================================

    // ============================================
    // HOW TO MARK A PROJECT AS COMPLETE:
    // 1. Upload the real Excel file into the /files folder
    // 2. Set  inProgress: false  (or remove the property entirely)
    // 3. That's it — the download button will work automatically
    // ============================================

    const projects = [
        // ── COMPLETED ──────────────────────────────
        {
            title: "Sales Data Analysis Dashboard",
            description: "Analyzed real sales data using Microsoft Excel to identify trends and performance gaps. Identified top-selling products and most profitable customers to guide business strategy. Created interactive dashboards to track performance metrics and visualize sales trends.",
            tools: ["Excel", "Pivot Tables", "Charts", "Dashboards", "Data Visualization"],
            file: "files/sales_dashboard.xlsx",
            icon: "fa-chart-bar",
            inProgress: false   // ✅ File uploaded — downloads work normally
        },
        {
            title: "HR Analytics Dashboard",
            description: "Built a comprehensive HR analytics dashboard to track headcount, attendance, leave balances, and payroll summaries. Provides management with a clear overview of workforce metrics and helps identify staffing trends.",
            tools: ["Excel", "Pivot Tables", "HR Metrics", "Charts", "Dashboards"],
            file: "files/hr_analytics_dashboard.xlsx",
            icon: "fa-users",
            inProgress: false   // ✅ File uploaded — downloads work normally
        },

        // ── IN PROGRESS ────────────────────────────
        {
            title: "Inventory Tracking Dashboard",
            description: "Creating an interactive inventory tracking dashboard to monitor stock levels, track COGS, and provide real-time visibility into inventory movements for better decision making. Includes automated reorder alerts.",
            tools: ["Excel", "COGS Analysis", "Inventory Formulas", "Charts", "Reporting"],
            file: "files/inventory_tracker.xlsx",
            icon: "fa-warehouse",
            inProgress: true    // 🔧 Remove or set to false once file is uploaded
        },
        {
            title: "Financial Reporting Template",
            description: "Designing a professional financial reporting template with automated income statements, balance sheets, and cash flow reports. Includes variance analysis and trend charts for executive presentations.",
            tools: ["Excel", "Financial Modeling", "Charts", "Power Query", "Automation"],
            file: "files/financial_reports.xlsx",
            icon: "fa-chart-pie",
            inProgress: true    // 🔧 Remove or set to false once file is uploaded
        },
        {
            title: "Expense Tracking & Budgeting",
            description: "Building an expense tracking workbook with budget vs actual analysis, category breakdowns, and spending alerts. Helps identify cost-saving opportunities and maintain financial discipline.",
            tools: ["Excel", "Budgeting", "Pivot Tables", "Conditional Formatting", "Analysis"],
            file: "files/expense_tracker.xlsx",
            icon: "fa-wallet",
            inProgress: true    // 🔧 Remove or set to false once file is uploaded
        },
        {
            title: "Supplier Reconciliation System",
            description: "Developing an automated Excel-based reconciliation system to compare supplier statements with internal records, reducing discrepancies and improving payment accuracy. Includes automated difference calculations and status tracking.",
            tools: ["Excel", "VLOOKUP", "Power Query", "Conditional Formatting", "Financial Analysis"],
            file: "files/supplier_reconciliation.xlsx",
            icon: "fa-file-invoice-dollar",
            inProgress: true    // 🔧 Remove or set to false once file is uploaded
        }
    ];

    // ============================================
    // TOAST NOTIFICATION (used for in-progress projects)
    // ============================================
    function showToast(message) {
        // Remove any existing toast first
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
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            box-shadow: 0 8px 24px rgba(0,0,0,0.25);
            border-left: 4px solid #2563eb;
            display: flex;
            align-items: center;
            gap: 0.6rem;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.25s ease, transform 0.25s ease;
            pointer-events: none;
            white-space: nowrap;
        `;
        toast.innerHTML = `<i class="fas fa-clock" style="color:#2563eb;"></i> ${message}`;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============================================
    // GENERATE PROJECT CARDS DYNAMICALLY
    // ============================================
    function generateProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = projects.map(project => {
            const toolsHtml = project.tools.map(tool =>
                `<span class="tool-tag">${tool}</span>`
            ).join('');

            // In-progress projects get a data attribute instead of a real href
            const downloadBtn = project.inProgress
                ? `<a href="#" class="btn-project-download" data-in-progress="true" aria-label="Coming soon">
                       <i class="fas fa-download"></i> Download Excel
                   </a>`
                : `<a href="${project.file}" download class="btn-project-download">
                       <i class="fas fa-download"></i> Download Excel
                   </a>`;

            return `
                <div class="project-card fade-in">
                    <div class="project-image">
                        <i class="fas ${project.icon}"></i>
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

        // Attach click handlers for in-progress buttons (event delegation)
        projectsGrid.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-in-progress="true"]');
            if (btn) {
                e.preventDefault();
                showToast('Project in progress — coming soon.');
            }
        });
    }

    // Initialize projects
    generateProjects();

    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar background on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPos = window.scrollY + 100;

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

    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
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

    // ============================================
    // FADE IN ON SCROLL
    // ============================================
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

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const mailtoLink = `mailto:muhammed.hussien128@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        window.location.href = mailtoLink;

        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#10b981';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // TYPING EFFECT ON HERO TITLE
    // ============================================
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
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%c👋 Welcome to Muhammed Hussein\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
    console.log('%cFeel free to explore the code. Built with ❤️ using vanilla HTML, CSS & JS.', 'font-size: 12px; color: #64748b;');

}); // End DOMContentLoaded
