/* ==========================================================================
   AFSAL RAHMAN — DIGITAL MARKETING PORTFOLIO SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
  // 1. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // observer.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 2. Navbar Background on Scroll
  const navbar = document.querySelector('.custom-navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '1rem 0';
    }
  });

  // 3. Smooth Scrolling for Anchor Links (fallback/enhancement over CSS)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // If mobile menu is open, close it
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
          // Use Bootstrap's Collapse API
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
        
        const navbarHeight = document.querySelector('.custom-navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
