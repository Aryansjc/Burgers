// Countdown JavaScript for BURGERS Hackathon

document.addEventListener('DOMContentLoaded', function() {
    // Set the date we're counting down to (January 15, 2024)
    const countDownDate = new Date("January 15, 2024 09:00:00").getTime();
    
    // Get DOM elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Update the countdown every 1 second
    const countdownInterval = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // If the countdown is over, show zeros
        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            
            // You could add a specific "Event Started" message here
            console.log("BURGERS Hackathon has begun!");
            
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the results with leading zeros
        daysElement.textContent = days < 10 ? `0${days}` : days;
        hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        // Pulse animation for changing seconds
        secondsElement.classList.add('pulse');
        setTimeout(function() {
            secondsElement.classList.remove('pulse');
        }, 500);
        
    }, 1000);
});
