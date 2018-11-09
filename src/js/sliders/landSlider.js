import { changeXSlide } from './range';

export function landSlider(thumb, delay = 1500) {
  const scale = document.querySelector('.range');
  const fillScale = scale.querySelector('.range__fill_scale');
  const max = [...document.querySelectorAll('.sliderH__slide')].length - 1;
  const slideH = document.querySelector('.sliderH');
  const borderScale = "1px solid #98acc0";
  const range = {
    maxX: scale.offsetWidth - thumb.offsetWidth / 2
  };
  const sectionLength = range.maxX / max;
  let timerId = null;
  let startLeft = 0;
  let direction = 'left';

  $('.range__thumb').draggable({
    start: function(e, ui){
      startLeft = ui.position.left;
    },
    drag: function(e, ui){
      ui.position.top = -20;
      if(ui.position.left < 0) {
        ui.position.left = -6;
      } else if (ui.position.left > range.maxX) {
        ui.position.left = range.maxX;
      }
      if(ui.position.left > 0 ){
        fillScale.style.width =  ui.position.left + 'px';
        fillScale.style.border = borderScale;
      }
      direction = startLeft - ui.position.left > 0 ? 'left' : 'right';
    },
    stop: function(e, ui) {
      let fault = ui.position.left - startLeft;
      if(fault < 0) fault= -fault;
      if(fault < 10) return;
      let k = 0;
      if(direction === 'left'){
        k = Math.floor(ui.position.left / sectionLength);
        if(k < 0) k = 0;
        change('left', ui.position.left, k);
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(()=>{
          const left = ui.position.left;
          if(left % sectionLength !== 0){
            const total = left % sectionLength;
            let step = 1500 / total;
            if(left < sectionLength && sectionLength % left < 20) {
              if(left > 10) {
                thumb.style.left =  left + (sectionLength % left) + 'px';
                fillScale.style.width = thumb.style.left;
                return;
              } else {
                thumb.style.left = '-6px';
                fillScale.style.width = 0;
                return;
              }
            }
            const start = Date.now();
            const timer = setInterval(function(){
              const timePassed = Date.now() - start;
              if(timePassed >= 1500){
                clearInterval(timer);
                return;
              }
              thumb.style.left =  left - timePassed / step + 'px';
              if(parseFloat(thumb.style.left) < 2){
                thumb.style.left = '-6px';
              }
              fillScale.style.width = thumb.style.left;
            }, 10)
          }
        }, 1000)
      } else {
        k = Math.round(ui.position.left / sectionLength);
        change('right', ui.position.left, k);
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(()=>{
          const left = parseFloat(thumb.style.left);
          if(left % sectionLength !== 0){
            const total = sectionLength - (left % sectionLength);
            let step = 1500 / total;
            if(left > sectionLength && left % sectionLength < 20) {
              thumb.style.left =  left - (left % sectionLength) + 'px';
              fillScale.style.width = thumb.style.left;
              return;
            }
            const start = Date.now();
            const timer = setInterval(function(){
              const timePassed = Date.now() - start;
              if(timePassed >= 1500){
                clearInterval(timer);
                return;
              }
              thumb.style.left =  left + timePassed / step + 'px';
              fillScale.style.width = thumb.style.left;
            }, 10)
          }
        }, 1000)
      }
    }
  });
  function change(direction, left, k){
    const step = delay / 100;
    const start = Date.now();
    let timer = null;
    if (timer) return;
    timer = setInterval(() => {
      const timePassed = Date.now() - start;
      if (timePassed > delay + 20) {
        return clearInterval(timer);
      }
      changeXSlide(slideH, timePassed, k, direction, step, max);
    }, 20);
  }
}
