import { landSlider } from './sliders/landSlider';
import { vSlider } from './sliders/verticalSlider';
import '../scss/style.scss';

const landContainer = document.querySelector('.sliderH');
const landSlides = landContainer.querySelectorAll('.sliderH__slide');
const fieldRange = document.querySelector('.sliderH__range');

vSlider(document.querySelectorAll('.sliderV__slide'),fieldRange, 300);
landSlider(landContainer, landSlides, fieldRange, 300);
