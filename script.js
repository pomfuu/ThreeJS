import * as THREE from './three.js/build/three.module.js'
let renderer, scene, camera

let init = () =>{
    // init objek yang diperlukan
    scene = new THREE.Scene()
    // inner width itu lebar sebesar window kita
    // outer width itu lebar keseluruhan 
    let width = window.innerWidth
    let height = window.innerHeight
    // parameter camera
    // fov = field of view (seberapa lebar kamera bisa ngeliat)
    // aspect
    // near
    // far
    camera = new THREE.PerspectiveCamera(60,width/height)
    camera.position.set(2,1,5)
    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor('#F0DBB1')
    renderer.setSize(width,height)
    // dom
    // masukin element kedalam body
    // domElement itu canvas kita
    document.body.appendChild(renderer.domElement)
}

let render = () =>{
    // render objek yang diperlukan
    renderer.render(scene, camera)
}

let createBox = () =>{
    let box = new THREE.BoxGeometry(1,1,1)
    // let materials = new THREE.MeshBasicMaterial({color:'#1E1E1E'})
    let materials = new THREE.MeshLambertMaterial({color:'#FF0000'})
    let mesh= new THREE.Mesh(box, materials)
    scene.add(mesh)
}

let addlight = () =>{
    let light = new THREE.PointLight('#FFFFFF')
    light.position.set(2,4,5)
    scene.add(light)
}

window.onload = () =>{
    init();
    createBox();
    addlight();
    render();
}

window.onresize = () =>{
    let w = window.innerWidth
    let h = window.innerHeight
    renderer.setSize(w,h)

    camera.aspect = w/h
    camera.updateProjectionMatrix()
}