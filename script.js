/* ============================================================
   APEX ADVISORY — SCRIPTS
   ============================================================ */

// ── Sticky Nav ─────────────────────────────────────────────
const navHeader = document.getElementById('nav-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navHeader.classList.add('scrolled');
  } else {
    navHeader.classList.remove('scrolled');
  }
}, { passive: true });


// ── Mobile Menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ── Scroll Reveal ──────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.package-card, .step, .testimonial-card, .about-copy, .about-visual, ' +
  '.contact-copy, .contact-form-wrap, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

// Stagger children in grids
document.querySelectorAll('.packages-grid .package-card').forEach((card, i) => {
  card.classList.add(`reveal-delay-${Math.min(i + 1, 4)}`);
});
document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, i) => {
  card.classList.add(`reveal-delay-${i + 1}`);
});
document.querySelectorAll('.process-steps .step').forEach((step, i) => {
  step.classList.add(`reveal-delay-${i + 1}`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));


// ── Contact Form ───────────────────────────────────────────
const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate async submit (replace with real endpoint)
  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.classList.add('visible');
  }, 1200);
});


// ── Active Nav Link Highlight ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--white)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ── Smooth scroll polyfill for older Safari ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
