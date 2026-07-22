/* ============================================================
   SCRIPT.JS — Personal Portfolio
   ============================================================ */

/* ---- TYPEWRITER EFFECT ---------------------------------- */
function initTypewriter() {
  const texts = [
    'IT Specialist, Developer & Tech Enthusiast',
    'AI & Machine Learning Enthusiast',
    'Web Developer & Designer',
    'Problem Solver & Innovator'
  ];
  
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  const typingSpeed = 60;
  const pauseTime = 2400;
  const deletingSpeed = 30;

  function type() {
    const currentText = texts[currentTextIndex];
    const displayText = currentText.substring(0, currentCharIndex);
    
    typewriterElement.textContent = displayText;

    if (!isDeleting) {
      if (currentCharIndex < currentText.length) {
        currentCharIndex++;
        setTimeout(type, typingSpeed);
      } else {
        isDeleting = true;
        setTimeout(type, pauseTime);
      }
    } else {
      if (currentCharIndex > 0) {
        currentCharIndex--;
        setTimeout(type, deletingSpeed);
      } else {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(type, 500);
      }
    }
  }

  type();
}


/* ---- SCROLL REVEAL ANIMATION ----------------------------- */
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
        // Stagger effect: each element reveals with delay
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


/* ---- SKILL BARS ANIMATION -------------------------------- */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-fill');
  if (!skillBars.length) return;

  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const skillOptions = {
    threshold: 0.3
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = skillsSection.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, skillOptions);

  skillObserver.observe(skillsSection);
}


/* ---- NAVBAR SCROLL STATE --------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}


/* ---- SMOOTH SCROLL & ACTIVE NAV LINK -------------------- */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip hero scroll indicator if no smooth scroll needed
      if (href === '#' || href.length < 2) return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (!target) return;

      // Close mobile menu if open
      const navbar = document.querySelector('.navbar-collapse');
      if (navbar && navbar.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        toggler.click();
      }

      // Scroll to target with offset for fixed navbar
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 16;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update active nav link
      updateActiveNavLink(href);
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    updateActiveNavLink();
  });
}

