const wrapper = document.querySelector('.wrapper');
const slides = document.querySelectorAll('.slide');
const btn = document.querySelector('button');

const fps = 50;
const totalTime = 2000;
let timerId = null;

function changeYSlide(e){
  if(timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(()=>{
    if(!this) return; // context it's array of slides
    const arrSlides = [...this];
    const maxL = arrSlides.length - 1;
    let activeNum = 0;
    let current = 0;
    let i = 0;
    while(i <= maxL){
      if(!!~[...arrSlides[i].classList].indexOf('active')){
        activeNum = i;
        break;
      }
      i++;
    }
    if (e.deltaY < 0 || e.touches && e.touches[0].clientY > temp) {
      console.log('up');
      current = activeNum - 1 <= 0 ? 0 : activeNum - 1;
    }
    if (e.deltaY > 0 || e.touches && e.touches[0].clientY < temp)  {
      console.log('down');
      current = activeNum + 1 > maxL ? maxL : activeNum + 1;
    }
    arrSlides[activeNum].classList.toggle('active');
    arrSlides[current].classList.toggle('active');
  }, 100);
}
let temp = null;
function defineDirection(e){
  console.log('start');
  temp = e.touches[0].clientY;
}
window.addEventListener('touchstart', defineDirection);
window.addEventListener('touchmove', changeYSlide.bind(slides));
window.addEventListener('wheel', changeYSlide.bind(slides));
