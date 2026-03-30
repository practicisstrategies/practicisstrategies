/* ═══════════════ MOBILE MENU ═══════════════ */
function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('active');
  });
});

/* ═══════════════ NAVBAR SCROLL EFFECT ═══════════════ */
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.8)';
  }
  lastScroll = currentScroll;
});

/* ═══════════════ STAT COUNTER ANIMATION ═══════════════ */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ═══════════════ INTERSECTION OBSERVER FOR ANIMATIONS ═══════════════ */
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      // Trigger counters when hero stats come into view
      if (entry.target.closest('#hero')) {
        animateCounters();
      }
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('section, .hero-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeObserver.observe(el);
});

/* ═══════════════ FAQ ACCORDION ═══════════════ */
function toggleFaq(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

  // Toggle clicked
  if (!isActive) item.classList.add('active');
}

/* ═══════════════ CONTACT FORM ═══════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate form submission — replace with actual backend integration
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.style.opacity = '1';
    e.target.reset();

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

/* ═══════════════ SMOOTH SCROLL FOR ANCHOR LINKS ═══════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
