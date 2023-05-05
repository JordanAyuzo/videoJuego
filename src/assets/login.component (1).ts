import { Component } from '@angular/core';
//import Swal from "sweetalert2";
import { Router } from '@angular/router';
//importamos el servicio
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario";
import { CorreoService } from 'src/app/services/correo.service';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
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
    let M=[[1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,3,0,3,0,3,0,3],
    [3,0,3,0,3,0,3,0],
    [0,3,0,3,0,3,0,3]]
    const tableroDamasN = new THREE.Group();
    const tableroDamasB = new THREE.Group();
    
    //const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF)
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
  window.innerHeight, 0.1, 100);
  camera.position.z = 30;
  const renderer = new THREE.WebGLRenderer({ antialias:true});
  document.body.appendChild(renderer.domElement)
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const color = 0x404040
  const luz = new THREE.AmbientLight(color)
  const luzDireccional = new THREE.DirectionalLight(0xFFFFFF,0.5)
  luzDireccional.position.set(-10,10,10);
  luz.add(luzDireccional)
  scene.add(luz)
  
  const controls = new OrbitControls(camera,renderer.domElement)
  for(let y=0;y<8;y++){
    for(let x=0;x<8;x++){
      if(M[y][x]==1)
        tableroDamasB.add(createCil(3*x,0.5,3*y,0xffffff))
      if(M[y][x]==3)
      tableroDamasN.add(createCil(3*x,0.5,3*y,0x959899))
    }
  }
  scene.add(tableroDamasB)
  scene.add(tableroDamasN)
  
  for (var k = 0;k<24;k+=3){
    if (k % 2 == 0){
  for (var i=0;i<24;i+=3){
    if (i % 2 == 0){
  const color = 0xE81A24


  
  const geometry = new THREE.BoxGeometry(3, .1, 3);
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    cube.userData['draggable']=false
    cube.position.set(i,0,k)
    scene.add(cube)
    }
    else{
      const color = 0xffffff
  const geometry = new THREE.BoxGeometry(3, .1, 3);
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    cube.userData['draggable']=false

    cube.position.set(i,0,k)
    scene.add(cube)
    }
  }
  
  }else{  
    for (var i=0;i<24;i+=3){
      if (i % 2 == 1){
    const color = 0xE81A24
    const geometry = new THREE.BoxGeometry(3, .1, 3);
      const material = new THREE.MeshPhongMaterial({color});
      const cube = new THREE.Mesh(geometry, material);
      cube.userData['draggable']=false

      cube.position.set(i,0,k)
      scene.add(cube)
      }
      else{
        const color = 0xffffff
    const geometry = new THREE.BoxGeometry(3, .1, 3);
      const material = new THREE.MeshPhongMaterial({color});
      const cube = new THREE.Mesh(geometry, material);
      cube.userData['draggable']=false

          cube.position.set(i,0,k)
      scene.add(cube)
      }
  }
  }
  
  
  }
  
 
  
  function createCil(x:any,y:any,z:any,color:any){
  
    const geom = new THREE.ConeGeometry( 1, 1, 4);
    const mat = new THREE.MeshPhongMaterial({color})
    const dama = new THREE.Mesh(geom,mat);
    dama.position.set(x,y,z)
   // console.log(dama.position);
    
    dama.userData['draggable']=true
    if(color==0xffffff){
    dama.userData['name']='damaB'
    }else{
      dama.userData['name']='damaN'

    }
    return dama
  }
  
  
  function crearCilDif(x:any,y:any,z:any){
    const geometry = new THREE.ConeGeometry( 1, 1, 4);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const cil = new THREE.Mesh(geometry, material);
    cil.material.transparent=true
    cil.material.opacity=.5
    cil.position.set(x,y,z)
   // cil.userData['draggable']=true
    cil.userData['name']='triangulo'
    return cil
  }
  
  
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  function detectarClick(event:any){
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(pointer,camera)
    const intersects = raycaster.intersectObjects( scene.children );
    //console.log(intersects);
    
    for ( let i = 0; i < intersects.length; i ++ ) {
      if(intersects[i].object.userData['draggable']){
        console.log(intersects[i].object.position)
       /* if(intersects[i].object.position.z <21){
        //scene.add(crearCilDif(intersects[i].object.position.x+3,intersects[i].object.position.y,intersects[i].object.position.z+3))
       // scene.add(crearCilDif(intersects[i].object.position.x-3,intersects[i].object.position.y,intersects[i].object.position.z+3))
        }else{
          scene.add(crearCilDif(intersects[i].object.position.x+3,intersects[i].object.position.y,intersects[i].object.position.z-3))
          scene.add(crearCilDif(intersects[i].object.position.x-3,intersects[i].object.position.y,intersects[i].object.position.z-3))
        }*/
      }
      //intersects[ i ].object.material.color.set( 0xff0000 );
  
    }
  
    
    
  }
  window.addEventListener('click',detectarClick)
  

  function cargarModeloFbx()
{
const fbxLoader = new FBXLoader()
let scale={x:0.1,y:0.1,z:0.1} //Escudo 1
let pos={x:6,y:6,z:-3}

  fbxLoader.load('../../../assets/modelos/Erika Archer With Bow Arrow.fbx',
  ( obj:any ) =>
  {
    obj.position.set(pos.x,pos.y,pos.z)
    obj.scale.set(scale.x,scale.y,scale.z)
    obj.userData['draggable']=true
    obj.userData['name']='humanoide'
    scene.add( obj );
    
  },
  ( xhr:any ) =>
  {
    console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
  },
  ( error:any ) =>
  {
    console.error( 'An error happened', error );
  },
  );
}

//cargarModeloFbx();

  
  function animate()
  {
  requestAnimationFrame(animate)
  controls.update();
  const axesHelper = new THREE.AxesHelper( 100 );
  scene.add( axesHelper );
  renderer.render(scene, camera)
  }
  animate()
  
  renderer.render(scene, camera);
  
    }
 

}
