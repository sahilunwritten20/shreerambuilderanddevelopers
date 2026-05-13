
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, looking for visitForm...');
    
    const visitForm = document.getElementById('visitForm');
    console.log('visitForm element:', visitForm);
    
    if (!visitForm) {
      console.error('ERROR: visitForm not found in HTML!');
      return;
    }
    
    console.log('✓ visitForm found, attaching event listener...');
    
    visitForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log('✓ Form submit event triggered');
      
      // Get all form values
      const name = document.getElementById('vName').value.trim();
      const phone = document.getElementById('vPhone').value.trim();
      const email = document.getElementById('vEmail').value.trim();
      const date = document.getElementById('vDate').value;
      const interest = document.getElementById('vInterest').value;
      const message = document.getElementById('vMessage').value.trim();
      
      console.log('Form data collected:', { name, phone, email, date, interest, message });
      
      // ===== VALIDATION =====
      if (!name || !phone || !email) {
        showToast('❌ Please fill in all required fields');
        console.warn('Validation failed: missing required fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('❌ Please enter a valid email address');
        console.warn('Validation failed: invalid email');
        return;
      }
      
      // Phone validation - must have at least 10 digits
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        showToast('❌ Please enter a valid phone number (at least 10 digits)');
        console.warn('Validation failed: invalid phone');
        return;
      }
      
      console.log('✓ All validations passed');
      
      // ===== SUBMIT TO API =====
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.textContent;
      
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Submitting...';
        console.log('Sending data to /api/submit-visit...');
        
        const response = await fetch('/api/submit-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            date: date || null,
            interest,
            message
          })
        });
        
        console.log('Response received, status:', response.status);
        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        if (response.ok) {
          console.log('✓ SUCCESS! Form submitted successfully');
          showToast('✅ Site visit request submitted! Check your email for confirmation.');
          visitForm.reset();
          
          // Scroll to form to show success
          visitForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          const errorMsg = responseData.error || 'Submission failed. Please try again.';
          console.error('Server error:', errorMsg);
          showToast('❌ ' + errorMsg);
        }
        
      } catch (error) {
        console.error('Network or submission error:', error);
        showToast('❌ Network error. Please check your connection and try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  });
   
  // Toast notification function
  function showToast(message) {
    // Check if showToast already exists from main.js
    if (typeof window.showToastOriginal === 'function') {
      window.showToastOriginal(message);
    } else {
      // Fallback if main.js showToast doesn't exist
      alert(message);
      console.log('Toast:', message);
    }
  }
  
  
  function scrollGallery(amount){
  
  document.getElementById('galleryTrack').scrollBy({
    left: amount,
    behavior: 'smooth'
  });
  
  }
  
   // Video Carousel Class
   class VideoCarousel {
      constructor() {
        this.track = document.getElementById('videoCarouselTrack');
        this.slides = document.querySelectorAll('.cvid-carousel-slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.cvid-dot');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
   
        this.init();
      }
   
      init() {
        // Button controls
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
   
        // Dot indicators
        this.dots.forEach((dot, index) => {
          dot.addEventListener('click', () => this.goToSlide(index));
        });
   
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prev();
          if (e.key === 'ArrowRight') this.next();
        });
   
        // Touch/Swipe support
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), false);
   
        // Prevent transition during manual scroll
        this.track.addEventListener('scroll', () => this.handleScroll());
      }
   
      updateSlide() {
    if (this.isTransitioning) return;
  
    // Each slide is 1/3 of track width, so divide by 3
    const translateX = -(this.currentIndex * (100 / 3));
    this.track.style.transform = `translateX(${translateX}%)`;
  
    // Update dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
   
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlide();
      }
   
      prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
      }
   
      goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
      }
   
      handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
      }
   
      handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }
   
      handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
   
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            // Swiped left, show next
            this.next();
          } else {
            // Swiped right, show prev
            this.prev();
          }
        }
      }
   
      handleScroll() {
        // Snap to slides on scroll
        const scrollLeft = this.track.scrollLeft;
        const slideWidth = this.track.offsetWidth;
        const newIndex = Math.round(scrollLeft / slideWidth);
   
        if (newIndex !== this.currentIndex) {
          this.currentIndex = newIndex;
          this.updateDots();
        }
      }
   
      updateDots() {
        this.dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === this.currentIndex);
        });
      }
    }
   
    // Initialize carousel when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      new VideoCarousel();
    });
   
    // // Add CSS for transform animation
    // const style = document.createElement('style');
    // style.textContent = `
    //   .cvid-carousel-track {
    //     transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    //   }
    // `;
    // document.head.appendChild(style);
  
  
     function scrollGallery(distance) {
        const track = document.getElementById('galleryTrack');
        track.scrollLeft += distance;
      }
      
  function switchTab(t,btn){
    document.querySelectorAll('.utab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.upanel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+t).classList.add('active');
  }
  function openLB(src){
    document.getElementById('lbox-img').src=src;
    document.getElementById('lbox').classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeLB(e){
    if(!e||e.target!==document.getElementById('lbox-img')){
      document.getElementById('lbox').classList.remove('open');
      document.body.style.overflow='';
    }
  }
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vis');});
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  function handleSub(e){
    const btn=document.querySelector('.btn-sub');
    btn.textContent='✓  Enquiry Submitted — We will contact you shortly!';
    btn.style.background='linear-gradient(135deg,#1B5E20,#2E7D32)';
    setTimeout(()=>{btn.textContent='✦  Submit Enquiry  ✦';btn.style.background='';},4000);
  }
  window.addEventListener('scroll',()=>{
    const h=document.getElementById('mainHeader');
    if(window.scrollY>60){h.style.height='64px';h.style.boxShadow='0 4px 30px rgba(11,37,69,0.18)';}
    else{h.style.height='82px';h.style.boxShadow='0 2px 30px rgba(11,37,69,0.1)';}
  });