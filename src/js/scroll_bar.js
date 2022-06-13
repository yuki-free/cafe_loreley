import { gsap } from "gsap";

window.addEventListener('DOMContentLoaded', () => {

  class ScrollBar {
    constructor(scrollBar, thumb) {
      this.scrollBar = document.querySelector(scrollBar);
      this.thumb = document.querySelector(thumb);
      this.thumbHeight = 0;
      this.thumbMaxMove = 0;
      this.thumbCurrentPosition = 0;
      this.thumbDragMove = 0;
      this.thumbActive = false;
      this.dragStartPosition = 0;
      this.dragMovePosition = 0;
      this.dragEndPosition = 0;
      this.dragMoveFunction = e => {
        this.dragMove(e);
      }
      this.body = document.getElementsByTagName('body')[0];
      this.bodyHeight = this.body.getBoundingClientRect().height;
      this.windowHeight = window.innerHeight;
      this.scrollY = window.scrollY;
      this.scrollProgress = 0;
      this.scrollMaxMove = 0;
      this.scrollFunction = () => {
        this.scroll();
      }
      this.timeoutId;
      this.mouseLeaveOpacityFunction = () => {
        this.mouseLeaveOpacity();
      }
      this.thumbOpacityFunction = () => {
        gsap.to(this.thumb, {
          opacity: 0
        });
      }
      this.opacityTimer;

      this.set();

      window.addEventListener('resize', () => {
        this.set();
      });

      window.addEventListener('scroll', this.scrollFunction);

      this.scrollBar.addEventListener('mouseenter', () => {
        this.mouseEnter();
      });

      this.scrollBar.addEventListener('mouseleave', this.mouseLeaveOpacityFunction);
      this.scrollBar.addEventListener('mouseleave', () => {
        this.mouseLeaveWidth();
      });

      this.thumb.addEventListener('mousedown', e => {
        this.dragStart(e);
        window.addEventListener('mousemove', this.dragMoveFunction);
        window.removeEventListener('scroll', this.scrollFunction);
        this.scrollBar.removeEventListener('mouseleave', this.mouseLeaveOpacityFunction);
      });

      window.addEventListener('mouseup', () => {
        if (this.thumbActive === true) {
          this.dragEnd();
          window.removeEventListener('mousemove', this.dragMoveFunction);
          setTimeout( () => {
            window.addEventListener('scroll', this.scrollFunction);
            this.scrollBar.addEventListener('mouseleave', this.mouseLeaveOpacityFunction);
          }, 600);
        }
      });
    }

    set() {
      this.windowHeight = window.innerHeight;
      this.bodyHeight = this.body.getBoundingClientRect().height;
      this.thumbHeight = this.windowHeight * (this.windowHeight / this.bodyHeight);
      this.thumbMaxMove = this.windowHeight - this.thumbHeight;
      this.scrollMaxMove = this.bodyHeight - this.windowHeight;

      gsap.set(this.thumb, {
        height: this.thumbHeight
      });
    }

    scroll() {
      this.scrollY = window.scrollY;
      this.scrollProgress = this.scrollY / (this.bodyHeight - this.windowHeight);

      gsap.to(this.thumb, {
        y: this.thumbMaxMove * this.scrollProgress,
        opacity: 1
      });

      clearTimeout(this.opacityTimer);
      this.opacityTimer = setTimeout(this.thumbOpacityFunction, 3000);
    }

    mouseEnter() {
      gsap.to(this.thumb, {
        width: 12,
        opacity: 1
      });

      clearTimeout(this.opacityTimer);
    }

    mouseLeaveOpacity() {
      gsap.to(this.thumb, {
        opacity: 0
      });
    }

    mouseLeaveWidth() {
      gsap.to(this.thumb, {
        width: 8
      });
    }

    dragStart(e) {
      e.preventDefault();
      this.thumbActive = true;

      gsap.set(this.thumb, {
        cursor: 'grabbing'
      });

      this.thumbCurrentPosition = this.thumb.getBoundingClientRect().top;
      this.dragStartPosition = e.clientY;
    }

    dragMove(e) {
      this.dragMovePosition = e.clientY;
      this.thumbDragMove = this.thumbCurrentPosition + (this.dragMovePosition - this.dragStartPosition);

      if (this.dragMovePosition < this.dragStartPosition) {
        gsap.set(this.thumb, {
          y: Math.max(this.thumbDragMove, 0)
        });
      } else {
        gsap.set(this.thumb, {
          y: Math.min(this.thumbDragMove, this.thumbMaxMove)
        });  
      }

      if (this.timeoutId) return; 
      
      this.timeoutId = setTimeout( () => {
        this.timeoutId = 0;

        window.scrollTo(0, this.scrollMaxMove * (this.thumbDragMove / this.thumbMaxMove));
      }, 100);
    }

    dragEnd(e) {
      this.thumbActive = false;

      gsap.set(this.thumb, {
        cursor: 'grab'
      });

      this.opacityTimer = setTimeout(this.thumbOpacityFunction, 3000);
    }
  }

  const scrollBar = new ScrollBar('.scroll-bar', '.scroll-bar__thumb');
});