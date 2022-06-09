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

      gsap.set('.main-menu__sub-text span', {
        yPercent: 100
      });

      gsap.set('.main-menu__sub-link', {
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
      
      gsap.to('.hamburger-button__bar--middle', {
        xPercent: 100,
        ease: 'power3.in',
        duration: .4
      });

      gsap.timeline({
        defaults: {
          overwrite: true
        }
      }).fromTo('.main-menu', {
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
      .set('body', {
        overflow: 'hidden'
      })
      .to('.main-menu__link', {
        yPercent: 0,
        stagger: .1,
        duration: .6,
        ease: 'power3.out'
      }, '-=.2')
      .to('.main-menu__sub-text span', {
        yPercent: 0,
        stagger: .1,
        duration: .6,
        ease: 'power3.out'
      }, '-=.6')
      .to('.main-menu__sub-link', {
        yPercent: 0,
        stagger: .1,
        duration: .6,
        ease: 'power3.out'
      }, '-=.4');

    } else {
      gsap.timeline({
        defaults: {
          overwrite: true
        }
      })
      .to('.main-menu__sub-link', {
        yPercent: -100,
        stagger: {
          each: .1,
          from: 'end'
        },
        duration: .6,
        ease: 'power3.in'
      })
      .to('.main-menu__sub-text span', {
        yPercent: -100,
        stagger: {
          each: .1,
          from: 'end'
        },
        duration: .6,
        ease: 'power3.in'
      }, '-=.4')
      .to('.main-menu__link', {
        yPercent: -100,
        stagger: {
          each: .1,
          from: 'end'
        },
        duration: .6,
        ease: 'power3.in'
      }, '-=.6')
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
      }, '-=.4')
      .to('body', {
        overflow: 'visible'
      });

      gsap.timeline()
      .to('.hamburger-button__bar--top', {
        x: 57,
        y: -14,
        duration: .4,
        ease: 'power3.in'
      })
      .to('.hamburger-button__bar--top', {
        rotation: 0,
        y: 0,
        duration: .4,
      })
      .to('.hamburger-button__bar--top', {
        x: 0,
        duration: .4,
        ease: 'power3.out'
      });

      gsap.timeline()
      .to('.hamburger-button__bar--bottom', {
        x: -57,
        y: -28,
        duration: .4,
        ease: 'power3.in'
      })
      .to('.hamburger-button__bar--bottom', {
        rotation: 0,
        y: 0,
        duration: .4
      })
      .to('.hamburger-button__bar--bottom', {
        x: 0,
        duration: .4,
        ease: 'power3.out'
      });

      gsap.to('.hamburger-button__bar--middle', {
        xPercent: 0,
        delay: .8,
        ease: 'power3.out',
        duration: .4
      });
    }

    hamburgerBtn.classList.toggle('is-open');
  });
});
