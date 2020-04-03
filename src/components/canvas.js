import React from 'react';
import * as THREE from 'three';

// helper
const derivativeOfEaseInOutCubic = t => -(2 * t - 1) * (2 * t - 1) + 1;

// constants
const BBOX = new THREE.Vector3(10, 10, 10);
const COUNT = 20;
const colorMain = 0x0;
const colorBg = 0xffffff;
const colorRed = 0xff0000;
const colorPink = 0xffb6c1;
const colorLemon = 0x00fff44f;
const colorLiliac = 0x00aca2c8;

class CanvasBackground extends React.Component {
  constructor(props) {
    super(props);
    this.currTime = Date.now();
    this.camera = null;
    this.scene = null;
    this.sceneMeshes = [];
    this.pageY = 0;
    this.trStart = 0;
    this.trDuration = 0;
    this.trBack = false;
    this.boundBox = null;
    this.material = new THREE.MeshBasicMaterial({
      color: colorMain,
      wireframe: true,
    });

    if (typeof window !== 'undefined') {
      window.CANVAS_BACKGROUND = this;
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.init();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    window.removeEventListener('resize', this.resize);
  }

  setColors = () => {
    this.material.color.set(colorLemon);
    this.renderer.setClearColor(colorLiliac);
    this.scene.fog.color.set(colorLiliac);
  };

  setRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      stencil: false,
      antialias: true,
    });
  };

  setBounBox = () => {
    this.boundBox = new THREE.Box3(
      BBOX.negate().clone(),
      BBOX.negate().clone(),
    );
  };

  init = () => {
    this.setRenderer();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);

    this.mount.appendChild(this.renderer.domElement);

    this.resize();
    this.setBounBox();
    this.initScene();
    this.setColors();

    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.update);
    }
  };

  update = () => {
    const currTime = Date.now();
    const dt = 0.0003 * (currTime - this.currTime);
    this.currTime = currTime;
    this.updateScene(dt);
    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.update);
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
    this.frameId = undefined;
  };

  resize = () => {
    const { clientWidth, clientHeight } = this.mount;

    this.renderer.setSize(clientWidth, clientHeight);
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
  };

  getRandomPos = () => {
    const size = this.boundBox.getSize(new THREE.Vector3());
    return new THREE.Vector3(
      size.x * Math.random() + this.boundBox.min.y,
      size.y * Math.random() + this.boundBox.min.x,
      size.z * Math.random() + this.boundBox.min.z,
    );
  };

  getGeometry = index => {
    const radius = index < 4 ? index / 2 : index / 10;
    const sphereGeometry = new THREE.SphereBufferGeometry(radius, 6, 3);
    const thresholdAngle = 56;
    return new THREE.EdgesGeometry(sphereGeometry, thresholdAngle);
  };

  getRandomRot = () => {
    return [
      1 * Math.random() - 1 / 2.0,
      1 * Math.random() - 1 / 2.0,
      1 * Math.random() - 1 / 2.0,
    ];
  };

  initScene = () => {
    const {
      scene,
      camera,
      getGeometry,
      getRandomPos,
      getRandomRot,
      sceneMeshes,
      material,
    } = this;

    // fog
    const near = 5;
    const far = 20;
    scene.fog = new THREE.Fog(colorLiliac, near, far);
    camera.position.z = 10;

    for (let i = 0; i < COUNT; i += 1) {
      const geometry = getGeometry(i);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(getRandomPos());
      mesh.rot = getRandomRot();
      sceneMeshes.push(mesh);
      scene.add(mesh);
    }
  };

  updateScene(dt) {
    const { sceneMeshes, boundBox, camera } = this;

    // update animations
    sceneMeshes.forEach(mesh => {
      mesh.rotation.x += mesh.rot[0] * dt;
      mesh.rotation.y += mesh.rot[1] * dt;
      mesh.rotation.z += mesh.rot[2] * dt;

      mesh.position.x += mesh.rot[0] * dt * 1.5;
      mesh.position.y += mesh.rot[1] * dt * 1.5;
      mesh.position.z += mesh.rot[2] * dt * 1.5;
    });

    for (let i = 0; i < sceneMeshes.length; i += 2) {
      if (!boundBox.containsPoint(sceneMeshes[i].position)) {
        const mesh = sceneMeshes[i];

        if (mesh.position.x > boundBox.max.x) {
          mesh.position.x = boundBox.min.x;
        } else if (mesh.position.x < boundBox.min.x) {
          mesh.position.x = boundBox.max.x;
        }
        if (mesh.position.y > boundBox.max.y) {
          mesh.position.y = boundBox.min.y;
        } else if (mesh.position.y < boundBox.min.y) {
          mesh.position.y = boundBox.max.y;
        }
        if (mesh.position.z > boundBox.max.z) {
          mesh.position.z = boundBox.min.z;
        } else if (mesh.position.z < boundBox.min.z) {
          mesh.position.z = boundBox.max.z;
        }
      }
    }

    const calcPageDy = () => {
      const currY = window.pageYOffset;
      const dy = 0.01 * (currY - this.pageY);
      this.pageY = currY;
      return dy;
    };

    const calcPageDx = () => {
      const { currTime, trStart, trDuration, trBack } = this;
      let dx = 0;
      const t = (currTime - trStart) / trDuration;

      if (t <= 1) {
        let multiplier = 0.01 * 0.02 * window.innerWidth;
        if (trBack) multiplier = -multiplier;
        dx = multiplier * derivativeOfEaseInOutCubic(t);
      }
      return dx;
    };

    const dx = calcPageDx();
    const dy = calcPageDy();

    camera.position.x += dx;
    boundBox.min.x += dx;
    boundBox.max.x += dx;
    camera.position.y -= dy;
    boundBox.min.y -= dy;
    boundBox.max.y -= dy;
  }

  triggerTransition(duration) {
    this.trStart = this.currTime;
    this.trDuration = duration;
  }

  render() {
    return (
      <div
        id="canvas-wrap"
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default CanvasBackground;
