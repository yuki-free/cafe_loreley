import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {

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

      this.listEnter();
      this.move();
      this.listLeave();
    }

    listEnter() {
      for (let i = 0; i < this.listItem.length; i++) {
        this.listItem[i].addEventListener('mouseenter', () => {
          gsap.to(this.imageListItem[i], {
            opacity: 1
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
          y: offsetY
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

  const hoverImageList = new HoverImageList('.stack-list', '.stack-list__item', '.hover-image-list', '.hover-image-list__item');

  // ===========================================
  //                  mouse-stalker
  // ===========================================

  class MouseCricleText {
    constructor(mouseStalker, cricle, text, area) {
      this.mouseStalker = document.querySelector(mouseStalker);
      this.cricle = this.mouseStalker.querySelector(cricle);
      this.cricleStroke = 0;
      this.text = this.mouseStalker.querySelector(text);
      this.area = document.querySelectorAll(area);

      this.set();

      window.addEventListener('resize', () => {
        this.set();
      });

      this.enter();
      this.move();
    }

    set() {
      const cricleProperty = this.cricle.getBoundingClientRect();
      this.cricleStroke = 98 * Math.PI;
      console.log(this.cricleStroke);
      gsap.set(this.cricle, {
        'stroke-dasharray': this.cricleStroke,
        'stroke-dashoffset': this.cricleStroke
      });
    }

    enter() {
      for (let i = 0; i < this.area.length; i++) {
        this.area[i].addEventListener('mouseenter', () => {
          gsap.to(this.cricle, {
            'stroke-dashoffset': 0
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
  }

  const mouseCricleNext = new MouseCricleText('.mouse-stalker', '.mouse-stalker__circle', '.mouse-stalker__text--next', '.gallery__next')
});
