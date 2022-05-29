import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  //                  menu
  // ===========================================

  const hamburgerBtn = document.getElementsByClassName('hamburger-button')[0];

  hamburgerBtn.addEventListener('click', () => {
    if (hamburgerBtn.classList.contains('is-open') !== true) {
      const hamburgerBtnHeight = hamburgerBtn.clientHeight;

      gsap.set('.main-menu__link', {
        yPercent: 100
      });

      gsap.timeline()
      .to('.hamburger-button__bar--top', {
        x: 57,
        duration: .4,
        ease: 'power3.in'
      })
      .to('.hamburger-button__bar--top', {
        rotation: -45,
        y: -14,
        duration: .4,
      })
      .to('.hamburger-button__bar--top', {
        x: 19,
        y: 7,
        duration: .4,
        ease: 'power3.out'
      });

      gsap.timeline()
      .to('.hamburger-button__bar--bottom', {
        x: -57,
        duration: .4,
        ease: 'power3.in'
      })
      .to('.hamburger-button__bar--bottom', {
        rotation: 45,
        y: -28,
        duration: .4
      })
      .to('.hamburger-button__bar--bottom', {
        x: -19,
        y: -7,
        duration: .4,
        ease: 'power3.out'
      });

      gsap.timeline().fromTo('.main-menu', {
        'clip-path': 'inset(100% 0 0 0)',
        opacity: 1
      }, {
        'clip-path': 'inset(0% 0 0 0)',
        duration: .6,
        ease: 'power4.in'
      })
      .set('.global-navi', {
        opacity: 0,
        'pointer-events': 'none',
      })
      .to('.main-menu__link', {
        yPercent: 0,
        stagger: .1,
        duration: .6,
        ease: 'power3.out'
      }, '-=.2');
    } else {
      gsap.timeline()
      .to('.main-menu__link', {
        yPercent: -100,
        stagger: {
          each: .1,
          from: 'end'
        },
        duration: .6,
        ease: 'power3.in'
      })
      .to('.main-menu', {
        'clip-path': 'inset(0 0 100% 0)',
        opacity: 0,
        duration: .6,
        ease: 'power3.in'
      }, '-=.4')
      .to('.global-navi', {
        opacity: 1,
        'pointer-events': 'auto',
        duration: .4
      }, '-=.4');
    }
    hamburgerBtn.classList.toggle('is-open');
  });
});
