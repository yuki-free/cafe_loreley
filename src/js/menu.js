import { gsap } from "gsap";

// ===========================================
//                  menu
// ===========================================

gsap.set('.main-menu', {
  'clip-path': 'inset(100% 0 0 0)'
});

const hamburgerBtn = document.getElementsByClassName('hamburger-button')[0];

hamburgerBtn.addEventListener('click', () => {
  gsap.to('.main-menu', {
    'clip-path': 'inset(100% 0 0 0)',
    

  })
})

