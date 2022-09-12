const offset = 800;
const scrollUp = document.querySelector('.scrol-up');
const scrollUpSvgPath = document.querySelector('.scrol-up_svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageXOffset || document.documentElement.scrollTop;

const updateDashoffset = () => {
    const heigth = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / heigth);

    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
 };

window.addEventListener('scroll', () => {
    updateDashoffset()
    if ( getTop() > offset) {
        scrollUp.classList.add('scrol-up--active');
    } else {
        scrollUp.classList.remove('scrol-up--active');
    }
})

scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})