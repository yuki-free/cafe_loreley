import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  let scrollTop = window.scrollY;
  let scrollMiddle = scrollTop + window.innerHeight / 2;
  let scrollBottom = scrollTop + window.innerHeight;

  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    scrollMiddle = scrollTop + window.innerHeight / 2;
    scrollBottom = scrollTop + window.innerHeight;
  });

  window.addEventListener('resize', () => {
    scrollMiddle = scrollTop + window.innerHeight / 2;
    scrollBottom = scrollTop + window.innerHeight;
  });

  let timeoutId;

  window.addEventListener( "resize", function () {
    if ( timeoutId ) return ;
  
    timeoutId = setTimeout( () => {
      timeoutId = 0 ;
  
      ScrollTrigger.refresh();
    }, 1000);
  });

  // ===========================================
  //                  layer
  // ===========================================

  window.scrollTo(0, 0);

  gsap.set('.concept', {
    opacity: 0
  });

  ScrollTrigger.batch('.concept', {
    onEnter: () => gsap.to('.hero', {
      opacity: 0
    }),
    onLeaveBack: () => gsap.to('.hero', {
      opacity: 1
    }),
    start: `top center`,
  });

  ScrollTrigger.batch('.concept', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1
    }),
    onLeaveBack: batch => gsap.to(batch, {
      opacity: 0
    }),
    start: `top center`,
  });

  if (window.innerWidth > 1024) {
    gsap.set('.menu__cover', {
      opacity: 0
    });
  
    ScrollTrigger.batch('.cover-dummy', {
      onEnter: () => gsap.set('.menu__cover', {
        opacity: 1
      }),
      onLeaveBack: () => gsap.set('.menu__cover', {
        opacity: 0
      }),
      onLeave: () => gsap.set('.menu__cover', {
        opacity: 0
      }),
      onEnterBack: () => gsap.set('.menu__cover', {
        opacity: 1
      }),
      start: `top-=${window.innerHeight / 2} bottom`,
      end: `bottom+=${window.innerWidth} top`,
    });

    gsap.set('.menu__outro', {
      opacity: 0
    });
  
    ScrollTrigger.batch('.menu-outro-dummy', {
      onEnter: () => gsap.set('.menu__outro', {
        opacity: 1
      }),
      onLeaveBack: () => gsap.set('.menu__outro', {
        opacity: 0
      }),
      onLeave: () => gsap.set('.menu__outro', {
        opacity: 0
      }),
      onEnterBack: () => gsap.set('.menu__outro', {
        opacity: 1
      }),
      start: `top-=${window.innerHeight} bottom`,
      end: `bottom+=${window.innerHeight * .7} top`
    });
  
    gsap.set('.footer', {
      opacity: 0,
      visibility: 'hidden'
    });
  
    ScrollTrigger.batch('.footer-dummy', {
      onEnter: () => gsap.set('.footer', {
        opacity: 1,
        visibility: 'visible'
      }),
      onLeaveBack: () => gsap.set('.footer', {
        opacity: 0,
        visibility: 'hidden'
      }),
      start: `top-=${window.innerHeight / 2} bottom`
    });
  }

  // ===========================================
  //                  invert
  // ===========================================

  class ScrollInvert {
    constructor(el, trigger) {
      ScrollTrigger.batch(trigger, {
        onEnter: () => gsap.to(el, {
          color: '#dadada',
          background: '#1f1d1d',
          duration: 1
        }),
        onLeaveBack: () => gsap.to(el, {
          color: '#586166',
          background: '#fff',
          duration: 1
        }),
        start: 'top center',
      });  
    }
  }

  const conceptInvert = new ScrollInvert('.concept', '.concept__content-2');
  if (window.innerWidth <= 1024) {
    gsap.set('')
  }
  const newsInvert = new ScrollInvert('.news', '.shop');
  const shopInvert = new ScrollInvert('.shop', '.shop');
  const shopInvert2 = new ScrollInvert('.shop__bg', '.shop');

});

