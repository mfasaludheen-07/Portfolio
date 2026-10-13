/**
 * Main Application Script
 * -------------------------------------------------------------
 * Handles:
 * - Dynamic config rendering with safe text injection
 * - Pinned desktop horizontal project scrolling engine
 * - Accessible project modal dialog
 * - Soft purple cursor follower with lerp interpolation
 * - Abstract purple orbital canvas visual
 * - Copy email to clipboard with accessible toast
 * - Responsive mobile menu with ARIA states
 * - Scroll reveals and navigation smooth scrolling
 */

import {
  portfolioConfig,
  isConfigured,
  isValidUrl,
  isValidEmail
} from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  // Remove no-js flag if present
  document.documentElement.classList.remove('no-js');

  initPersonalData();
  initSocialAndContact();
  initTimeline();
  initProjects();
  initTools();
  initNavigation();
  initCursorFollower();
  initOrbitalVisual();
  initHorizontalScroll();
  initScrollReveals();
});

/* -------------------------------------------------------------
   1. Personal & Contact Information Binding
   ------------------------------------------------------------- */
function initPersonalData() {
  const { personal } = portfolioConfig;

  // Safe fallback name
  const displayName = isConfigured(personal.name) ? personal.name : 'PORTFOLIO';
  const displayInitials = isConfigured(personal.initials) ? personal.initials : 'PF';

  // Page Title & Header Initials
  document.title = `${displayName} — ${personal.role}`;
  
  const brandInitialsEl = document.getElementById('brand-initials');
  if (brandInitialsEl) brandInitialsEl.textContent = displayInitials;

  // Hero Name & Role
  const heroNameEl = document.getElementById('hero-name');
  if (heroNameEl) heroNameEl.textContent = displayName;

  const heroRoleEl = document.getElementById('hero-role');
  if (heroRoleEl && isConfigured(personal.role)) {
    heroRoleEl.textContent = personal.role;
  }

  // Hero Intro
  const heroIntroEl = document.getElementById('hero-intro');
  if (heroIntroEl && isConfigured(personal.intro)) {
    heroIntroEl.textContent = personal.intro;
  }

  // About Section
  const aboutHeadingEl = document.getElementById('about-heading');
  if (aboutHeadingEl && isConfigured(personal.aboutHeading)) {
    aboutHeadingEl.textContent = personal.aboutHeading;
  }

  const aboutBioEl = document.getElementById('about-bio');
  if (aboutBioEl && isConfigured(personal.aboutBio)) {
    aboutBioEl.textContent = personal.aboutBio;
  }

  // Location
  const aboutLocationItem = document.getElementById('meta-location-item');
  const aboutLocationVal = document.getElementById('meta-location-value');
  if (aboutLocationVal && aboutLocationItem) {
    if (isConfigured(personal.location)) {
      aboutLocationVal.textContent = personal.location;
      aboutLocationItem.style.display = 'flex';
    } else {
      aboutLocationItem.style.display = 'none';
    }
  }

  // Watermark Name in Footer
  const watermarkEl = document.getElementById('subdued-watermark');
  if (watermarkEl) watermarkEl.textContent = displayName;

  // Copyright Year
  const copyrightYearEl = document.getElementById('copyright-year');
  if (copyrightYearEl) {
    copyrightYearEl.textContent = new Date().getFullYear();
  }
}

/* -------------------------------------------------------------
   2. Social Rail, Resume & Contact Actions
   ------------------------------------------------------------- */
