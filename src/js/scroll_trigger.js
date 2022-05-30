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
      start: `top-=${window.innerWidth} bottom`,
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
  //                  title
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
          filter: 'blur(5px)',
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
  // class JsArticle3 extends JsArticle2 {
  //   constructor(trigger, sub, text) {
  //     super(trigger, sub, text);
  //     this.trigger = document.querySelectorAll(trigger);
  //     this.sub = sub;
  //     this.text = text;

  //     this.textAnimation();
  //     this.subAnimation();
  //   }
  // }

  // const jsArticle3 = new JsArticle3('.js-article3', '.js-article3__title span', '.js-article3__text')
});

