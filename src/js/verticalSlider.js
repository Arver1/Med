function vSlider(slides, delay = 300){
  // vSlider: slides required numeration first parameter of function,double underscore,number
  // like that : slide__1, slide__2
  const panel = document.querySelector('.controls');
  const controls =  panel.querySelectorAll('.control');
  let currentSlide = 0;
  slides.forEach((slide, index) => {
    if(slide.classList.contains('active')) {
      currentSlide = index;
    }
  });
  controls[currentSlide].classList.add('control_active')
  let temp = null;
  let timerId = null;

  window.addEventListener('touchstart', defineDirection);
  window.addEventListener('touchmove', changeYSlide.bind(slides));
  window.addEventListener('wheel', changeYSlide.bind(slides));
  panel.addEventListener('click', togglePanel);


  function defineDirection(e){
    temp = e.touches[0].clientY;
  }

  function changeYSlide(e){
    if(timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      if(!this) return; // context it's array of slides
      const arrSlides = [...this];
      const maxL = arrSlides.length - 1;
      let activeNum = 0;
      let current = 0;
      let i = 0;
      while(i <= maxL){
        if(!!~[...arrSlides[i].classList].indexOf('active')){
          activeNum = i;
          break;
        }
        i++;
      }
      if (e.deltaY < 0 || e.touches && e.touches[0].clientY > temp) {
        if(activeNum - 1 < 0) return;
        current = activeNum - 1 === 0 ? 0 : activeNum - 1;
        arrSlides[activeNum].classList.toggle('active');
        arrSlides[activeNum].classList.toggle('leave_up');
        arrSlides[current].classList.toggle('enter_up');
        setTimeout(()=>{
          arrSlides[activeNum].classList.toggle('leave_up');
          arrSlides[current].classList.toggle('active');
          arrSlides[current].classList.toggle('enter_up');
          controls[activeNum].classList.toggle('control_active');
          controls[current].classList.toggle('control_active');
        }, delay);
      }
      if (e.deltaY > 0 || e.touches && e.touches[0].clientY < temp)  {
        if(activeNum + 1 > maxL) return;
        current = activeNum + 1 > maxL ? maxL : activeNum + 1;
        arrSlides[activeNum].classList.toggle('active' );
        arrSlides[current].classList.toggle('enter_down');
        arrSlides[activeNum].classList.toggle('leave_down');
        arrSlides[current].classList.toggle('active');
        setTimeout(()=>{
          arrSlides[activeNum].classList.toggle('leave_down');
          arrSlides[current].classList.toggle('enter_down');
          controls[activeNum].classList.toggle('control_active');
          controls[current].classList.toggle('control_active');
        }, delay);
      }
    }, 100);
  }

  function togglePanel(e){
    if(e.target === this) return;
    const names = e.target.className;
    if(~names.indexOf('control_active')){
      return;
    }
    const oldValue = panel.querySelector('.control_active').className.replace(/\D/g, '') - 1;
    const value = names.replace(/\D/g, '') - 1;
    const delta = value - oldValue;
    const count = delta < 0 ? -delta : delta;
    const event = new WheelEvent('wheel', {
      deltaY: value > oldValue ? 100 : -100
    });
    for(let i = 0; i < count; i++){
      if(i === 0) {
        window.dispatchEvent(event);
        continue;
      }
      setTimeout(() => {
        window.dispatchEvent(event);
      }, delay);
    }
  }
}
