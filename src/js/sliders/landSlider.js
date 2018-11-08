import moveThumb from './range';

export function landSlider(container, slides, delay = 300, thumb) {
  if(!container || !slides || !thumb) return;
  const arrSlideH = [...slides];
  const slideH = container;
  const max = arrSlideH.length - 1;
  const step = delay / 100;
  let k = null;
  let oldValue = null;
  let direction = null;

  thumb.addEventListener('mousedown', function(e){
    oldValue = parseFloat(thumb.style.left) ^ 0;
    moveThumb(e);
  });
  thumb.addEventListener('mouseup', function(e){
    const points = document.querySelectorAll('.range__item');
    const scale = document.querySelector('.range');
    const range = {
      maxX: scale.offsetWidth - thumb.offsetWidth
    };
    const sectionLength = range.maxX / (points.length - 1);
    let timer = null;
    const start = Date.now();
    if(e.clientX < oldValue) direction = 'left';
    else direction = 'right';
    k = parseFloat(thumb.style.left) / sectionLength ^ 0;
    console.log(k)
    if (timer) return;
      timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed > delay + 20) {
          return clearInterval(timer);
        }
        changeXSlide(timePassed, k, direction);
      }, 20);
  });

  function changeXSlide(timePassed, k, direction) {
    const temp = Math.ceil(timePassed / step);
    const value = temp >= 100 ? 100 : temp;
    if (direction === 'left') {
      slideH.style.transform = `translateX(${(max - k - 1) * 100 + value}%)`;
    } else if (direction === 'right') {
      slideH.style.transform = `translateX(${(max - k) * 100 - value}%)`;
    }
  }
}
