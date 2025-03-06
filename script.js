function loadingAnimation(){
    var tl = gsap.timeline()
tl.from("#line h1",{
    x:-500,
    opacity:0,
    duration:0.3,
    stagger:0.4
});

tl.to("#loader",{
    opacity:0,
    duration: 0.2,
    delay: 2.9
});
tl.from("#page1",{
    y:1200,
    delay: 0,
    opacity:0,
    ease:Power4
});
tl.to("#loader",{
   display:"none"
});
tl.from(".nav-links a",{
    y:-50,
    opacity:0,
    delay:0,
    duration:0.3,
    stagger:0.3
    
})
tl.from("#intro1,#intro2,#intro3,#intro4",{
    y:120,
    stagger:0.2,
    opacity:0
})

}

function loaderCountdown(){
    var h5timer = document.querySelector("#line-part1 h5"); // Corrected selector
var grow = 0;

if (h5timer) { 
    var timer = setInterval(function () {
        if (grow < 100) {
            h5timer.innerHTML = grow++;
        } else {
            h5timer.innerHTML = grow;
            
        }
    }, 33);
}
}

function scrollAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

loaderCountdown()
scrollAnimation()
loadingAnimation() 






//hambuerger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            body.style.overflow = 'auto';
        }
    });
});

 // Create background dots
 const bgDots = document.getElementById('bg-dots');
 const numDots = 150;
 
 for (let i = 0; i < numDots; i++) {
     const dot = document.createElement('div');
     dot.classList.add('dot');
     
     // Random size
     const size = Math.random() * 4 + 1;
     dot.style.width = `${size}px`;
     dot.style.height = `${size}px`;
     
     // Random position
     const posX = Math.random() * 100;
     const posY = Math.random() * 100;
     dot.style.left = `${posX}%`;
     dot.style.top = `${posY}%`;
     
     // Random opacity
     dot.style.opacity = Math.random() * 0.5 + 0.1;
     
     // Store original position for parallax effect
     dot.setAttribute('data-x', posX);
     dot.setAttribute('data-y', posY);
     
     bgDots.appendChild(dot);
 }
 
 // Enhanced parallax effect
 document.addEventListener('mousemove', (e) => {
     const mouseX = e.clientX / window.innerWidth;
     const mouseY = e.clientY / window.innerHeight;
     
     // Move dots with different depths
     const dots = document.querySelectorAll('.dot');
     dots.forEach((dot, index) => {
         const depth = (index % 5 + 1) * 0.1;
         const originalX = parseFloat(dot.getAttribute('data-x'));
         const originalY = parseFloat(dot.getAttribute('data-y'));
         
         const moveX = (mouseX - 0.5) * depth * 100;
         const moveY = (mouseY - 0.5) * depth * 100;
         
         dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
     });
     
     // Move title with parallax - more pronounced movement
     const title = document.getElementById('title');
     title.style.transform = `translate(${(mouseX - 0.5) * -50}px, ${(mouseY - 0.5) * -50}px)`;
     
     // Move profile image with parallax
     const profileImageContainer = document.getElementById('profile-image-container');
     profileImageContainer.style.transform = `translate(${(mouseX - 0.5) * -20}px, ${(mouseY - 0.5) * -20}px) translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
     
     // Move profile text with parallax
     const profileText = document.getElementById('profile-text');
     profileText.style.transform = `translate(${(mouseX - 0.5) * 10}px, ${(mouseY - 0.5) * 10}px)`;
 });
 
 // Scroll parallax effect
 window.addEventListener('scroll', () => {
     const scrollY = window.scrollY;
     const windowHeight = window.innerHeight;
     
     // Parallax effect on scroll - more pronounced for title
     const title = document.getElementById('title');
     title.style.transform = `translateY(${scrollY * 0.7}px)`;
     
     // Move dots on scroll
     const dots = document.querySelectorAll('.dot');
     dots.forEach((dot, index) => {
         const speed = (index % 5 + 1) * 0.05;
         dot.style.transform = `translateY(${scrollY * speed}px)`;
     });
 });
 
 // Add 3D effect on mouse move
 document.addEventListener('mousemove', (e) => {
     const mouseX = e.clientX / window.innerWidth;
     const mouseY = e.clientY / window.innerHeight;
     
     // Calculate rotation values
     const rotateY = (mouseX - 0.5) * 10;
     const rotateX = (mouseY - 0.5) * -10;
     
     // Apply rotation to container
     const container = document.querySelector('.container');
     container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
 });

//  page 3

// Create parallax background particles
function createParticles() {
    const parallaxBg = document.getElementById('parallax-bg');
    const particleCount = 70;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1;
      particle.style.opacity = opacity;
      
      // Random animation delay for floating effect
      const animationDelay = Math.random() * 5;
      particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out ${animationDelay}s infinite`;
      
      parallaxBg.appendChild(particle);
    }
  }
  
  // Animate skill items
  function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      const delay = parseInt(item.getAttribute('data-delay'));
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, delay);
      
      // Set progress bar width based on skill level
      const skillLevel = item.getAttribute('data-skill');
      const progressBar = item.querySelector('.skill-progress');
      
      item.addEventListener('mouseenter', () => {
        progressBar.style.width = `${skillLevel}%`;
      });
      
      item.addEventListener('mouseleave', () => {
        progressBar.style.width = '0';
      });
    });
  }
  
  // Enhanced parallax effect with depth
  function setupParallax() {
    const skillsSection = document.getElementById('skills-section');
    const skillsContainer = document.getElementById('skills-container');
    const parallaxBg = document.getElementById('parallax-bg');
    const particles = document.querySelectorAll('.particle');
    const skillItems = document.querySelectorAll('.skill-item');
    const glowEffect = document.getElementById('glow-effect');
    const sectionTitle = document.querySelector('.section-title');
    
    // Mouse movement parallax
    document.addEventListener('mousemove', (e) => {
      // Get mouse position relative to viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate normalized mouse position (-1 to 1)
      const normalizedX = (mouseX / viewportWidth) * 2 - 1;
      const normalizedY = (mouseY / viewportHeight) * 2 - 1;
      
      // Move particles with different intensities for depth effect
      particles.forEach((particle, index) => {
        const depth = Math.random() * 0.5 + 0.5; // Random depth factor
        const moveX = normalizedX * 40 * depth;
        const moveY = normalizedY * 30 * depth;
        
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      // Subtle tilt effect on skill container
      skillsContainer.style.transform = `perspective(1000px) rotateY(${normalizedX * 5}deg) rotateX(${normalizedY * -5}deg)`;
      
      // Parallax effect on section title
      sectionTitle.style.transform = `translateX(${normalizedX * 20}px) translateY(${normalizedY * 10}px)`;
      
      // Move glow effect to mouse position
      glowEffect.style.left = `${mouseX}px`;
      glowEffect.style.top = `${mouseY}px`;
      glowEffect.style.opacity = '1';
      
      // 3D effect on skill icons (different for each icon)
      skillItems.forEach((item, index) => {
        const iconWrapper = item.querySelector('.skill-icon-wrapper');
        const rect = item.getBoundingClientRect();
        
        // Calculate distance from mouse to item center
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        
        // Calculate normalized direction vector from item to mouse
        const dirX = (mouseX - itemCenterX) / (viewportWidth / 2);
        const dirY = (mouseY - itemCenterY) / (viewportHeight / 2);
        
        // Apply rotation based on mouse position relative to the item
        const rotateX = dirY * -20; // Invert Y for natural feeling tilt
        const rotateY = dirX * 20;
        
        // Apply parallax shift to icon
        const translateX = dirX * 10;
        const translateY = dirY * 10;
        
        // Apply 3D transform
        iconWrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
      });
    });
    
    // Reset transforms when mouse leaves
    document.addEventListener('mouseleave', () => {
      skillsContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      sectionTitle.style.transform = 'translateY(0)';
      glowEffect.style.opacity = '0';
      
      skillItems.forEach(item => {
        const iconWrapper = item.querySelector('.skill-icon-wrapper');
        iconWrapper.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateX(0) translateY(0)';
      });
    });
  }
  
  // Scroll parallax effect
  function setupScrollParallax() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const skillsSection = document.querySelector('.skills-section');
      const sectionTop = skillsSection.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll position relative to the skills section
      const relativeScroll = scrollY - sectionTop + windowHeight;
      
      // Apply parallax effect to background grid
      const bgGrid = document.querySelector('.bg-grid');
      bgGrid.style.transform = `perspective(1000px) rotateX(60deg) translateY(${scrollY * 0.1}px)`;
      
      // Animate section title based on scroll
      if (scrollY > sectionTop - windowHeight + 100) {
        document.querySelector('.section-title').style.opacity = '1';
        document.querySelector('.section-title').style.transform = 'translateY(0)';
        document.querySelector('.subtitle').style.opacity = '1';
        document.querySelector('.subtitle').style.transform = 'translateY(0)';
        
        // Trigger skill items animation
        animateSkillItems();
      }
      
      // Parallax effect on particles
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const speed = (index % 5 + 1) * 0.1;
        particle.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }
  
  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupParallax();
    setupScrollParallax();
    
    // Trigger animation immediately if the section is already in view
    setTimeout(() => {
      animateSkillItems();
    }, 500);
  });

  const projects = [
    {
      title: "Expense Splitter",
      description: "This is a simple, easy-to-use app tht helps you and your friends, roommates, or colleagues split shared expenses fairly. Whether it’s groceries, bills, or a group outing.",
      image: "images/expense.png",
      tags: ["HTML", "CSS", "Javascript"],
      github: "https://github.com/theaatif/SplitEasy",
      demo: "https://expensesplitterr.netlify.app/"
    },
    {
      title: "Notes Taking Web App",
      description: "Real-time cryptocurrency portfolio tracker with price alerts and performance analytics.",
      image: "images/notes.png",
      tags: ["HTML", "CSS", "Javascript"],
      github: "https://github.com/theaatif/NotesTakingWebApp",
      demo: "https://notes-taking-appp.netlify.app/"
    },
    {
      title: "AR Interior Designer",
      description: "Augmented reality app for visualizing furniture and decor in your space before purchasing.",
      image: "/api/placeholder/400/320",
      tags: ["AR.js", "Three.js", "WebXR"],
      github: "https://github.com/username/ar-interior",
      demo: "https://example.com/demo"
    },
    {
      title: "Collaborative Whiteboard",
      description: "Real-time collaborative drawing and diagramming tool with video chat integration.",
      image: "/api/placeholder/400/320",
      tags: ["Socket.io", "Canvas API", "WebRTC"],
      github: "https://github.com/username/collab-whiteboard",
      demo: "https://example.com/demo"
    },
    {
      title: "Music Visualizer",
      description: "Audio-reactive music visualizer using WebAudio API and generative art algorithms.",
      image: "/api/placeholder/400/320",
      tags: ["Web Audio API", "Canvas", "p5.js"],
      github: "https://github.com/username/music-vis",
      demo: "https://example.com/demo"
    },
    {
      title: "Smart Home Dashboard",
      description: "Unified dashboard for controlling and monitoring various smart home devices and sensors.",
      image: "/api/placeholder/400/320",
      tags: ["IoT", "MQTT", "Vue.js", "Express"],
      github: "https://github.com/username/smart-home",
      demo: "https://example.com/demo"
    }
  ];

  // Function to create project cards with tilt effect
  function createProjectGrid() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-tilt', '');
      
      // Create card HTML content
      card.innerHTML = `
        <div class="card-border-glow"></div>
        <img class="card-image" src="${project.image}" alt="${project.title}">
        <div class="card-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="tech-stack">
            ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
          <div class="card-links">
            <a href="${project.github}" target="_blank">
              <svg class="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Code
            </a>
            <a href="${project.demo}" target="_blank">Live Demo →</a>
          </div>
        </div>
        <div class="glint"></div>
      `;
      
      projectsGrid.appendChild(card);
      
      // Add mouse move event listener for 3D tilt effect
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }
  
  // Function to handle mouse movement for tilt effect
  function handleMouseMove(e) {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate tilt values
    const tiltX = (y / height - 0.5) * 20; // Max tilt of 20deg
    const tiltY = (x / width - 0.5) * -20; // Reversed for natural tilt
    
    // Update the CSS variables for glint effect
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // Apply the tilt effect
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Show the glint effect
    const glint = card.querySelector('.glint');
    if (glint) {
      glint.style.opacity = '1';
    }
  }
  
  // Function to reset the card position when mouse leaves
  function handleMouseLeave(e) {
    const card = e.currentTarget;
    
    // Reset the transform
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    // Hide the glint effect
    const glint = card.querySelector('.glint');
    if (glint) {
      glint.style.opacity = '0';
    }
  }

  // Initialize the grid
  window.addEventListener('load', createProjectGrid);
