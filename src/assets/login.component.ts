import { Component } from '@angular/core';
//import Swal from "sweetalert2";
import { Router } from '@angular/router';
//importamos el servicio
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario";
import { CorreoService } from 'src/app/services/correo.service';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as THREE from 'three';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //creamos la varible
 // usuarios : any
  //usuario = new Usuario();
  constructor(private correoService: CorreoService,private usuarioService: UsuarioService, private router: Router) {

  }
 
ngOnInit(){
  const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xF0FFFF)
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
window.innerHeight, 0.1, 1000);
camera.position.set(-35,70,100);
camera.lookAt(0,0,0)
const renderer = new THREE.WebGLRenderer({ canvas,antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);
const light2 = new THREE.DirectionalLight(color, intensity);
light2.position.set(-5, 4, 1);
scene.add(light2);
scene.add(crearCubo(0,4,0))
scene.add(crearEsf(0,5,15))
scene.add(crearCil(-5,15,5))

const controls = new OrbitControls(camera, canvas)
crearPlano();
renderer.render(scene, camera);
function crearPlano(){
  const geometry = new THREE.BoxGeometry(100,2,100);
const material = new THREE.MeshPhongMaterial({ color: 0xf9c834 });
const plane = new THREE.Mesh(geometry, material);
//plane.position.set(0,0,0)
scene.add(plane)
}
function crearCubo(x:any,y:any,z:any){

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(x,y,z)
cube.scale.set(5,5,5)
cube.castShadow=true;
cube.receiveShadow=true
cube.userData['draggable']=true
cube.userData['name']='cubo'
return cube
}

function crearEsf(x:any,y:any,z:any){
  const radio = 4;
  const altura = 6
  const geometry = new THREE.SphereGeometry(radio,radio,altura,32);
  const material = new THREE.MeshPhongMaterial({ color: 0x3daacc });
  const esf = new THREE.Mesh(geometry, material);
  esf.position.set(x,y,z)
  esf.userData['draggable']=true
 esf.userData['name']='esfera'
  return esf
}

function crearCil(x:any,y:any,z:any){
  const geometry = new THREE.CylinderGeometry(2,2,5,32);
  const material = new THREE.MeshPhongMaterial({ color: 0x65aacb });
  const cil = new THREE.Mesh(geometry, material);
  cil.position.set(x,y,z)
  cil.userData['draggable']=true
  cil.userData['name']='cilindro'
  return cil
}

function crearCilDif(x:any,y:any,z:any){
  const geometry = new THREE.CylinderGeometry(2,2,5,32);
  const material = new THREE.MeshPhongMaterial({ color: 0x65aacb });
  const cil = new THREE.Mesh(geometry, material);
  cil.material.transparent=true
  cil.material.opacity=.5
  cil.position.set(x,y,z)
 // cil.userData['draggable']=true
  cil.userData['name']='cilindro'
  return cil
}


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function detectarClick(event:any){
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(pointer,camera)
  const intersects = raycaster.intersectObjects( scene.children );
  
	for ( let i = 0; i < intersects.length; i ++ ) {
    if(intersects[i].object.userData['draggable']){
      console.log(intersects[i].object.position)
      scene.add(crearCilDif(intersects[i].object.position.x,intersects[i].object.position.y,intersects[i].object.position.z+15))
    }
		//intersects[ i ].object.material.color.set( 0xff0000 );

	}

  console.log(pointer);
  
}
window.addEventListener('click',detectarClick)

function animate()
{

  



requestAnimationFrame(animate)
controls.update();
renderer.render(scene, camera)
}
animate()
const plano = new THREE.GridHelper(100,10);
scene.add(plano)
}
}
