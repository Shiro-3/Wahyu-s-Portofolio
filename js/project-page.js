// ============================================================
// PROJECT PAGE JAVASCRIPT
// ============================================================

// Initialize project page features
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll reveal animation
  initScrollReveal();
  
  // 2. Set footer year
  setFooterYear();
  
  // 3. Smooth scroll untuk anchor links
  initSmoothScroll();
  
  // 4. Navbar scroll state
  initNavbarScroll();

  console.log('✓ Project page initialized');
});


// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealOptions = {
    threshold: 0.10,
    rootMargin: '0px 0px -80px 0px'
  };

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = Array.from(revealElements).indexOf(entry.target) * 50;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(element => revealOnScroll.observe(element));
}


// ---- SET FOOTER YEAR ----
function setFooterYear() {
  const yearSpan = document.getElementById('footerYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


// ---- SMOOTH SCROLL ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href.length < 2) return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (!target) return;

      // Close mobile menu jika ada
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar && navbar.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        toggler.click();
      }

      // Scroll ke target
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 16;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}


// ---- NAVBAR SCROLL STATE ----
function initNavbarScroll() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}


// ---- LIGHTBOX UNTUK SCREENSHOTS (OPTIONAL) ----
// Jika Anda ingin menambahkan lightbox functionality untuk screenshots
// Uncomment dan install library seperti GLightbox atau Fancybox

/*
function initLightbox() {
  const screenshots = document.querySelectorAll('[data-lightbox="screenshots"]');
  
  screenshots.forEach((screenshot, index) => {
    screenshot.addEventListener('click', (e) => {
      e.preventDefault();
      
      const imageUrl = screenshot.getAttribute('href');
      const modal = createLightboxModal(imageUrl, index, screenshots);
      document.body.appendChild(modal);
    });
  });
}

function createLightboxModal(imageUrl, currentIndex, allImages) {
  const modal = document.createElement('div');
  modal.className = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-content">
      <img src="${imageUrl}" alt="Screenshot" />
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&lt;</button>
      <button class="lightbox-next">&gt;</button>
    </div>
  `;
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-close')) {
      modal.remove();
    }
  });
  
  return modal;
}
*/


// ---- COPY TO CLIPBOARD ----
// Utility function untuk copy code/links to clipboard
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Copied!';
    setTimeout(() => {
      buttonElement.textContent = originalText;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Export untuk global use
window.copyToClipboard = copyToClipboard;