// Travel page navigation
document.addEventListener('DOMContentLoaded', function() {
  const travelClickArea = document.querySelector('.travel-click-area');
  const transitionOverlay = document.querySelector('.page-transition-overlay');
  
  if (travelClickArea) {
    travelClickArea.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add the transition overlay with travel section color
      transitionOverlay.style.background = '#2a9d8f'; // Travel section color
      transitionOverlay.classList.add('active');
      
      // Navigate to travel page after transition
      setTimeout(() => {
        window.location.href = 'travel.html';
      }, 700);
    });
  }
  
  // Keep your existing slideshow code here
  // Travel slideshow with smooth transitions and randomization
  const travelBg = document.querySelector('.travel-bg');
  const travelImages = [
    'images/landing/landing_01.webp',
    'images/landing/landing_02.webp',
    'images/landing/landing_03.webp',
    'images/landing/landing_04.webp',
    'images/landing/landing_05.webp',
    'images/landing/landing_06.webp',
    'images/landing/landing_07.webp',
  ];
  let travelIndex = 0;
  let shuffledImages = [];
  
  // Function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  // Preload all images to ensure smooth transitions
  function preloadImages(imageArray) {
    imageArray.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Initialize with random first image and preload the rest
  function initializeSlideshow() {
    // Shuffle the images
    shuffledImages = shuffleArray(travelImages);
    
    // Set initial background with first random image
    travelBg.style.backgroundImage = `url(${shuffledImages[0]})`;
    
    // Preload all images
    preloadImages(shuffledImages);
    
    // Start the slideshow after a short delay
    setTimeout(() => {
      setInterval(changeTravelBackground, 3500);
    }, 100);
  }
  
  // Crossfade transition between images
  function changeTravelBackground() {
    // Move to the next image in the shuffled array
    travelIndex = (travelIndex + 1) % shuffledImages.length;
    
    // Create a temporary div for the new image
    const newImage = document.createElement('div');
    newImage.style.position = 'absolute';
    newImage.style.top = '0';
    newImage.style.left = '0';
    newImage.style.width = '100%';
    newImage.style.height = '100%';
    newImage.style.backgroundImage = `url(${shuffledImages[travelIndex]})`;
    newImage.style.backgroundSize = 'cover';
    newImage.style.backgroundPosition = 'center';
    newImage.style.opacity = '0';
    newImage.style.transition = 'opacity 1.5s ease-in-out';
    newImage.style.zIndex = '1';
    
    // Add it to the travel-bg container
    travelBg.appendChild(newImage);
    
    // Force a reflow to ensure the transition works
    void newImage.offsetWidth;
    
    // Fade in the new image
    newImage.style.opacity = '1';
    
    // Update the main background after the transition
    setTimeout(() => {
      travelBg.style.backgroundImage = `url(${shuffledImages[travelIndex]})`;
      // Remove the temporary div
      travelBg.removeChild(newImage);
    }, 1500);
  }
  
  // Initialize the slideshow when the page loads
  initializeSlideshow();
});