import { landSlider } from './sliders/landSlider';
import { vSlider } from './sliders/verticalSlider';
import '../scss/style.scss';

window.addEventListener('load', () => {
  const landContainer = document.querySelector('.sliderH');
  const landSlides = landContainer.querySelectorAll('.sliderH__slide');
  const thumb = document.querySelector('.range__thumb');
  const btndown = document.querySelector('.sliderV__sun-text');

  vSlider(document.querySelectorAll('.sliderV__slide'), 300);
  landSlider(landContainer, landSlides, 300, thumb);
  btndown.addEventListener('click',()=>{
    const event = new WheelEvent('wheel', {
      deltaY: 100
    });
    window.dispatchEvent(event);
  });
});

