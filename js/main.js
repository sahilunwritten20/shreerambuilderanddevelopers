/* ============================================================
   SHREERAM BUILDERS — JavaScript
   ============================================================ */

// ── CURSOR TRACKING ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  cursorRing.style.left = mouseX + 'px';
  cursorRing.style.top = mouseY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.classList.add('hover');
  cursorRing.classList.add('hover');
});

document.addEventListener('mouseup', () => {
  cursor.classList.remove('hover');
  cursorRing.classList.remove('hover');
});

// ── SCROLL ANIMATION TRIGGER ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left').forEach((el) => {
  observer.observe(el);
});

// ── NAV SCROLL EFFECT ──
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobile() {
  mobileMenu.classList.toggle('show');
  hamburger.classList.toggle('active');
}

function closeMobile() {
  mobileMenu.classList.remove('show');
  hamburger.classList.remove('active');
}

// ── CAROUSEL FUNCTIONALITY ──
const carouselTrack = document.getElementById('carouselTrack');
const carouselDots = document.getElementById('carouselDots');
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function initCarousel() {
  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    carouselDots.appendChild(dot);
  }
  
  // Auto-rotate carousel every 6 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, 6000);
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function scrollCarousel(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarousel();
}

// Initialize carousel if it exists
if (carouselTrack) {
  initCarousel();
}

// ── FORM HANDLING ──
function submitContact() {
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const msg = document.getElementById('cMsg').value.trim();

  if (!name || !phone) {
    showToast('Please fill in all required fields');
    return;
  }

  // Simulate form submission
  setTimeout(() => {
    showToast('✓ Message sent! We will contact you soon.');
    document.getElementById('cName').value = '';
    document.getElementById('cPhone').value = '';
    document.getElementById('cMsg').value = '';
  }, 500);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ── VISIT FORM HANDLING ──
const visitForm = document.getElementById('visitForm');
if (visitForm) {
  visitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('vName').value.trim();
    const phone = document.getElementById('vPhone').value.trim();
    const email = document.getElementById('vEmail').value.trim();
    const date = document.getElementById('vDate').value;
    const interest = document.getElementById('vInterest').value;
    const message = document.getElementById('vMessage') ? document.getElementById('vMessage').value.trim() : '';

    // Validation
    if (!name || !phone || !email) {
      showToast('❌ Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('❌ Please enter a valid email address');
      return;
    }

    // Phone validation (basic - at least 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      showToast('❌ Please enter a valid phone number');
      return;
    }

    // Get submit button and show loading state
    const submitBtn = visitForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Submitting...';
    submitBtn.disabled = true;

    try {
      const response = await fetch('/api/submit-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          date,
          interest,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {
        showToast('✅ Site visit request submitted! Check your email for confirmation.');
        visitForm.reset();
        // Scroll to form to show success
        visitForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        showToast('❌ ' + (data.error || 'Submission failed. Please try again.'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      showToast('❌ Network error. Please check your connection and try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ── LOADER ANIMATION ──
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 1500);
});

// ── SMOOTH SCROLL ANCHORS ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = 70;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

// ── PLAY VIDEO ON HOVER (OPTIONAL) ──
document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('mouseenter', () => {
    video.muted = true;
    video.play().catch(() => {
      // Video autoplay failed, that's ok
    });
  });
});

// ── KEYBOARD NAVIGATION FOR CAROUSEL ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    scrollCarousel(-1);
  } else if (e.key === 'ArrowRight') {
    scrollCarousel(1);
  }
});

// ── DYNAMIC YEAR IN FOOTER ──
const year = new Date().getFullYear();
const footerText = document.querySelector('.footer-copy');
if (footerText) {
  footerText.textContent = footerText.textContent.replace('2026', year);
}

// ── REVEAL ANIMATIONS WITH STAGGER ──
const revealElements = document.querySelectorAll('.reveal, .reveal-left');
let revealDelay = 0;

revealElements.forEach((el) => {
  el.style.animationDelay = `${revealDelay * 0.1}s`;
  el.style.animationPlayState = 'paused';
  revealDelay++;
});

// ── INTERSECTION OBSERVER FOR LAZY REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
});

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// ── PARTICLES (OPTIONAL ENHANCEMENT) ──
function createParticles() {
  const container = document.querySelector('.hero-content');
  if (!container) return;

  const particleCount = 3;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(201, 168, 76, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
    container.appendChild(particle);
  }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
    50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
  }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', () => {
  createParticles();
});

// ── EASTER EGG ──
let easterEggCounter = 0;
document.addEventListener('click', (e) => {
  if (e.target.closest('.logo') || e.target.closest('.nav-logo')) {
    easterEggCounter++;
    if (easterEggCounter === 5) {
      console.log('🎉 Welcome to Shreeram Builders! Building dreams into reality since 2026.');
      easterEggCounter = 0;
    }
  }
});

// ── CONSOLE MESSAGE ──
console.log('%c🏛️ Shreeram Builders & Developers', 'font-size:20px; color:#c9a84c; font-weight:bold;');
console.log('%cBuilding Dreams into Reality', 'font-size:14px; color:#333; font-style:italic;');
console.log('%cWebsite by Professional Developers', 'font-size:12px; color:#999;');
console.log('%cFor inquiries: +91 85919 82619', 'font-size:12px; color:#c9a84c; font-weight:bold;');