document.addEventListener('DOMContentLoaded', function() {
  const destinations = ['Restaurants', 'Markets', 'Temples', 'Hot Springs', 'Backstreets', 'Lakes', ' Mountains', 'Events', 'Workshops', 'Tea & Coffee', 'Art']; 
  let currentIndex = 0;
  const destinationElement = document.getElementById('destination');
  let isTransitioning = false;
  
  // Function to update destination with smooth transition
  function updateDestination() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    // Fade out and move up
    destinationElement.style.opacity = '0';
    destinationElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      // Update text
      currentIndex = (currentIndex + 1) % destinations.length;
      destinationElement.textContent = destinations[currentIndex];
      
      // Force a reflow to ensure the new text is rendered before fading in
      void destinationElement.offsetWidth;
      
      // Fade in and move down
      destinationElement.style.opacity = '1';
      destinationElement.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        isTransitioning = false;
      }, 500);
    }, 500);
  }
  
  // Start rotation
  setInterval(updateDestination, 3000);
});