function updateActiveNavLink(href) {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  if (href) {
    const activeLink = document.querySelector(`.nav-link[href="${href}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  } else {
    // Auto-detect current section on scroll
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
}


/* ---- FORM VALIDATION & SUBMISSION ----------------------- */
function initContactForm() {
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const sendBtn = document.getElementById('sendMessageBtn');
  const feedbackDiv = document.getElementById('form-feedback');

  if (!sendBtn) return;

  // Real-time validation feedback
  nameInput?.addEventListener('blur', () => validateName(nameInput));
  emailInput?.addEventListener('blur', () => validateEmail(emailInput));
  subjectInput?.addEventListener('blur', () => validateSubject(subjectInput));
  messageInput?.addEventListener('blur', () => validateMessage(messageInput));

  // Form submission
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isSubjectValid = validateSubject(subjectInput);
    const isMessageValid = validateMessage(messageInput);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      return;
    }

    // All valid — show success (in production, send to backend)
    showFeedback(
      'Thank you for your message! I\'ll get back to you within 24 hours.',
      'success'
    );

    // Reset form
    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
    
    nameInput.classList.remove('is-error');
    emailInput.classList.remove('is-error');
    subjectInput.classList.remove('is-error');
    messageInput.classList.remove('is-error');

    // Clear feedback after 4 seconds
    setTimeout(() => {
      feedbackDiv.style.display = 'none';
    }, 4000);
  });
}

function validateName(input) {
  if (!input) return true;
  
  const value = input.value.trim();
  const isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
  const errorDiv = document.getElementById('nameError');

  if (!isValid) {
    input.classList.add('is-error');
    if (errorDiv) {
      errorDiv.textContent = value.length === 0 
        ? 'Name is required.' 
        : 'Name must be at least 2 letters (letters only).';
    }
    return false;
  } else {
    input.classList.remove('is-error');
    if (errorDiv) errorDiv.textContent = '';
    return true;
  }
}

function validateEmail(input) {
  if (!input) return true;
  
  const value = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  const errorDiv = document.getElementById('emailError');

  if (!isValid) {
    input.classList.add('is-error');
    if (errorDiv) {
      errorDiv.textContent = value.length === 0 
        ? 'Email is required.' 
        : 'Please enter a valid email address.';
    }
    return false;
  } else {
    input.classList.remove('is-error');
    if (errorDiv) errorDiv.textContent = '';
    return true;
  }
}

function validateSubject(input) {
  if (!input) return true;
  
  const value = input.value.trim();
  const isValid = value.length >= 3;
  const errorDiv = document.getElementById('subjectError');

  if (!isValid) {
    input.classList.add('is-error');
    if (errorDiv) {
      errorDiv.textContent = value.length === 0 
        ? 'Subject is required.' 
        : 'Subject must be at least 3 characters.';
    }
    return false;
  } else {
    input.classList.remove('is-error');
    if (errorDiv) errorDiv.textContent = '';
    return true;
  }
}

function validateMessage(input) {
  if (!input) return true;
  
  const value = input.value.trim();
  const isValid = value.length >= 10;
  const errorDiv = document.getElementById('messageError');

  if (!isValid) {
    input.classList.add('is-error');
    if (errorDiv) {
      errorDiv.textContent = value.length === 0 
        ? 'Message is required.' 
        : 'Message must be at least 10 characters.';
    }
    return false;
  } else {
    input.classList.remove('is-error');
    if (errorDiv) errorDiv.textContent = '';
    return true;
  }
}

function showFeedback(message, type = 'success') {
  const feedbackDiv = document.getElementById('form-feedback');
  if (!feedbackDiv) return;

  const bgColor = type === 'success' 
    ? 'rgba(16, 185, 129, 0.12)' 
    : 'rgba(239, 68, 68, 0.12)';
  const textColor = type === 'success' ? '#059669' : '#DC2626';
  const icon = type === 'success' ? '✓' : '✕';

  feedbackDiv.innerHTML = `
    <div style="
      background: ${bgColor};
      border: 1px solid ${textColor};
      color: ${textColor};
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 10px;
    ">
      <span style="font-weight: 700;">${icon}</span>
      <span>${message}</span>
    </div>
  `;

  feedbackDiv.style.display = 'block';
}


/* ---- FOOTER YEAR ------------------------------------------ */
function setFooterYear() {
  const yearSpan = document.getElementById('footerYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}


/* ---- INITIALIZE ALL ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initScrollReveal();
  initSkillBars();
  initNavbarScroll();
  initSmoothScroll();
  initContactForm();
  setFooterYear();

  // Log initialization for debugging
  console.log('✓ Portfolio initialized');
});


/* ---- HELPER: Check if element is in viewport --------- */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight &&
    rect.bottom >= 0
  );
}
document.addEventListener(
"DOMContentLoaded",

()=>{
  const projects=[

{

  title:
  "Multimodal Hoax Detection",

  image:
  "assets/Images/hoax.png",
  
  desc:
  "AI based hoax detection system",
  
  category1:
  "Data Engineering",
  
  category2:
  "SQL",
  
  tech:[
    "PHP",
    "MySQL",
    "bootstrap",
    "JavaScript"
  ],

  project:
  "https://github.com/Shiro-3/Multimodal_Hoax_Detection"

},

{

  title:
  "SK Mengajar Dosen",

  image:
  "assets/Images/SK_Mengajar.png",
  
  desc:
  "Automatic lecturer document generation",

  category1:
  "Data Engineering",
  
  category2:
  "SQL",
  
  tech:[
    "PHP",
    "MySQL",
    "bootstrap",
    "JavaScript"
  ],
  
  project:
  "https://github.com/Shiro-3/SK_Mengajar_Dosen"

},

{

  title:
  "SIMRS-IVET",

  image:
  "assets/Images/simrs.png",

  desc:
  "Integrated hospital management system",
  
  category1:
  "Data Engineering",

  category2:
  "SQL",

  tech:[
    "PHP",
    "MySQL",
    "bootstrap",
    "JavaScript"
  ],
  
  project:
  "https://github.com/naufallathifan3/simrs"
  
},

{
  
  title:
  "Portfolio Website",
  
  image:
  "assets/Images/portfolio.png",

  desc:
  "Responsive modern portfolio",
  
  category1:
  "Data Engineering",
  
  category2:
  "SQL",
  
  tech:[
    "PHP",
    "MySQL",
    "bootstrap",
    "JavaScript"
  ],
  
  project:
  "projects/portfolio.html"
  
}
];

const container=
document.getElementById(
"projectContainer"
);


if(!container)return;


projects.forEach((p)=>{
  container.innerHTML += `
  <div class="col-lg-4">

      <a href="${p.project}" class="project-card-new">

          <img src="${p.image}" alt="${p.title}">

          <div class="project-info">

              <div class="project-category">
                  <span class="project-badge category">${p.category1}</span>
                  <span class="project-badge accent">${p.category2}</span>
              </div>

              <h4>${p.title}</h4>

              <p>${p.desc}</p>

              <div class="project-tech">
                  ${p.tech.map(item => `
                      <span>${item}</span>
                  `).join("")}
              </div>

          </div>

      </a>

  </div>
  `;

});

});

function scrollProjects(direction){

const container =
document.getElementById(
"projectContainer"
);

container.scrollBy({

left:
direction * 450,

behavior:
"smooth"

});

}