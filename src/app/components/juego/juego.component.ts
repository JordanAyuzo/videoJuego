import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { randFloat, randInt } from 'three/src/math/MathUtils';
@Component({

  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

    ngOnInit(){
      /*configuracion inicial*/
      const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB)

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 0.1, 20);
      camera.position.set(0, 1, -.5); // coloca la cámara en el origen
      camera.lookAt(new THREE.Vector3(0, 2.3, 2.3));
      camera.far = 800;
      camera.updateProjectionMatrix();
      const renderer = new THREE.WebGLRenderer({ canvas,antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);

      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1,2, 4);
      scene.add(light);
      /****************************************/
       /*Para Cargar Texturas*/
      const textureLoader = new THREE.TextureLoader();
      const pastoTextura = textureLoader.load('assets/misTexturas/pasto.jpg');
      const carreteraTextura = textureLoader.load('assets/misTexturas/carretera.jpg');
      const hojasTextura = textureLoader.load('assets/misTexturas/hojas.jpg');
      const troncoRobleTextura = textureLoader.load('assets/misTexturas/tronco.jpg');
      const hojasAbetoTextura = textureLoader.load('assets/misTexturas/hojasAbeto.jpg');
      const troncoAbetoTextura = textureLoader.load('assets/misTexturas/troncoAbeto.jpg');
      const montaniaTextura = textureLoader.load('assets/misTexturas/montania.jpg');
      const volcanTextura = textureLoader.load('assets/misTexturas/fire.jpg');
      const smokeTextura = textureLoader.load('assets/misTexturas/smoke.png');
      /**************Escena1***************/
      /*Pasto Derecho*/
      const anchoPasto = 40;
      const altoPasto = .2;
      const profundidadPasto = 80;
      const dimensionesPasto = new THREE.BoxGeometry(anchoPasto,altoPasto,profundidadPasto );
      const materialPasto =new THREE.MeshBasicMaterial({ map: pastoTextura });
      const pastoDerecho = new THREE.Mesh(dimensionesPasto, materialPasto);
      pastoDerecho.position.set(-27.5, 0, 40);
      //scene.add(pastoDerecho)
      /*Pasto izquierdo*/
      const pastoIzquierdo = new THREE.Mesh(dimensionesPasto, materialPasto);
      pastoIzquierdo.position.set(27.5, 0, 40);
      //scene.add(pastoIzquierdo)
      /*Carretera*/
      const anchoCarretera = 15;
      const altoCarretera = .2;
      const profundidadCarretera = 80;
      const dimensionesCarretera = new THREE.BoxGeometry(anchoCarretera,altoCarretera,profundidadCarretera );
      const materialCarretera =new THREE.MeshBasicMaterial({ map: carreteraTextura });
      const carretera = new THREE.Mesh(dimensionesCarretera, materialCarretera);
      carretera.position.set(0, 0, 40);
      //scene.add(carretera)
      /*Unir escena y duplicarlo*/
      var chunk1 = new THREE.Group()
      chunk1.add(pastoDerecho)
      chunk1.add(carretera)
      chunk1.add(pastoIzquierdo)
      scene.add(chunk1)
      var chunk2 = chunk1.clone()
      chunk2.position.set(0, 0,80);
      scene.add(chunk2);
      /***********Arbol*****************/
          /* hojas*/
          var dimensionesHojas = new THREE.SphereGeometry(1.5, 6, 6);
          var materialHojas = new THREE.MeshBasicMaterial({ map: hojasTextura });
          var hojas = new THREE.Mesh(dimensionesHojas, materialHojas);
          hojas.position.set(0,3,0)
          /*tronco */
          const dimensionesTronco = new THREE.CylinderGeometry( .4, .4, 2, 20 );
          const materialTroncoRoble = new THREE.MeshBasicMaterial({ map: troncoRobleTextura });
          var tronco = new THREE.Mesh(dimensionesTronco, materialTroncoRoble);
          tronco.position.set(0,1,0)
          /*Creamos un arbol  completo*/
          var arbol1 = new THREE.Group()
          arbol1.add(hojas)
          arbol1.add(tronco)
          /*arbol2*/
          var materialHojasAbeto = new THREE.MeshBasicMaterial({ map: hojasAbetoTextura });
          const materialTroncoAbeto = new THREE.MeshBasicMaterial({ map: troncoAbetoTextura });
          var hojasAbeto = new THREE.Mesh(dimensionesHojas, materialHojasAbeto);
          hojasAbeto.position.set(0,3,0)
          var troncoAbeto = new THREE.Mesh(dimensionesTronco, materialTroncoAbeto);
          troncoAbeto.position.set(0,1,0)
          var arbol2 = new THREE.Group()
          arbol2.add(hojasAbeto)
          arbol2.add(troncoAbeto)

          
          const arboles: THREE.Object3D[] = [];

for (let i = 1; i <= 30; i++) {
  const nuevoArbol = arbol1.clone(); // Clonar el objeto "arbol1"
  nuevoArbol.position.set (randFloat(10,40), 0, randInt(5,80)); // Establecer la posición del nuevo árbol
  arboles.push(nuevoArbol); // Agregar el nuevo árbol a la matriz
  scene.add(nuevoArbol); // Agregar el nuevo árbol a la escena
}

for (let i = 1; i <= 30; i++) {
  const nuevoArbol = arbol2.clone(); // Clonar el objeto "arbol2"
  nuevoArbol.position.set (randFloat(10,40), 0, randInt(5,80)); // Establecer la posición del nuevo árbol
  arboles.push(nuevoArbol); // Agregar el nuevo árbol a la matriz
  scene.add(nuevoArbol); // Agregar el nuevo árbol a la escena
}
console.log(arboles);


          /********************************/
          /*montania*/
          const dimensionesMontania = new THREE.CylinderGeometry( .5, 15, 15, 10);
          const materialMontania = new THREE.MeshBasicMaterial({ map: montaniaTextura });
          var montania = new THREE.Mesh(dimensionesMontania, materialMontania);
          montania.position.set(-25,8,60)
          scene.add(montania)
          const dimensionesvolcan = new THREE.CylinderGeometry( .5, 4, 4, 10);
          const materialvolcan = new THREE.MeshBasicMaterial({ map: volcanTextura });
          var montania = new THREE.Mesh(dimensionesvolcan, materialvolcan);
          montania.position.set(-25,14,60)
          scene.add(montania)
          

          const dimensionesmoke = new THREE.CylinderGeometry( .3, .5, 4, 10);
          const materialsmoke = new THREE.PointsMaterial({
            color: 0x999999,
            size: 10,
            map: smokeTextura,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          
          var smoke = new THREE.Mesh(dimensionesmoke, materialsmoke);
          smoke.position.set(-25,16.4,58)
          smoke.rotateX(5)
          scene.add(smoke)
          /*player*/
          const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
          // Crea un cubo de objeto llamado player1
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const player1 = new THREE.Mesh(geometry, material)
        scene.add(player1)
        
        function detectarColisiones() {
          
        }
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(0, 1, 0)
        controls.update()
      
        // Agrega un listener para el evento de teclado para mover el objeto player1
        const moveForward = () => {
          const speed = 0.1
          const velocity = new THREE.Vector3()
          player1.getWorldDirection(velocity)
          player1.position.addScaledVector(velocity, speed)
        }
      
        const moveBackward = () => {
          const speed = -0.1
          const velocity = new THREE.Vector3()
          player1.getWorldDirection(velocity)
          player1.position.addScaledVector(velocity, speed)
        }
      
        const moveLeft = () => {
          const speed = -0.1
          const velocity = new THREE.Vector3()
          player1.getWorldDirection(velocity)
          velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
          player1.position.addScaledVector(velocity, speed)
        }
      
        const moveRight = () => {
          const speed = 0.1
          const velocity = new THREE.Vector3()
          player1.getWorldDirection(velocity)
          velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
          player1.position.addScaledVector(velocity, speed)
        }
      
        document.addEventListener('keydown', (event) => {
          switch (event.code) {
            case 'KeyW':
              moveForward()
              break
            case 'KeyS':
              moveBackward()
              break
            case 'KeyA':
              moveLeft()
              break
            case 'KeyD':
              moveRight()
              break
          }
        })
      
        // Crea una función de animación que actualiza la escena y los controles de la cámara
        function animate() {
          requestAnimationFrame(animate)
          controls.update()
          detectarColisiones();
          renderer.render(scene, camera)
        }
        animate()
    }
  
}
