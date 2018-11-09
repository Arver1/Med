import { landSlider } from './sliders/landSlider';
import { vSlider } from './sliders/verticalSlider';
import '../scss/style.scss';

window.addEventListener('load', () => {
  const thumb = document.querySelector('.range__thumb');
  const btndown = document.querySelector('.sliderV__sun-text');

  vSlider(document.querySelectorAll('.sliderV__slide'), thumb, 300);
  landSlider(thumb, 1500);
  btndown.addEventListener('click',()=>{
    const event = new WheelEvent('wheel', {
      deltaY: 100
    });
    window.dispatchEvent(event);
  });
});

