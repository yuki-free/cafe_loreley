import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {

  // ===========================================
  //               horizontal scroll
  // ===========================================

  class HorizontalScroll {
    constructor(el) {
      this.el = document.querySelectorAll(el);
      this.moveX = [];
      this.dummy = [];
      this.dummyOffset = [];

      for (let i = 0; i < this.el.length; i++) {
        const elWidth = this.el[i].getBoundingClientRect().width;
        this.moveX[i] = elWidth + window.innerWidth - window.innerHeight;
      }

      window.addEventListener('resize', () => {
        this.refresh();
      });

      this.createDummy();

      window.addEventListener('scroll', () => {
        this.move();
      });
    }

    createDummy() {
      for (let i = 0; i < this.el.length; i++) {
        const dummyEl = document.createElement('div');
        this.el[i].after(dummyEl);
        dummyEl.setAttribute('class', `horizontal-scroll-dummy${[i + 1]}`);
        gsap.set(`.horizontal-scroll-dummy${[i + 1]}`, {
          height: this.moveX[i]
        });
        this.dummy[i] = document.querySelector(`.horizontal-scroll-dummy${[i + 1]}`);
        this.dummyOffset[i] = this.dummy[i].getBoundingClientRect().top + window.scrollY;
      }
    }

    refresh() {
      for (let i = 0; i < this.el.length; i++) {
        const elWidth = this.el[i].getBoundingClientRect().width;
        this.moveX[i] = elWidth + window.innerWidth - window.innerHeight;
        gsap.set(`.horizontal-scroll-dummy${[i + 1]}`, {
          height: this.moveX[i]
        });
        setTimeout( () => {
          this.dummyOffset[i] = this.dummy[i].getBoundingClientRect().top + window.scrollY;
          if (window.scrollY + window.innerHeight > this.dummyOffset[i] && window.scrollY < this.dummyOffset[i] + this.moveX[i]) {
            gsap.set(this.el[i], {
              x: this.dummyOffset[i] - (window.scrollY + window.innerHeight)
            });
          } else if (window.scrollY + window.innerHeight <= this.dummyOffset[i]) {
            gsap.set(this.el[i], {
              x: 0
            });
          } else if (window.scrollY >= this.dummyOffset[i] + this.moveX[i]) {
            gsap.set(this.el[i], {
              x: -(this.moveX[i] + window.innerHeight)
            });
          }  
        }, 100);
      }
    }

    move() {
      for (let i = 0; i < this.el.length; i++) {
        if (window.scrollY + window.innerHeight > this.dummyOffset[i] && window.scrollY < this.dummyOffset[i] + this.moveX[i]) {
          gsap.to(this.el[i], {
            x: this.dummyOffset[i] - (window.scrollY + window.innerHeight)
          });
        } else if (window.scrollY + window.innerHeight <= this.dummyOffset[i]) {
          gsap.to(this.el[i], {
            x: 0
          });
        } else if (window.scrollY >= this.dummyOffset[i] + this.moveX[i]) {
          gsap.to(this.el[i], {
            x: -(this.moveX[i] + window.innerHeight)
          });
        }
      }
    }
  }

  // ===========================================
  //               inertia scroll
  // ===========================================

  class InertiaScroll {
    constructor(el) {
      this.el = document.querySelectorAll(el);
      this.elId = [];

      for (let i = 0; i < this.el.length; i++) {
        this.elId[i] = this.el[i].children[0].getAttribute('id');
      }

      this.createDummy(this.el);
      this.dummyRefresh(this.el);
      this.set(this.el);
      this.positionSet(this.el);
      this.positionSetRefresh(this.el);
      this.move(this.el);
      this.moveRefresh(this.el);
    }

    createDummy(el) {
      for (let i = 0; i < el.length; i++) {
        const dummyEl = document.createElement('div');
        this.el[i].after(dummyEl);
        dummyEl.setAttribute('id', `${this.elId[i]}-pc`);
        dummyEl.setAttribute('class', `scroll-dummy-${this.elId[i]}`);
        const elHeight = el[i].getBoundingClientRect().height;
        gsap.set(`.scroll-dummy-${this.elId[i]}`, {
          height: elHeight
        });
      }
    }

    dummyRefresh(el) {
      window.addEventListener('resize', () => {
        for (let i = 0; i < el.length; i++) {
          const elHeight = el[i].getBoundingClientRect().height;
          gsap.set(`.scroll-dummy-${this.elId[i]}`, {
            height: elHeight
          });
        }
      })
    }

    set(el) {
      for (let i = 0; i < el.length; i++) {
        gsap.set(el[i], {
          position: 'fixed',
          'z-index': 2
        });
      }
    }

    positionSet(el) {
      for (let i = 0; i < el.length; i++) {
        const dummy = document.querySelector(`.scroll-dummy-${this.elId[i]}`);
        const dummyProperty = dummy.getBoundingClientRect();
        gsap.set(el[i], {
          top: dummyProperty.top + window.scrollY,
          left: dummyProperty.left + window.scrollX
        });
      }
    }

    positionSetRefresh(el) {
      window.addEventListener('resize', () => {
        for (let i = 0; i < el.length; i++) {
          const dummy = document.querySelector(`.scroll-dummy-${this.elId[i]}`);
          const dummyProperty = dummy.getBoundingClientRect();
          gsap.set(el[i], {
            top: dummyProperty.top + window.scrollY,
            left: dummyProperty.left + window.scrollX
          });
        }
      })
    }

    move(el) {
      window.addEventListener('scroll', () => {
        gsap.to(el, {
          y: -window.scrollY
        });
      });
    }

    moveRefresh(el) {
      window.addEventListener('resize', () => {
        gsap.set(el, {
          y: -window.scrollY
        });
      });
    }
  }

  if (window.innerWidth >= 1024) {
    const horizontalScroll = new HorizontalScroll('.horizontal-scroll');
    const ineatiaScroll = new InertiaScroll('.scroll-container');
  }
});