function initSocialAndContact() {
  const { personal, social } = portfolioConfig;

  // Header Center Email
  const headerEmailEl = document.getElementById('header-center-email');
  if (headerEmailEl) {
    if (isValidEmail(personal.email)) {
      headerEmailEl.textContent = personal.email;
      headerEmailEl.href = `mailto:${personal.email}`;
      headerEmailEl.style.display = 'inline-block';
    } else {
      headerEmailEl.style.display = 'none';
    }
  }

  // Social Links Containers
  const railContainer = document.getElementById('social-rail-list');
  const mobileSocialContainer = document.getElementById('mobile-social-list');
  const footerSocialContainer = document.getElementById('footer-social-list');

  const socialLinks = [
    { key: 'github', label: 'GitHub', url: social.github, icon: 'assets/icons/github.svg' },
    { key: 'linkedin', label: 'LinkedIn', url: social.linkedin, icon: 'assets/icons/linkedin.svg' },
    { key: 'instagram', label: 'Instagram', url: social.instagram, icon: 'assets/icons/instagram.svg' }
  ];

  const activeSocials = socialLinks.filter(s => isValidUrl(s.url));

  function renderSocialLinks(container, className) {
    if (!container) return;
    container.innerHTML = '';
    activeSocials.forEach(item => {
      const a = document.createElement('a');
      a.className = className;
      const href = item.url.startsWith('www.') ? `https://${item.url}` : item.url;
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', item.label);
      a.innerHTML = `<img src="${item.icon}" alt="" width="18" height="18" loading="lazy" />`;
      container.appendChild(a);
    });
  }

  if (activeSocials.length > 0) {
    renderSocialLinks(railContainer, 'social-rail-item');
    renderSocialLinks(mobileSocialContainer, 'social-rail-item');
    renderSocialLinks(footerSocialContainer, 'footer-social-link');
  } else {
    if (railContainer) railContainer.style.display = 'none';
    if (mobileSocialContainer) mobileSocialContainer.style.display = 'none';
  }

  // Resume Fixed Link (Desktop & Mobile)
  const resumeFixedBtn = document.getElementById('resume-fixed-btn');
  const mobileResumeItem = document.getElementById('mobile-resume-item');

  if (isValidUrl(social.resume)) {
    if (resumeFixedBtn) {
      resumeFixedBtn.href = social.resume;
      resumeFixedBtn.style.display = 'inline-flex';
    }
    if (mobileResumeItem) {
      mobileResumeItem.href = social.resume;
      mobileResumeItem.style.display = 'inline-block';
    }
  } else {
    if (resumeFixedBtn) resumeFixedBtn.style.display = 'none';
    if (mobileResumeItem) mobileResumeItem.style.display = 'none';
  }

  // Contact Action Buttons
  const contactEmailBtn = document.getElementById('contact-email-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyToast = document.getElementById('copy-toast');

  if (isValidEmail(personal.email)) {
    if (contactEmailBtn) {
      contactEmailBtn.href = `mailto:${personal.email}`;
      contactEmailBtn.style.display = 'inline-flex';
    }
    if (copyEmailBtn) {
      copyEmailBtn.style.display = 'inline-flex';
      copyEmailBtn.addEventListener('click', async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(personal.email);
          } else {
            // Fallback for older browsers
            const input = document.createElement('input');
            input.value = personal.email;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
          }

          if (copyToast) {
            copyToast.classList.add('visible');
            setTimeout(() => {
              copyToast.classList.remove('visible');
            }, 2500);
          }
        } catch (err) {
          console.warn('Clipboard copy failed:', err);
        }
      });
    }
  } else {
    if (contactEmailBtn) contactEmailBtn.style.display = 'none';
    if (copyEmailBtn) copyEmailBtn.style.display = 'none';
  }
}

/* -------------------------------------------------------------
   3. Career & Experience Timeline Binding
   ------------------------------------------------------------- */
function initTimeline() {
  const { timeline } = portfolioConfig;
  const desktopContainer = document.getElementById('timeline-desktop-track');
  const mobileContainer = document.getElementById('timeline-mobile-track');

  if (!timeline || timeline.length === 0) return;

  // Render Desktop Layout
  if (desktopContainer) {
    desktopContainer.innerHTML = '';
    timeline.forEach(item => {
      const row = document.createElement('div');
      row.className = 'timeline-item reveal-item';

      const isNow = item.year.toUpperCase() === 'NOW';

      row.innerHTML = `
        <div class="timeline-role-col">
          <div class="timeline-role-title">${escapeHTML(item.role)}</div>
          ${isNow ? '<span class="timeline-badge-now">CURRENT FOCUS</span>' : ''}
        </div>
        <div class="timeline-center-col">
          <div class="timeline-marker-glow"></div>
          <span class="timeline-year-text">${escapeHTML(item.year)}</span>
        </div>
        <div class="timeline-desc-col">
          <p class="timeline-desc-text">${escapeHTML(item.description)}</p>
        </div>
      `;
      desktopContainer.appendChild(row);
    });
  }

  // Render Mobile Layout
  if (mobileContainer) {
    mobileContainer.innerHTML = '';
    timeline.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'timeline-mobile-item reveal-item';

      itemEl.innerHTML = `
        <div class="timeline-mobile-marker"></div>
        <div class="timeline-mobile-year">${escapeHTML(item.year)}</div>
        <div class="timeline-mobile-role">${escapeHTML(item.role)}</div>
        <p class="timeline-mobile-desc">${escapeHTML(item.description)}</p>
      `;
      mobileContainer.appendChild(itemEl);
    });
  }
}

