import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { AxesHelper } from 'three';
import { GridHelper } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
      
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
      camera.position.z = -3;
      camera.far = 5;
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
      const materialParedH = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

      /***************************************GENERACION DE MAPA****************************************/
      /*pared  del incio*/
      const tamanioCuarto = 15
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
      /***************************************GENERACION DE JUGADOR****************************************/
      const dimensionesJugador= new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const materialJugador = new THREE.MeshBasicMaterial({color: 0xff0000});
      const jugador = new THREE.Mesh(dimensionesJugador, materialJugador);
      jugador.position.set(0.5,.25,0)
      scene.add(jugador)
      //jugador.name = "jugador";

      /*movimiento de la camara*/
      function onKeyDown(event:any) {
        switch (event.keyCode) {
          case 87: // Tecla "w"
            if(jugador.position.z <=tamanioCuarto+1.5)
            jugador.position.z += 0.1; // Avanzar hacia adelante
            break;
          case 83: // Tecla "s"
          if(jugador.position.z >= 0.25)
            jugador.position.z -= 0.1; // Avanzar hacia atrás
            break;
          case 65: // Tecla "a"
          if(jugador.position.x <= tamanioCuarto-.5)
            jugador.position.x += 0.1; // Mover a la izquierda
            break;
          case 68: // Tecla "d"
          if(jugador.position.x >= -tamanioCuarto+.5)
            jugador.position.x -= 0.1; // Mover a la derecha
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
