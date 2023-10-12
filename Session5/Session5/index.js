import * as THREE from "../../three.js/build/three.module.js";

let cam, renderer, scene;
let width = window.innerWidth;
let height = window.innerHeight;

const initCam = () => {
    let aspect = width / height;
    let fov = 45;
    cam = new THREE.PerspectiveCamera(fov, aspect);
    cam.position.set(100, 100,100);
    cam.lookAt(0, 0, 0);
};

const initRenderer = () => {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement);
};

const initScene = () => {
    scene = new THREE.Scene();
};

const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, cam);
};

const createaAmbientLight = () => {
    // warna, intensity
    let light = new THREE.AmbientLight(0xFFFFFF, 0.7)
    scene.add(light)
}

const createSpotLight = () => {
    // warna, intensity, distance, angle(dalam radian), penumbra, decay(makin jauh makin gelap)
    let light = new THREE.SpotLight(0xFFFFFF,4,100, Math.PI/12,1,1)
    light.position.set(20,70,0)
    light.map = new THREE.TextureLoader().load('./assets/floor-texture.jpg')
    light.castShadow = true

    let lightHelper = new THREE.SpotLightHelper(light)
    scene.add(light)
    scene.add(lightHelper)
}

const createPointLight = () => {
    //warna, intensity 1, distance 10, decay 2
    let light = new THREE.PointLight(0xFFFFFF,1,90,1)
    // point light helper
    let lightHelper = new THREE.PointLightHelper(light)
    light.position.set(30,50,0)
    scene.add(light)
    scene.add(lightHelper)
}

const createCube = () =>{
    let geometry =  new THREE.BoxGeometry(10,10,10);
    let loader = new THREE.TextureLoader()
    let texture = loader.load('./assets/wooden-texture.jpg')

    let mat = new THREE.MeshLambertMaterial({
        // color: 0x382FD3,
        map: texture
    })

    let mesh = new THREE.Mesh(geometry, mat)
    mesh.castShadow = true
    mesh.position.y = 30
    scene.add(mesh)
}

const createPlane = () =>{
    let geometry = new THREE.PlaneGeometry(50,50)
    let loader = new THREE.TextureLoader()
    let texture = loader.load('./assets/floor-texture.jpg')

    let mat = new THREE.MeshPhongMaterial({
        // color:0xEFEFF9,
        map: texture
    })
    
    let mesh = new THREE.Mesh(geometry, mat)
    mesh.receiveShadow = true
    mesh.rotateX(-Math.PI/2)
    scene.add(mesh)
}

window.onload = () => {
    initCam();
    initRenderer();
    initScene();

    //lighting
    // createaAmbientLight()
    // createPointLight()
    createSpotLight()

    createCube();
    createPlane()
    render();
};

window.onresize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;

    cam.updateProjectionMatrix();
};
