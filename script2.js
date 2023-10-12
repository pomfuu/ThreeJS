import * as THREE from './three.js/build/three.module.js'
let scene, camera, renderer

let width = window.innerWidth
let height = window.innerHeight

let points = [
    new THREE.Vector3(3,0,3),
    new THREE.Vector3(-3,0,3),
    new THREE.Vector3(-3,0,-3),
    new THREE.Vector3(3,0,-3),
    new THREE.Vector3(3,0,3),

]

const initRenderer = () =>{
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(width,height)
    document.body.appendChild(renderer.domElement)
}

const initCamera = () =>{
    let aspect = width / height
    let fov = 45
    camera = new THREE.PerspectiveCamera(fov, aspect)
    camera.position.set(0,5,10)
    camera.lookAt(0,0,0)
}

const initScene = () =>{
    scene = new THREE.Scene()
}

const render = () =>{
    renderer.render(scene,camera)
}

const createPoints = () =>{
    // geometry, material
    let geometry = new THREE.BufferGeometry()
    geometry.setFromPoints(points)

    let material = new THREE.PointsMaterial({
        color: 0x0000ff
    })
    let point = new THREE.Points(geometry,material)
    scene.add(point)
}

const createLine = () =>{
    let geometry = new THREE.BufferGeometry()
    geometry.setFromPoints(points)

    let material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })
    let line = new THREE.Line(geometry,material)
    scene.add(line)
}

const createPlane = () =>{
    let geometry = new THREE.PlaneGeometry(6,6)
    let material = new THREE.MeshBasicMaterial({
        color:0x0000ff,
        side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(geometry,material)
    plane.rotation.x = Math.PI/2
    scene.add(plane)
}

const createCircle = () =>{
    let geometry  = new THREE.CircleGeometry(1,64) 
    let material = new THREE.MeshBasicMaterial({
        color:0xff0000,
        side: THREE.DoubleSide
    })
    let circle = new THREE.Mesh(geometry,material)
    circle.position.set(0,1,0)
    scene.add(circle)
}

window.onload = () =>{
    initCamera()
    initRenderer()
    initScene()
    createPoints()
    createLine()
    createPlane()
    createCircle()
    render()
}

window.onresize = () =>{
    width = window.innerWidth
    height = window.innerHeight
    renderer.setSize(width,height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
}