/* -------------------------------------------------------------
   4. Projects Showcase & Accessible Modal Dialog
   ------------------------------------------------------------- */
function initProjects() {
  const { projects } = portfolioConfig;
  const track = document.getElementById('horizontal-track');
  const modal = document.getElementById('project-modal');

  if (!track || !projects) return;

  track.innerHTML = '';

  projects.forEach((proj, index) => {
    const isAlternate = index % 2 === 1;
    const card = document.createElement('article');
    card.className = `project-card ${isAlternate ? 'alternate-layout' : ''}`;
    card.id = `project-${proj.id}`;

    // Tag list
    const tagsHtml = (proj.tools || [])
      .map(tool => `<li class="project-tag">${escapeHTML(tool)}</li>`)
      .join('');

    // Optional external actions
    let actionButtonsHtml = `
      <button type="button" class="btn btn-details" data-project-id="${proj.id}" aria-label="View details about ${escapeHTML(proj.title)}">
        Details &amp; Features &rarr;
      </button>
    `;

    if (isValidUrl(proj.liveUrl)) {
      actionButtonsHtml += `
        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.8rem; padding: 0.55rem 1rem;">
          Live Demo ↗
        </a>
      `;
    }

    if (isValidUrl(proj.sourceUrl)) {
      actionButtonsHtml += `
        <a href="${proj.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.8rem; padding: 0.55rem 1rem;">
          Source Code
        </a>
      `;
    }

    card.innerHTML = `
      <div class="project-info">
        <div class="project-top-row">
          <span class="project-number">${escapeHTML(proj.number)}</span>
          <span class="project-category">${escapeHTML(proj.category)}</span>
        </div>
        <h3 class="project-title">${escapeHTML(proj.title)}</h3>
        <p class="project-summary">${escapeHTML(proj.summary)}</p>
        <div class="project-tools-block">
          <span class="tools-label">Tools and features</span>
          <ul class="project-tags-list">
            ${tagsHtml}
          </ul>
        </div>
        <div class="project-actions">
          ${actionButtonsHtml}
        </div>
      </div>
      <div class="project-visual-wrapper" data-project-id="${proj.id}" role="button" tabindex="0" aria-label="Open details for ${escapeHTML(proj.title)}">
        <img 
          src="${proj.image}" 
          alt="${escapeHTML(proj.imageAlt || proj.title)}" 
          class="project-thumbnail" 
          width="800" 
          height="500" 
          loading="lazy" 
        />
        <div class="project-visual-overlay"></div>
      </div>
    `;

    track.appendChild(card);
  });

  // Modal Dialog Interaction
  let lastActiveElement = null;

  function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project || !modal) return;

    lastActiveElement = document.activeElement;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalTags = document.getElementById('modal-tags');
    const modalActions = document.getElementById('modal-actions');

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalCategory) modalCategory.textContent = project.category;
    if (modalDescription) modalDescription.textContent = project.fullDescription || project.summary;

    if (modalFeatures) {
      modalFeatures.innerHTML = (project.features || [])
        .map(
          feat => `
          <li class="modal-feature-item">
            <span class="modal-feature-bullet">&#9670;</span>
            <span>${escapeHTML(feat)}</span>
          </li>`
        )
        .join('');
    }

    if (modalTags) {
      modalTags.innerHTML = (project.tools || [])
        .map(t => `<li class="project-tag">${escapeHTML(t)}</li>`)
        .join('');
    }

    if (modalActions) {
      let actionsHtml = '';
      if (isValidUrl(project.liveUrl)) {
        actionsHtml += `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size:0.85rem; padding: 0.6rem 1.2rem;">Live Demo ↗</a>`;
      }
      if (isValidUrl(project.sourceUrl)) {
        actionsHtml += `<a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.85rem; padding: 0.6rem 1.2rem;">Source Code</a>`;
      }
      modalActions.innerHTML = actionsHtml;
    }

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', 'true');
    }

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeProjectModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // Event Listeners for Details Buttons & Visual Thumbnails
  track.addEventListener('click', e => {
    const trigger = e.target.closest('[data-project-id]');
    if (trigger) {
      const id = trigger.getAttribute('data-project-id');
      openProjectModal(id);
    }
  });

  track.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const trigger = e.target.closest('.project-visual-wrapper[data-project-id]');
      if (trigger) {
        e.preventDefault();
        const id = trigger.getAttribute('data-project-id');
        openProjectModal(id);
      }
    }
  });

  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', e => {
      const rect = modal.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeProjectModal();
      }
    });

    modal.addEventListener('cancel', e => {
      e.preventDefault();
      closeProjectModal();
    });
  }
}

