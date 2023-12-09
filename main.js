import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

let scene, camera, renderer, pointLight;
const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    // 75度の視野角、アスペクト比、描画開始距離、描画終了距離
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 200;
    // たぶんデフォルトは原点を向いている

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // r155からbreaking changeがあったので、一旦legacyを使う
    renderer.useLegacyLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);


    // キューブの作成
    // segmentsを指定すると、球の分割数を指定できる
    const geometry = new THREE.SphereGeometry(100, 128, 64);
    // 地球テクスチャ
    let textures = new THREE.TextureLoader().load('textures/earth.jpg');
    const material = new THREE.MeshPhysicalMaterial({ map: textures });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    // ライトの作成
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    pointLight = new THREE.PointLight(0xffffff, 5);
    scene.add(pointLight);
    // pointLight.position.set(100, 100, 100)

    // 第2引数にはsphereのサイズを指定する
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
    scene.add(pointLightHelper);

    // マウス操作ができるようにする
    const _ = new OrbitControls(camera, renderer.domElement);

    // 座標軸
    var axes = new THREE.AxesHelper(200);
    scene.add(axes);

    animate();
}

const onWindowsResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
const animate = () => {
    // ユーザーが別のブラウザー タブに移動すると一時停止する
    // q: requestAnimationFrame()は何をしている？
    // a: 画面の更新タイミングに合わせて、関数を呼び出す
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    const x = 200 * Math.sin(Date.now() / 500);
    const y = 200 * Math.sin(Date.now() / 1000);
    const z = 200 * Math.cos(Date.now() / 500);
    pointLight.position.set(x, y, z);
}

window.addEventListener('load', init);
window.addEventListener('resize', onWindowsResize);
