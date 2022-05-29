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
});
