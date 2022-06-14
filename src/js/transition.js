import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  //                  opening
  // ===========================================

  class Opening {

    set() {
      gsap.set('.opening', {
        y: 0
      });

      gsap.set('body', {
        'overflow-y': 'hidden'
      });
    }

    opening() {
      gsap.timeline()
      .to('.opening .mask__path', {
        'stroke-dashoffset': '0px',
        duration: 2,
        ease: 'none'
      })
      .to('.opening', {
        opacity: 0,
        scale: 1.2,
        filter: 'blur(3vw)',
        'pointer-events': 'none',
        duration: 1,
        ease: 'expo.in'
      }, '+=.5')
      .to('body', {
        'overflow-y': 'visible'
      });
    }

    topOpeningSet() {
      gsap.set('.header__logo, .global-navi__item, .hamburger-button', {
        yPercent: -100,
        opacity: 0
      });
    
      gsap.set('.catch-copy__main span', {
        yPercent: 50,
        opacity: 0,
      });
    }

    topOpening() {
      gsap.timeline()
      .to('.header__logo', {
        yPercent: 0,
        opacity: 1,
        duration: .6
      })
      .to('.global-navi__item', {
        yPercent: 0,
        opacity: 1,
        duration: .6,
        stagger: .1
      }, '-=.5')
      .to('.hamburger-button', {
        yPercent: 0,
        opacity: 1,
        duration: .6,
      }, '-=.4')
      .to('.catch-copy__main span', {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: .08
      }, '-=1');
    }

    othersOpeningSet() {

      gsap.set('.js-load-main span', {
        yPercent: 100,
        scaleY: 1.2,
        opacity: 0
      });

      gsap.set('.js-load-sub span', {
        opacity: 0,
        filter: 'blur(1em)'
      });

      gsap.set('.js-load-text', {
        opacity: 0,
        y: '3em'
      });

      gsap.set('.js-load-breadcrumb', {
        opacity: 0,
        yPercent: 100
      });
    }

    othersOpening() {

      gsap.timeline()
      .to('.js-load-main span', {
        yPercent: 0,
        scaleY: 1,
        opacity: 1,
        stagger: {
          amount: .6
        }
      })
      .to('.js-load-sub span', {
        opacity: 1,
        filter: 'blur(0em)',
        ease: 'power3.out',
        stagger: {
          amount: .4,
          from: 'random'
        }
      }, .6)
      .to('.js-load-text', {
        opacity: 1,
        y: '0em',
        duration: 1
      }, 1)
      .to('.js-load-breadcrumb', {
        opacity: 1,
        yPercent: 0,
        duration: 1
      }, 1.2);
    }
  }

  const opening = new Opening();

  // ===========================================
  //                  transition
  // ===========================================

  class Transition {
    constructor(el, layer) {
      this.el = document.querySelector(el);
      this.layer = document.querySelector(layer);
    }

    out() {
      gsap.set(this.el, {
        yPercent: 100
      });
    }

    transitionOut() {
      gsap.set(this.el, {
        opacity: 1
      });

      gsap.timeline()
      .fromTo(this.el, {
        yPercent: 100,
      }, {
        yPercent: 0,
        duration: .8,
        ease: 'expo.in'
      })
      .fromTo(this.el, {
        'border-radius': '50% 50% 0 0',
      }, {
        'border-radius': '0% 0% 0 0',
        duration: .1,
        ease: 'power3.out'
      }, '-=.1');
    }

    set() {
      gsap.set('body', {
        'overflow-y': 'hidden'
      });

      gsap.set(this.el, {
        yPercent: 0
      });

      gsap.set(this.layer, {
        yPercent: 0
      });
    }

    transitionIn() {
      gsap.timeline()
      .fromTo(this.el,{
        yPercent: 0,
        opacity: 1
      }, {
        yPercent: -100,
        opacity: 0,
        duration: .8,
        ease: 'expo.in'
      })
      .fromTo(this.layer, {
        opacity: 1,
        filter: 'blur(0vw)'
      }, {
        opacity: 0,
        duration: .5,
        filter: 'blur(3vw)',
        ease: 'expo.in'
      }, '-=.2')
      .set('body', {
        'overflow-y': 'visible'
      });
    }
  }

  const transition = new Transition('.transition', '.transition-layer');

  const keyName = 'visited';
  const keyValue = true;

  if (!sessionStorage.getItem(keyName)) {
    sessionStorage.setItem(keyName, keyValue);
      
    opening.set();
    opening.topOpeningSet();
    opening.othersOpeningSet();
    opening.opening();
    transition.out();

    setTimeout( () => {
      opening.topOpening();
      opening.othersOpening();
    }, 3000);
  } else {
    transition.set();
    setTimeout( () => {
      transition.transitionIn();
      opening.topOpeningSet();
      opening.othersOpeningSet();

      setTimeout( () => {
        opening.topOpening();
        opening.othersOpening();
      }, 800);
    }, 1000);
  }

  const link = document.getElementsByTagName('a');

  for (let i = 0; i < link.length; i++) {
    link[i].addEventListener('click', e => {
      e.preventDefault();
      const href = link[i].getAttribute('href');

      if (link[i].getAttribute('data-main-menu') === 'current') {
        transition.transitionOut();
        setTimeout( () => {
          document.getElementsByClassName('hamburger-button')[0].classList.remove('is-open');
          
          gsap.set('.main-menu', {
            'clip-path': 'inset(0 0 100% 0)',
            opacity: 0,
          });

          gsap.set('.global-navi', {
            opacity: 1,
            'pointer-events': 'auto',
          });

          gsap.set('body', {
            overflow: 'visible'
          });

          gsap.set('.hamburger-button__bar--top', {
            rotation: 0,
            y: 0,
            x: 0
          });

          gsap.set('.hamburger-button__bar--bottom', {
            rotation: 0,
            y: 0,
            x: 0
          });

          gsap.set('.hamburger-button__bar--middle', {
            xPercent: 0
          });

          location.href = href;
          ScrollTrigger.refresh();
          setTimeout( () => {
            transition.transitionIn();
          }, 1000);
        }, 800);

      } else if (link[i].getAttribute('target') === '_blank') {
        window.open(href, '_blank');
      } else if (href.startsWith('#')) {
        console.log('#');
        transition.transitionOut();
        setTimeout( () => {
          console.log('setTimeout800');

          location.href = href;
          ScrollTrigger.refresh();
          setTimeout( () => {
            console.log('setTimeout1000');

            transition.transitionIn();
          }, 1000);
        }, 800);
      } else {
        transition.transitionOut();
        setTimeout( () => {
          location.href = href;
        }, 1000);
      }
    });  
  }
});

