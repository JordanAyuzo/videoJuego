import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { AxesHelper } from 'three';
import { GridHelper } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
@Component({

  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
    ngOnInit(){
      const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x979797)
      
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.z = -3;
      let cameraOffset = new THREE.Vector3(0, 2, -5);

      const renderer = new THREE.WebGLRenderer({ canvas});
      renderer.setSize(window.innerWidth, window.innerHeight);
      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(1, 2, 2);
      scene.add(light);
      const light2 =  new THREE.AmbientLight(color, intensity);
      scene.add(light2);
      const axesHelper = new AxesHelper(5);
      scene.add(axesHelper)
      const size = 200;
      const divisions = 200;
      const gridHelper = new GridHelper(size, divisions);
      scene.add(gridHelper);

      const anchoParedH = 1;
      const altoParedH = 3;
      const profundidadParedH = .2;
      const formaParedH = new THREE.BoxGeometry(anchoParedH, altoParedH, profundidadParedH);
      const materialParedH = new THREE.MeshPhongMaterial({ color: 0x3e4144 });
      const materialParedD = new THREE.MeshPhongMaterial({ color: 0x666666 });
      const materialParedS = new THREE.MeshPhongMaterial({ color: 0x666666 }); //0x8c8c8c

      /***************************************GENERACION DE MAPA****************************************/
      /*pared  del incio*/
      const tamanioCuarto = 10
      for (let x = 1; x <=tamanioCuarto; x++) {
        const paredIzquierdaInicio = new THREE.Mesh(formaParedH, materialParedH);
        paredIzquierdaInicio.position.set(.5+x,altoParedH/2,-0.1)
        scene.add(paredIzquierdaInicio);
        const paredDerechaInicio = new THREE.Mesh(formaParedH, materialParedH);
        paredDerechaInicio.position.set(.5-x,altoParedH/2,-0.1)
        scene.add(paredDerechaInicio);
      }
      /*paredes laterales*/
      for (let x = 0; x <tamanioCuarto+2; x++) {
        const paredIzquierdaLateral = new THREE.Mesh(formaParedH, materialParedH);
        paredIzquierdaLateral.position.set(tamanioCuarto+1.1,altoParedH/2,.5+x)
        paredIzquierdaLateral.rotation.y=Math.PI/2
        scene.add(paredIzquierdaLateral);
        const paredDerechaLateral = new THREE.Mesh(formaParedH, materialParedH);
        paredDerechaLateral.position.set(-.1-tamanioCuarto,altoParedH/2,.5+x)
        paredDerechaLateral.rotation.y=Math.PI/2
        scene.add(paredDerechaLateral);
      }
      for (let x = 0; x <=tamanioCuarto; x++) {
        const paredFinalI = new THREE.Mesh(formaParedH, materialParedH);
        paredFinalI.position.set(.5+x,altoParedH/2,2+tamanioCuarto+.1)
        scene.add(paredFinalI);
        const paredFinalD = new THREE.Mesh(formaParedH, materialParedH);
        paredFinalD.position.set(.5-x,altoParedH/2,2+tamanioCuarto+.1)
        scene.add(paredFinalD);
      }

      /*Pared dura*/
        const min = 1;
        const min2 = -tamanioCuarto;
        const max1 = tamanioCuarto+1;
        const max2 =  tamanioCuarto;
        const paredes:any = [];
      for (let x = 0; x <=100; x++) {
        const rotacion =Math.floor(Math.random() * (1 - 0 + 1));
        const paredSuave = new THREE.Mesh(formaParedH, materialParedS);
        const dirxs = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        const dirys = Math.floor(Math.random() * (max1 - min + 1)) + min;
        if(rotacion==1){
          paredSuave.rotation.y=Math.PI/2
        }
        paredSuave.position.set(dirxs,altoParedH/2,dirys)
        paredSuave.name="pared"
        paredes.push(paredSuave);
        scene.add(paredSuave);
        
        //const paredDura = new THREE.Mesh(formaParedH, materialParedD);
        //const dirxd = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
        //const dirzd = Math.floor(Math.random() * (max1 - min + 1)) + min;
        //paredDura.position.set(dirxd,altoParedH/2,dirzd)
        //if(rotacion==1){
        //  paredDura.rotation.y=Math.PI/2
        //}
        //scene.add(paredDura);
        
      }console.log(paredes);
      /***************************************GENERACION DE JUGADOR****************************************/
      
      function haycolision( jugador:any) {
        for (let i = 0; i < paredes.length; i++) {
          const distanciaX = Math.abs((paredes[i].position.x) - jugador.position.x);
          const distanciaZ = Math.abs(paredes[i].position.z - jugador.position.z );
          if(paredes[i].rotation.y== 0){
            if ((distanciaX <(anchoParedH/2)+0.2) && distanciaZ < (profundidadParedH/ 2 + 0.205)) {
              return true;
          }
          }else{
            if(distanciaX < ( (profundidadParedH/ 2) + 0.205) && distanciaZ < ((anchoParedH / 2) + 0.06)) {
              return true;
          }
          } 
        }
        return false;
      }
     
      function cargarModeloFbx()
{
const fbxLoader = new FBXLoader()
const textureLoader = new MTLLoader()
let scale={x:0.005,y:0.005,z:0.005} //Escudo 1
let pos={x:.5,y:0,z:.5}
textureLoader.load('assets/Female Walk.fbx',
(materials) =>
{
materials.preload()
//console.log(materials)
fbxLoader.load('assets/Female Walk.fbx',
( obj:any ) =>
{
obj.position.set(pos.x,pos.y,pos.z)
obj.scale.set(scale.x,scale.y,scale.z)

scene.add( obj );
},
( xhr:any ) =>
{
//console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
},
( error:any ) =>
{
console.error( 'An error happened', error );
},
);
},
(xhr) =>
{
//console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) =>
{
console.log('An error happened',error)
})

}
      cargarModeloFbx();


      const dirxp = Math.floor(Math.random() * (max2 - min2 + 4)) + min2+4;
        const diryp = Math.floor(Math.random() * (max1 - min + 4)) + min+4;

      const dimensionesJugador= new THREE.BoxGeometry(0.25, 0.25, 0.25);
      const materialJugador = new THREE.MeshBasicMaterial({color: 0xff0000});
      const jugador = new THREE.Mesh(dimensionesJugador, materialJugador);
      jugador.position.set(0.5,.25,.5)
      scene.add(jugador)
      //jugador.name = "jugador";
      /*movimiento de la camara*/
      let jugadorrespaldo:any
      let jugadorrespaldox:any
      function onKeyDown(event:any) {
        
        switch (event.keyCode) {
          case 87: // Tecla "w"
            if(jugador.position.z <=tamanioCuarto+1.5){
              
              if (!haycolision(jugador)){
                jugadorrespaldo = jugador.position.z 
                console.log((jugadorrespaldo));
                jugador.position.z += 0.1; // Avanzar hacia adelante
              }else{
                
                console.log((jugadorrespaldo));
                jugador.position.z = jugadorrespaldo;
              } 
              
            }
            
            break;
          case 83: // Tecla "s"
          if(jugador.position.z >= 0.25){
            if (!haycolision(jugador)){
              jugadorrespaldo = jugador.position.z 
              jugador.position.z -= 0.1; // Avanzar hacia atrás
            }else{
              jugador.position.z = jugadorrespaldo;
            } 
          }
            break;
          case 65: // Tecla "a"
          if(jugador.position.x <= tamanioCuarto+.75)
            {

               if (!haycolision(jugador)){
                jugadorrespaldox = jugador.position.x 
                jugador.position.x += 0.1; // Mover a la izquierda
               }else{
                jugador.position.x = jugadorrespaldox;
              } 
              
            }
            
            break;
          case 68: // Tecla "d"
          if(jugador.position.x >= -tamanioCuarto+.5){
            if (!haycolision(jugador)){
              jugadorrespaldox = jugador.position.x 
              jugador.position.x -= 0.1; // Mover a la derecha
            }else{
              jugador.position.x = jugadorrespaldox;
            } 
          }
            
            break;
        }
      }
      const controls = new OrbitControls(camera, canvas)
      renderer.render(scene, camera);
      function animate(){
        requestAnimationFrame(animate)
        window.addEventListener('keydown', onKeyDown, false);
        //camera.position.copy(jugador.position).add(cameraOffset);
        //camera.lookAt(jugador.position);
        controls.update();
        renderer.render(scene, camera)
        

      }
      animate()
    }

}
