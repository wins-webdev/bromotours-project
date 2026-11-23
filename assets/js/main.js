/**
 * ============================================================================
 * BROMO TOURS — VANILLA JAVASCRIPT APPLICATION (PHASE 1 STATIC EDITION)
 * ============================================================================
 * Architecture:
 * 1. Central Configuration (Single configurable WhatsApp destination & studio config)
 * 2. Maintainable Sample Data Structures (Tours & Testimonials)
 * 3. Custom Infinite Horizontal Drag/Swipe/Autoplay Carousel Engine
 * 4. Sticky Header, Mobile Navigation Drawer & Smooth Scroll Controller
 * 5. Interactive FAQ Accordion
 * 6. Frontend Inquiry Form Validation & Structured WhatsApp Lead Generator
 * 7. Scroll Reveal & Reduced-Motion Respect
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. CENTRAL CONFIGURATION (SINGLE CONFIGURABLE LOCATION FOR WHATSAPP)
     ========================================================================== */
  const BROMO_CONFIG = {
    brandName: 'BROMO TOURS',
    // Single configurable WhatsApp number (international format without '+' or spaces for wa.me URL)
    whatsappNumber: '6282142961911',
    whatsappDisplay: '+62 821-4296-1911',
    defaultDirectMessage:
      'Hello BROMO TOURS! I am interested in planning a Mount Bromo adventure in East Java. Could you help me with available itineraries and details?',
    toursAutoplayMs: 3000,
    testimonialsAutoplayMs: 4500
  };

  /* ==========================================================================
     2. MAINTAINABLE SAMPLE DATA STRUCTURES
     ========================================================================== */

  /**
   * Editable Sample Tour Packages (Section 05)
   * Explicitly labeled as sample tour data for design & itinerary preview.
   */
  const SAMPLE_TOURS_DATA = [
    {
      id: 'bromo-sunrise-adventure',
      title: 'Bromo Sunrise Adventure',
      category: 'Sunrise Adventures',
      duration: '1 Day · 00:30 – 13:00 WIB',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/hero-bromo-sunrise.jpg',
      imageAlt: 'Golden sunrise above Mount Bromo crater and Mount Semeru with 4x4 jeep on the Sea of Sand',
      highlight: 'Pre-dawn 4x4 ascent to King Kong or Penanjakan ridge followed by a morning Sea of Sand crossing.'
    },
    {
      id: 'bromo-jeep-expedition',
      title: 'Bromo Jeep Expedition',
      category: 'Jeep & Off-Road',
      duration: 'Full Day · Private 4x4 FJ40',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/exp-jeep-safari.jpg',
      imageAlt: 'Vintage 4x4 Land Cruiser driving across black volcanic ash in the Sea of Sand at Mount Bromo',
      highlight: 'Off-road caldera traversal across Pasir Berbisik, volcanic dunes, and rugged highland trails.'
    },
    {
      id: 'bromo-crater-exploration',
      title: 'Bromo Crater Exploration',
      category: 'Nature & Mountain',
      duration: '1 Day · Caldera & Rim Trek',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/exp-crater-trek.jpg',
      imageAlt: 'Hikers walking along the steaming volcanic crater rim of Mount Bromo in morning light',
      highlight: 'Trek across the volcanic ash plain past Luhur Poten temple and ascend to the active steaming crater rim.'
    },
    {
      id: 'bromo-savanna-discovery',
      title: 'Bromo Savanna Discovery',
      category: 'Nature & Mountain',
      duration: '1 Day · South Caldera Loop',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/exp-savanna-hills.jpg',
      imageAlt: 'Lush green rolling hills of Bromo Savanna and Teletubbies Hill in East Java',
      highlight: 'Contrast the stark black volcanic desert with the emerald rolling valleys of Bukit Teletubbies.'
    },
    {
      id: 'bromo-photography-journey',
      title: 'Bromo Photography Journey',
      category: 'Astrophotography & Light',
      duration: '2 Days / 1 Night · Blue Hour & Milky Way',
      pricePlaceholder: '$1,234 / pax',
      image: 'assets/images/tour-milkyway-photo.jpg',
      imageAlt: 'Milky Way galaxy arching over the smoking crater of Mount Bromo with 4x4 jeep lights below',
      highlight: 'Dedicated tripod time for Milky Way caldera skies, golden hour ridges, and horseman portraits.'
    },
    {
      id: 'ijen-blue-fire-crater-trek',
      title: 'Ijen Blue Fire & Crater Lake Trek',
      category: 'Ijen Crater Expedition',
      duration: '1 Day · 00:30 – 10:00 WIB',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/tour-ijen-blue-fire.jpg',
      imageAlt: 'Electric blue sulfur flames glowing inside Ijen Crater at night with turquoise crater lake behind',
      highlight: 'Midnight ascent to Kawah Ijen to witness the rare electric-blue sulfur flames and sunrise over the world’s largest acidic turquoise crater lake.'
    },
    {
      id: 'bromo-ijen-overland-3d2n',
      title: 'Bromo & Ijen Crater 3D2N Overland',
      category: 'Signature East Java Combo',
      duration: '3 Days / 2 Nights · Surabaya / Malang / Bali Drop',
      pricePlaceholder: '$1,234 / pax',
      image: 'assets/images/tour-ijen-crater-lake.jpg',
      imageAlt: 'Turquoise acidic crater lake of Kawah Ijen surrounded by dramatic volcanic cliffs at sunrise',
      highlight: 'The ultimate East Java volcanic circuit combining Mount Bromo’s golden sunrise & 4x4 Sea of Sand with Ijen Crater’s blue fire and turquoise caldera.'
    },
    {
      id: 'ijen-sunrise-turquoise-caldera',
      title: 'Ijen Sunrise & Turquoise Caldera Discovery',
      category: 'Ijen Nature & Panorama',
      duration: '1 Day · Banyuwangi Highlands',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/tour-ijen-crater-lake.jpg',
      imageAlt: 'Morning sunlight illuminating the turquoise lake and jagged sulfur rim of Ijen Crater in East Java',
      highlight: 'Scenic dawn ridge hike along Kawah Ijen’s 2,386m volcanic rim overlooking the emerald-turquoise crater lake and coffee plantations.'
    },
    {
      id: 'tumpak-sewu-waterfall-canyon-trek',
      title: 'Tumpak Sewu Waterfall & Canyon Trek',
      category: 'Waterfall & Jungle Gorge',
      duration: '1 Day · Lumajang / Malang',
      pricePlaceholder: '$123 / pax',
      image: 'assets/images/exp-tumpak-sewu.jpg',
      imageAlt: 'Semi-circular curtain of Tumpak Sewu Waterfall plunging into an emerald jungle canyon with Mount Semeru behind',
      highlight: 'Descend into the misty jungle amphitheater of Tumpak Sewu (Thousand Waterfalls) and explore the hidden stalactite cascades of Goa Tetes.'
    },
    {
      id: 'bromo-tumpak-sewu-ijen-4d3n',
      title: 'Bromo, Tumpak Sewu & Ijen 4D3N Grand Circuit',
      category: 'Ultimate East Java Overland',
      duration: '4 Days / 3 Nights · All-Inclusive Overland',
      pricePlaceholder: '$1,234 / pax',
      image: 'assets/images/exp-tumpak-sewu.jpg',
      imageAlt: 'Tumpak Sewu waterfall canyon and Mount Semeru volcano at sunrise in East Java',
      highlight: 'Our flagship East Java trilogy connecting Tumpak Sewu Waterfall, Mount Bromo sunrise & 4x4 Sea of Sand, and Ijen Crater’s electric-blue fire.'
    },
    {
      id: 'orang-utan-borneo-klotok-safari',
      title: 'Orang Utan Borneo Klotok River Safari (3D2N)',
      category: 'Borneo Wildlife & Rainforest',
      duration: '3 Days / 2 Nights · Tanjung Puting, Kalimantan',
      pricePlaceholder: '$1,234 / pax',
      image: 'assets/images/exp-orangutan-borneo.jpg',
      imageAlt: 'Wild Bornean orangutan in the rainforest canopy above a traditional wooden klotok riverboat in Tanjung Puting',
      highlight: 'Cruise the Sekonyer River by private wooden Klotok houseboat to observe wild Bornean orangutans at Camp Leakey and Pondok Tanggui.'
    },
    {
      id: 'private-bromo-experience',
      title: 'Private Bromo Experience',
      category: 'Bespoke & Cultural',
      duration: 'Flexible · Custom 1–3 Days',
      pricePlaceholder: '$1,234 / pax',
      image: 'assets/images/tour-private-expedition.jpg',
      imageAlt: 'Private sunrise coffee setup overlooking Mount Bromo caldera at dawn',
      highlight: 'Private ridge picnic with hot Java Arabica coffee, Tengger village immersion, and unhurried pacing.'
    }
  ];

  /**
   * Editable Sample Testimonial Placeholders (Section 07)
   * Authentic expedition dispatches across Mount Bromo, Ijen Crater, and East Java.
   */
  const SAMPLE_TESTIMONIALS_DATA = [
    {
      id: 'dispatch-01',
      theme: 'forest',
      badge: 'VERIFIED EXPEDITION // DAWN SUMMIT',
      experienceRef: 'Experience: Bromo Sunrise & Crater Rim',
      quote:
        '“Standing on King Kong Hill at 5:00 AM with freshly brewed hot Java Arabica coffee while the golden sun broke over Semeru was completely surreal. Our Tenggerese driver navigated the morning crowds effortlessly.”',
      customerName: 'Elena & Marcus Vance',
      avatarCode: 'EV',
      country: 'United Kingdom · London',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    },
    {
      id: 'dispatch-02',
      theme: 'sand',
      badge: 'VERIFIED EXPEDITION // 4X4 EXPEDITION',
      experienceRef: 'Experience: Bromo Jeep Safari & Sand Sea',
      quote:
        '“Crossing the Sea of Sand in the classic 1980s Land Cruiser felt like landing on another planet. Our guide Pak Joko knew every secluded photo angle and made our family feel completely safe and cared for.”',
      customerName: 'David Chen & Family',
      avatarCode: 'DC',
      country: 'Singapore',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    },
    {
      id: 'dispatch-03',
      theme: 'forest',
      badge: 'VERIFIED EXPEDITION // ASTROPHOTOGRAPHY',
      experienceRef: 'Experience: Milky Way & Stargazing',
      quote:
        '“As a landscape photographer, timing is everything. Our crew timed the departure down to the minute, getting us set up before the galactic core rose above the smoking crater. Unbelievable precision and mountain mastery.”',
      customerName: 'Sophie Laurent',
      avatarCode: 'SL',
      country: 'France · Lyon',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    },
    {
      id: 'dispatch-04',
      theme: 'sand',
      badge: 'VERIFIED EXPEDITION // BLUE FIRE CRATER',
      experienceRef: 'Experience: Kawah Ijen Electric Blue Fire',
      quote:
        '“Descending into Ijen crater at 2:00 AM was an otherworldly adventure. The gas masks, headlamps, and our certified guide made what could have been an intimidating trek completely seamless and unforgettable.”',
      customerName: 'Liam Hemsworth',
      avatarCode: 'LH',
      country: 'Australia · Melbourne',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    },
    {
      id: 'dispatch-05',
      theme: 'forest',
      badge: 'VERIFIED EXPEDITION // WATERFALL ODYSSEY',
      experienceRef: 'Experience: Tumpak Sewu & Bromo Combo',
      quote:
        '“The panoramic view from the rim of Tumpak Sewu with Mount Semeru towering behind took our breath away. Private hotel pickup in Surabaya and door-to-door logistics made this a 10/10 seamless journey.”',
      customerName: 'Maya & Hiroshi Tanaka',
      avatarCode: 'HT',
      country: 'Japan · Tokyo',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    },
    {
      id: 'dispatch-06',
      theme: 'sand',
      badge: 'VERIFIED EXPEDITION // BORNEO RIVER SAFARI',
      experienceRef: 'Experience: Tanjung Puting Houseboat Cruise',
      quote:
        '“Sleeping on the deck of our private wooden Klotok under the canopy of stars while hearing the sounds of the jungle was magical. Seeing wild orangutans at Camp Leakey was a lifelong dream fulfilled.”',
      customerName: 'Sarah Jenkins',
      avatarCode: 'SJ',
      country: 'United States · California',
      ratingDisplay: '★★★★★ 5.0 · Verified Journey'
    }
  ];

  /* ==========================================================================
     3. REDUCED MOTION DETECTION
     ========================================================================== */
  const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function isReducedMotion() {
    return prefersReducedMotionQuery.matches;
  }

  /* ==========================================================================
     4. RENDER CARDS INTO CAROUSELS BEFORE INITIALIZING CAROUSEL ENGINE
     ========================================================================== */
  function renderTourCards() {
    const track = document.getElementById('toursCarouselTrack');
    if (!track) return;

    track.innerHTML = SAMPLE_TOURS_DATA.map((tour, index) => {
      const idxFormatted = String(index + 1).padStart(2, '0');
      return `
        <article class="tour-card" data-tour-index="${index}" data-tour-title="${escapeHtml(tour.title)}">
          <img
            src="${escapeHtml(tour.image)}"
            alt="${escapeHtml(tour.imageAlt)}"
            class="tour-card-bg"
            loading="lazy"
            draggable="false"
          />
          <div class="tour-card-gradient" aria-hidden="true"></div>

          <div class="tour-card-top">
            <span class="tour-category-pill">${escapeHtml(tour.category)}</span>
            <span class="tour-sample-tag">SAMPLE ${idxFormatted}</span>
          </div>

          <div class="tour-card-bottom">
            <div class="tour-meta-row">
              <span class="tour-duration">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                ${escapeHtml(tour.duration)}
              </span>
            </div>

            <h3 class="tour-title">${escapeHtml(tour.title)}</h3>
            <p class="tour-highlight">${escapeHtml(tour.highlight)}</p>

            <div class="tour-card-footer">
              <div class="tour-price-block">
                <span class="tour-price-label">Start From</span>
                <span class="tour-price-value">${escapeHtml(tour.pricePlaceholder)}</span>
              </div>

              <a
                href="#contact"
                class="tour-explore-btn"
                data-select-tour="${escapeHtml(tour.title)}"
                aria-label="Inquire about ${escapeHtml(tour.title)}"
                draggable="false"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderTestimonialSlides() {
    const track = document.getElementById('testimonialsCarouselTrack');
    if (!track) return;

    track.innerHTML = SAMPLE_TESTIMONIALS_DATA.map((item, index) => {
      const themeClass = item.theme === 'forest' ? 'testimonial-slide--forest' : 'testimonial-slide--sand';
      return `
        <article class="testimonial-slide ${themeClass}" data-testimonial-index="${index}" draggable="false">
          <blockquote class="testimonial-quote">
            ${escapeHtml(item.quote)}
          </blockquote>

          <div class="testimonial-footer">
            <div class="testimonial-guest">
              <div class="guest-avatar-placeholder" aria-hidden="true">${escapeHtml(item.avatarCode)}</div>
              <div class="guest-meta">
                <span class="guest-name">${escapeHtml(item.customerName)}</span>
                <span class="guest-origin">${escapeHtml(item.country)}</span>
              </div>
            </div>

            <div class="guest-rating-col">
              <span class="rating-stars" aria-label="5 stars">★★★★★</span>
              <span class="rating-score">5.0 Verified</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ==========================================================================
     5. INFINITE HORIZONTAL CAROUSEL ENGINE (VANILLA JS)
     Supports:
     - Automatic advance (4-5s for Tours, 5-6s for Testimonials)
     - Seamless infinite looping via cloned head/tail sets
     - Mouse drag & touch swipe with grab/grabbing cursors
     - Suppresses text selection & accidental clicks after dragging
     - Pauses on mouse hover / focus / pointer down, resumes on leave
     - Prev / Next buttons & Keyboard ArrowLeft / ArrowRight navigation
     - Respects prefers-reduced-motion
     ========================================================================== */
  class InfiniteEditorialCarousel {
    constructor(options) {
      this.viewport = document.getElementById(options.viewportId);
      this.track = document.getElementById(options.trackId);
      this.prevBtn = document.getElementById(options.prevBtnId);
      this.nextBtn = document.getElementById(options.nextBtnId);
      this.counterEl = document.getElementById(options.counterId);
      this.progressEl = options.progressId ? document.getElementById(options.progressId) : null;
      this.autoplayMs = options.autoplayMs || 3800;
      this.transitionDurationMs = 850;
      this.transitionEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';
      this.transitionFallbackTimer = null;
      this.isVisible = true;

      if (!this.viewport || !this.track) return;

      this.originalItems = Array.from(this.track.children);
      this.totalOriginal = this.originalItems.length;
      if (this.totalOriginal === 0) return;

      this.cloneCount = this.totalOriginal;
      this.currentIndex = this.cloneCount; // Start at first real item after prepended clones
      this.isTransitioning = false;
      this.isDragging = false;
      this.wasDragged = false;
      this.startX = 0;
      this.startY = 0;
      this.currentTranslate = 0;
      this.prevTranslate = 0;
      this.dragDeltaX = 0;
      this.autoplayTimer = null;
      this.isHovered = false;

      this.init();
    }

    init() {
      this.setupClones();
      this.allSlides = Array.from(this.track.children);
      this.updatePosition(false);
      this.updateIndicators();
      this.bindEvents();
      this.startAutoplay();
    }

    setupClones() {
      const prependFragment = document.createDocumentFragment();
      const appendFragment = document.createDocumentFragment();

      this.originalItems.forEach((item) => {
        const cloneBefore = item.cloneNode(true);
        cloneBefore.setAttribute('aria-hidden', 'true');
        cloneBefore.classList.add('is-clone');
        prependFragment.appendChild(cloneBefore);

        const cloneAfter = item.cloneNode(true);
        cloneAfter.setAttribute('aria-hidden', 'true');
        cloneAfter.classList.add('is-clone');
        appendFragment.appendChild(cloneAfter);
      });

      this.track.insertBefore(prependFragment, this.track.firstChild);
      this.track.appendChild(appendFragment);
    }

    getStepSize() {
      const firstSlide = this.allSlides[0];
      if (!firstSlide) return 380;
      const slideRect = firstSlide.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(this.track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '28') || 28;
      return slideRect.width + gap;
    }

    updatePosition(animate = true) {
      const step = this.getStepSize();
      this.currentTranslate = -this.currentIndex * step;
      this.prevTranslate = this.currentTranslate;

      if (animate && !isReducedMotion()) {
        this.track.style.transition = `transform ${this.transitionDurationMs}ms ${this.transitionEasing}`;
      } else {
        this.track.style.transition = 'none';
      }

      this.track.style.transform = `translate3d(${this.currentTranslate}px, 0, 0)`;

      if (!animate) {
        // Force synchronous reflow to ensure instant jump applies before any subsequent animation
        void this.track.offsetHeight;
      }
    }

    getRealIndex() {
      const raw = (this.currentIndex - this.cloneCount) % this.totalOriginal;
      return raw < 0 ? raw + this.totalOriginal : raw;
    }

    updateIndicators() {
      const realIndex = this.getRealIndex();
      if (this.counterEl) {
        const currentStr = String(realIndex + 1).padStart(2, '0');
        const totalStr = String(this.totalOriginal).padStart(2, '0');
        this.counterEl.textContent = `${currentStr} / ${totalStr}`;
      }
      if (this.progressEl) {
        const pct = ((realIndex + 1) / this.totalOriginal) * 100;
        this.progressEl.style.width = `${pct}%`;
      }
    }

    scheduleTransitionFallback() {
      if (this.transitionFallbackTimer) {
        clearTimeout(this.transitionFallbackTimer);
      }
      this.transitionFallbackTimer = setTimeout(() => {
        if (this.isTransitioning) {
          this.handleLoopBoundary();
        }
      }, this.transitionDurationMs + 80);
    }

    next() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex += 1;
      this.updatePosition(true);
      this.updateIndicators();
      this.scheduleTransitionFallback();

      if (isReducedMotion()) {
        this.handleLoopBoundary();
      }
    }

    prev() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex -= 1;
      this.updatePosition(true);
      this.updateIndicators();
      this.scheduleTransitionFallback();

      if (isReducedMotion()) {
        this.handleLoopBoundary();
      }
    }

    handleLoopBoundary() {
      if (this.transitionFallbackTimer) {
        clearTimeout(this.transitionFallbackTimer);
        this.transitionFallbackTimer = null;
      }
      this.isTransitioning = false;
      while (this.currentIndex >= this.cloneCount + this.totalOriginal) {
        this.currentIndex -= this.totalOriginal;
        this.updatePosition(false);
      }
      while (this.currentIndex < this.cloneCount) {
        this.currentIndex += this.totalOriginal;
        this.updatePosition(false);
      }
    }

    startAutoplay() {
      this.stopAutoplay();
      if (isReducedMotion() || this.isDragging || !this.isVisible) return;

      this.autoplayTimer = window.setInterval(() => {
        if (!document.hidden && !this.isDragging && this.isVisible) {
          this.next();
        }
      }, this.autoplayMs);
    }

    stopAutoplay() {
      if (this.autoplayTimer) {
        window.clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }

    bindEvents() {
      // Transition end for seamless infinite loop jump
      this.track.addEventListener('transitionend', (e) => {
        if (e.target !== this.track) return;
        this.handleLoopBoundary();
      });

      // Pause when off-screen, resume when intersecting viewport
      if ('IntersectionObserver' in window) {
        this.visibilityObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.isVisible = entry.isIntersecting;
              if (this.isVisible) {
                this.startAutoplay();
              } else {
                this.stopAutoplay();
              }
            });
          },
          { threshold: 0.05 }
        );
        this.visibilityObserver.observe(this.viewport);
      }

      // Page visibility change (background tab throttling)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopAutoplay();
        } else if (this.isVisible && !this.isDragging) {
          this.handleLoopBoundary();
          this.startAutoplay();
        }
      });

      // Navigation Buttons (Left/Right manual slide)
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.isTransitioning = false;
          this.next();
          this.startAutoplay();
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.isTransitioning = false;
          this.prev();
          this.startAutoplay();
        });
      }

      // Keyboard navigation when viewport has focus
      this.viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.isTransitioning = false;
          this.next();
          this.startAutoplay();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.isTransitioning = false;
          this.prev();
          this.startAutoplay();
        }
      });

      // Unified Pointer Events (Touch, Mouse, Trackpad swipe right & left)
      this.viewport.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        this.onPointerDown(e);
      });

      this.viewport.addEventListener('pointermove', (e) => {
        if (!this.isDragging) return;
        this.onPointerMove(e);
      });

      this.viewport.addEventListener('pointerup', (e) => {
        if (!this.isDragging) return;
        this.onPointerUp(e);
      });

      this.viewport.addEventListener('pointercancel', (e) => {
        if (!this.isDragging) return;
        this.onPointerUp(e);
      });

      // Prevent accidental link clicks immediately after a drag/swipe gesture
      this.viewport.addEventListener(
        'click',
        (e) => {
          if (this.wasDragged) {
            e.preventDefault();
            e.stopPropagation();
            this.wasDragged = false;
          }
        },
        true
      );

      // Prevent native image drag ghosting
      this.viewport.addEventListener('dragstart', (e) => e.preventDefault());

      // Recalculate dimensions on resize
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          this.isTransitioning = false;
          this.updatePosition(false);
        }, 120);
      });
    }

    onPointerDown(e) {
      if (this.isTransitioning) {
        this.handleLoopBoundary();
      }
      this.isDragging = true;
      this.wasDragged = false;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.dragDeltaX = 0;
      this.viewport.classList.add('is-dragging');
      this.track.style.transition = 'none';
      this.stopAutoplay();

      try {
        if (this.viewport.setPointerCapture) {
          this.viewport.setPointerCapture(e.pointerId);
        }
      } catch (err) { }
    }

    onPointerMove(e) {
      const dx = e.clientX - this.startX;
      const dy = e.clientY - this.startY;

      // Allow natural vertical page scroll if gesture is primarily vertical
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 10) {
        return;
      }

      if (Math.abs(dx) > 6) {
        this.wasDragged = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      this.dragDeltaX = dx;
      this.currentTranslate = this.prevTranslate + dx;
      this.track.style.transform = `translate3d(${this.currentTranslate}px, 0, 0)`;
    }

    onPointerUp(e) {
      this.isDragging = false;
      this.viewport.classList.remove('is-dragging');
      try {
        if (this.viewport.hasPointerCapture && this.viewport.hasPointerCapture(e.pointerId)) {
          this.viewport.releasePointerCapture(e.pointerId);
        }
      } catch (err) { }

      const step = this.getStepSize();
      const threshold = Math.min(45, step * 0.12);

      if (this.dragDeltaX < -threshold) {
        // Swiped Left -> Advance forward to next card
        const slidesMoved = Math.max(1, Math.round(Math.abs(this.dragDeltaX) / step));
        this.currentIndex += slidesMoved;
      } else if (this.dragDeltaX > threshold) {
        // Swiped Right -> Go backward to previous card
        const slidesMoved = Math.max(1, Math.round(Math.abs(this.dragDeltaX) / step));
        this.currentIndex -= slidesMoved;
      }

      this.isTransitioning = true;
      this.updatePosition(true);
      this.updateIndicators();
      this.scheduleTransitionFallback();

      if (isReducedMotion() || Math.abs(this.dragDeltaX) <= threshold) {
        this.handleLoopBoundary();
      }

      // Reset accidental click blocker shortly after release
      window.setTimeout(() => {
        this.wasDragged = false;
      }, 100);

      this.startAutoplay();
    }
  }

  /* ==========================================================================
     5B. CONTINUOUS MARQUEE CAROUSEL (NON-STOP DRIFT + MANUAL SWIPE LEFT/RIGHT)
     Features:
     - Non-stop continuous marquee movement via requestAnimationFrame
     - Seamless infinite loop via clone sets
     - Bi-directional manual drag & swipe (pointer events) to left or right
     - Real-time inertia/momentum deceleration after swipe
     - Arrow buttons (< and >) nudge smooth step navigation
     - Pause when off-screen via IntersectionObserver to conserve resources
     - Never permanently pauses on passive hover
     ========================================================================== */
  class ContinuousMarqueeCarousel {
    constructor(options) {
      this.viewport = document.getElementById(options.viewportId);
      this.track = document.getElementById(options.trackId);
      this.prevBtn = document.getElementById(options.prevBtnId);
      this.nextBtn = document.getElementById(options.nextBtnId);
      this.counterEl = document.getElementById(options.counterId);
      this.progressEl = options.progressId ? document.getElementById(options.progressId) : null;
      this.baseSpeed = options.speed || 1.15; // Pixels per frame (~68px/sec at 60fps)

      if (!this.viewport || !this.track) return;

      this.originalItems = Array.from(this.track.children);
      this.totalOriginal = this.originalItems.length;
      if (this.totalOriginal === 0) return;

      this.currentTranslate = 0;
      this.singleSetWidth = 0;
      this.stepSize = 0;
      this.isDragging = false;
      this.wasDragged = false;
      this.startX = 0;
      this.startY = 0;
      this.dragStartTranslate = 0;
      this.lastPointerX = 0;
      this.lastPointerTime = 0;
      this.velocity = 0;
      this.extraVelocity = 0;
      this.animationFrameId = null;
      this.lastTimestamp = null;
      this.isVisible = true;
      this.isHovered = false;

      this.init();
    }

    init() {
      this.setupClones();
      this.calculateDimensions();
      this.updateIndicators();
      this.bindEvents();
      this.startLoop();
    }

    setupClones() {
      // Clone original items twice so we have 3 total sets:
      // Set 0 (initial items), Set 1 (seamless continuation), Set 2 (extended wide screen buffer)
      const cloneFragment = document.createDocumentFragment();
      this.originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('is-clone');
        cloneFragment.appendChild(clone);
      });
      this.track.appendChild(cloneFragment);

      const cloneFragment2 = document.createDocumentFragment();
      this.originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('is-clone');
        cloneFragment2.appendChild(clone);
      });
      this.track.appendChild(cloneFragment2);
    }

    calculateDimensions() {
      const firstCard = this.track.firstElementChild;
      if (!firstCard) return;
      const cardRect = firstCard.getBoundingClientRect();
      const trackStyle = window.getComputedStyle(this.track);
      const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '28') || 28;
      this.stepSize = cardRect.width + gap;
      this.singleSetWidth = this.stepSize * this.totalOriginal;
    }

    updateIndicators() {
      if (!this.stepSize || !this.singleSetWidth) return;
      const normalized = ((-this.currentTranslate % this.singleSetWidth) + this.singleSetWidth) % this.singleSetWidth;
      const activeIdx = Math.floor(normalized / this.stepSize) % this.totalOriginal;

      if (this.counterEl) {
        const currentStr = String(activeIdx + 1).padStart(2, '0');
        const totalStr = String(this.totalOriginal).padStart(2, '0');
        this.counterEl.textContent = `${currentStr} / ${totalStr}`;
      }
      if (this.progressEl) {
        const pct = ((activeIdx + 1) / this.totalOriginal) * 100;
        this.progressEl.style.width = `${pct}%`;
      }
    }

    applyTransform() {
      if (this.singleSetWidth > 0) {
        while (this.currentTranslate <= -this.singleSetWidth) {
          this.currentTranslate += this.singleSetWidth;
          if (this.isDragging) {
            this.dragStartTranslate += this.singleSetWidth;
          }
        }
        while (this.currentTranslate > 0) {
          this.currentTranslate -= this.singleSetWidth;
          if (this.isDragging) {
            this.dragStartTranslate -= this.singleSetWidth;
          }
        }
      }
      this.track.style.transform = `translate3d(${this.currentTranslate}px, 0, 0)`;
      this.updateIndicators();
    }

    startLoop() {
      if (this.animationFrameId) return;
      this.lastTimestamp = performance.now();
      const loop = (timestamp) => {
        const dt = Math.min(32, timestamp - this.lastTimestamp);
        this.lastTimestamp = timestamp;

        if (!this.isDragging && !this.isHovered && this.isVisible && !isReducedMotion()) {
          // Decay any lingering fling inertia smoothly
          if (Math.abs(this.extraVelocity) > 0.1) {
            this.currentTranslate += this.extraVelocity * (dt / 16.67);
            this.extraVelocity *= 0.94;
          } else {
            this.extraVelocity = 0;
          }

          // Continuous automatic drift (moving right to left without pauses)
          const delta = this.baseSpeed * (dt / 16.67);
          this.currentTranslate -= delta;

          this.applyTransform();
        }

        this.animationFrameId = requestAnimationFrame(loop);
      };

      this.animationFrameId = requestAnimationFrame(loop);
    }

    stopLoop() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }

    nudge(direction) {
      if (!this.stepSize) return;
      const targetDelta = direction * this.stepSize;
      const start = this.currentTranslate;
      const duration = 400;
      const startTime = performance.now();

      const animateNudge = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        this.currentTranslate = start + (targetDelta * ease);
        this.applyTransform();

        if (progress < 1) {
          requestAnimationFrame(animateNudge);
        }
      };

      requestAnimationFrame(animateNudge);
    }

    bindEvents() {
      // Pause animation loop when off-screen to save GPU/battery
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.isVisible = entry.isIntersecting;
              if (this.isVisible) {
                this.lastTimestamp = performance.now();
              }
            });
          },
          { threshold: 0.05 }
        );
        this.observer.observe(this.viewport);
      }

      // Page visibility change
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          this.lastTimestamp = performance.now();
        }
      });

      // Navigation Buttons (Manual swap left & right)
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.nudge(-1);
        });
      }

      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.nudge(1);
        });
      }

      // Keyboard navigation
      this.viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.nudge(-1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.nudge(1);
        }
      });

      // Hold (pause) marquee drift when mouse cursor is hovering over the carousel
      this.viewport.addEventListener('mouseenter', () => {
        this.isHovered = true;
      });

      this.viewport.addEventListener('mouseleave', () => {
        this.isHovered = false;
        this.lastTimestamp = performance.now();
      });

      // Unified Pointer Events for Touch / Mouse Dragging & Swiping
      this.viewport.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        this.isDragging = true;
        this.wasDragged = false;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.dragStartTranslate = this.currentTranslate;
        this.lastPointerX = e.clientX;
        this.lastPointerTime = performance.now();
        this.velocity = 0;
        this.extraVelocity = 0;

        this.viewport.classList.add('is-dragging');
        this.track.style.transition = 'none';

        try {
          if (this.viewport.setPointerCapture) {
            this.viewport.setPointerCapture(e.pointerId);
          }
        } catch (err) { }
      });

      this.viewport.addEventListener('pointermove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        // Allow natural vertical scroll on touch if moving vertically
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dx) < 10) {
          return;
        }

        if (Math.abs(dx) > 6) {
          this.wasDragged = true;
          if (e.cancelable) {
            e.preventDefault();
          }
        }

        const now = performance.now();
        const dt = now - this.lastPointerTime;
        if (dt > 8) {
          this.velocity = (e.clientX - this.lastPointerX) / dt;
          this.lastPointerX = e.clientX;
          this.lastPointerTime = now;
        }

        this.currentTranslate = this.dragStartTranslate + dx;
        this.applyTransform();
      });

      const onPointerEnd = (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.viewport.classList.remove('is-dragging');

        try {
          if (this.viewport.hasPointerCapture && this.viewport.hasPointerCapture(e.pointerId)) {
            this.viewport.releasePointerCapture(e.pointerId);
          }
        } catch (err) { }

        // Transfer swipe fling velocity to extraVelocity for smooth momentum
        if (Math.abs(this.velocity) > 0.15) {
          this.extraVelocity = Math.max(-25, Math.min(25, this.velocity * 16));
        }

        if (e.pointerType === 'touch') {
          this.isHovered = false;
        }

        this.lastTimestamp = performance.now();

        window.setTimeout(() => {
          this.wasDragged = false;
        }, 120);
      };

      this.viewport.addEventListener('pointerup', onPointerEnd);
      this.viewport.addEventListener('pointercancel', onPointerEnd);

      // Prevent link clicks if user was actively dragging/swiping
      this.viewport.addEventListener(
        'click',
        (e) => {
          if (this.wasDragged) {
            e.preventDefault();
            e.stopPropagation();
            this.wasDragged = false;
          }
        },
        true
      );

      // Prevent native ghost image drag
      this.viewport.addEventListener('dragstart', (e) => e.preventDefault());

      // Resize & load recalculations
      window.addEventListener('load', () => {
        this.calculateDimensions();
        this.applyTransform();
      });

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          this.calculateDimensions();
          this.applyTransform();
        }, 120);
      });
    }
  }

  /* ==========================================================================
     6. STICKY HEADER, MOBILE DRAWER & ACTIVE NAV LINK TRACKING
     ========================================================================== */
  function initNavigation() {
    const header = document.getElementById('siteHeader');
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const heroImg = document.getElementById('heroParallaxImg');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-footer a');

    function closeMobileMenu() {
      if (!mobileToggle || !mobileDrawer) return;
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
      if (!mobileToggle || !mobileDrawer) return;
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        mobileToggle.classList.add('is-active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileDrawer.classList.add('is-open');
        mobileDrawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    // Scroll handler for sticky header, back-to-top button, and subtle hero parallax
    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        if (scrollY > 48) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 560) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      }

      // Subtle parallax on hero image if reduced motion is off
      if (heroImg && scrollY < 950 && !isReducedMotion()) {
        const translateY = scrollY * 0.16;
        heroImg.style.transform = `scale(1.04) translate3d(0, ${translateY}px, 0)`;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: isReducedMotion() ? 'auto' : 'smooth'
        });
      });
    }

    // Active section observer for nav links
    const trackedSections = ['home', 'about', 'experiences', 'tours', 'why-us', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if ('IntersectionObserver' in window && trackedSections.length) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const activeId = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === `#${activeId}`);
              });
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
      );

      trackedSections.forEach((sec) => navObserver.observe(sec));
    }
  }

  /* ==========================================================================
     6B. WHY US LEDGER ACTIVE CONTROLLER (SECTION 07)
     ========================================================================== */
  function initWhyUsLedger() {
    const list = document.querySelector('.why-ledger-list');
    if (!list) return;

    const rows = Array.from(list.querySelectorAll('.why-ledger-row'));
    if (!rows.length) return;

    // By default ensure first item is active
    rows[0].classList.add('is-active');

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        rows.forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
      });

      row.addEventListener('click', () => {
        rows.forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
      });
    });

    list.addEventListener('mouseleave', () => {
      // Revert active green state back to the first row when mouse leaves the list
      rows.forEach((r, idx) => {
        r.classList.toggle('is-active', idx === 0);
      });
    });
  }

  /* ==========================================================================
     7. INTERACTIVE FAQ ACCORDION (SECTION 12)
     ========================================================================== */
  function initFaqAccordion() {
    const accordion = document.getElementById('faqAccordion');
    if (!accordion) return;

    const items = Array.from(accordion.querySelectorAll('.faq-item'));

    items.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isCurrentlyOpen = item.classList.contains('is-open');

        // Close other open items for clean editorial focus
        items.forEach((otherItem) => {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          otherItem.classList.remove('is-open');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.hidden = true;
        });

        // Toggle current item
        if (!isCurrentlyOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });
  }

  /* ==========================================================================
     8. TOUR PRE-SELECTION LINKS & DIRECT WHATSAPP LINKS
     ========================================================================== */
  function buildWhatsAppUrl(messageText) {
    const cleanPhone = String(BROMO_CONFIG.whatsappNumber).replace(/[^\d]/g, '');
    const encodedMsg = encodeURIComponent(messageText);
    return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }

  function initWhatsAppAndTourTriggers() {
    // Update display text of configurable WhatsApp number in footer
    const waDisplays = document.querySelectorAll('.js-whatsapp-display');
    waDisplays.forEach((el) => {
      el.textContent = BROMO_CONFIG.whatsappDisplay;
    });

    // Direct WhatsApp CTA buttons
    const directWaButtons = document.querySelectorAll('.js-whatsapp-direct');
    directWaButtons.forEach((btn) => {
      const context = btn.getAttribute('data-wa-context') || 'Website Direct Inquiry';
      const msg = `${BROMO_CONFIG.defaultDirectMessage}\n\n(Source: ${context})`;
      btn.setAttribute('href', buildWhatsAppUrl(msg));
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

    // Pre-select tour dropdown when clicking a tour card arrow or popular experience link
    document.addEventListener('click', (e) => {
      const selectTrigger = e.target.closest('[data-select-tour]');
      if (!selectTrigger) return;

      const tourName = selectTrigger.getAttribute('data-select-tour');
      const tourSelect = document.getElementById('preferredTour');
      if (tourSelect && tourName) {
        const matchingOption = Array.from(tourSelect.options).find(
          (opt) => opt.value.toLowerCase() === tourName.toLowerCase()
        );
        if (matchingOption) {
          tourSelect.value = matchingOption.value;
        }
      }
    });
  }

  /* ==========================================================================
     9. TRAVEL INQUIRY FORM VALIDATION & STRUCTURED WHATSAPP GENERATOR
     ========================================================================== */
  function initInquiryForm() {
    const form = document.getElementById('travelInquiryForm');
    if (!form) return;

    const feedbackBox = document.getElementById('formFeedback');
    const travelDateInput = document.getElementById('travelDate');

    // Set sensible minimum date to today
    if (travelDateInput) {
      const todayIso = new Date().toISOString().split('T')[0];
      travelDateInput.setAttribute('min', todayIso);
    }

    const validators = {
      fullName: (val) => {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
      emailAddress: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(val.trim())) return 'Please enter a valid email address (e.g. name@domain.com).';
        return '';
      },
      whatsappNumber: (val) => {
        if (!val.trim()) return 'Please enter your WhatsApp number with country code.';
        const digits = val.replace(/[^\d+]/g, '');
        if (digits.length < 7) return 'Please enter a valid phone/WhatsApp number (at least 7 digits).';
        return '';
      },
      travelDate: (val) => {
        if (!val.trim()) return 'Please choose your preferred travel date.';
        return '';
      },
      travelersCount: (val) => {
        if (!val.trim()) return 'Please select the number of travelers.';
        return '';
      },
      preferredTour: (val) => {
        if (!val.trim()) return 'Please select a preferred tour or experience.';
        return '';
      }
    };

    function validateField(fieldId) {
      const input = document.getElementById(fieldId);
      const errorEl = document.getElementById(`error-${fieldId}`);
      if (!input || !validators[fieldId]) return true;

      const errorMsg = validators[fieldId](input.value);
      if (errorMsg) {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) errorEl.textContent = errorMsg;
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        if (errorEl) errorEl.textContent = '';
        return true;
      }
    }

    // Real-time clear error on input/change
    Object.keys(validators).forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (!input) return;
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(fieldId);
        }
      });
      input.addEventListener('blur', () => validateField(fieldId));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalidInput = null;

      Object.keys(validators).forEach((fieldId) => {
        const valid = validateField(fieldId);
        if (!valid) {
          isFormValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = document.getElementById(fieldId);
          }
        }
      });

      if (!isFormValid) {
        if (feedbackBox) {
          feedbackBox.hidden = true;
          feedbackBox.className = 'form-feedback';
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Gather validated values
      const fullName = document.getElementById('fullName').value.trim();
      const emailAddress = document.getElementById('emailAddress').value.trim();
      const whatsappNumber = document.getElementById('whatsappNumber').value.trim();
      const travelDate = document.getElementById('travelDate').value.trim();
      const travelersCount = document.getElementById('travelersCount').value.trim();
      const preferredTour = document.getElementById('preferredTour').value.trim();
      const additionalMessage = document.getElementById('additionalMessage').value.trim();

      // Build structured WhatsApp message
      const structuredMessage = [
        `*NEW MOUNT BROMO TRAVEL INQUIRY — ${BROMO_CONFIG.brandName}*`,
        `----------------------------------------`,
        `*Full Name:* ${fullName}`,
        `*Email Address:* ${emailAddress}`,
        `*Guest WhatsApp:* ${whatsappNumber}`,
        `*Preferred Travel Date:* ${travelDate}`,
        `*Number of Travelers:* ${travelersCount}`,
        `*Preferred Tour:* ${preferredTour}`,
        `*Additional Notes:* ${additionalMessage || 'None specified'}`,
        `----------------------------------------`,
        `Sent via BROMO TOURS Web Inquiry Dispatch`
      ].join('\n');

      const waUrl = buildWhatsAppUrl(structuredMessage);

      // Honest static feedback + direct wa.me redirect
      if (feedbackBox) {
        feedbackBox.hidden = false;
        feedbackBox.className = 'form-feedback is-success';
        feedbackBox.innerHTML = `
          <strong>Inquiry Formatted for WhatsApp!</strong> Redirecting you to WhatsApp to send your travel brief directly to our team.
          If a new tab did not open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;font-weight:700;">click here to open WhatsApp</a>.
        `;
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ==========================================================================
     10. SCROLL REVEAL OBSERVER
     ========================================================================== */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    if (isReducedMotion() || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ==========================================================================
     11. INITIALIZE ALL MODULES ON DOM READY
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Render dynamic sample cards into DOM
    renderTourCards();
    renderTestimonialSlides();

    // 2. Initialize Section 05 Featured Tours Carousel (Continuous Marquee Script + Manual Swipe/Drag)
    new ContinuousMarqueeCarousel({
      viewportId: 'toursCarouselViewport',
      trackId: 'toursCarouselTrack',
      prevBtnId: 'toursPrevBtn',
      nextBtnId: 'toursNextBtn',
      counterId: 'toursCounter',
      progressId: 'toursProgressFill',
      speed: 1.15
    });

    // 3. Initialize Section 07 Testimonials Carousel (Continuous Marquee Script + Manual Swipe/Drag)
    new ContinuousMarqueeCarousel({
      viewportId: 'testimonialsCarouselViewport',
      trackId: 'testimonialsCarouselTrack',
      prevBtnId: 'testimonialsPrevBtn',
      nextBtnId: 'testimonialsNextBtn',
      counterId: 'testimonialsCounter',
      progressId: 'testimonialsProgressFill',
      speed: 1.05
    });

    // 4. Initialize Navigation, Why Us Ledger, FAQ Accordion, WhatsApp links, Form validation & Scroll Reveal
    initNavigation();
    initWhyUsLedger();
    initFaqAccordion();
    initWhatsAppAndTourTriggers();
    initInquiryForm();
    initScrollReveal();

    // 5. Dynamic copyright year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  });
})();
