/* ===== JavaScript - صفحة مدينة عنيزة ===== */

// ===== قائمة الهامبرجر =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// إغلاق القائمة عند النقر على رابط
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// ===== تمييز رابط التنقل النشط عند التمرير =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.background = '';
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.background = 'rgba(212, 160, 23, 0.25)';
      link.style.color = '#D4A017';
    }
  });
});

// ===== تأثير الظهور عند التمرير (Intersection Observer) =====
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// ===== عداد الأرقام المتحركة =====
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('ar-SA');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('ar-SA');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) counterObserver.observe(statsSection);

// ===== الزر التفاعلي - إظهار رسالة ترحيبية =====
const welcomeBtn = document.getElementById('welcomeBtn');
const toast = document.getElementById('toast');

if (welcomeBtn) {
  welcomeBtn.addEventListener('click', () => {
    showToast('🌴 أهلاً وسهلاً بك في عنيزة - عروس القصيم!');
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ===== تأثير بطاقات المعالم عند التمرير فوقها =====
const landmarkCards = document.querySelectorAll('.landmark-card');
landmarkCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.08}s`;
});

// ===== تمرير سلس للأسهم ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== تغيير خلفية شريط التنقل عند التمرير =====
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.style.background = 'rgba(92, 46, 10, 1)';
  } else {
    navbar.style.background = 'rgba(92, 46, 10, 0.97)';
  }
});

// ===== حركة بسيطة لبطاقات المعالم =====
landmarkCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.35s ease';
  });
});

// ===== تأثير عند تحميل الصفحة =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});
