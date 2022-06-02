import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export let galleryOffset = [];

window.addEventListener('DOMContentLoaded', () => {

  const scrollDuration = 700;

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let scrollTop = window.scrollY;
  let scrollMiddle = scrollTop + windowHeight / 2;
  let scrollBottom = scrollTop + windowHeight;

  window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;  
    scrollMiddle = scrollTop + windowHeight / 2;
    scrollBottom = scrollTop + windowHeight;
  });

  window.addEventListener('scroll', () => {
    scrollTop = window.scrollY;
    scrollMiddle = scrollTop + windowHeight / 2;
    scrollBottom = scrollTop + windowHeight;
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
      duration: .3,
      ease: 'power3.out',
      overwrite: true
    }),
    onLeaveBack: () => gsap.to('.hero', {
      opacity: 1,
      duration: .3,
      delay: .8,
      ease: 'power3.in',
    }),
    start: `top center`
  });

  ScrollTrigger.batch('.concept', {
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      delay: .6,
      duration: .8,
      ease: 'none',
    }),
    onLeaveBack: batch => gsap.to(batch, {
      opacity: 0,
      duration: .8,
      ease: 'none',
      overwrite: true
    }),
    start: `top center`,
  });

  // ----------------- menu -------------------

  if (windowWidth > 1024) {
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
      start: 'top 150%',
      endTrigger: '.menu__margin--cover .position-dummy',
      end: 'top 50%'
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
      yPercent: 100
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
        endTrigger: '.menu__margin--cover .position-dummy',
        end: 'top bottom',
        scrub: .6
      }
    });

    gsap.to('.menu__title', {
      xPercent: -75,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu__margin--cover',
        start: 'bottom bottom',
        endTrigger: '.menu__margin--cover .position-dummy',
        end: 'top bottom',
        scrub: .6
      }
    });

    gsap.set('.menu__outro', {
      opacity: 0
    });
  
    ScrollTrigger.batch('.menu__margin--outro .position-dummy', {
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
      start: 'top 50%',
      endTrigger: '.menu-outro-dummy',
      end: 'bottom -50%'
    });

    gsap.set('.menu__outro', {
      xPercent: 50
    });

    gsap.to('.menu__outro', {
      xPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu__margin--outro .position-dummy',
        start: `top top`,
        endTrigger: '.menu__margin--outro',
        end: `top top`,
        scrub: .6
      }
    });

    gsap.to('.menu__outro', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu-outro-dummy',
        start: 'top top',
        end: 'bottom top',
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
      start: `-50% bottom`
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
      this.scrollTrigger = windowWidth / 2;

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
          this.scrollTrigger = windowWidth / 2;

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

  if (windowWidth <= 1024) {
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

      setTimeout( () => {
        this.animation();        
      }, scrollDuration);

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
        if (windowWidth * .75 > this.triggerPosition[i]) {
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

  if (windowWidth <= 1024) {
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

  if (windowWidth <= 1024) {
    const jsTitle2Horizontal = new JsTitle2('.js-title2--horizontal', '.js-title2__main--horizontal span', '.js-title2__sub--horizontal span');
  } else {
    const jsTitle2Horizontal = new JsTitle2Horizontal('.js-title2--horizontal', '.js-title2__main--horizontal span', '.js-title2__sub--horizontal span', '.cover-dummy');
  }

  class JsArticle2 {
    constructor(trigger, main, sub, text) {
      this.trigger = document.querySelectorAll(trigger);
      this.main = main;
      this.sub = sub;
      this.text = text;

      this.mainAnimation();
      this.subAnimation();
      this.textAnimation();
    }

    mainAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.main), {
          yPercent: 100,
          scaleY: 1.2,
          delay: .6,
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
          delay: 1.2,
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

    textAnimation() {
      for (let i =0; i < this.trigger.length; i++) {
        gsap.from(this.trigger[i].querySelectorAll(this.text), {
          opacity: 0,
          y: '3em',
          delay: 1.6,
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

      setTimeout( () => {
        this.fadeIn();        
      }, scrollDuration);

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
        if (this.el[i].classList.contains('is-show') !== true) {
          this.parentOffset[i] = this.parent[i].getBoundingClientRect().left;
          if (windowWidth * .75 > this.parentOffset[i]) {
            gsap.to(this.el[i], {
              opacity: 1,
              scale: 1,
              duration: 1
            });

            this.el[i].classList.add('is-show');
          }
        }
      }
    }
  }

  if (windowWidth <= 1024) {
    const fadeIn = new FadeIn('.js-fade-in');
  }

  if (windowWidth <= 1024) {
    const fadeInHorizontal = new FadeIn('.js-fade-in--horizontal');
  } else {
    const fodeInHorizontal = new FadeInHorizontal('.js-fade-in--horizontal');
  }

  class SlideIn {
    constructor(el, image, overlay) {
      this.el = document.querySelectorAll(el);
      this.image = image;
      this.overlay = overlay;

      this.slideIn();
    }

    slideIn() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.from(this.el[i].querySelector(this.image), {
          opacity: 0,
          duration: 0.1,
          delay: .4,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });

        gsap.fromTo(this.el[i].querySelector(this.overlay), {
          'clip-path': 'inset(0 0 0 0%)',
        }, {
          'clip-path': 'inset(0 0 0 100%)',
          ease: 'expo.out',
          duration: .4,
          delay: .8,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });

        gsap.fromTo(this.el[i].querySelector(this.overlay), {
          'clip-path': 'inset(0 100% 0 0)',      
        }, {
          'clip-path': 'inset(0 0% 0 0)',
          ease: 'expo.in',
          duration: .4,
          scrollTrigger: {
            trigger: this.el[i],
            start: 'top center'
          }
        });
      }
    }
  }

  if (windowWidth <= 1024) {
    const slideInSp = new SlideIn('.js-slide-in--sp', '.js-slide-in__image--sp', '.js-slide-in__overlay--sp');
  }

  const slideIn = new SlideIn('.js-slide-in', '.js-slide-in__image', '.js-slide-in__overlay');

  class SlideInHorizontal {
    constructor(el, image, overlay) {
      this.el = document.querySelectorAll(el);
      this.image = image;
      this.overlay = overlay;
      this.elOffset = [];

      this.set();

      setTimeout( () => {
        this.slideIn();        
      }, scrollDuration);

      window.addEventListener('scroll', () => {
        this.slideIn();        
      });

      window.addEventListener('resize', () => {
        setTimeout( () => {
          this.slideIn();
        }, scrollDuration);
      });
    }

    set() {
      for (let i = 0; i < this.el.length; i++) {
        gsap.set(this.el[i].querySelector(this.overlay), {
          'clip-path': 'inset(0 100% 0 0)'      
        });

        gsap.set(this.el[i].querySelector(this.image), {
          opacity: 0
        });
      }
    }

    slideIn() {
      for (let i = 0; i < this.el.length; i++) {
        if (this.el[i].classList.contains('is-show') !== true) {
          this.elOffset[i] = this.el[i].getBoundingClientRect().left;
          if (windowWidth * .75 > this.elOffset[i]) {
            gsap.to(this.el[i].querySelector(this.image), {
              opacity: 1,
              duration: 0.1,
              delay: .4,
              scrollTrigger: {
                trigger: this.el[i],
                start: 'top center'
              }
            });
    
            gsap.fromTo(this.el[i].querySelector(this.overlay), {
              'clip-path': 'inset(0 0 0 0%)',
            }, {
              'clip-path': 'inset(0 0 0 100%)',
              ease: 'expo.out',
              duration: .4,
              delay: .8,
              scrollTrigger: {
                trigger: this.el[i],
                start: 'top center'
              }
            });
    
            gsap.fromTo(this.el[i].querySelector(this.overlay), {
              'clip-path': 'inset(0 100% 0 0)',      
            }, {
              'clip-path': 'inset(0 0% 0 0)',
              ease: 'expo.in',
              duration: .4,
              scrollTrigger: {
                trigger: this.el[i],
                start: 'top center'
              }
            });

            this.el[i].classList.add('is-show');
          } 
        }
      }
    }
  }

  if (windowWidth <= 1024) {
    const slideInHorizontal = new SlideIn('.js-slide-in--horizontal', '.js-slide-in__image--horizontal', '.js-slide-in__overlay--horizontal');
  } else {
    const slideInHorizontal = new SlideInHorizontal('.js-slide-in--horizontal', '.js-slide-in__image--horizontal', '.js-slide-in__overlay--horizontal');
  }

  // class RotateInHorizontal {
  //   constructor(el) {
  //     this.el = document.querySelectorAll(el);

  //     this.fadeIn();
  //   }

  //   fadeIn() {
  //     for (let i = 0; i < this.el.length; i++) {
  //       gsap.from(this.el[i], {
  //         rotationY: 90,
  //         ease: 'elastic.out(1, 0.5)',
  //         duration: .8,
  //         scrollTrigger: {
  //           trigger: this.el[i],
  //           start: 'top center',
  //           markers: true
  //         }
  //       });
  //     }
  //   }
  // }

  // if (windowWidth <= 1024) {
  //   const rotateInHorizontal = new RotateInHorizontal('.js-rotate-in--horizontal');
  // }

  // ===========================================
  //                  concept
  // ===========================================

  gsap.timeline({ repeat: -1 })
  .to('.intro__catch-copy', {
    xPercent: -100,
    duration: 40,
    ease: 'none'
  });

  if (windowWidth > 1024) {
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
  }

  if (windowWidth > 1024) {
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

  // ===========================================
  //                  menu
  // ===========================================

  if (windowWidth > 1024) {
    class ParallaxHorizontal {
      constructor(el, widthPercent) {
        this.el = document.querySelectorAll(el);
        this.widthPercent = widthPercent;
        this.elProperty = [];
        this.parent = [];
        this.parentProperty = [];
        this.moveX = [];
  
        for (let i = 0; i < this.el.length; i++) {
          this.parent[i] = this.el[i].parentNode;
        }
  
        this.set();
  
        window.addEventListener('resize', () => {
          this.set();
        }, scrollDuration);
  
        setTimeout( () => {
          this.move();
        }, scrollDuration);
  
        window.addEventListener('scroll', () => {
          this.move();
        });
  
        window.addEventListener('resize', () => {
          this.move();
        }, scrollDuration);
      }
  
      set() {
        for (let i = 0; i < this.el.length; i++) {        
          gsap.set(this.el[i], {
            width: this.widthPercent
          });
  
          this.elProperty[i] = this.el[i].getBoundingClientRect();
          this.parentProperty[i] = this.parent[i].getBoundingClientRect();
          this.moveX[i] = this.elProperty[i].width - this.parentProperty[i].width;
        }
      }
  
      move() {
        for (let i = 0; i < this.el.length; i++) {
          this.elProperty[i] = this.el[i].getBoundingClientRect();
  
          if (window.scrollX < this.elProperty[i].right && windowWidth > this.elProperty[i].left) {
            gsap.to(this.el[i], {
              x: -(this.moveX[i] * (1 - ((this.elProperty[i].width + this.elProperty[i].left) / (this.elProperty[i].width + windowWidth))))
            });
          }
        }
      }
    }
  
    const parallaxHorizontal = new ParallaxHorizontal('.media-vertical__image', '120%')
  
    class ParallaxHorizontalMovePx {
      constructor(el, movePx) {
        this.el = document.querySelectorAll(el);
        this.movePx = movePx;
        this.elProperty = [];

        setTimeout( () => {
          this.move();
        }, scrollDuration);
  
        window.addEventListener('scroll', () => {
          this.move();
        });
  
        window.addEventListener('resize', () => {
          this.move();
        }, scrollDuration);
      }

      move() {
        for (let i = 0; i < this.el.length; i++) {
          this.elProperty[i] = this.el[i].getBoundingClientRect();
  
          if (window.scrollX < this.elProperty[i].right && windowWidth > this.elProperty[i].left) {
            gsap.to(this.el[i], {
              x: -(this.movePx * (1 - ((this.elProperty[i].width + this.elProperty[i].left) / (this.elProperty[i].width + windowWidth))))
            });
          }
        }
      }
    }
    
    const parallaxHorizontalMovePx = new ParallaxHorizontalMovePx('.vertical-card__image--parallax', '150');
  }

  // ===========================================
  //                  news
  // ===========================================

  gsap.from('.stack-list__item', {
    opacity: 0,
    xPercent: 30,
    ease: 'power4.out',
    duration: 2.4,
    stagger: .3,
    scrollTrigger: {
      trigger: '.stack-list',
      start: 'top center'
    }
  });

  // ===========================================
  //                  shop
  // ===========================================

  if (windowWidth > 1024) {
    class Parallax {
      constructor(el, heightPercent) {
        this.el = document.querySelectorAll(el);
        this.heightPercent = heightPercent;
        this.elProperty = [];
        this.parent = [];
        this.parentProperty = [];
        this.moveY = [];
  
        for (let i = 0; i < this.el.length; i++) {
          this.parent[i] = this.el[i].parentNode;
        }
  
        this.set();
        this.move();
      }
  
      set() {
        for (let i = 0; i < this.el.length; i++) {
          gsap.set(this.el[i], {
            height: this.heightPercent
          });
  
          this.elProperty[i] = this.el[i].getBoundingClientRect();
          this.parentProperty[i] = this.parent[i].getBoundingClientRect();
          this.moveY[i] = -(this.elProperty[i].height - this.parentProperty[i].height);
        }
      }
  
      move() {
        for (let i = 0; i < this.el.length; i++) {
          gsap.to(this.el[i], {
            y: this.moveY[i],
            ease: 'none',
            scrollTrigger: {
              trigger: this.parent[i],
              start: 'top bottom',
              end: 'bottom top',
              scrub: .6
            }
          });
        }
      }
    }

    const parallax = new Parallax('.js-parallax', '120%')
  }

  const gallery = document.getElementsByClassName('gallery__list')[0];
  const galleryList = gallery.getElementsByClassName('gallery__item');
  galleryOffset = [];
  const getGalleryOffset = () => {
    for (let i = 0; i < galleryList.length; i++) {
      galleryList[i].getBoundingClientRect().left;
    }
  }

  gsap.from('.gallery__list', {
    x: '100vw',
    duration: 2.2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.gallery__list',
      start: 'top center'
    },
    onComplete: getGalleryOffset
  });

  // ===========================================
  //                  sns
  // ===========================================

  const snsTitle = new JsTitle2('.sns__inner', '.sns__title span', '.sns__item');
});

