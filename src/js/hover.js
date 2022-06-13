import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {

  if (window.innerWidth > 1024) {
  // ===========================================
  //                  hover
  // ===========================================

  const hoverText = document.getElementsByClassName('js-hover-text');

  gsap.set('.js-hover-bar', {
    xPercent: -100
  });

  for (let i = 0; i < hoverText.length; i++) {
    hoverText[i].addEventListener('mouseenter', () => {
      gsap.to(hoverText[i].querySelectorAll('.js-hover-content'), {
        yPercent: -100,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });

      gsap.to(hoverText[i].querySelectorAll('.js-hover-content span:first-of-type'), {
        opacity: 0,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });

      gsap.fromTo(hoverText[i].querySelectorAll('.js-hover-content span:last-of-type'), {
        opacity: 0
      }, {
        opacity: 1,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });

      gsap.fromTo(hoverText[i].querySelectorAll('.js-hover-bar'), {
        xPercent: -100,
      }, {
        xPercent: 0,
        duration: .4,
        ease: 'power3.out'
      });
    });

    hoverText[i].addEventListener('mouseleave', () => {
      gsap.to(hoverText[i].querySelectorAll('.js-hover-content'), {
        yPercent: 0,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });
      gsap.to(hoverText[i].querySelectorAll('.js-hover-content span:first-of-type'), {
        opacity: 1,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });
      gsap.to(hoverText[i].querySelectorAll('.js-hover-content span:last-of-type'), {
        opacity: 0,
        duration: .4,
        ease: 'power3.out',
        stagger: {
          amount: .2
        }
      });
      gsap.to(hoverText[i].querySelectorAll('.js-hover-bar'), {
        xPercent: 100,
        duration: .4,
        ease: 'power3.out'
      });
    });
  }

  class HoverUnderBar {
    constructor(el, text, bar) {
      this.el = document.querySelectorAll(el);
      this.text = text;
      this.bar = bar;

      this.hover();
    }

    hover() {
      for (let i = 0; i < this.el.length; i++) {
        this.el[i].addEventListener('mouseenter', () => {
          gsap.fromTo(this.el[i].querySelectorAll(this.text), {
            yPercent: 0
          }, {
            yPercent: -100,
            duration: .4,
            ease: 'power3.out',
            stagger: {
              amount: .2
            }
          });

          gsap.fromTo(this.el[i].querySelectorAll(`${this.text} span:first-of-type`), {
            opacity: 1
          }, {
            opacity: 0,
            duration: .4,
            ease: 'power3.out',
            stagger: {
              amount: .2
            }
          });

          gsap.timeline()
          .to(this.el[i].querySelectorAll(this.bar), {
            xPercent: 100,
            opacity: 0,
            duration: .3,
            ease: 'power3.in'
          })
          .to(this.el[i].querySelectorAll(this.bar), {
            xPercent: -100,
            duration: .1,
          })
          .to(this.el[i].querySelectorAll(this.bar), {
            xPercent: 0,
            opacity: 1,
            duration: .2,
            ease: 'power3.out'
          });
        });
      }
    }
  }

  const hoverUnderBar = new HoverUnderBar('.js-hover-underbar', '.js-hover-underbar__content', '.js-hover-underbar__bar');

  class HoverFade {
    constructor(list, item) {
      this.list = document.querySelectorAll(list);
      this.item = item;

      this.hover();
    }

    hover() {
      for (let i = 0; i < this.list.length; i++) {
        const listItem = this.list[i].querySelectorAll(this.item);

        this.list[i].addEventListener('mouseenter', () => {
          gsap.to(listItem, {
            opacity: .2
          });
        });

        this.list[i].addEventListener('mouseleave', () => {
          gsap.to(listItem, {
            opacity: 1
          });
        });

        for (let i = 0; i < listItem.length; i++) {
          listItem[i].addEventListener('mouseenter', () => {
            gsap.to(listItem[i], {
              opacity: 1
            });
          });

          listItem[i].addEventListener('mouseleave', () => {
            gsap.to(listItem[i], {
              opacity: .2
            });
          });
        }
      }
    }
  }

  const globalNaviHover = new HoverFade('.global-navi__list', '.global-navi__item');
  const mainMenuHover = new HoverFade('.main-menu__list', '.main-menu__item');
  const mainMenuSubHover = new HoverFade('.main-menu__sub-list', '.main-menu__sub-link');
  const newsListHover = new HoverFade('.stack-list', '.stack-list__item');
  const snsListHover = new HoverFade('.sns__list', '.sns__item');

  class HoverMove {
    constructor(el, image) {
      this.el = document.querySelectorAll(el);
      this.elProperty = [];
      this.elCenter = [];
      this.elMiddle = [];
      this.image = image;

      this.set();

      window.addEventListener('resize', () => {
        this.set();
      });

      this.hover();
    }

    set() {
      for (let i = 0; i < this.el.length; i++) {
        this.elProperty[i] = this.el[i].getBoundingClientRect();
        this.elCenter[i] = this.elProperty[i].width / 2;
        this.elMiddle[i] = this.elProperty[i].height / 2;

        gsap.set(this.el[i].querySelector(this.image), {
          width: '150%',
          height: '110%',
          xPercent: -16.66666666666667,
          yPercent: -4.54545454545455
        });
      }
    }

    hover() {
      for (let i = 0; i < this.el.length; i++) {
        this.el[i].addEventListener('mouseenter', () => {
        });

        this.el[i].addEventListener('mousemove', e => {
          const offsetX = e.offsetX;
          const offsetY = e.offsetY;

          gsap.to(this.el[i], {
            rotationY: 20 * ((offsetX - this.elCenter[i]) / this.elCenter[i]),
            rotationX: -5 * ((offsetY - this.elMiddle[i]) / this.elMiddle[i])
          });
          
          gsap.to(this.el[i].querySelector(this.image), {
            xPercent: 16.66666666666667 * ((offsetX - this.elCenter[i]) / this.elCenter[i]) - 16.66666666666667,
            yPercent: 4.54545454545455 * ((offsetY - this.elMiddle[i]) / this.elMiddle[i]) - 4.54545454545455,
          });
        });

        this.el[i].addEventListener('mouseleave', () => {
          gsap.to(this.el[i], {
            rotationY: 0,
            rotationX: 0,
            duration: .2,
            overwrite: true
          });

          gsap.to(this.el[i].querySelector(this.image), {
              xPercent: -16.66666666666667,
              yPercent: -4.54545454545455,
              duration: .2,
            overwrite: true
          });
        });
      }
    }
  }

  const hoverMove = new HoverMove('.js-hover-move', '.js-hover-move__image');

  class HoverImageList {
    constructor(list, listItem, imageList, imageListItem) {
      this.list = document.querySelector(list);
      this.listItem = this.list.querySelectorAll(listItem);
      this.imageList = document.querySelector(imageList);
      this.imageListItem = this.imageList.querySelectorAll(imageListItem);
      this.enter();
      this.listEnter();
      this.move();
      this.listLeave();
    }

    enter() {
      this.list.addEventListener('mouseenter', e => {
        const listProperty = this.list.getBoundingClientRect();
        const offsetX = e.clientX - listProperty.left;
        const offsetY = e.clientY - listProperty.top;

        gsap.to(this.imageList, {
          x: offsetX,
          y: offsetY,
          duration: 1
        });
      });
    }

    listEnter() {
      for (let i = 0; i < this.listItem.length; i++) {
        this.listItem[i].addEventListener('mouseenter', e => {
          gsap.to(this.imageListItem[i], {
            opacity: 1
          });

          gsap.fromTo(this.imageListItem[i], {
            scale: 1.2
          }, {
            scale: 1,
            duration: 1
          });
        });
      }
    }

    move() {
      this.list.addEventListener('mousemove', e => {
        const listProperty = this.list.getBoundingClientRect();
        const offsetX = e.clientX - listProperty.left;
        const offsetY = e.clientY - listProperty.top;

        gsap.to(this.imageList, {
          x: offsetX,
          y: offsetY,
          duration: 1
        });
      });
    }

    listLeave() {
      for (let i = 0; i < this.listItem.length; i++) {
        this.listItem[i].addEventListener('mouseleave', () => {
          gsap.to(this.imageListItem[i], {
            opacity: 0
          });
        });
      }
    }
  }

  if (document.querySelectorAll('.stack-list').length > 0) {
    const hoverImageList = new HoverImageList('.stack-list', '.stack-list__item', '.hover-image-list', '.hover-image-list__item');
  }

  // ===========================================
  //                  mouse-stalker
  // ===========================================

  class MouseCricleText {
    constructor(mouseStalker, container, circle, effect, text, area) {
      this.mouseStalker = document.querySelector(mouseStalker);
      this.container = this.mouseStalker.querySelector(container);
      this.circle = this.mouseStalker.querySelector(circle);
      this.circleStroke = 0;
      this.effect = this.mouseStalker.querySelector(effect);
      this.text = this.mouseStalker.querySelector(text);
      this.area = document.querySelectorAll(area);

      this.set();

      window.addEventListener('resize', () => {
        this.set();
      });

      this.enter();
      this.move();
      this.leave();
      this.click();
    }

    set() {
      const circleProperty = this.circle.getBoundingClientRect();
      this.circleStroke = 98 * Math.PI;
      gsap.set(this.circle, {
        'stroke-dasharray': this.circleStroke,
        'stroke-dashoffset': this.circleStroke
      });
    }

    enter() {
      for (let i = 0; i < this.area.length; i++) {
        this.area[i].addEventListener('mouseenter', () => {
          gsap.fromTo(this.mouseStalker, {
            opacity: 0
          }, {
            opacity: 1,
          });

          gsap.fromTo(this.circle, {
            'stroke-dashoffset': this.circleStroke
          }, {
            'stroke-dashoffset': 0,
          });

          gsap.fromTo(this.container, {
            rotation: -90
          }, {
            rotation: 270
          });

          gsap.fromTo(this.text.querySelectorAll('span'), {
            yPercent: 100,
            opacity: 0
          }, {
            yPercent: 0,
            opacity: 1,
            stagger: {
              amount: .2
            }
          });
        });
      }
    }

    move() {
      for (let i = 0; i < this.area.length; i++) {
        this.area[i].addEventListener('mousemove', e => {
          const offsetX = e.clientX;
          const offsetY = e.clientY;

          gsap.to(this.mouseStalker, {
            x: offsetX,
            y: offsetY
          });
        });
      }
    }

    leave() {
      for (let i = 0; i < this.area.length; i++) {
        this.area[i].addEventListener('mouseleave', () => {
          gsap.to(this.mouseStalker, {
            opacity: 0,
          });

          gsap.to(this.circle, {
            'stroke-dashoffset': -this.circleStroke,
          });

          gsap.to(this.container, {
            rotation: 630
          });

          gsap.to(this.text.querySelectorAll('span'), {
            yPercent: -100,
            opacity: 0,
            stagger: {
              amount: .2
            }
          });
        });
      }
    }

    click() {
      for (let i = 0; i < this.area.length; i++) {
        this.area[i].addEventListener('click', () => {
          gsap.set(this.circle, {
            opacity: 0
          });
  
          gsap.set(this.text, {
            opacity: .5
          });
  
          gsap.fromTo(this.effect, {
            'border-width': '0vw',
            x: '0vw',
            y: '0vw',
            opacity: 1

          }, {
            'border-width': '2vw',
            x: '-2vw',
            y: '-2vw',
            opacity: 0
          });
  
          setTimeout( () => {
            gsap.fromTo(this.circle, {
              'stroke-dashoffset': this.circleStroke
            }, {
              'stroke-dashoffset': 0,
            });
  
            gsap.fromTo(this.container, {
              rotation: -90
            }, {
              rotation: 270
            });
    
            gsap.to(this.circle, {
              opacity: 1
            });
  
            gsap.to(this.text, {
              opacity: 1
            });
    
          }, 500);
        });
      }
    }
  }

  const mouseCriclePrev = new MouseCricleText('.mouse-stalker', '.mouse-stalker__circle-outer', '.mouse-stalker__circle', '.mouse-stalker__circle-effect', '.mouse-stalker__text--prev', '.gallery__prev');
  const mouseCricleNext = new MouseCricleText('.mouse-stalker', '.mouse-stalker__circle-outer', '.mouse-stalker__circle', '.mouse-stalker__circle-effect', '.mouse-stalker__text--next', '.gallery__next');

  class MenuHover {
    constructor(list, imageList) {
      this.list = document.querySelectorAll(list);
      this.imageList = document.querySelectorAll(imageList);

      this.enter();
      this.leave();
    }

    enter() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].addEventListener('mouseenter', () => {
          gsap.fromTo(this.imageList[i], {
            opacity: 0,
            scale: 1.2
          }, {
            scale: 1,
            opacity: 1,
            duration: 1.5
          });
        });
      }
    }

    leave() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].addEventListener('mouseleave', () => {
          gsap.to(this.imageList[i], {
            opacity: 0,
            duration: 1.5
          });
        });
      }
    }
  }

  const menuHover = new MenuHover('.main-menu__item', '.main-menu__image-item');
  
  }
});
