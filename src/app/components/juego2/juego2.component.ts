import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { randFloat, randInt } from 'three/src/math/MathUtils';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-juego2',
  templateUrl: './juego2.component.html',
  styleUrls: ['./juego2.component.css']
})
export class Juego2Component {
  ngOnInit(){
      /*configuracion inicial*/
      const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB)

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 0.1, 20);
      camera.position.set(10, 5, -10); // coloca la cámara en el origen
      camera.far = 800;
      camera.updateProjectionMatrix();
      const renderer = new THREE.WebGLRenderer({ canvas,antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);

      const color = 0xffffff;
      const intensity = 10;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(15,15, 15);
      scene.add(light);


      const light2 = new THREE.AmbientLight(color, intensity);
      light2.position.set(15,15, 15);
      scene.add(light2);

      const textureLoader = new THREE.TextureLoader();
      const texture1 = textureLoader.load('assets/misTexturas/montania.jpg');
      /****************************************/
        /* prueba*/
        const loader = new GLTFLoader();

      loader.load( 'assets/mismodelos/casa.glb', function ( gltf ) {

        scene.add( gltf.scene );

      }, undefined, function ( error ) {

        console.error( error );

      } );

      /*mesa*/
      const materialtabla = new THREE.MeshBasicMaterial({ map:texture1 })
      const geometrytabla = new THREE.BoxGeometry(16, .5, 16)
      const tabla = new THREE.Mesh(geometrytabla, materialtabla)
      tabla.position.set(4,-.5,4)
      scene.add(tabla)

      /*obscuro*/
      const material = new THREE.MeshBasicMaterial({ color: 0xaf5d4a })
      const geometry = new THREE.BoxGeometry(1, .5, 1)
      const player1 = new THREE.Mesh(geometry, material)
      /*claro*/
      const material2 = new THREE.MeshBasicMaterial({ color: 0x804000 })
      const player2 = new THREE.Mesh(geometry, material2)
      var barra1 = new THREE.Group();
      var barra2= new THREE.Group();

      /*jugador*/
      const dimensionesdama = new THREE.CylinderGeometry( .5, .5, .2, 50);
          //const materialMontania = new THREE.MeshBasicMaterial({ map: texture1});
          const materialdama= new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
          var dama = new THREE.Mesh(dimensionesdama, materialdama);
          //dama.position.set(1,.35,1)

          const materialdamanegra= new THREE.MeshLambertMaterial({ color: 0x000000 })
          var damanegra = new THREE.Mesh(dimensionesdama, materialdamanegra);
          //damanegra.position.set(1,.35,1)
          //scene.add(dama)
          //piezas blancas creo
          for (let x = 1; x <= 3; x++) {
              for (let z = 1; z <= 8; z++) {
                const daman = dama.clone();
                if(x%2!=0){
                  if (z%2!=0) {
                      daman.position.set(x,.35,z)
                      //console.log(x,",",z);
                      scene.add(daman) 
                  }
            }else{
              if (z%2==0) {
                daman.position.set(x,.35,z)
                //console.log(x,",",z);
                scene.add(daman) 
            }
            }   
          }    
        }
        //piezas negras
        for (let xx = 8; xx >= 6; xx--) {
          for (let zz = 8; zz >= 1; zz--) {
            const daman = damanegra.clone();
            if(xx%2!=0){
              if (zz%2!=0) {
                  daman.position.set(xx,.35,zz)
                  console.log(xx,",",zz);
                  scene.add(daman)
              }
        }else{
          if (zz%2==0) {
            daman.position.set(xx,.35,zz)
            console.log(xx,",",zz);
            scene.add(daman)
        }
        }    
      }    
    } 



      for (let i = 1; i <= 4; i++) {
        const blanco1 = player1.clone(); // Clonar el objeto "arbol1"
        blanco1.position.set (i*2,0, 0); // Establecer la posición del nuevo árbol
        const negro1 = player2.clone(); // Clonar el objeto "arbol1"
        negro1.position.set ((i*2)-1, 0, 0); // Establecer la posición del nuevo árbol
        const blanco2 = player1.clone(); // Clonar el objeto "arbol1"
        blanco2.position.set ((i*2)-1, 0,1 ); // Establecer la posición del nuevo árbol
        const negro2 = player2.clone(); // Clonar el objeto "arbol1"
        negro2.position.set ((i*2), 0, 1); // Establecer la posición del nuevo árbol
        //acubos. push(blanco); // Agregar el nuevo árbol a la matriz
        //acubos. push(negro); // Agregar el nuevo árbol a la matriz
        barra1.add(blanco1)
        barra2.add(blanco2)
        barra1.add(negro1)
        barra2.add(negro2)
      }
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
      
      
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 1, 0)
      controls.update()
      // Crea una función de animación que actualiza la escena y los controles de la cámara
      function animate() {
        requestAnimationFrame(animate)
        
        camera.lookAt(new THREE.Vector3(5,0, 0));
        renderer.render(scene, camera)
      }
      animate()
  }

}
