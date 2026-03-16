// Mobile nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });
  }

  // Close mobile nav on link click
  var navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (links.classList.contains('active')) {
        toggle.classList.remove('active');
        links.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Nav background on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
      } else {
        nav.style.background = 'rgba(10, 10, 15, 0.85)';
      }
    });
  }

  // Fade-in on scroll with IntersectionObserver
  var fadeElements = document.querySelectorAll('.post-card, .author-card');
  if ('IntersectionObserver' in window && fadeElements.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
})();