/* -------------------------------------------------------------
   5. Tools & Interests ("Tools I Use & Explore")
   ------------------------------------------------------------- */
function initTools() {
  const { tools } = portfolioConfig;
  const grid = document.getElementById('tools-grid');

  if (!grid || !tools) return;

  grid.innerHTML = '';
  tools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'tool-card reveal-item';
    card.setAttribute('title', `${tool.name} (${tool.category})`);

    card.innerHTML = `
      <div class="tool-icon-wrapper">
        <img src="${tool.icon}" alt="" width="28" height="28" loading="lazy" />
      </div>
      <span class="tool-name">${escapeHTML(tool.name)}</span>
      <span class="tool-category">${escapeHTML(tool.category)}</span>
    `;

    grid.appendChild(card);
  });
}

/* -------------------------------------------------------------
   6. Navigation & Mobile Drawer
   ------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains('open');
    if (shouldOpen) {
      drawer?.classList.add('open');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      drawer?.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  toggleBtn?.addEventListener('click', () => toggleDrawer());

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer?.classList.contains('open')) {
      toggleDrawer(false);
      toggleBtn?.focus();
    }
  });
}

/* -------------------------------------------------------------
   7. Pinned Desktop Horizontal Project Scroll Engine
   ------------------------------------------------------------- */
function initHorizontalScroll() {
  const container = document.getElementById('horizontal-scroll-section');
  const track = document.getElementById('horizontal-track');
  const viewport = document.querySelector('.horizontal-sticky-viewport');

  if (!container || !track || !viewport) return;

  const projectCount = portfolioConfig.projects ? portfolioConfig.projects.length : 0;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If 1 or fewer projects, center it beautifully without excessive empty scroll height
  if (projectCount <= 1) {
    container.classList.add('single-project');
    track.classList.add('single-project');
    track.style.transform = 'none';
    return;
  }

  container.classList.remove('single-project');
  track.classList.remove('single-project');
  container.style.height = `${(projectCount + 0.6) * 100}vh`;

  function updateScroll() {
    if (window.innerWidth < 992 || isReducedMotion || projectCount <= 1) {
      track.style.transform = 'none';
      return;
    }

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // How much vertical distance is scrolled within container
    const scrollDistance = containerHeight - viewportHeight;
    if (scrollDistance <= 0) return;

    // Current scrolled progress through section
    const currentScroll = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScroll / scrollDistance));

    // Total horizontal travel needed
    const trackWidth = track.scrollWidth;
    const availableWidth = viewport.clientWidth;
    const maxTranslate = Math.max(0, trackWidth - availableWidth + 40);

    const translateX = -(progress * maxTranslate);
    track.style.transform = `translateX(${translateX}px)`;
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll);

  // Recalculate once images are loaded
  window.addEventListener('load', updateScroll);
  setTimeout(updateScroll, 300);
}

/* -------------------------------------------------------------
   8. Soft Purple Cursor Follower with Lerp Interpolation
   ------------------------------------------------------------- */
