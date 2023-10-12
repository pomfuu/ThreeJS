import * as THREE from './three.js/build/three.module.js'
let scene, camera, renderer

let basicMaterial = new THREE.MeshBasicMaterial( {
    color: "#00FFFF"
} )

let normalMaterial = new THREE.MeshNormalMaterial()

const width = window.innerWidth
const height = window.innerHeight

const init = () => {
    camera = new THREE.PerspectiveCamera(45, width/height)
    renderer = new THREE.WebGLRenderer()
    camera.position.set(0,15,90)
    camera.lookAt(0,0,0)
    renderer.setSize(width,height)

    scene = new THREE.Scene()

    document.body.appendChild(renderer.domElement)
}

// box
const createBox = () => {
    const boxGeo = new THREE.BoxGeometry(10,10,10)
    const cube = new THREE.Mesh( boxGeo, basicMaterial )
    scene.add( cube )
}

// cone
const createCone = () => {
    // radius height radialsegments
    const coneGeo = new THREE.ConeGeometry(10,15,64)
    const cone = new THREE.Mesh( coneGeo, normalMaterial )
    cone.position.set(20,0,0)
    scene.add( cone )
}

// sphere
const createSphere = () => {
    const sphereGeo = new THREE.SphereGeometry(10,64,32)
    const sphere = new THREE.Mesh( sphereGeo, normalMaterial )
    sphere.position.set(-20,0,0)
    scene.add(sphere)
}

// cylinder
const createCylinder = () => {
    const cylinderGeo = new THREE.CylinderGeometry(5,5,5,64)
    const cylinder = new THREE.Mesh( cylinderGeo, basicMaterial )
    cylinder.position.set(0,-20,0)
    scene.add(cylinder)
}

// wireframe
const createWireframe = () => {
    const boxGeo = new THREE.BoxGeometry(20,20,20,5,5,5)
    const wireframeGeo = new THREE.WireframeGeometry(boxGeo)
    const line = new THREE.LineSegments(wireframeGeo)
    line.position.set(0,20,0)
    scene.add(line)
}

const render = () => {
    renderer.render(scene,camera)
}

window.onload = () => {
    init()
    createBox()
    createCone()
    createSphere()
    createCylinder()
    createWireframe()
    render()
}

window.onresize = () => {
    const width = window.innerWidth
    const height = width.innerHeight
    renderer.setSize(width,height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
}