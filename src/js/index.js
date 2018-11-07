import { landSlider } from './sliders/landSlider';
import { vSlider } from './sliders/verticalSlider';
import '../scss/style.scss';

window.addEventListener('load', () => {
  const landContainer = document.querySelector('.sliderH');
  const landSlides = landContainer.querySelectorAll('.sliderH__slide');
  const thumb = document.querySelector('.range__thumb');

  vSlider(document.querySelectorAll('.sliderV__slide'), 300);
  landSlider(landContainer, landSlides, 300, thumb);
});

