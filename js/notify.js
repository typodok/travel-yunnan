document.addEventListener('DOMContentLoaded', function() {
  const notifyTexts = document.querySelectorAll('.notify-text');
  
  notifyTexts.forEach(function(element) {
    element.addEventListener('click', function() {
      // Create a simple notification
      const notification = document.createElement('div');
      notification.className = 'notification-popup';
      notification.innerHTML = `
        <div class="notification-content">
          <h3>Get Notified</h3>
          <p>Enter your email to be notified when Local Experiences become available:</p>
          <form class="notification-form" id="notify-form">
            <input type="email" name="email" placeholder="Your email address" required>
            <input type="hidden" name="service" value="Local Experiences">
            <button type="submit" class="submit-btn">Notify Me</button>
          </form>
          <span class="close-notification">&times;</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Handle form submission
      const form = notification.querySelector('#notify-form');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('input[name="email"]').value;
        const submitBtn = form.querySelector('.submit-btn');
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send the form data to Formspree
        fetch('https://formspree.io/f/xnnbnqjz', {
          method: 'POST',
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            // Show success message
            notification.innerHTML = `
              <div class="notification-content">
                <h3>Thank You!</h3>
                <p>We'll notify you at ${email} when Local Experiences become available.</p>
                <span class="close-notification">Close</span>
              </div>
            `;
            
            // Store email in localStorage for future reference
            storeNotificationEmail(email, 'Local Experiences');
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          // Show error message
          notification.innerHTML = `
            <div class="notification-content">
              <h3>Oops!</h3>
              <p>There was a problem. Please try again later.</p>
              <span class="close-notification">Close</span>
            </div>
          `;
          console.error('Error:', error);
        });
      });
    });
  });
  
  // Use event delegation to handle close button clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-notification')) {
      const notification = e.target.closest('.notification-popup');
      if (notification) {
        document.body.removeChild(notification);
      }
    }
  });
  
  // Function to store email in localStorage
  function storeNotificationEmail(email, service) {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    // Check if email already exists for this service
    const exists = notifications.some(n => n.email === email && n.service === service);
    
    if (!exists) {
      notifications.push({
        email: email,
        service: service,
        date: new Date().toISOString()
      });
      
      localStorage.setItem('notifications', JSON.stringify(notifications));
      console.log('Stored notification request:', email, service);
    }
  }
});