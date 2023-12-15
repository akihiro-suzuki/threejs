import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import * as dat from 'dat.gui';
//UIデバッグ
// q: how to install dat.GUI?
// a: npm install dat.gui
const gui = new dat.GUI();

//サイズ
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
);
camera.position.x = -2;
camera.position.y = 1;
camera.position.z = 4;
scene.add(camera);

//ライト
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//マテリアル
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.3;

//オブジェクト
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.useLegacyLights = true
document.body.appendChild(renderer.domElement);


// add axis helper
// red is x, green is y, blue is z
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// add ambient light
// q: ambient lightってどういう光？
// a: 全体を照らす光
// const ambientLightColor = { color: 0xffffff };
// gui.addColor(ambientLightColor, "color").onChange(() => {
//     ambientLight.color.set(ambientLightColor.color);
// });
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
// sscene.add(ambientLight);


// add hemisphere light
// q: hemisphere lightってどういう光？
// a: 空からの光
// q: ambient lightとの違いは？
// a: ambient lightは全体を照らす光だが、hemisphere lightは空からの光を表現する
// q: hemisphere lightでは影はつかない？
// a: つかない

// const hemisphereLight = new THREE.HemisphereLight(0x0ffff0, 0xffff00, 1);

// scene.add(hemisphereLight);
// scene.useLegacyLights = true

// rectAreaLightは、meshstandardmaterialかmeshphisicalmaterialを使わないと反映されない
const rectAreaLight = new THREE.RectAreaLight(0x4eff00, 1, 3, 4);
rectAreaLight.position.set(0, 1, 0);
rectAreaLight.lookAt(0, 0, 0);
scene.add(rectAreaLight);

const rh = new THREE.RectAreaLightHelper(rectAreaLight);

//コントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    cube.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    cube.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    controls.update();

    renderer.render(scene, camera);

    window.requestAnimationFrame(animate);
};

animate();
