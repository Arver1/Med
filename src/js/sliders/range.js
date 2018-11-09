export function changeXSlide(slide, timePassed, k, direction, step, max) {
  const temp = Math.ceil(timePassed / step);
  const value = temp >= 100 ? 100 : temp;
  if (direction === 'left') {
    slide.style.transform = `translateX(${(max - k - 1) * 100 + value}%)`;
  } else if (direction === 'right') {
    slide.style.transform = `translateX(${(max - k + 1) * 100 - value}%)`;
  }
}
