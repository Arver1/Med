export function vSlider(slides, thumb, delay = 300){
  // vSlider: slides required numeration first parameter of function,double underscore,number
  // like that : slide__1, slide__2
  const nameActiveClass = 'sliderV__slide--active';
  const nameActiveControl = 'sliderV__control--active';
  const nameLeaveDownClass = 'sliderV__slide--leave_down';
  const nameEnterDownClass = 'sliderV__slide--enter_down';
  const nameEnterUpClass = 'sliderV__slide--enter_up';
  const nameLeaveUpClass = 'sliderV__slide--leave_up';

  const panel = document.querySelector('.sliderV__controls');
  const controls =  panel.querySelectorAll('.sliderV__control');
  let currentSlide = 0;
  slides.forEach((slide, index) => {
    if(slide.classList.contains(nameActiveClass)) {
      currentSlide = index;
    }
  });
  controls[currentSlide].classList.add(nameActiveControl);
  let temp = null;
  let timerId = null;

  window.addEventListener('touchstart', defineDirection);
  window.addEventListener('touchmove', changeYSlide.bind(slides));
  window.addEventListener('wheel', changeYSlide.bind(slides));
  panel.addEventListener('click', togglePanel);

  $('.range__thumb').on('dragstop', () => {
    window.addEventListener('touchstart', defineDirection);
    window.addEventListener('touchmove', changeYSlide.bind(slides));
    window.addEventListener('wheel', changeYSlide.bind(slides));
  }).on('dragstart', () => {
    window.removeEventListener('touchstart', defineDirection);
    window.removeEventListener('touchmove', changeYSlide.bind(slides));
    window.removeEventListener('wheel', changeYSlide.bind(slides));
  });


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
        if(!!~[...arrSlides[i].classList].indexOf(nameActiveClass)){
          activeNum = i;
          break;
        }
        i++;
      }
      if (e.deltaY < 0 || e.touches && e.touches[0].clientY > temp) {
        if(activeNum - 1 < 0) return;
        current = activeNum - 1 === 0 ? 0 : activeNum - 1;
        arrSlides[activeNum].classList.toggle(nameActiveClass);
        arrSlides[activeNum].classList.toggle(nameLeaveUpClass);
        arrSlides[current].classList.toggle(nameEnterUpClass);
        setTimeout(()=>{
          arrSlides[activeNum].classList.toggle(nameLeaveUpClass);
          arrSlides[current].classList.toggle(nameActiveClass);
          arrSlides[current].classList.toggle(nameEnterUpClass);
          controls[activeNum].classList.toggle(nameActiveControl);
          controls[current].classList.toggle(nameActiveControl);
        }, delay);
      }
      if (e.deltaY > 0 || e.touches && e.touches[0].clientY < temp)  {
        if(activeNum + 1 > maxL) return;
        current = activeNum + 1 > maxL ? maxL : activeNum + 1;
        arrSlides[activeNum].classList.toggle(nameActiveClass);
        arrSlides[current].classList.toggle(nameEnterDownClass);
        arrSlides[activeNum].classList.toggle(nameLeaveDownClass);
        arrSlides[current].classList.toggle(nameActiveClass);
        setTimeout(()=>{
          arrSlides[activeNum].classList.toggle(nameLeaveDownClass);
          arrSlides[current].classList.toggle(nameEnterDownClass);
          controls[activeNum].classList.toggle(nameActiveControl);
          controls[current].classList.toggle(nameActiveControl);
        }, delay);
      }
    }, 100);
  }

  function togglePanel(e){
    if(e.target === this) return;
    const names = e.target.className;
    if(~names.indexOf(nameActiveControl)){
      return;
    }
    const oldValue = panel.querySelector(`.${nameActiveControl}`).className.replace(/\D/g, '') - 1;
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
