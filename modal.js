/* ════════════════════════════════════════════
   PROJECT MODAL - ENTERPRISE GALLERY CONTROLLER
   Production-Ready with Advanced Features
════════════════════════════════════════════ */

class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.closeBtn = document.getElementById('modalClose');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.galleryImage = document.getElementById('galleryImage');
        this.imageCounter = document.getElementById('imageCounter');
        this.imageTotalCounter = document.getElementById('imageTotalCounter');
        this.galleryIndicators = document.getElementById('galleryIndicators');
        this.thumbnailGallery = document.getElementById('thumbnailGallery');
        this.galleryMain = document.getElementById('galleryMain');
        this.fullscreenViewer = document.getElementById('fullscreenViewer');
        this.fullscreenImage = document.getElementById('fullscreenImage');
        this.fullscreenClose = document.getElementById('fullscreenClose');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDesc = document.getElementById('modalDesc');
        this.modalTechBadges = document.getElementById('modalTechBadges');
        this.modalDownloadBtn = document.getElementById('modalDownloadBtn');
        this.modalDemoBtn = document.getElementById('modalDemoBtn');

        this.currentProjectIndex = 0;
        this.currentImageIndex = 0;
        this.projectsData = [];
        this.touchStartX = 0;
        this.isAnimating = false;
        this.preloadedImages = new Map();
        this.focusTrap = null;

        this.initEventListeners();
        this.setupFocusTrap();
    }

    initEventListeners() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Previous/Next buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousImage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Fullscreen image click
        if (this.galleryMain) {
            this.galleryMain.addEventListener('click', (e) => {
                if (e.target === this.galleryImage || e.target.parentElement === this.galleryMain) {
                    this.openFullscreen();
                }
            });
        }

        // Fullscreen close
        if (this.fullscreenClose) {
            this.fullscreenClose.addEventListener('click', () => this.closeFullscreen());
        }

        if (this.fullscreenViewer) {
            this.fullscreenViewer.addEventListener('click', (e) => {
                if (e.target === this.fullscreenViewer) this.closeFullscreen();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousImage();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextImage();
                }
            }
        });

        // Close fullscreen with Escape
        document.addEventListener('keydown', (e) => {
            if (this.fullscreenViewer && this.fullscreenViewer.classList.contains('active')) {
                if (e.key === 'Escape') this.closeFullscreen();
            }
        });

        // Click outside to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }

        // Swipe support for mobile
        if (this.galleryMain) {
            this.galleryMain.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
            }, false);

            this.galleryMain.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = this.touchStartX - touchEndX;

                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        this.nextImage();
                    } else {
                        this.previousImage();
                    }
                }
            }, false);
        }
    }

    setupFocusTrap() {
        // Focus trap to keep focus within modal when open
        this.focusTrap = (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                const focusableElements = this.modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
    }

    setProjectsData(projects) {
        this.projectsData = projects.map(project => ({
            ...project,
            galleryImages: project.galleryImages || [],
            tools: project.tools || [],
            demoUrl: project.demoUrl || null
        }));
    }

    openModal(projectIndex) {
        if (!this.projectsData[projectIndex]) return;

        this.currentProjectIndex = projectIndex;
        this.currentImageIndex = 0;

        const project = this.projectsData[projectIndex];

        // Update modal header
        this.modalTitle.textContent = project.title;
        this.modalDesc.textContent = project.description;

        // Update tech badges
        this.renderTechBadges(project.tools);

        // Update action buttons
        this.modalDownloadBtn.href = project.file || '#';
        if (project.demoUrl) {
            this.modalDemoBtn.href = project.demoUrl;
            this.modalDemoBtn.style.display = 'inline-flex';
        } else {
            this.modalDemoBtn.style.display = 'none';
        }

        // Update counter
        const totalImages = project.galleryImages.length;
        this.imageTotalCounter.textContent = totalImages;

        // Render indicators and thumbnails
        this.renderIndicators(totalImages);
        this.renderThumbnails(project.galleryImages);

        // Display first image and preload next
        this.displayImage();
        this.preloadNextImage();

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Show modal with animation
        if (this.modal) {
            this.modal.classList.add('active');
            this.modal.focus();
            // Add focus trap listener
            this.modal.addEventListener('keydown', this.focusTrap);
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            this.modal.removeEventListener('keydown', this.focusTrap);
        }

        // Restore body scroll
        document.body.style.overflow = '';
    }

    displayImage() {
        if (this.isAnimating) return;

        const project = this.projectsData[this.currentProjectIndex];
        const images = project.galleryImages;

        if (images.length === 0) return;

        // Clamp index
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = images.length - 1;
        } else if (this.currentImageIndex >= images.length) {
            this.currentImageIndex = 0;
        }

        this.isAnimating = true;

        // Fade out
        this.galleryImage.style.opacity = '0';

        setTimeout(() => {
            // Update image
            this.galleryImage.src = images[this.currentImageIndex];
            this.galleryImage.alt = `${project.title} - Screenshot ${this.currentImageIndex + 1}`;

            // Update counter
            this.imageCounter.textContent = this.currentImageIndex + 1;

            // Fade in
            this.galleryImage.style.opacity = '1';

            // Update indicators and thumbnails
            this.updateIndicators();
            this.updateThumbnails();

            // Preload next image
            this.preloadNextImage();

            this.isAnimating = false;
        }, 150);
    }

    previousImage() {
        this.currentImageIndex--;
        this.displayImage();
    }

    nextImage() {
        this.currentImageIndex++;
        this.displayImage();
    }

    renderTechBadges(tools) {
        if (!this.modalTechBadges) return;

        this.modalTechBadges.innerHTML = '';

        if (!tools || tools.length === 0) return;

        const badgesHTML = tools.map(tool => `
            <span class="tech-badge">
                <i class="fas fa-tag"></i>
                ${this.escapeHtml(tool)}
            </span>
        `).join('');

        this.modalTechBadges.innerHTML = badgesHTML;
    }

    renderIndicators(count) {
        if (!this.galleryIndicators) return;

        this.galleryIndicators.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('button');
            dot.className = 'indicator-dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Go to image ${i + 1}`);
            if (i === 0) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            }
            dot.addEventListener('click', () => {
                this.currentImageIndex = i;
                this.displayImage();
            });
            this.galleryIndicators.appendChild(dot);
        }
    }

    renderThumbnails(images) {
        if (!this.thumbnailGallery) return;

        this.thumbnailGallery.innerHTML = '';

        images.forEach((image, index) => {
            const thumbContainer = document.createElement('div');
            thumbContainer.className = 'thumbnail-item';
            if (index === 0) thumbContainer.classList.add('active');
            thumbContainer.setAttribute('role', 'button');
            thumbContainer.setAttribute('tabindex', '0');
            thumbContainer.setAttribute('aria-label', `Image ${index + 1}`);

            const img = document.createElement('img');
            img.src = image;
            img.alt = `Thumbnail ${index + 1}`;
            img.loading = 'lazy';

            thumbContainer.appendChild(img);

            thumbContainer.addEventListener('click', () => {
                this.currentImageIndex = index;
                this.displayImage();
            });

            thumbContainer.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.currentImageIndex = index;
                    this.displayImage();
                }
            });

            this.thumbnailGallery.appendChild(thumbContainer);
        });
    }

    updateIndicators() {
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            const isActive = index === this.currentImageIndex;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive.toString());
        });
    }

    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }

    preloadNextImage() {
        const project = this.projectsData[this.currentProjectIndex];
        const images = project.galleryImages;
        const nextIndex = (this.currentImageIndex + 1) % images.length;
        const nextImageSrc = images[nextIndex];

        if (!this.preloadedImages.has(nextImageSrc)) {
            const img = new Image();
            img.src = nextImageSrc;
            this.preloadedImages.set(nextImageSrc, true);
        }
    }

    openFullscreen() {
        const project = this.projectsData[this.currentProjectIndex];
        const images = project.galleryImages;
        const currentImage = images[this.currentImageIndex];

        if (this.fullscreenImage) {
            this.fullscreenImage.src = currentImage;
        }

        if (this.fullscreenViewer) {
            this.fullscreenViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeFullscreen() {
        if (this.fullscreenViewer) {
            this.fullscreenViewer.classList.remove('active');
            document.body.style.overflow = 'hidden'; // Keep modal scroll locked
        }
    }

    escapeHtml(text) {
        if (typeof text !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

/* ════════════════════════════════════════════
   INITIALIZE MODAL ON DOM READY
════════════════════════════════════════════ */

let projectModal = null;

document.addEventListener('DOMContentLoaded', function() {
    projectModal = new ProjectModal();
});
