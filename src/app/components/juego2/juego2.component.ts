import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-juego2',
  templateUrl: './juego2.component.html',
  styleUrls: ['./juego2.component.css']
})
export class Juego2Component {
  ngOnInit(){
    let M =[[1,0,1,0,1,0,1,0],
            [0,0,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0],
            [0,1,0,1,0,1,0,1],] 
      /*********************CONFIGURACION INICIAL****************************/
      /*identificacion del elemento canvas*/
      const canvas = <HTMLCanvasElement>document.getElementById('miCanvas2');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB)
      /*posicion y configuracion de la camara incial*/
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 0.1, 200);
      camera.position.set(10, 5, -10); // coloca la cámara en el origen
      const renderer = new THREE.WebGLRenderer({ canvas,antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
      /*checar porque sin luz sigue funcionando*/
      const textureLoader = new THREE.TextureLoader();
      const texture1 = textureLoader.load('assets/misTexturas/montania.jpg');
      /**************************MESA*********************/
      function crearmesa(){
        const materialtabla = new THREE.MeshBasicMaterial({ color:0xa554a55 })
        const geometrytabla = new THREE.BoxGeometry(16, .5, 16)
        const tabla = new THREE.Mesh(geometrytabla, materialtabla)
        tabla.position.set(4,-.5,4)
        scene.add(tabla)
      }
      /**************************TABLERO*********************/
      function crearTablero(){
        /*creacion de bloques del tablero*/
        /*cuadro obscuro*/
        const material = new THREE.MeshBasicMaterial({ color: 0xaf5d4a })
        const geometry = new THREE.BoxGeometry(1, .5, 1)
        const cobscuro = new THREE.Mesh(geometry, material)
        /*cuadro claro*/
        const material2 = new THREE.MeshBasicMaterial({ color: 0x804000 })
        const cclaro = new THREE.Mesh(geometry, material2)
        var barra1 = new THREE.Group();
        var barra2= new THREE.Group();
        /*Filas del tablero */
        for (let i = 1; i <= 4; i++) {
          const blanco1 = cobscuro.clone();
          blanco1.position.set (i*2,0, 0); 
          const negro1 = cclaro.clone(); 
          negro1.position.set ((i*2)-1, 0, 0); 
          const blanco2 = cobscuro.clone(); 
          blanco2.position.set ((i*2)-1, 0,1 );
          const negro2 = cclaro.clone(); 
          negro2.position.set ((i*2), 0, 1); 
          barra1.add(blanco1)
          barra2.add(blanco2)
          barra1.add(negro1)
          barra2.add(negro2)
        }
        /*generacion del tablerp */
        for (let i = 1; i <= 8; i++) {
          if(i%2 !=0){
            const bar1 =barra1.clone();
            const bar2 =barra2.clone();
            bar1.position.set(0,0,i)
            bar2.position.set(0,0,i)
            scene.add(bar1)
            scene.add(bar2)
          }
      }



      }
      crearmesa()
      crearTablero()
    /**************************JUGADORES*********************/
      const dimensionesdama = new THREE.CylinderGeometry( .5, .5, .2, 50);/*Dimensiones de las damas */
      const materialdama= new THREE.MeshBasicMaterial({ color: 0xFFFFFF })/*Color Blanco*/
      const materialdamanegra= new THREE.MeshLambertMaterial({ color: 0x000000 }) /*Color Negro*/
      var damablanca = new THREE.Mesh(dimensionesdama, materialdama);
      var damanegra = new THREE.Mesh(dimensionesdama, materialdamanegra);
      //Generacion de Piezas blancas
      for (let x = 1; x <= 3; x++) {
        for (let z = 1; z <= 8; z++) {
          const daman = damablanca.clone();
          if(x%2!=0){
            if (z%2!=0) {
                daman.position.set(x,.35,z);
                daman.userData['draggable']=true;
                daman.userData['colorBlanco']=true;
                scene.add(daman);
            }
          }else{
            if (z%2==0) {
              daman.position.set(x,.35,z);
              daman.userData['draggable']=true;
              daman.userData['colorBlanco']=true;
              scene.add(daman);
            }
          }   
        }    
      }
        //Generacion de Piezas negras
      for (let xx = 8; xx >= 6; xx--) {
        for (let zz = 8; zz >= 1; zz--) {
          const daman = damanegra.clone();
          if(xx%2!=0){
            if (zz%2!=0) {
              daman.position.set(xx,.35,zz)
              daman.userData['draggable']=true;
              daman.userData['colorBlanco']=false;
              scene.add(daman)
            }
          }else{
            if (zz%2==0) {
              daman.position.set(xx,.35,zz)
              daman.userData['draggable']=true;
              daman.userData['colorBlanco']=false;
              scene.add(daman)
            }
          }    
        }    
      } 
      /**********************MOVIMIENTO DE JUGADORES*********************/
      /*Material para las damas guias */
      const materialdamatBlanco= new THREE.MeshBasicMaterial({ 
        color: 0xFFFFFF,
        transparent: true, // habilitar transparencia
        opacity: 0.5 // establecer la opacidad al 50%  
      })
      const materialdamatNegro= new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        transparent: true, // habilitar transparencia
        opacity: 0.5 // establecer la opacidad al 50%  
      })
      /*Generacion de damas guias */
      function creaDamaAyuda(x:any,y:any,color:any,opcion:any){
          if (color==0){
            var damat = new THREE.Mesh(dimensionesdama, materialdamatBlanco);
            damat.position.set(x,.35,y)
            damat.userData['visible']=true
            damat.name= "opcion" + opcion
            scene.add(damat)
          }else{
            var damat = new THREE.Mesh(dimensionesdama, materialdamatNegro);
            damat.position.set(x,.35,y)
            damat.userData['visible']=true
            scene.add(damat)
          }
          
      }
      /*Destruccion de damas guias */
      function eliminaDamaAyuda(){

        for (var i = 0; i < scene.children.length ; i++) {
          var object = scene.children[i];
          if (object.userData['visible'] ==true || object.userData['visible'] ==false) {
            if (object.parent) object.parent.remove(object); 
          }
        }
      }
      /*Deteccion de objetos */
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      var objetoAnterior:any;
      var come:any;
      var posx1:any;
      var posy1:any;
      var posx2:any;
      var posy2:any;
      function detectarClick(event:any){
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera(pointer,camera)
        const intersects = raycaster.intersectObjects( scene.children );
        for ( let i = 0; i < intersects.length; i ++ ) {
          if(intersects[i].object.userData['draggable'] && intersects[i].object.userData['colorBlanco']){
            objetoAnterior=intersects[i].object;          
            if(intersects[i].object.position.x>=8 || intersects[i].object.position.z>=8 || intersects[i].object.position.z<=1  ){
              if (intersects[i].object.position.z<=1){
                if(M[intersects[i].object.position.x][intersects[i].object.position.z ]==0){
                  creaDamaAyuda(intersects[i].object.position.x +1,intersects[i].object.position.z +1,0,1)
                }else if(M[intersects[i].object.position.x + 1][intersects[i].object.position.z  + 1]==0){
                  creaDamaAyuda(intersects[i].object.position.x +2,intersects[i].object.position.z +2,0,1)
                  posx1=intersects[i].object.position.x +1
                  posy1=intersects[i].object.position.z +1
                  come =1
                }
              }else if (intersects[i].object.position.z>=8){
                if(M[intersects[i].object.position.x][intersects[i].object.position.z -2 ]==0){
                  creaDamaAyuda(intersects[i].object.position.x +1,intersects[i].object.position.z-1,0,1)
                }else if(M[intersects[i].object.position.x +1][intersects[i].object.position.z  - 3]==0){
                  creaDamaAyuda(intersects[i].object.position.x +2,intersects[i].object.position.z-2,0,1)
                  posx1=intersects[i].object.position.x +1
                  posy1=intersects[i].object.position.z -1
                  
                  come =1
                }
              }
            }else{
              if(M[intersects[i].object.position.x][intersects[i].object.position.z ]==0){
                creaDamaAyuda(intersects[i].object.position.x +1,intersects[i].object.position.z +1,0,2)
              }else if(M[intersects[i].object.position.x + 1][intersects[i].object.position.z  + 1]==0){
                creaDamaAyuda(intersects[i].object.position.x +2,intersects[i].object.position.z +2,0,2)
                posx2=intersects[i].object.position.x +1
                posy2=intersects[i].object.position.z +1
                come =1
              }
              if(M[intersects[i].object.position.x][intersects[i].object.position.z - 2 ]==0){
                creaDamaAyuda(intersects[i].object.position.x +1,intersects[i].object.position.z -1,0,1)
              }else if(M[intersects[i].object.position.x +1][intersects[i].object.position.z  - 3]==0){
                creaDamaAyuda(intersects[i].object.position.x +2,intersects[i].object.position.z-2,0,1)
                posx1=intersects[i].object.position.x +1
                posy1=intersects[i].object.position.z -1
                come =1
              }
            }
          }else if(intersects[i].object.userData['draggable'] && !intersects[i].object.userData['colorBlanco']){
            //negras
            objetoAnterior=intersects[i].object;          
            if(intersects[i].object.position.z>=8  || intersects[i].object.position.z<=1  ){
              if (intersects[i].object.position.z<=1){
                if(M[intersects[i].object.position.x-2][intersects[i].object.position.z ]==0){
                  creaDamaAyuda(intersects[i].object.position.x -1,intersects[i].object.position.z +1,1,1)
                }else if(M[intersects[i].object.position.x -3][intersects[i].object.position.z+1]==0){
                  creaDamaAyuda(intersects[i].object.position.x -2,intersects[i].object.position.z +2,0,1)
                  posx1=intersects[i].object.position.x -1
                  posy1=intersects[i].object.position.z +1
                  come =1
                }
              }else if (intersects[i].object.position.z>=8){
                if(M[intersects[i].object.position.x -2][intersects[i].object.position.z -2 ]==0){
                  creaDamaAyuda(intersects[i].object.position.x -1,intersects[i].object.position.z -1,1,1)
                }else if(M[intersects[i].object.position.x -3][intersects[i].object.position.z-3]==0){
                  creaDamaAyuda(intersects[i].object.position.x -2,intersects[i].object.position.z -2,0,1)
                  posx1=intersects[i].object.position.x -1
                  posy1=intersects[i].object.position.z -1
                  come =1
                }
              }
            }else{
              if(M[intersects[i].object.position.x -2][intersects[i].object.position.z -2 ]==0){
                creaDamaAyuda(intersects[i].object.position.x -1,intersects[i].object.position.z -1,1,1)
              }else if(M[intersects[i].object.position.x -3][intersects[i].object.position.z-3]==0){
                creaDamaAyuda(intersects[i].object.position.x -2,intersects[i].object.position.z -2,0,1)
                posx1=intersects[i].object.position.x -1
                posy1=intersects[i].object.position.z -1
                come =1
              }
              if(M[intersects[i].object.position.x -2][intersects[i].object.position.z]==0){
                creaDamaAyuda(intersects[i].object.position.x -1,intersects[i].object.position.z +1,1,2)
              }else if(M[intersects[i].object.position.x -3][intersects[i].object.position.z+1]==0){
                creaDamaAyuda(intersects[i].object.position.x -2,intersects[i].object.position.z +2,0,1)
                posx2=intersects[i].object.position.x -1
                posy2=intersects[i].object.position.z +1
                come =1
              }
            }
          }else if(intersects[i].object.userData['visible']){ 
            if (come== 1) {
              if(intersects[i].object.name=="opcion1"){
                console.log("turno de la opcionx")
                for (var j = 0; j < scene.children.length; j++) {
                  var object = scene.children[j];
                  if (object.userData && object.userData['draggable'] == true && object.position.x == posx1 && object.position.z == posy1) {
                    object.position.set(0,0,0)
                    M[posx1-1][posy1-1]=0
                    break; // Puedes usar break para salir del ciclo una vez que se encuentra el objeto
                }
              }
              }else{
                console.log("turno de la opcion2")
                for (var j = 0; j < scene.children.length; j++) {
                  var object = scene.children[j];
                  if (object.userData && object.userData['draggable'] == true && object.position.x == posx2 && object.position.z == posy2) {
                    object.position.set(0,0,0)
                    M[posx2-1][posy2-1]=0
                    break; 
                }
              }
              }
            }
            M[objetoAnterior.position.x -1][objetoAnterior.position.z -1]=0
            M[intersects[i].object.position.x -1][intersects[i].object.position.z -1]=1
            objetoAnterior.position.set(intersects[i].object.position.x,0.35,intersects[i].object.position.z)
            eliminaDamaAyuda();
            eliminaDamaAyuda();
            come =0
          }      
        }
      }window.addEventListener('click',detectarClick)
      /**********************MOVIMIENTO DE CAMARA*********************/
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 1, 0)
      controls.update()
      /**********************ACTUALIZACION DE ESCENA*********************/
      function animate() {
        requestAnimationFrame(animate)
        camera.lookAt(new THREE.Vector3(5,0, 0));
        renderer.render(scene, camera)
      }
      animate()
  }
}
