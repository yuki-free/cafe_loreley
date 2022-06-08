import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {
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
      this.touchStartX = 0;
      this.touchMoveX = 0;
      this.touchEndX = 0;
      this.touchMove = e => {
        this.touchMoveX = e.changedTouches[0].clientX;
        this.move();
      }
      this.mouseMove = e => {
        this.touchMoveX = e.clientX;
        this.move();
      }

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

      this.list.addEventListener('mousedown', e => {
        e.preventDefault();
        this.touchStartX = e.clientX;
        document.addEventListener('mousemove', this.mouseMove);
      });

      document.addEventListener('mouseup', e => {
        if (this.touchStartX !== null) {
          this.touchEndX = e.clientX;
          this.end();
          document.removeEventListener('mousemove', this.mouseMove);  
        }
      });

      this.list.addEventListener('touchstart', e => {
        this.touchStartX = e.changedTouches[0].clientX;
        document.addEventListener('touchmove', this.touchMove);
      }, {passive: true});

      document.addEventListener('touchend', e => {
        if (this.touchStartX !== null) {
          this.touchEndX = e.changedTouches[0].clientX;
          this.end();
          document.removeEventListener('touchmove', this.touchMove);  
        }
      });
    }

    move() {
      if (this.moveX[this.num - 1] - this.moveX[0] < this.touchMoveX - this.touchStartX) {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.moveX[this.num - 1] - this.moveX[0]) + ((this.touchMoveX - this.touchStartX) - (this.moveX[this.num - 1] - this.moveX[0])) / 2
        });
      } else if (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 2] > this.touchMoveX - this.touchStartX) {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 2]) + ((this.touchMoveX - this.touchStartX) - (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 2])) / 2
        });
      } else {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.touchMoveX - this.touchStartX)
        });
      }
    }

    end() {
      let itemDistance = [];
      let currentDistance = 0;
      let nextDistance = 0;

      if (this.touchEndX - this.touchStartX < -(this.itemProperty[this.num -1].width / 2)) {

        for (let i = 0; i < this.item.length - this.num; i++) {
          itemDistance[i] = this.itemProperty[this.num + i].left - this.itemProperty[this.num -1 + i].left;
        }

        itemDistance[0] = this.itemProperty[this.num -1].width / 2;

        for (let i = 0; i < itemDistance.length - 1; i++) {
          currentDistance += itemDistance[i];
          nextDistance = currentDistance + itemDistance[i + 1];

          if (this.touchEndX - this.touchStartX < -currentDistance && this.touchEndX - this.touchStartX >= -nextDistance) {
            this.num += 1 + i;

            gsap.to(this.list, {
              x: -this.moveX[this.num - 1],
              duration: .5,
              ease: 'power3.out'
            });    
          }
        }

        if (this.touchEndX - this.touchStartX < -nextDistance) {
          this.num += itemDistance.length - 1;

          gsap.to(this.list, {
            x: -this.moveX[this.num - 1],
            duration: .5,
            ease: 'power3.out'
          });
        }

        if (this.num > 1) {
          gsap.set(this.prev, {
            'pointer-events': 'auto'
          });
        }
        
        if (this.num === this.item.length -1) {
          gsap.set(this.next, {
            'pointer-events': 'none'
          });
        }

      } else if (this.touchEndX - this.touchStartX > this.itemProperty[this.num -1].width / 2) {
        
        for (let i = 0; i < this.num; i++) {
          itemDistance[i] = this.itemProperty[this.num - i].left - this.itemProperty[this.num - 1 - i].left;
        }

        itemDistance[0] = this.itemProperty[this.num -1].width / 2;

        for (let i = 0; i < itemDistance.length - 1; i++) {
          currentDistance += itemDistance[i];
          nextDistance = currentDistance + itemDistance[i + 1];

          if (this.touchEndX - this.touchStartX > currentDistance && this.touchEndX - this.touchStartX <= nextDistance) {
            this.num -= 1 + i;

            gsap.to(this.list, {
              x: -this.moveX[this.num - 1],
              duration: .5,
              ease: 'power3.out'
            });
          }
        }

        if (this.touchEndX - this.touchStartX > nextDistance) {
          this.num -= itemDistance.length - 1;

          gsap.to(this.list, {
            x: -this.moveX[this.num - 1],
            duration: .5,
            ease: 'power3.out'
          });
        }

        if (this.num === 1) {
          gsap.set(this.prev, {
            'pointer-events': 'none'
          });
        }
        
        if (this.num < this.item.length -1) {
          gsap.set(this.next, {
            'pointer-events': 'auto'
          });
        }

      } else {
        gsap.to(this.list, {
          x: -this.moveX[this.num - 1],
          duration: .5,
          ease: 'power3.out'
        });
      }

      this.touchStartX = null;
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

      gsap.set(this.prev, {
        'pointer-events': 'none'
      });

      gsap.to(this.list, {
        x: -this.moveX[this.num - 1],
        duration: .5,
        ease: 'power3.out'
      });

      if (this.num > 1) {
        setTimeout( () => {
          gsap.set(this.prev, {
            'pointer-events': 'auto'
          });
        }, 500);
      }
      
      if (this.num < this.item.length - 1) {
        gsap.set(this.next, {
          'pointer-events': 'auto'
        });
      }
    }

    nextClick() {
      this.num += 1;

      gsap.set(this.next, {
        'pointer-events': 'none'
      });

      gsap.to(this.list, {
        x: -this.moveX[this.num - 1],
        duration: .5,
        ease: 'power3.out'
      });

      if (this.num < this.item.length - 1) {
        setTimeout( () => {
          gsap.set(this.next, {
            'pointer-events': 'auto'
          });
        }, 500);
      }
      
      if (this.num > 1) {
        gsap.set(this.prev, {
          'pointer-events': 'auto'
        });
      }
    }
  }

  class SliderSp {
    constructor(slider, list, item,) {
      this.slider = document.querySelector(slider);
      this.list = this.slider.querySelector(list);
      this.item = this.list.querySelectorAll(item);
      this.itemProperty = [];
      this.moveX = [];
      this.num = 1;
      this.touchStartX = 0;
      this.touchMoveX = 0;
      this.touchEndX = 0;
      this.touchMove = e => {
        this.touchMoveX = e.changedTouches[0].clientX;
        this.move();
      }
      this.mouseMove = e => {
        this.touchMoveX = e.clientX;
        this.move();
      }

      this.offset();

      window.addEventListener('resize', () => {
        this.offset();
        this.refresh();
      });

      this.list.addEventListener('mousedown', e => {
        e.preventDefault();
        this.touchStartX = e.clientX;
        document.addEventListener('mousemove', this.mouseMove);
      });

      document.addEventListener('mouseup', e => {
        if (this.touchStartX !== null) {
          this.touchEndX = e.clientX;
          this.end();
          document.removeEventListener('mousemove', this.mouseMove);  
        }
      });

      this.list.addEventListener('touchstart', e => {
        this.touchStartX = e.changedTouches[0].clientX;
        document.addEventListener('touchmove', this.touchMove);
      }, {passive: true});

      document.addEventListener('touchend', e => {
        if (this.touchStartX !== null) {
          this.touchEndX = e.changedTouches[0].clientX;
          this.end();
          document.removeEventListener('touchmove', this.touchMove);  
        }
      });
    }

    move() {
      if (this.moveX[this.num - 1] - this.moveX[0] < this.touchMoveX - this.touchStartX) {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.moveX[this.num - 1] - this.moveX[0]) + ((this.touchMoveX - this.touchStartX) - (this.moveX[this.num - 1] - this.moveX[0])) / 2
        });
      } else if (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 1] > this.touchMoveX - this.touchStartX) {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 1]) + ((this.touchMoveX - this.touchStartX) - (this.moveX[this.num - 1] - this.moveX[this.moveX.length - 1])) / 2
        });
      } else {
        gsap.set(this.list, {
          x: -this.moveX[this.num - 1] + (this.touchMoveX - this.touchStartX)
        });
      }
    }

    end() {
      let itemDistance = [];
      let currentDistance = 0;
      let nextDistance = 0;

      if (this.touchEndX - this.touchStartX < -(this.itemProperty[this.num -1].width / 2)) {

        for (let i = 0; i < this.item.length - this.num; i++) {
          itemDistance[i] = this.itemProperty[this.num + i].left - this.itemProperty[this.num -1 + i].left;
        }

        if (itemDistance.length > 0) {
          itemDistance[0] = this.itemProperty[this.num -1].width / 2;
        }

        for (let i = 0; i < itemDistance.length - 1; i++) {
          currentDistance += itemDistance[i];
          nextDistance = currentDistance + itemDistance[i + 1];

          if (this.touchEndX - this.touchStartX < -currentDistance && this.touchEndX - this.touchStartX >= -nextDistance) {
            this.num += 1 + i;

            gsap.to(this.list, {
              x: -this.moveX[this.num - 1],
              duration: .5,
              ease: 'power3.out'
            });    
          }
        }

        if (this.touchEndX - this.touchStartX < -nextDistance) {
          this.num += itemDistance.length;

          gsap.to(this.list, {
            x: -this.moveX[this.num - 1],
            duration: .5,
            ease: 'power3.out'
          });
        }

      } else if (this.num > 1 && this.touchEndX - this.touchStartX > this.itemProperty[this.num -1].width / 2) {

        itemDistance[0] = this.itemProperty[this.num -1].width / 2;
        
        for (let i = 1; i < this.num; i++) {
          itemDistance[i] = this.itemProperty[this.num - i].left - this.itemProperty[this.num - 1 - i].left;
        }

        for (let i = 0; i < itemDistance.length - 1; i++) {
          currentDistance += itemDistance[i];
          nextDistance = currentDistance + itemDistance[i + 1];

          if (this.touchEndX - this.touchStartX > currentDistance && this.touchEndX - this.touchStartX <= nextDistance) {
            this.num -= 1 + i;

            gsap.to(this.list, {
              x: -this.moveX[this.num - 1],
              duration: .5,
              ease: 'power3.out'
            });
          }
        }

        if (this.touchEndX - this.touchStartX > nextDistance) {
          this.num -= itemDistance.length - 1;

          gsap.to(this.list, {
            x: -this.moveX[this.num - 1],
            duration: .5,
            ease: 'power3.out'
          });
        }

      } else {
        gsap.to(this.list, {
          x: -this.moveX[this.num - 1],
          duration: .5,
          ease: 'power3.out'
        });
      }

      this.touchStartX = null;
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
  }

  if (window.innerWidth < 1024) {
    const sliderSp = new SliderSp('.gallery__slider', '.gallery__list', '.gallery__item');
  } else {
    const slider = new Slider('.gallery__slider', '.gallery__list', '.gallery__item', '.gallery__prev', '.gallery__next');
  }

});