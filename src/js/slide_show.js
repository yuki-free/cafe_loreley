import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import frag from './shader/slide_show.frag';
import vert from './shader/slide_show.vert';

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

  class ScrollShow {
    constructor(webgl) {
      this.webgl = webgl;
      this.webglProp = this.webgl.getBoundingClientRect();
      this.width = this.webglProp.width;
      this.height = this.webglProp.height;
  
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
  
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.renderer.setSize(this.width, this.height);
  
      this.loadManager = new THREE.LoadingManager();
      this.loader = new THREE.TextureLoader(this.loadManager);      
  
      this.img1 = this.loader.load('img/hero__scroll-slideshow1.jpg');
      this.img2 = this.loader.load('img/hero__scroll-slideshow2.jpg');
      this.disp = this.loader.load('img/hero__transition.png');

      this.aspect = 1080 / 1920;
  
      this.loadManager.onLoad = () => {
        this.setting();
        this.scrollTransition();
      }
    }

    scrollTransition() {
      ScrollTrigger.batch('.catch-copy', {
        onEnter: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 1,
          duration: 1.5,
          ease: 'expo.in'
        }),
        onLeaveBack: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 0,
          duration: 1.5,
          ease: 'expo.out'
        }),
        onLeave: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 0,
          duration: 1.5,
          ease: 'expo.out'
        }),
        onEnterBack: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 1,
          duration: 1.5,
          ease: 'expo.in'
        }),
        start: 'top -1%',
        markers: true
      });
    }

  
    setting() {
      this.webgl.appendChild(this.renderer.domElement);
      
      this.camera = new THREE.PerspectiveCamera(180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI, this.width / this.height, 1, 10000);

      this.camera.position.set(0, 0, 800);

      this.setMesh();
    }

    setMesh() {
      this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
      this.material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uResolution: {
            value: this.setCover(this.aspect)
          },
          uAnimation: {
            value: 0
          },
          uTexture1: {
            value: this.img1
          },
          uTexture2: {
            value: this.img2
          },
          uDisp: {
            value: this.disp
          }
        }
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
      this.mesh.scale.x = this.width;
      this.mesh.scale.y = this.height;

      requestAnimationFrame(this.onRaf.bind(this));
    }

    setCover(aspect) {
      let x, y;
      if (this.height / this.width > aspect) {
        x = (this.width / this.height) * aspect;
        y = 1
      } else {
        x = 1;
        y = (this.height / this.width) / aspect;
      }

      return new THREE.Vector2(x, y);
    } 

    onResize() {
      this.webglProp = this.webgl.getBoundingClientRect();
      this.width = this.webglProp.width;
      this.height = this.webglProp.height;
      this.material.uniforms.uResolution.value = this.setCover(this.aspect);
      this.mesh.scale.x = this.width;
      this.mesh.scale.y = this.height;
      this.camera.aspect = this.width / this.height;
      this.camera.fov = 180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }

    onRaf() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.onRaf.bind(this));
    }
  }

  class ScrollShowSp {
    constructor(webgl) {
      this.webgl = webgl;
      this.webglProp = this.webgl.getBoundingClientRect();
      this.width = this.webglProp.width;
      this.height = this.webglProp.height;
  
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
  
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.renderer.setSize(this.width, this.height);
  
      this.loadManager = new THREE.LoadingManager();
      this.loader = new THREE.TextureLoader(this.loadManager);      
  
      this.img1 = this.loader.load('img/hero__scroll-slideshow1--sp.jpg');
      this.img2 = this.loader.load('img/hero__scroll-slideshow2--sp.jpg');
      this.disp = this.loader.load('img/hero__transition.png');

      this.aspect = 1920 / 1080;
  
      this.loadManager.onLoad = () => {
        this.setting();
        this.scrollTransition();
      }
    }

    scrollTransition() {
      ScrollTrigger.batch('.catch-copy', {
        onEnter: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 1,
          duration: 1.5,
          ease: 'expo.in'
        }),
        onLeaveBack: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 0,
          duration: 1.5,
          ease: 'expo.out'
        }),
        onLeave: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 0,
          duration: 1.5,
          ease: 'expo.out'
        }),
        onEnterBack: () => gsap.to(this.material.uniforms.uAnimation, {
          value: 1,
          duration: 1.5,
          ease: 'expo.in'
        }),
        start: 'top -1%',
        markers: true
      });
    }

  
    setting() {
      this.webgl.appendChild(this.renderer.domElement);
      
      this.camera = new THREE.PerspectiveCamera(180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI, this.width / this.height, 1, 10000);

      this.camera.position.set(0, 0, 800);

      this.setMesh();
    }

    setMesh() {
      this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
      this.material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uResolution: {
            value: this.setCover(this.aspect)
          },
          uAnimation: {
            value: 0
          },
          uTexture1: {
            value: this.img1
          },
          uTexture2: {
            value: this.img2
          },
          uDisp: {
            value: this.disp
          }
        }
      });

      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
      this.mesh.scale.x = this.width;
      this.mesh.scale.y = this.height;

      requestAnimationFrame(this.onRaf.bind(this));
    }

    setCover(aspect) {
      let x, y;
      if (this.height / this.width > aspect) {
        x = (this.width / this.height) * aspect;
        y = 1
      } else {
        x = 1;
        y = (this.height / this.width) / aspect;
      }

      return new THREE.Vector2(x, y);
    } 

    onResize() {
      this.webglProp = this.webgl.getBoundingClientRect();
      this.width = this.webglProp.width;
      this.height = this.webglProp.height;
      this.material.uniforms.uResolution.value = this.setCover(this.aspect);
      this.mesh.scale.x = this.width;
      this.mesh.scale.y = this.height;
      this.camera.aspect = this.width / this.height;
      this.camera.fov = 180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    }

    onRaf() {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.onRaf.bind(this));
    }
  }

  if (document.querySelectorAll('.slide-show').length > 0) {

    if (window.innerWidth <= 1024) {
      const scrollShowSp = new ScrollShowSp(document.querySelector('.slide-show'));

      console.log('sp');
      window.addEventListener('resize', () => {
        scrollShowSp.onResize();
      });

    } else {
      const scrollShow = new ScrollShow(document.querySelector('.slide-show'));

      window.addEventListener('resize', () => {
        scrollShow.onResize();
      });  
    }
  }
});

