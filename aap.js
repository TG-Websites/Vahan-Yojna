  // fuction for image slide
      let currentSlide = 0;
      const slides = document.querySelectorAll(".slider-slide");
      const totalSlides = slides.length;
      const sliderTrack = document.getElementById("slider-track");
      const dots = document.querySelectorAll(".slider-dot");

      function updateSlider(instant = false) {
        if (instant) {
          sliderTrack.style.transition = "none"; // disable animation
        } else {
          sliderTrack.style.transition = "transform 0.5s ease-in-out"; // enable animation
        }

        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {
          dot.classList.toggle("opacity-100", index === currentSlide);
          dot.classList.toggle("opacity-50", index !== currentSlide);
        });
      }

      function nextSlide() {
        if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSlider();
        } else {
          // Go back to first instantly (no reverse animation)
          currentSlide = 0;
          updateSlider(true); // instant jump
          // re-enable animation after 50ms
          setTimeout(() => {
            sliderTrack.style.transition = "transform 0.5s ease-in-out";
          }, 50);
        }
      }

      // Auto-advance slides
      setInterval(nextSlide, 5000);

      // Dot navigation
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentSlide = index;
          updateSlider();
        });
      });

      // Mobile menu toggle
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");

      mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      // EMI Calculator functionality
      const loanAmountSlider = document.getElementById("loanAmount");
      const interestRateSlider = document.getElementById("interestRate");
      const loanTenureSlider = document.getElementById("loanTenure");

      const loanAmountValue = document.getElementById("loanAmountValue");
      const interestRateValue = document.getElementById("interestRateValue");
      const loanTenureValue = document.getElementById("loanTenureValue");

      const monthlyEMI = document.getElementById("monthlyEMI");
      const totalInterest = document.getElementById("totalInterest");
      const totalAmount = document.getElementById("totalAmount");

      function formatCurrency(amount) {
        if (amount >= 10000000) {
          return "₹" + (amount / 10000000).toFixed(1) + " Cr";
        } else if (amount >= 100000) {
          return "₹" + (amount / 100000).toFixed(1) + "L";
        } else {
          return "₹" + amount.toLocaleString("en-IN");
        }
      }

      function calculateEMI() {
        const principal = parseFloat(loanAmountSlider.value);
        const rate = parseFloat(interestRateSlider.value) / 100 / 12;
        const tenure = parseFloat(loanTenureSlider.value) * 12;

        const emi =
          (principal * rate * Math.pow(1 + rate, tenure)) /
          (Math.pow(1 + rate, tenure) - 1);
        const totalAmountPayable = emi * tenure;
        const totalInterestPayable = totalAmountPayable - principal;

        // Update display values
        loanAmountValue.textContent = formatCurrency(principal);
        interestRateValue.textContent =
          parseFloat(interestRateSlider.value).toFixed(1) + "%";
        loanTenureValue.textContent = loanTenureSlider.value + " yrs";

        monthlyEMI.textContent = "₹" + Math.round(emi).toLocaleString("en-IN");
        totalInterest.textContent = formatCurrency(
          Math.round(totalInterestPayable)
        );
        totalAmount.textContent = formatCurrency(
          Math.round(totalAmountPayable)
        );
      }

      // Add event listeners
      loanAmountSlider.addEventListener("input", calculateEMI);
      interestRateSlider.addEventListener("input", calculateEMI);
      loanTenureSlider.addEventListener("input", calculateEMI);

      // Initialize calculator
      calculateEMI();

      // Initialize slider
      updateSlider();

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });