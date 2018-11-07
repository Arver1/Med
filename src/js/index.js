import { landSlider } from './sliders/landSlider';
import { vSlider } from './sliders/verticalSlider';
import '../scss/style.scss';

const landContainer = document.querySelector('.sliderH');
const landSlides = landContainer.querySelectorAll('.sliderH__slide');
const fieldRange = document.querySelector('.sliderH__range');

vSlider(document.querySelectorAll('.sliderV__slide'),fieldRange, 300);
landSlider(landContainer, landSlides, fieldRange, 300);

window.addEventListener('load',()=>{
  const delay = 1500;
  const thumb = document.querySelector('.thumb');
  const scale = document.querySelector('.range');
  const fillScale = document.querySelector('.fill_scale');
  const points = document.querySelectorAll('.break_items li');
  const range = {
    maxX: scale.offsetWidth - thumb.offsetWidth
  };
  const sectionLength = range.maxX / (points.length - 1);
  thumb.addEventListener('mousedown',(e)=>{
    const startCoords = { x: e.clientX };
    let direction = null;
    let timerId = null;
    function actionMoveThumb(e){
      e.preventDefault();
      const shift = { x: e.clientX - startCoords.x};
      startCoords.x = e.clientX;
      let newX = thumb.offsetLeft + shift.x;
      newX = newX < 0  ? 0 :
        newX > range.maxX ? range.maxX : newX;
      thumb.style.left =  newX + 'px';
      if(newX > 0 ){
        fillScale.style.width = thumb.style.left;
        fillScale.style.border = "1px solid #98acc0";
      }
      if(shift.x < 0) {
        direction = 0;
      } else if(shift.x > 0) {
        direction = 1;
      }
    }
    function actionStopThumb(e){
      e.preventDefault();
      document.removeEventListener('mousemove',actionMoveThumb);
      if(timerId) clearTimeout(timerId);
      timerId = setTimeout(()=>{
        const left = parseFloat(thumb.style.left);
        if(left % sectionLength !== 0){
          let total = sectionLength - (left % sectionLength);
          if(!direction) total = left % sectionLength;
          let step = delay / total;
          if(left < sectionLength && sectionLength % left < 20) {
            thumb.style.left =  left + (sectionLength % left) + 'px';
            fillScale.style.width = thumb.style.left;
            return;
          }
          if(left > sectionLength && left % sectionLength < 20) {
            thumb.style.left =  left - (left % sectionLength) + 'px';
            fillScale.style.width = thumb.style.left;
            return;
          }
          const start = Date.now();
          const timer = setInterval(function(){
            const timePassed = Date.now() - start;
            if(timePassed >= delay){
              clearInterval(timer);
              return;
            }
            if(!direction) {
              thumb.style.left =  left - timePassed / step + 'px';
              if(timePassed / step > 20)
                fillScale.style.width = thumb.style.left;
            } else if(direction) {
              thumb.style.left =  left + timePassed / step + 'px';
              fillScale.style.width = thumb.style.left;
            }
          }, 10)
        }
      }, 1000)
    }
    document.addEventListener('mouseup',actionStopThumb);
    document.addEventListener('mousemove',actionMoveThumb);
  })
});
