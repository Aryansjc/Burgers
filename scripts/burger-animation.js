// Burger Animation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get the burger element
    const burger = document.querySelector('.burger');
    
    // Track mouse movement for perspective effect
    document.addEventListener('mousemove', function(e) {
        // Only apply if not on mobile
        if (window.innerWidth > 768) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate rotation based on mouse position
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Calculate rotation degree based on mouse position
            // Mouse in center = no rotation, edges = max rotation
            const rotateY = 20 * ((mouseX - windowWidth / 2) / (windowWidth / 2));
            const rotateX = -10 * ((mouseY - windowHeight / 2) / (windowHeight / 2));
            
            // Apply the transformation with some easing
            burger.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        }
    });
    
    // Reset transform when mouse leaves window
    document.addEventListener('mouseleave', function() {
        burger.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
    
    // Add click interaction - burger bounce
    burger.addEventListener('click', function() {
        // Add the bounce animation class
        burger.classList.add('bounce');
        
        // Remove the class after animation completes
        setTimeout(function() {
            burger.classList.remove('bounce');
        }, 800);
    });
    
    // Add bounce animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% {
                transform: scale(1);
            }
            40% {
                transform: scale(0.9);
            }
            70% {
                transform: scale(1.1);
            }
        }
        
        .bounce {
            animation: bounce 0.8s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Device orientation for mobile devices
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(e) {
            // Only apply on mobile
            if (window.innerWidth <= 768) {
                // Get gamma (left to right tilt) and beta (front to back tilt)
                const tiltLR = e.gamma;
                const tiltFB = e.beta;
                
                // Limit rotation range
                const rotateY = Math.min(15, Math.max(-15, tiltLR));
                const rotateX = Math.min(10, Math.max(-10, (tiltFB - 40) / -3));
                
                // Apply the transformation
                burger.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
    }
}); 