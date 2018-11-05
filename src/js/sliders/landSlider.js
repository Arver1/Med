export function landSlider(container, slides, fieldRange, delay = 300) {
  if(!container || !slides || !fieldRange) return;
  const cntrl = fieldRange;
  const arrSlideH = [...slides];
  const slideH = container;
  let oldVal = 2;
  cntrl.max = arrSlideH.length - 1;
  cntrl.value = arrSlideH.length - 1;
  const step = delay / 100;
  let k = +cntrl.value;

  cntrl.addEventListener('input', (e) => {
    const start = Date.now();
    let timer = null;
    if (timer) return;
    let direction = 'right';
    k = +e.target.value;
    if (oldVal > k) direction = 'left';
    timer = setInterval(() => {
      const timePassed = Date.now() - start;
      if (timePassed > delay + 20) {
        return clearInterval(timer);
      }

      changeXSlide(timePassed, k, direction);
    }, 20);
    oldVal = k;
  });

  function changeXSlide(timePassed, k, direction) {
    const temp = Math.ceil(timePassed / step);
    const value = temp >= 100 ? 100 : temp;
    if (direction === 'left') {
      slideH.style.transform = `translateX(${(cntrl.max - k - 1) * 100 + value}%)`;
    } else if (direction === 'right') {
      slideH.style.transform = `translateX(${(cntrl.max - k + 1) * 100 - value}%)`;
    }
  }
}

