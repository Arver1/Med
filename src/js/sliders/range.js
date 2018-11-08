export default function (e){
  const delay = 1500;
  const scale = document.querySelector('.range');
  const thumb = scale.querySelector('.range__thumb');
  const fillScale = scale.querySelector('.range__fill_scale');
  const points = scale.querySelectorAll('.range__item');
  const range = {
    minX: -thumb.offsetWidth / 2,
    maxX: scale.offsetWidth - thumb.offsetWidth / 2
  };
  const sectionLength = (range.maxX + thumb.offsetWidth) / (points.length - 1);
  console.log((range.maxX))
  const startCoords = { x: e.clientX };
  let timerId = null;
  function actionMoveThumb(e){
    e.preventDefault();
    const shift = { x: e.clientX - startCoords.x};
    startCoords.x = e.clientX;
    let newX = thumb.offsetLeft + shift.x;
    newX = newX < -range.minX  ? -range.minX :
      newX > range.maxX ? range.maxX : newX;
    thumb.style.left =  newX + 'px';
    if(newX > 0 ){
      fillScale.style.width = thumb.style.left;
      fillScale.style.border = "1px solid #98acc0";
    }
    if(shift.x < 0) {
      document.addEventListener('mouseup',actionLeftStopThumb);
    } else if(shift.x > 0) {
      document.addEventListener('mouseup',actionRightStopThumb);
    }
  }
  function actionLeftStopThumb(e){
    e.preventDefault();
    document.removeEventListener('mousemove',actionMoveThumb);
    document.removeEventListener('mouseup',actionLeftStopThumb);
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(()=>{
      const left = parseFloat(thumb.style.left);
      if(left % sectionLength !== 0){
        const total = left % sectionLength;

        let step = 1500 / total;
        if(left < sectionLength && sectionLength % left < 20) {
          thumb.style.left =  left + (sectionLength % left) + 'px';
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
          thumb.style.left =  left - timePassed / step + 'px';
          // if(parseFloat(thumb.style.left) < 2){
          //   thumb.style.left = '-22px';
          // }
          fillScale.style.width = thumb.style.left;
        }, 10)
      }
    }, 1000)
  }
  function actionRightStopThumb(e){
    e.preventDefault();
    document.removeEventListener('mousemove',actionMoveThumb);
    document.removeEventListener('mouseup',actionRightStopThumb);
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
  document.addEventListener('mousemove',actionMoveThumb);
}
