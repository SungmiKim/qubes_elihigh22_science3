import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// Scene, Camera, Renderer
const canvas = document.querySelector("#earth");
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1500);
const cameraAutoRotation = true;
const orbitControls = new OrbitControls(camera, renderer.domElement);

// Lights
// const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
const light = new THREE.SpotLight(0xffffff, 0.9, 100);
light.position.set(0, 15, 10);

const light1 = new THREE.SpotLight(0xffffff, 0.9, 100);
light1.position.set(-10, 0, 10);

// const light2 = new THREE.SpotLight(0xffffff, 1, 100);
// light2.position.set(10, 0, 10);
// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Planet Proto
let planetProto = {
  sphere: function (size) {
    let sphere = new THREE.SphereGeometry(size, 32, 32);

    return sphere;
  },
  material: function (options) {
    let material = new THREE.MeshPhongMaterial();
    if (options) {
      for (var property in options) {
        material[property] = options[property];
      }
    }

    return material;
  },
  glowMaterial: function (intensity, fade, color) {
    // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
    let glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        c: {
          type: "f",
          value: intensity,
        },
        p: {
          type: "f",
          value: fade,
        },
        glowColor: {
          type: "c",
          value: new THREE.Color(color),
        },
        viewVector: {
          type: "v3",
          value: camera.position,
        },
      },
      vertexShader: `
              uniform vec3 viewVector;
              uniform float c;
              uniform float p;
              varying float intensity;
              void main() {
                vec3 vNormal = normalize( normalMatrix * normal );
                vec3 vNormel = normalize( normalMatrix * viewVector );
                intensity = pow( c - dot(vNormal, vNormel), p );
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
              }
            `,
      fragmentShader: `
              uniform vec3 glowColor;
              varying float intensity;
              void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4( glow, 0 );
              }
            `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    return glowMaterial;
  },
  texture: function (material, property, uri) {
    let textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    textureLoader.load(uri, function (texture) {
      material[property] = texture;
      material.needsUpdate = true;
    });
  },
};

let createPlanet = function (options) {
  // Create the planet's Surface
  let surfaceGeometry = planetProto.sphere(options.surface.size);
  let surfaceMaterial = planetProto.material(options.surface.material);
  let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

  // Create the planet's Atmosphere
  let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
  let atmosphereMaterialDefaults = {
    side: THREE.DoubleSide,
    transparent: true,
  };
  let atmosphereMaterialOptions = Object.assign(
    atmosphereMaterialDefaults,
    options.atmosphere.material
  );
  let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
  let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  // Create the planet's Atmospheric glow
  let atmosphericGlowGeometry = planetProto.sphere(
    options.surface.size + options.atmosphere.size + options.atmosphere.glow.size
  );
  let atmosphericGlowMaterial = planetProto.glowMaterial(
    options.atmosphere.glow.intensity,
    options.atmosphere.glow.fade,
    options.atmosphere.glow.color
  );
  let atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

  // Nest the planet's Surface and Atmosphere into a planet object
  let planet = new THREE.Object3D();
  surface.name = "surface";
  atmosphere.name = "atmosphere";
  atmosphericGlow.name = "atmosphericGlow";
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow);

  // Load the Surface's textures
  for (let textureProperty in options.surface.textures) {
    planetProto.texture(
      surfaceMaterial,
      textureProperty,
      options.surface.textures[textureProperty]
    );
  }

  // Load the Atmosphere's texture
  for (let textureProperty in options.atmosphere.textures) {
    planetProto.texture(
      atmosphereMaterial,
      textureProperty,
      options.atmosphere.textures[textureProperty]
    );
  }

  return planet;
};

let earth = createPlanet({
  surface: {
    size: 0.5,
    material: {
      bumpScale: 0.05,
      specular: new THREE.Color("grey"),
      shininess: 5,
    },
    textures: {
      map: "map/1_earth_8k.jpg",
    },
  },
  atmosphere: {
    size: 0.003,
    material: {
      opacity: 0,
    },
    // textures: {
    //   map: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg",
    //   alphaMap: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg",
    // },
    glow: {
      size: 0.02,
      intensity: 0.7,
      fade: 7,
      color: 0x93cfef,
    },
  },
});

// Galaxy
// let galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
// let galaxyMaterial = new THREE.MeshBasicMaterial({
//   side: THREE.BackSide,
// });
// let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Load Galaxy Textures
// textureLoader.crossOrigin = true;
// textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png", function (texture) {
//   galaxyMaterial.map = texture;
//   scene.add(galaxy);
// });

// Scene, Camera, Renderer Configuration
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(1, 0, 1);
orbitControls.enabled = !cameraAutoRotation;

scene.add(camera);
camera.add(light);
camera.add(light1);
// camera.add(light2);
scene.add(earth);

// Mesh Configurations
earth.receiveShadow = true;
earth.castShadow = true;
earth.getObjectByName("surface").geometry.center();
earth.getObjectByName("surface").rotation.y = 9.5;

// On window resize, adjust camera aspect ratio and renderer size
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
// controls.minPolarAngle = Math.PI * 0.5;
// controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1;
controls.maxDistance = 3;
controls.enablePan = false;

// Main render function
let controlTime = 0;
let render = function () {
  earth.getObjectByName("surface").rotation.y += (1 / 16) * controlTime;

  // earth.getObjectByName("atmosphere").rotation.y += (1 / 8) * 0.01;
  controls.position = 1;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update();
};
render();

controls.addEventListener("start", function () {
  popWait();
  $(".btn.complete").removeClass("off");
});

controls.addEventListener("change", function () {
  popWait();
  $(".img_wrap").removeClass("on");
});

// explore2.js 이동
let directiveAudio = new Audio("audio/explore2/directive1.mp3");
let sparkleAudio = new Audio("../common/sound/effect/sparkle.wav");

window.addEventListener("load", function () {
  seqGif("#seqGif1");
  this.setTimeout(function () {
    directiveAudio.play();
  }, 1500);
});

directiveAudio.addEventListener("ended", function () {
  $(".blank").addClass("hide");
  $(".img_wrap").addClass("on");
  $(".guide_ani").addClass("hide");
  popWait();

  scale();
  controlTime = 0.01;
});

let guide;
function scale() {
  guide = setTimeout(function () {
    $(".img_wrap").removeClass("on");
  }, 3000);
}

$(".btn.complete").click(function () {
  $(".blank").removeClass("hide");
  sparkleAudio.play();

  autoNextPage(2000, "explore3.html");
});
