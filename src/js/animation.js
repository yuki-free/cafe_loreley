import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {
  gsap.set('.js-bg-animation', {
    'background-size': '200% 200%',
    'background-position': '50% 50%'
  });

  gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none'
    }
  })
  .to('.js-bg-animation', {
    'background-position': '100% 50%',
    duration: 2.5
  })
  .to('.js-bg-animation', {
    'background-position': '0% 50%',
    duration: 5
  })
  .to('.js-bg-animation', {
    'background-position': '50% 50%',
    duration: 2.5
  });

});