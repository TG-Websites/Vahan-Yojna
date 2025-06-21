    // Mobile menu toggle
  document.getElementById('mobile-menu-btn').addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
      });

      // Password visibility toggle
      document.getElementById('togglePassword').addEventListener('click', function() {
        const passwordInput = document.getElementById('password');
        const eyeIcon = document.getElementById('eyeIcon');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          eyeIcon.classList.remove('fa-eye');
          eyeIcon.classList.add('fa-eye-slash');
        } else {
          passwordInput.type = 'password';
          eyeIcon.classList.remove('fa-eye-slash');
          eyeIcon.classList.add('fa-eye');
        }
      });

      // Enhanced notification system
      function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const icon = document.getElementById('notification-icon');
        const messageEl = document.getElementById('notification-message');
        
        // Set message
        messageEl.textContent = message;
        
        // Set icon based on type
        icon.innerHTML = type === 'success' 
          ? '<i class="fas fa-check-circle text-green-500 text-xl"></i>'
          : '<i class="fas fa-exclamation-circle text-red-500 text-xl"></i>';
        
        // Show notification
        notification.classList.add('show');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }

      // Close notification
      document.getElementById('notification-close').addEventListener('click', function() {
        document.getElementById('notification').classList.remove('show');
      });

      // Enhanced form validation
      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      }

      function validatePassword(password) {
        return password.length >= 6;
      }

      // Form submission with enhanced validation
      document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Enhanced validation
        if (!email || !password) {
          showNotification('Please fill in all fields', 'error');
          return;
        }
        
        if (!validateEmail(email)) {
          showNotification('Please enter a valid email address', 'error');
          return;
        }
        
        if (!validatePassword(password)) {
          showNotification('Password must be at least 6 characters long', 'error');
          return;
        }
        
        // Show loading state
        const submitButton = document.getElementById('loginBtn');
        const buttonText = document.getElementById('loginBtnText');
        const originalText = buttonText.textContent;
        
        buttonText.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Signing In...';
        submitButton.disabled = true;
        submitButton.classList.add('opacity-75');
        
        // Simulate API call
        setTimeout(() => {
          // Reset button
          buttonText.textContent = originalText;
          submitButton.disabled = false;
          submitButton.classList.remove('opacity-75');
          
          // Show success notification
          showNotification('Login successful! Redirecting...', 'success');
          
          // Simulate redirect after success
          setTimeout(() => {
            showNotification('Welcome to Vahan Yojana Dashboard!', 'success');
          }, 1500);
          
        }, 2000);
      });

      // Enhanced input focus effects
      document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
          this.parentElement.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          this.parentElement.parentElement.classList.remove('focused');
        });

        // Real-time validation feedback
        input.addEventListener('input', function() {
          if (this.type === 'email' && this.value) {
            if (validateEmail(this.value)) {
              this.classList.remove('border-red-300');
              this.classList.add('border-green-300');
            } else {
              this.classList.remove('border-green-300');
              this.classList.add('border-red-300');
            }
          }
          
          if (this.type === 'password' && this.value) {
            if (validatePassword(this.value)) {
              this.classList.remove('border-red-300');
              this.classList.add('border-green-300');
            } else {
              this.classList.remove('border-green-300');
              this.classList.add('border-red-300');
            }
          }
        });
      });

      // Social login buttons
      document.querySelectorAll('button[type="button"]').forEach(button => {
        if (button.innerHTML.includes('Google') || button.innerHTML.includes('Facebook')) {
          button.addEventListener('click', function() {
            const provider = this.innerHTML.includes('Google') ? 'Google' : 'Facebook';
            showNotification(`${provider} login is not implemented in this demo`, 'error');
          });
        }
      });

      // Add smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Initialize page animations
      window.addEventListener('load', function() {
        document.body.classList.add('loaded');
      });