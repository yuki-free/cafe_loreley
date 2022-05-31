import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  const scrollDuration = 700;

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

  setTimeout( () => {
    ScrollTrigger.refresh();
  }, scrollDuration);

  let timeoutId;

  window.addEventListener( "resize", function () {
    if ( timeoutId ) return ;
  
    timeoutId = setTimeout( () => {
      timeoutId = 0 ;
  
      ScrollTrigger.refresh();
    }, scrollDuration);
  });

  // ===========================================
  //                  layer
  // ===========================================

  window.scrollTo(0, 0);

  // ----------------- hero -------------------

  gsap.set('.concept', {
    opacity: 0
  });

  ScrollTrigger.batch('.concept', {
    onEnter: () => gsap.to('.hero', {
      opacity: 0,
      duration: .3
    }),
    onLeaveBack: () => gsap.to('.hero', {
      opacity: 1,
      duration: .3,
      delay: .6
    }),
    start: `top center`,
  });

  ScrollTrigger.batch('.concept', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      delay: .3
    }),
    onLeaveBack: batch => gsap.to(batch, {
      opacity: 0
    }),
    start: `top center`,
  });

  // ----------------- menu -------------------

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

    gsap.set('.menu__cover', {
      yPercent: 50
    });

    gsap.to('.menu__cover', {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.cover-dummy',
        start: 'top bottom',
        end: 'top top',
        scrub: .6
      }
    });

    gsap.set('.menu__title', {
      yPercent: 150
    });

    gsap.to('.menu__title', {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.cover-dummy',
        start: 'top bottom',
        end: 'top top',
        scrub: .6
      }
    });

    gsap.to('.menu__cover', {
      xPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu__margin--cover',
        start: 'bottom bottom',
        end: `+=${window.innerWidth}`,
        scrub: .6
      }
    });

    gsap.to('.menu__title', {
      xPercent: -100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu__margin--cover',
        start: 'bottom bottom',
        end: `+=${window.innerWidth}`,
        scrub: .6
      }
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
      start: `top-=${window.innerWidth} bottom`,
      end: `bottom+=${window.innerHeight * .7} top`
    });

    gsap.set('.menu__outro', {
      xPercent: 50
    });

    gsap.to('.menu__outro', {
      xPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu-outro-dummy',
        start: `top-=${window.innerWidth} top`,
        end: `+=${window.innerWidth}`,
        scrub: .6
      }
    });

    gsap.to('.menu__outro', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu__margin--outro',
        start: 'bottom bottom',
        end: `+=${window.innerHeight}`,
        scrub: .6
      }
    });

    // ----------------- footer -------------------
  
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

    gsap.fromTo('.footer', {
      yPercent: 50
      }, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.footer-dummy',
        start: 'top bottom',
        end: 'top top',
        scrub: .6
      }
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

  class ScrollInvertReverse {
    constructor(el, trigger) {
      gsap.set(el, {
        color: '#dadada',
        background: '#1f1d1d'  
      });

      ScrollTrigger.batch(trigger, {
        onEnter: () => gsap.to(el, {
          color: '#586166',
          background: '#fff',
          duration: 1
        }),
        onLeaveBack: () => gsap.to(el, {
          color: '#dadada',
          background: '#1f1d1d',
          duration: 1
        }),
        start: 'top center'
      });  
    }
  }

  class HorizontalScrollInvert {
    constructor(el, trigger) {
      this.el = document.querySelector(el);
      this.trigger = document.querySelector(trigger);
      this.triggerPosition = this.trigger.getBoundingClientRect().left;
      this.scrollTrigger = window.innerWidth / 2;

      setTimeout( () => {
        this.invert();
      }, scrollDuration);
      
      window.addEventListener('resize', () => {
        this.refresh();
      });

      window.addEventListener('scroll', () => {
        this.invert();
      });
    }
    
    refresh() {
      window.addEventListener( "resize", () => {
        if ( timeoutId ) return ;
      
        timeoutId = setTimeout( () => {
          timeoutId = 0 ;
      
          this.triggerPosition = trigger.getBoundingClientRect().left;      
          this.scrollTrigger = window.innerWidth / 2;

          if (this.scrollTrigger < this.triggerPosition) {
            gsap.to(this.el, {
              color: '#dadada',
              background: '#1f1d1d',
              duration: 1
            });
          } else {
            gsap.to(this.el, {
              color: '#586166',
              background: '#fff',
              duration: 1
            });
          }     
          }, scrollDuration);
      });
    }

    invert() {
      this.triggerPosition = this.trigger.getBoundingClientRect().left;
      if (this.scrollTrigger < this.triggerPosition) {
        gsap.to(this.el, {
          color: '#dadada',
          background: '#1f1d1d',
          duration: 1
        });
      } else {
        gsap.to(this.el, {
          color: '#586166',
          background: '#fff',
          duration: 1
        });
      }
    }
  }

  const conceptInvert = new ScrollInvert('.concept', '.concept__content-2');

  if (window.innerWidth <= 1024) {
    const menuInvert = new ScrollInvertReverse('.menu__content', '.menu__item--food');
  } else if (document.querySelectorAll('.menu__content').length > 0) {
    const menuInvertPc = new HorizontalScrollInvert('.menu__content', '.menu__item--food');
  }

  const newsInvert = new ScrollInvert('.news', '.shop');
  const shopInvert = new ScrollInvert('.shop', '.shop');
  const shopInvert2 = new ScrollInvert('.shop__content-glue', '.shop');

  // ===========================================
  //                  title fadein
  // ===========================================

  class JsTitle3 {
    constructor(trigger, title) {
      this.trigger = document.querySelectorAll(trigger);
      this.title = title;

      this.titleAnimation();
    }

    titleAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.title), {
          opacity: 0,
          filter: 'blur(1em)',
          ease: 'power3.out',
          duration: 1,
          stagger: {
            amount: .6,
            from: 'random'
          },
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top center'
          }
        });
      }
    }
  }

  const jsTitle3 = new JsTitle3('.js-title3', 'span');

  class JsArticle3 extends JsTitle3 {
    constructor(trigger, title, text) {
      super(trigger, title);
      this.text = text;

      this.textAnimation();
    }

    textAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.text), {
          opacity: 0,
          y: '3em',
          delay: .6,
          duration: 1,
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top center'
          }
        });
      }
    }
  }

  const jsArticle3 = new JsArticle3('.js-article3', '.js-article3__title span', '.js-article3__text');

  class JsArticle3Horizontal {
    constructor(trigger, title, text) {
      this.trigger = document.querySelectorAll(trigger);
      this.triggerPosition = [];
      this.title = title;
      this.text = text;

      this.set();

      window.addEventListener('scroll', () => {
        this.animation();        
      });

      window.addEventListener('resize', () => {
        setTimeout( () => {
          this.animation();
        }, scrollDuration);
      });
    }

    set() {
      gsap.set(this.title, {
        opacity: 0,
        filter: 'blur(1em)'
      });

      gsap.set(this.text, {
        opacity: 0,
        y: '3em'
      });
    }

    animation() {      
      for (let i = 0; i < this.trigger.length; i++) {
        this.triggerPosition[i] = this.trigger[i].getBoundingClientRect().left;
        if (window.innerWidth * .75 > this.triggerPosition[i]) {
          gsap.to(this.trigger[i].querySelectorAll(this.title), {
            opacity: 1,
            filter: 'blur(0em)',
            ease: 'power3.out',
            duration: 1,
            stagger: {
              amount: .6,
              from: 'random'
            }
          });  

          gsap.to(this.trigger[i].querySelectorAll(this.text), {
            opacity: 1,
            y: 0,
            delay: .6,
            duration: 1
          });  
        }  
      }
    }
  }

  if (window.innerWidth <= 1024) {
    const jsArticle3Horizontal = new JsArticle3('.js-article3--horizontal', '.js-article3__title--horizontal span', '.js-article3__text--horizontal');
  } else {
    const jsArticle3Horizontal = new JsArticle3Horizontal('.js-article3--horizontal', '.js-article3__title--horizontal span', '.js-article3__text--horizontal');
  }

  class JsTitle2 {
    constructor(trigger, main, sub) {
      this.trigger = document.querySelectorAll(trigger);
      this.main = main;
      this.sub = sub;

      this.mainAnimation();
      this.subAnimation();
    }

    mainAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.main), {
          yPercent: 100,
          scaleY: 1.2,
          stagger: {
            amount: .6
          },
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top center'
          }
        });
      }
    }

    subAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.sub), {
          opacity: 0,
          filter: 'blur(1em)',
          delay: .6,
          ease: 'power3.out',
          stagger: {
            amount: .4,
            from: 'random'
          },
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top center'
          }
        });  
      }
    }
  }

  const jsTitle2 = new JsTitle2('.js-title2', '.js-title2__main span', '.js-title2__sub span');

  class JsTitle2Horizontal {
    constructor(title, main, sub, trigger) {
      this.title = document.querySelectorAll(title);
      this.main = main;
      this.sub = sub;
      this.trigger = document.querySelectorAll(trigger);

      this.mainAnimation();
      this.subAnimation();
    }

    mainAnimation() {
      for (let i =0; i < this.title.length; i++) {
        gsap.from(this.title[i].querySelectorAll(this.main), {
          yPercent: 100,
          scaleY: 1.2,
          stagger: {
            amount: .6
          },
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top top'
          }
        });
      }
    }

    subAnimation() {
      for (let i =0; i < this.title.length; i++) {
        gsap.from(this.title[i].querySelectorAll(this.sub), {
          opacity: 0,
          filter: 'blur(1em)',
          delay: .6,
          ease: 'power3.out',
          stagger: {
            amount: .4,
            from: 'random'
          },
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top top'
          }
        });  
      }
    }
  }

  if (window.innerWidth <= 1024) {
    const jsTitle2Horizontal = new JsTitle2('.js-title2--horizontal', '.js-title2__main--horizontal span', '.js-title2__sub--horizontal span');
  } else {
    const jsTitle2Horizontal = new JsTitle2Horizontal('.js-title2--horizontal', '.js-title2__main--horizontal span', '.js-title2__sub--horizontal span', '.cover-dummy');
  }

  class JsArticle2 extends JsTitle2 {
    constructor(trigger, main, sub, text) {
      super(trigger, main, sub);
      this.text = text;

      this.textAnimation();
    }

    textAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.text), {
          opacity: 0,
          y: '3em',
          delay: 1,
          duration: 1,
          scrollTrigger: {
            trigger: this.trigger[i],
            start: 'top center'
          }
        });
      }
    }
  }

  const jsArticle2 = new JsArticle2('.js-article2', '.js-article2__title span', '.js-article2__sub-title span', '.js-article2__text');

  // ===========================================
  //                  image fadein
  // ===========================================

  class FadeIn {
    constructor(el) {
      this.el = document.querySelectorAll(el);

      this.fadeIn();
    }

    fadeIn() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.from(this.el[i], {
          opacity: 0,
          scale: 1.2,
          duration: 1,
          scrollTrigger: {
            trigger: this.el[i].parentNode,
            start: 'top center'
          }
        });
      }
    }
  }

  class FadeInHorizontal {
    constructor(el) {
      this.el = document.querySelectorAll(el);
      this.parent = [];
      this.parentOffset = [];

      for (let i = 0; i < this.el.length; i++) {
        this.parent[i] = this.el[i].parentNode;
      }

      this.set();

      window.addEventListener('scroll', () => {
        this.fadeIn();        
      });

      window.addEventListener('resize', () => {
        setTimeout( () => {
          this.fadeIn();
        }, scrollDuration);
      });
    }

    set() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.set(this.el[i], {
          opacity: 0,
          scale: 1.2
        });
      }
    }

    fadeIn() {      
      for (let i = 0; i < this.el.length; i++) {
        this.parentOffset[i] = this.parent[i].getBoundingClientRect().left;
        if (window.innerWidth * .75 > this.parentOffset[i]) {
          gsap.to(this.el[i], {
            opacity: 1,
            scale: 1,
            duration: 1
          });
        }
      }
    }
  }

  if (window.innerWidth <= 1024) {
    const fadeIn = new FadeIn('.js-fade-in');
  }

  if (window.innerWidth <= 1024) {
    const fadeInHorizontal = new FadeIn('.js-fade-in--horizontal');
  } else {
    const fodeInHorizontal = new FadeInHorizontal('.js-fade-in--horizontal');
  }

  class SlideIn {
    constructor(el, image, overlay) {
      this.el = document.querySelectorAll(el);
      this.image = image;
      this.overlay = overlay;

      this.set();

      this.slideIn();
    }

    set() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.set(this.el[i].querySelector(this.image), {
          opacity: 0
        });  
      }
    }

    slideIn() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.to(this.el[i].querySelector(this.overlay), {
          'clip-path': 'inset(0 0% 0 0%)',
          ease: 'power3.out',
          duration: .6,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });

        gsap.set(this.el[i].querySelector(this.image), {
          opacity: 1,
          delay: .6,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });

        gsap.to(this.el[i].querySelector(this.overlay), {
          'clip-path': 'inset(0 0% 0 100%)',
          ease: 'power3.out',
          duration: .6,
          delay: .8,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });
      }
    }
  }

  const slideIn = new SlideIn('.js-slide-in', '.js-slide-in__image', '.js-slide-in__overlay');

  class RotateInHorizontal {
    constructor(el) {
      this.el = document.querySelectorAll(el);

      this.fadeIn();
    }

    fadeIn() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.from(this.el[i], {
          rotationY: 90,
          ease: 'elastic.out(1, 0.5)',
          duration: .8,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center',
            markers: true
          }
        });
      }
    }
  }

  if (window.innerWidth <= 1024) {
    const rotateInHorizontal = new RotateInHorizontal('.js-rotate-in--horizontal');
  }

  // ===========================================
  //                  concept
  // ===========================================

  gsap.timeline({ repeat: -1 })
  .to('.intro__catch-copy', {
    xPercent: -100,
    duration: 40,
    ease: 'none'
  });

  gsap.to('.intro__catch-copy-container', {
    xPercent: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.intro__catch-copy-container',
      start: 'top bottom',
      end: 'bottom top',
      scrub: .6
    }
  });

  if (window.innerWidth > 1024) {
    class ParallaxMove {
      constructor(el, move) {
        this.el = document.querySelectorAll(el);
        this.move = move;

        this.parallaxMove();
      }

      parallaxMove() {
        for (let i = 0; i < this.el.length; i++) {
          gsap.to(this.el[i], {
            yPercent: this.move,
            ease: 'none',
            scrollTrigger: {
              trigger: this.el[i],
              start: 'top bottom',
              end: 'bottom top',
              scrub: .6
            }
          });  
        }
      }
    }

    const parallaxMoveBig = new ParallaxMove('.media-multi__image-outer--big', -40);
    const parallaxMoveMedium = new ParallaxMove('.media-multi__image-outer--medium', -120);
    const parallaxMoveSmall = new ParallaxMove('.media-multi__image-outer--small', -300);

  }
});

