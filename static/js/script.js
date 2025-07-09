document.addEventListener('DOMContentLoaded', () => {
  // Initialize Particles.js
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { 
          value: window.innerWidth < 768 ? 40 : 80,
          density: { 
            enable: true, 
            value_area: 800 
          } 
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { 
          enable: true, 
          distance: 150, 
          color: "#0a5c36", 
          opacity: 0.4, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: 2, 
          direction: "none", 
          random: true, 
          straight: false, 
          out_mode: "out" 
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Run once on load

  // GSAP Animations
  if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-title span', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.3
    });
    
    gsap.from('.hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.out"
    });
    
    gsap.from('.cta-button', {
      y: 20,
      opacity: 1,
      duration: 0.8,
      delay: 1,
      ease: "power2.out",
      immediateRender: false
    });

    // Feature Card Animation
    gsap.utils.toArray(".feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
      });
    });

    // About Section Animation
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 1
    });

    // Testimonials Animation
    gsap.from(".testimonial-item", {
      scrollTrigger: {
        trigger: ".testimonials",
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    });

    // Magnetic Button Effect
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(button, {
          x: (x - rect.width/2) * 0.2,
          y: (y - rect.height/2) * 0.2,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });
    });
  }
});