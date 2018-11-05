function landSlider(container, slides, fieldRange, delay = 300) {
  if(!container || !slides || !fieldRange) return;
  const cntrl = fieldRange;
  const arrSlideH = [...slides];
  const slideH = container;
  let oldVal = 0;
  cntrl.max = arrSlideH.length - 1;
  const step = delay / 100;

  cntrl.addEventListener('input', (e) => {
    const start = Date.now();
    let timer = null;
    if (timer) return;
    let direction = 'right';
    let k = +e.target.value;
    if (oldVal < k) direction = 'left';
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
      slideH.style.transform = `translateX(${-(k - 1) * 100 - value}%)`;
    } else if (direction === 'right') {
      slideH.style.transform = `translateX(${-(k + 1) * 100 + value}%)`;
    }
  }
}

