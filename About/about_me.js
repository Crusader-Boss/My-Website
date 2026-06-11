$(document).ready(function () {
  // entrance fades
  $(".title").animate({ opacity: 1 }, 600);
  $(".profile-picture").delay(300).animate({ opacity: 1 }, 600);
  $(".description").delay(600).animate({ opacity: 1 }, 600);

  // helper: check if element is visible in viewport
  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < (window.innerHeight || document.documentElement.clientHeight) - 50;
  }

  // animate skill bars when visible
  function animateSkills() {
    document.querySelectorAll('.skill-bar').forEach(function(bar){
      if (!bar.dataset.animated && isVisible(bar)){
        const pct = bar.getAttribute('data-percent') || 60;
        const fill = bar.querySelector('.skill-fill');
        fill.style.width = pct + '%';
        bar.dataset.animated = 'true';
      }
    });
  }

  // stats counters
  function animateStats(){
    document.querySelectorAll('.stat-value').forEach(function(el){
      if (!el.dataset.animated && isVisible(el)){
        const target = parseInt(el.getAttribute('data-target') || '0',10);
        let curr = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(function(){
          curr += step;
          if (curr >= target) { curr = target; clearInterval(timer); }
          el.textContent = curr;
        }, 16);
        el.dataset.animated = 'true';
      }
    });
  }

  // gallery lightbox (disabled)
  // We intentionally disable the lightbox for now so clicks on the photography
  // thumbnails do nothing. We'll re-enable/design this later.
  function setupGallery(){
    // no-op intentionally: gallery click behaviour disabled
    return;
  }

  // testimonials simple rotator
  function rotateTestimonials(){
    const wrap = document.querySelector('.testimonials-wrap');
    if (!wrap) return;
    let i = 0;
    const items = wrap.querySelectorAll('.testimonial');
    items.forEach((it,idx)=>{ it.style.display = idx===0? 'block':'none'; });
    setInterval(function(){
      items[i].style.display = 'none';
      i = (i+1) % items.length;
      items[i].style.display = 'block';
    }, 4200);
  }

  // initial run and on scroll
  animateSkills(); animateStats(); setupGallery(); rotateTestimonials();
  window.addEventListener('scroll', function(){ animateSkills(); animateStats(); });
});
