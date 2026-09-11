/**
 * The Liora — Premium Botanical Beverage Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initColorShiftDemo();
  initPartnerCalculator();
  initFormHandlers();
  initScrollObserver();
  initWaterRippleCanvas();
});

/* ==========================================================================
   Navigation & Mobile Menu
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Sticky Header state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) lucide.createIcons();
      }
    });

    // Close menu when link clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (window.lucide) {
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      });
    });
  }

  // Nav link active state monitoring on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   Butterfly Pea Interactive pH Color-Shift Simulator
   ========================================================================== */
function initColorShiftDemo() {
  const previewBar = document.getElementById('colorPreviewBar');
  const statusText = document.getElementById('shiftStatusText');
  const shiftButtons = document.querySelectorAll('.shift-btn');

  if (!previewBar || !shiftButtons.length) return;

  const states = {
    pure: {
      bg: 'linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%)',
      text: 'Natural Blue (pH 7.0 — Pure Butterfly Pea Infusion)',
      color: '#ffffff'
    },
    mild: {
      bg: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
      text: 'Deep Royal Indigo (pH 5.5 — Hint of Fresh Lemon)',
      color: '#ffffff'
    },
    citrus: {
      bg: 'linear-gradient(90deg, #9333ea 0%, #c026d3 100%)',
      text: 'Vibrant Magenta Violet (pH 4.0 — Fresh Citrus Infused)',
      color: '#ffffff'
    }
  };

  shiftButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      shiftButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stateKey = btn.getAttribute('data-shift');
      const state = states[stateKey];

      if (state) {
        previewBar.style.background = state.bg;
        previewBar.style.color = state.color;
        if (statusText) statusText.textContent = state.text;
      }
    });
  });
}

/* ==========================================================================
   Wholesale Partner Business Calculator
   ========================================================================== */
function initPartnerCalculator() {
  const businessTypeSelect = document.getElementById('calcBusinessType');
  const volumeRange = document.getElementById('calcVolumeRange');
  const volumeDisplay = document.getElementById('calcVolumeValue');
  const tierDisplay = document.getElementById('calcTierDisplay');
  const impactDisplay = document.getElementById('calcImpactDisplay');

  if (!volumeRange || !volumeDisplay) return;

  function updateCalculator() {
    const volume = parseInt(volumeRange.value, 10);
    const bType = businessTypeSelect ? businessTypeSelect.value : 'cafe';
    volumeDisplay.textContent = `${volume} bottles / week`;

    let tier = 'Standard Retail Partner';
    let impact = 'Comes with bespoke wooden counter displays & brand collateral.';

    if (volume >= 500) {
      tier = 'Premium Flagship Partner';
      impact = 'Includes co-branded cold-vault display & priority delivery status.';
    } else if (volume >= 250) {
      tier = 'Select Hospitality Partner';
      impact = 'Includes dedicated brand ambassador training & custom menu pairing.';
    }

    if (tierDisplay) tierDisplay.textContent = tier;
    if (impactDisplay) impactDisplay.textContent = impact;
  }

  volumeRange.addEventListener('input', updateCalculator);
  if (businessTypeSelect) businessTypeSelect.addEventListener('change', updateCalculator);
  updateCalculator();
}

/* ==========================================================================
   Form Handling & Validation
   ========================================================================== */
function initFormHandlers() {
  // Wholesale Partner Lead Form
  const wholesaleForm = document.getElementById('wholesaleForm');
  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = wholesaleForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Enquiry...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        wholesaleForm.reset();
        showToast('Enquiry Received! Our partnership team will contact you within 24 hours.');
      }, 1200);
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you! Your message has been sent to The Liora team.');
      }, 1000);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Welcome to The Liora! You are now subscribed to "Stay in the Blue".');
        input.value = '';
      }
    });
  }

  // Sample Request Modal Form
  const sampleModalForm = document.getElementById('sampleModalForm');
  if (sampleModalForm) {
    sampleModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Sample request registered! We will notify you as soon as dispatch begins in your city.');
      sampleModalForm.reset();
    });
  }
}

/* ==========================================================================
   Modal Dialog Controls
   ========================================================================== */
function openModal() {
  const modal = document.getElementById('sampleModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('sampleModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Global modal triggers exposure
window.openModal = openModal;
window.closeModal = closeModal;

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `<i data-lucide="check-circle-2" style="width:20px;height:20px;color:#38bdf8;"></i><span>${message}</span>`;
  
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.35s ease';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* ==========================================================================
   Scroll Intersection Observer for Fade In
   ========================================================================== */
function initScrollObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.highlight-card, .why-card, .sustain-card, .lifestyle-item, .glass-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Add CSS reveal class binding
document.addEventListener('scroll', () => {
  document.querySelectorAll('.revealed').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

/* ==========================================================================
   Canvas Ambient & Interactive Water Ripple Background Engine
   ========================================================================== */
function initWaterRippleCanvas() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'waterCanvas';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.9';
  heroSection.style.position = 'relative';
  heroSection.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = heroSection.offsetWidth || window.innerWidth;
  let height = canvas.height = heroSection.offsetHeight || window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = heroSection.offsetWidth || window.innerWidth;
    height = canvas.height = heroSection.offsetHeight || window.innerHeight;
  });

  const ripples = [];

  function createRipple(x, y, maxR = null, strength = 1) {
    ripples.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: maxR || (140 + Math.random() * 120),
      alpha: 0.85 * strength,
      speed: 1.8 + Math.random() * 1.2,
      strokeWidth: 3 + Math.random() * 2,
      secondaryOffset: 12 + Math.random() * 10
    });
  }

  function addAutoRipple() {
    const x = Math.random() * width;
    const y = Math.random() * height;
    createRipple(x, y);
  }

  // Automatic ambient ripples every 700ms
  setInterval(addAutoRipple, 700);

  // Mouse move interactive ripples
  let lastMouseTime = 0;
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();
    if (now - lastMouseTime > 90) {
      createRipple(x, y, 90, 0.6);
      lastMouseTime = now;
    }
  });

  // Mouse click interactive splash
  heroSection.addEventListener('click', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createRipple(x, y, 220, 1.2);
    setTimeout(() => createRipple(x, y, 160, 0.9), 120);
    setTimeout(() => createRipple(x, y, 100, 0.7), 240);
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      r.radius += r.speed;
      r.alpha -= 0.006;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        i--;
        continue;
      }

      // Main Concentric Water Ring
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(r.x, r.y, Math.max(0, r.radius - 15), r.x, r.y, r.radius + 15);
      gradient.addColorStop(0, `rgba(56, 189, 248, ${r.alpha * 0.9})`);
      gradient.addColorStop(0.5, `rgba(29, 78, 216, ${r.alpha * 0.85})`);
      gradient.addColorStop(1, `rgba(147, 197, 253, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = r.strokeWidth;
      ctx.stroke();

      // Secondary Echo Ring
      if (r.radius > r.secondaryOffset) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius - r.secondaryOffset, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha * 0.5})`;
        ctx.lineWidth = Math.max(1, r.strokeWidth * 0.6);
        ctx.stroke();
      }

      // Central Liquid Drop Glow Dot (at early stage)
      if (r.radius < 35) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, Math.max(1, 8 - r.radius * 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${r.alpha * 0.9})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
