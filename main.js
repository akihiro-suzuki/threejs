import * as THREE from 'three';

const scene = new THREE.Scene();
// 75度の視野角、アスペクト比、描画開始距離、描画終了距離
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// キューブの作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    // ユーザーが別のブラウザー タブに移動すると一時停止する
    // q: requestAnimationFrame()は何をしている？
    // a: 画面の更新タイミングに合わせて、関数を呼び出す
    requestAnimationFrame(animate);

    // キューブを回転させる
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();