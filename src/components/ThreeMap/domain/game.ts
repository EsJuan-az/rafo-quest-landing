import * as THREE from "three";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { animate } from "../movement";
/**
 * Game class will gather all the information about a three scene and all its methods.
 *
 * @export
 * @class Game
 * @typedef {Game}
 */
export class Game {
  /**
   * Map with meshes.
   *
   * @public
   * @type {object}
   */
  public meshes: object = {};
  /**
   * A list of the components that will be added to the scene.
   *
   * @public
   * @type {THREE.Object3D[]}
   */
  public components: THREE.Object3D[] = [];
  /**
   * The three renderer used for the game.
   *
   * @public
   * @type {THREE.WebGLRenderer}
   */
  public renderer: THREE.WebGLRenderer;
  /**
   * The scene when all will be displayed.
   *
   * @public
   * @type {THREE.Scene}
   */
  public scene: THREE.Scene;
  /**
   * The HTML Element where the game will be placed.
   *
   * @public
   * @type {HTMLElement}
   */
  public mountElement: HTMLElement;
  /**
   * Interactive debug GUI.
   *
   * @public
   * @type {GUI}
   */
  public gui: GUI;
  /**
   * Controls configuration for the camera to move around the scene.
   *
   * @public
   * @type {OrbitControls}
   */
  public orbitControls: OrbitControls;
  /**
   * The user perspective of the scene.
   *
   * @public
   * @type {THREE.PerspectiveCamera}
   */
  public camera: THREE.PerspectiveCamera;
  /**
   * Lights into the scene.
   * @public
   * @type {{ ambient: THREE.AmbientLight, directional: THREE.DirectionalLight }}
   */
  public lights: THREE.Light[];
  /**
   * Creates an instance of Game.
   *
   * @constructor
   * @param {HTMLElement} element: the html element where the game will be placed.
   */
  constructor(element: HTMLElement) {
    this.setMountElement(element);
    this.preset();
    //--- Animate the scene ---
    animate(this);
  }
  /**
   * Adds a 3d object to the scene.
   *
   * @param {THREE.Object3D} component
   */
  addComponent(component: THREE.Object3D) {
    this.scene.add(component);
    this.components.push(component);
  }
  /**
   * Set the html element.
   *
   * @param {HTMLElement} element
   */
  setMountElement(element: HTMLElement) {
    this.mountElement = element;
  }
  /**
   * Setter of meshes.
   *
   * @param {object} meshes
   */
  setMeshes(meshes: object) {
    this.meshes = meshes;
  }
  /**
   * Creates the renderer with its respective settings.
   *
   * @public
   */
  public setRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      this.mountElement.clientWidth,
      this.mountElement.clientHeight
    );
    renderer.toneMapping = THREE.NoToneMapping;
    this.mountElement.appendChild(renderer.domElement);
    this.renderer = renderer;
  }
  /**
   * Creates the scene.
   *
   * @public
   */
  public setScene() {
    this.scene = new THREE.Scene();
  }
  /**
   * Creates the debug gui.
   *
   * @public
   */
  public setGUI() {
    this.gui = new GUI();
  } /** Description placeholder */
  /**
   * Creates and establish the settings of the orbit controls.
   *
   * @public
   */
  public setOrbitControls() {
    const { camera, renderer } = this;
    const controls = new OrbitControls(camera, renderer.domElement);
    // Configura los límites de movimiento
    controls.minDistance = 25; // Distancia mínima de la cámara
    controls.maxDistance = 25; // Distancia máxima de la cámara
    controls.minPolarAngle = (75 * Math.PI) / 180; // Límite inferior del ángulo vertical (45 grados)
    controls.maxPolarAngle = (75 * Math.PI) / 180; // Límite superior del ángulo vertical (90 grados)
    // controls.enablePan = false;
    controls.update();
    this.orbitControls = controls;
  }
  /**
   * Sets the color of the background to the respective css background variable.
   *
   * @public
   */
  public setBackgroundColor() {
    const rootStyle = getComputedStyle(document.documentElement);
    const backgroundHSL = rootStyle.getPropertyValue("--background").trim(); // Obtiene el valor HSL
    // Separar los valores de HSL (formato: "240 5.9% 10%")
    const [hue, saturation, lightness] = backgroundHSL
      .split(" ")
      .map((value) => parseFloat(value)); // Convertir a números
    const backgroundColor = new THREE.Color();
    backgroundColor.setHSL(hue / 360, saturation / 100, lightness / 100); // Convertir valores y aplicar
    this.renderer.setClearColor(backgroundColor);
  }
  /**
   * Creates, configurates and adds the ambient and directional light to the game.
   *
   * @public
   */
  public setLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.addComponent(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(10, 20, 10);
    this.addComponent(directional);
    this.lights = [ambient, directional];
  }
  /**
   * This method creates an places a camera into the game.
   *
   * @public
   */
  public setPerspectiveCamera() {
    const camera = new THREE.PerspectiveCamera(
      75,
      this.mountElement.clientWidth / this.mountElement.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 15);
    this.addComponent(camera);
    this.camera = camera;
  }

  /**
   * Event of resize.
   *
   * @public
   */
  public handleResize() {
    if (this.mountElement) {
      const width = this.mountElement.clientWidth;
      const height = this.mountElement.clientHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }
  
  /**
   * This method includes all the primal configuration of the game object.
   *
   * @public
   */
  public preset() {
    // --- BASIC DEFINITIONS ---
    this.setRenderer();
    this.setScene();
    this.setPerspectiveCamera();
    // --- AESTHETIC DEFINITIONS ---
    this.setLights();
    this.setBackgroundColor();
    // --- DEBUG COMPONENTS ---
    this.setOrbitControls();
    this.setGUI();
  }
}