function initCursorFollower() {
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hasFinePointer || isReducedMotion) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';

  document.body.appendChild(dot);
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isMoving) {
      document.body.classList.add('cursor-active');
      isMoving = true;
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-active');
    isMoving = false;
  });

  // Hover detection for interactive targets
  const interactiveSelector = 'a, button, [role="button"], input, textarea, .project-card, .tool-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // RAF loop for smooth lerping
  function renderCursor() {
    glowX += (mouseX - glowX) * 0.16;
    glowY += (mouseY - glowY) * 0.16;

    glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}

/* -------------------------------------------------------------
   9. Abstract Purple Orbital Visual (Hero)
   ------------------------------------------------------------- */
function initOrbitalVisual() {
  const canvas = document.getElementById('hero-orbital-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.offsetWidth || 480);
  let height = (canvas.height = canvas.offsetHeight || 480);

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Orbital rings configuration
  const rings = [
    { radiusX: 190, radiusY: 65, tilt: -0.4, speed: 0.006, color: 'rgba(164, 107, 238, 0.45)' },
    { radiusX: 145, radiusY: 52, tilt: 0.65, speed: -0.008, color: 'rgba(197, 148, 245, 0.35)' },
    { radiusX: 95, radiusY: 38, tilt: -1.05, speed: 0.012, color: 'rgba(164, 107, 238, 0.55)' }
  ];

  // Satellites orbiting on the rings
  const satellites = [
    { ringIndex: 0, angle: 0, size: 5, color: '#C594F5', glow: '#A46BEE' },
    { ringIndex: 0, angle: Math.PI, size: 3.5, color: '#A46BEE', glow: '#A46BEE' },
    { ringIndex: 1, angle: Math.PI * 0.5, size: 4.5, color: '#F3EFF8', glow: '#C594F5' },
    { ringIndex: 2, angle: Math.PI * 1.3, size: 4, color: '#C594F5', glow: '#A46BEE' }
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      width = canvas.width = rect.width * window.devicePixelRatio;
      height = canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  window.addEventListener('resize', resize);
  resize();

  let time = 0;

  function draw() {
    const displayWidth = canvas.width / window.devicePixelRatio;
    const displayHeight = canvas.height / window.devicePixelRatio;
    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Subtle central pulsating energy core
    const corePulse = Math.sin(time * 0.03) * 4;
    const coreGrad = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 45 + corePulse
    );
    coreGrad.addColorStop(0, 'rgba(197, 148, 245, 0.45)');
    coreGrad.addColorStop(0.35, 'rgba(164, 107, 238, 0.22)');
    coreGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 55 + corePulse, 0, Math.PI * 2);
    ctx.fill();

    // Central core solid jewel
    ctx.fillStyle = '#A46BEE';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Render elliptical orbits
    rings.forEach((ring, i) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(ring.tilt);

      ctx.beginPath();
      ctx.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI * 2);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      ctx.restore();
    });

    // Render orbiting satellite nodes
    satellites.forEach(sat => {
      const ring = rings[sat.ringIndex];
      if (!isReducedMotion) {
        sat.angle += ring.speed;
      }

      // Ellipse parametric coordinates with rotation
      const rawX = Math.cos(sat.angle) * ring.radiusX;
      const rawY = Math.sin(sat.angle) * ring.radiusY;

      const cosTilt = Math.cos(ring.tilt);
      const sinTilt = Math.sin(ring.tilt);

      const rotatedX = centerX + (rawX * cosTilt - rawY * sinTilt);
      const rotatedY = centerY + (rawX * sinTilt + rawY * cosTilt);

      // Node glow
      ctx.shadowColor = sat.glow;
      ctx.shadowBlur = 10;
      ctx.fillStyle = sat.color;
      ctx.beginPath();
      ctx.arc(rotatedX, rotatedY, sat.size, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadow
      ctx.shadowBlur = 0;
    });

    time++;
    if (!isReducedMotion) {
      requestAnimationFrame(draw);
    }
  }

  draw();
}

/* -------------------------------------------------------------
   10. Scroll Reveals (Intersection Observer)
   ------------------------------------------------------------- */
function initScrollReveals() {
  const items = document.querySelectorAll('.reveal-item');
  if (!items.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    items.forEach(el => observer.observe(el));
  } else {
    // Fallback: reveal all immediately
    items.forEach(el => el.classList.add('revealed'));
  }
}

/* -------------------------------------------------------------
   Helper: Safe Text Escaper for HTML Template Literals
   ------------------------------------------------------------- */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
