import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
   // this.gui = new GUI();
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.resources = this.experience.resources;
    this.setSun();
    // this.setGUI();
  }

  setGUI() {
      this.gui.addColor(this.obj, "colorObj").onChange(() => {
          console.log(this.obj.colorObj);
          this.sunLight.color.copy(this.obj.colorObj);
          this.ambientLight.color.copy(this.obj.colorObj);
      });
      this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
          this.sunLight.intensity = this.obj.intensity;
          this.sunLight.ambientLight = this.obj.intensity;
      });
  }

  setSun() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;

    this.sunLight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunLight);

    this.ambientlight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientlight);
  }
  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.00784313725490196,
        g: 0.17254901960784313,
        b: 0.1450980392156863,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.00784313725490196,
        g: 0.17254901960784313,
        b: 0.1450980392156863,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 1,
      });
    }
  }
}
