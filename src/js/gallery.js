import { gsap } from "gsap";
// import { galleryOffset } from "./scroll_trigger";


window.addEventListener('DOMContentLoaded', () => {

  // console.log(galleryOffset);

  class Slider {
    constructor(slider, list, item, prev, next) {
      this.slider = document.querySelector(slider);
      this.list = this.slider.querySelector(list);
      this.item = this.list.querySelectorAll(item);
      this.prev = this.slider.querySelector(prev);
      this.next = this.slider.querySelector(next);
      this.itemProperty = [];
      this.moveX = [];
      this.num = 1;

      this.set();

      this.offset();

      window.addEventListener('resize', () => {
        this.offset();
        this.refresh();
      });

      this.prev.addEventListener('click', () => {
        this.prevClick();
      });

      this.next.addEventListener('click', () => {
        this.nextClick();
      });

    }

    set() {
      gsap.set(this.prev, {
        'pointer-events': 'none'
      });
    }

    offset() {
      for (let i = 0; i < this.item.length; i++) {
        this.itemProperty[i] = this.item[i].getBoundingClientRect();
        this.moveX[i] = this.itemProperty[i].left - this.itemProperty[0].left;
      }
    }

    refresh() {
      gsap.to(this.list, {
        x: -this.moveX[this.num - 1],
        duration: .5,
        ease: 'power3.out'
      });
    }

    prevClick() {
      this.num -= 1;
      console.log(this.num);

      gsap.to(this.list, {
        x: -this.moveX[this.num - 1],
        duration: .5,
        ease: 'power3.out'
      });

      if (this.num === 1) {
        gsap.set(this.prev, {
          'pointer-events': 'none'
        });
      } else if (this.num < this.item.length - 1) {
        gsap.set(this.next, {
          'pointer-events': 'auto'
        });
      }
    }

    nextClick() {
      this.num += 1;
      console.log(this.num);

      gsap.to(this.list, {
        x: -this.moveX[this.num - 1],
        duration: .5,
        ease: 'power3.out'
      });

      if (this.num === this.item.length - 1) {
        gsap.set(this.next, {
          'pointer-events': 'none',
        });
      } else if (this.num > 1) {
        gsap.set(this.prev, {
          'pointer-events': 'auto'
        });
      }
    }
  }

  const slider = new Slider('.gallery__slider', '.gallery__list', '.gallery__item', '.gallery__prev', '.gallery__next');
});