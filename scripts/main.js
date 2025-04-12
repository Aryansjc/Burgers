document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');
    
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!burgerMenu.contains(event.target) && !mainNav.contains(event.target) && mainNav.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            burgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.main-nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavOnScroll);

    const revealOnScroll = function() {
        const aboutSection = document.querySelector('.about-section');
        const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (aboutSectionPosition < screenPosition) {
            aboutSection.classList.add('visible');
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);

    function createBurgerParticles() {
        const burgerParticles = document.querySelector('.burger-particles');
        const icons = ['🍔', '🧀', '🥬', '🍅', '🥪'];
        const particlesCount = 100;
        
        burgerParticles.innerHTML = '';
        
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('span');
            particle.className = 'burger-particle';
            particle.textContent = icons[Math.floor(Math.random() * icons.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.fontSize = `${Math.random() * 25 + 15}px`;
            particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
            particle.style.animation = `particle-float ${Math.random() * 6 + 4}s ease-in-out infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.position = 'absolute';
            particle.style.zIndex = '-1';
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            particle.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.7)';
            particle.style.filter = 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))';
            
            burgerParticles.appendChild(particle);
        }
    }
    
    createBurgerParticles();

    window.addEventListener('resize', createBurgerParticles);

    console.log('BURGERS Hackathon website initialized');
});
