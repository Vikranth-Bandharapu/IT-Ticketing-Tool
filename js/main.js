document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-back',
      offset: 120,
      once: true
    });
  }

  // Sticky Header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle a wrapping container or just toggle classes on existing
      if (!document.querySelector('.nav-mobile-wrap')) {
        const wrap = document.createElement('div');
        wrap.className = 'nav-mobile-wrap nav-active';
        
        // Clone links and actions for mobile
        const clonedLinks = navLinks.cloneNode(true);
        const clonedActions = navActions.cloneNode(true);
        
        clonedLinks.style.display = 'flex';
        clonedActions.style.display = 'flex';
        
        wrap.appendChild(clonedLinks);
        wrap.appendChild(clonedActions);
        
        document.body.appendChild(wrap);
        
        // Setup close on click outside or on link click
        wrap.addEventListener('click', (e) => {
          if(e.target.tagName === 'A') {
            document.body.removeChild(wrap);
          }
        });
      } else {
        const wrap = document.querySelector('.nav-mobile-wrap');
        document.body.removeChild(wrap);
      }
    });
  }

  // Fireflies replaced by CSS background in style.css

  // Form Validation Utilities
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        const group = input.closest('.form-group');
        const errorMsg = group.querySelector('.error-msg');
        
        // Basic empty check
        if (!input.value.trim()) {
          isValid = false;
          group.classList.add('error');
          if (errorMsg) errorMsg.textContent = 'This field is required';
        } else {
          group.classList.remove('error');
          
          // Specific checks
          if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
              isValid = false;
              group.classList.add('error');
              if (errorMsg) errorMsg.textContent = 'Please enter a valid email';
            }
          }
          
          if (input.type === 'password' && input.classList.contains('check-strength')) {
            if (input.value.length < 8) {
              isValid = false;
              group.classList.add('error');
              if (errorMsg) errorMsg.textContent = 'Password must be at least 8 characters';
            }
          }
        }
      });
      
      // Confirm password check
      const pass = form.querySelector('input[name="password"]');
      const confirmPass = form.querySelector('input[name="confirmPassword"]');
      if (pass && confirmPass && pass.value !== confirmPass.value) {
        isValid = false;
        const group = confirmPass.closest('.form-group');
        group.classList.add('error');
        const errorMsg = group.querySelector('.error-msg');
        if (errorMsg) errorMsg.textContent = 'Passwords do not match';
      }

      if (!isValid) {
        e.preventDefault(); // Stop submission if invalid
      }
    });
    
    // Clear error on input
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('error')) {
          group.classList.remove('error');
        }
      });
    });
  });

  // Handle Logout buttons
  const logoutBtns = document.querySelectorAll('.logout-btn');
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInEmail');
      localStorage.removeItem('loggedInRole');
      window.location.href = 'login.html';
    });
  });

  // Display logged in email if element exists
  const userEmailDisplay = document.querySelector('.user-email-display');
  if (userEmailDisplay) {
    const email = localStorage.getItem('loggedInEmail');
    if (email) {
      userEmailDisplay.textContent = email;
    }
  }

  // FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const parent = question.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Close all other FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current FAQ
      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
});
