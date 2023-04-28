import { Component,OnInit } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

    ngOnInit(){
      const canvas = <HTMLCanvasElement>document.getElementById('miCanvas');
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB)

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth /
      window.innerHeight, 0.1, 20);
      camera.position.z = 7;

      const renderer = new THREE.WebGLRenderer({ canvas,antialias: true});
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);

      const color = 0xffffff;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1,2, 4);
      scene.add(light);


      //montania
      var yy=3.8;
      const radius = 2;
      const height = 3;
      const radialSegments = 8;
      const heightSegments = 2;
      const openEnded = false;
      const geometry4 = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded);
      const geometry5 = new THREE.ConeGeometry(radius, height, radialSegments, heightSegments, openEnded);
      const material4 = new THREE.MeshPhongMaterial({ color: 0x008000 });
      const cone = new THREE.Mesh(geometry4, material4);
      const cone2 = new THREE.Mesh(geometry4, material4);
      const cone3 = new THREE.Mesh(geometry4, material4);
      const cone4 = new THREE.Mesh(geometry4, material4);
      const cone5 = new THREE.Mesh(geometry4, material4);
      const cone6 = new THREE.Mesh(geometry4, material4);
      const cone7 = new THREE.Mesh(geometry4, material4);
      const cone8 = new THREE.Mesh(geometry4, material4);
      cone.position.set(-10,yy,-8);
      cone2.position.set(-6,yy,-8);
      cone3.position.set(-8,yy,-8);
      cone4.position.set(3,yy,-8);
      cone5.position.set(5,yy,-8);
      cone6.position.set(7,yy,-8);
      cone7.position.set(9,yy,-8);
      cone8.position.set(-3.8,yy,-8);
      //
      //calle
      const anchoCubo = 3;
      const altoCubo = .1;
      const profundidadCubo = 30;
      const geometry = new THREE.BoxGeometry(anchoCubo, altoCubo, profundidadCubo);
      const material = new THREE.MeshPhongMaterial({ color:  0x808080});
      const cube = new THREE.Mesh(geometry, material);
      cube.rotation.x = 119.7;
      cube.rotation.y = 110;

      const geometry2 = new THREE.BoxGeometry(8.5, altoCubo,70 );
      const material1 = new THREE.MeshPhongMaterial({ color:  0x6b8e23});
      const gard = new THREE.Mesh(geometry2, material1);
      gard.rotation.x = 119.7;
      gard.rotation.y = 110;
      gard.position.x=6.1;
      
      const geometryb = new THREE.BoxGeometry(8.5, altoCubo,70 );
      const gard2 = new THREE.Mesh(geometryb, material1);
      gard2.rotation.x = 119.7;
      gard2.rotation.y = 110;
      gard2.position.x=-6.1;
      
      const materialc = new THREE.MeshPhongMaterial({ color:  0x333333});
      const geometryc = new THREE.BoxGeometry(.34,.3,70 );
      const banca = new THREE.Mesh(geometryc, materialc);
      banca.rotation.x = 119.7;
      banca.rotation.y = 110;
      banca.position.x=-1.68;
      
      const banca2 = new THREE.Mesh(geometryc, materialc);
      banca2.rotation.x = 119.7;
      banca2.rotation.y = 110;
      banca2.position.x=1.68;
      
      const materiald = new THREE.MeshPhongMaterial({ color:  0xF2D41F});
      const geometryd = new THREE.BoxGeometry(.34,.1,70 );
      const line = new THREE.Mesh(geometryd, materiald);
      line.rotation.x = 119.7;
      line.rotation.y = 110;
      line.position.x=0;
      

      /*Arbol*/
      //esfera hojas
      var esferaGeometry = new THREE.SphereGeometry(.5, 8, 8);
      var esferaMaterial = new THREE.MeshLambertMaterial({
      color: 0x228B22,
      wireframe: false
      });
      //cilindro tronco
      const geometry3 = new THREE.CylinderGeometry( .1, .1, 1, 20 );
      const material3 = new THREE.MeshLambertMaterial( {color: 0x8B4513 } );
      //creacion de los elementos del arbol


      var hojas = new THREE.Mesh( geometry3, material3 );
      var tronco = new THREE.Mesh(esferaGeometry, esferaMaterial);
      var hojas2 = new THREE.Mesh( geometry3, material3 );
      var tronco2 = new THREE.Mesh(esferaGeometry, esferaMaterial);
      var hojas3 = new THREE.Mesh( geometry3, material3 );
      var tronco3 = new THREE.Mesh(esferaGeometry, esferaMaterial);
      tronco.position.set(0, 1.2, 0);
      hojas.position.set(0, .5, 0);
      tronco2.position.set(0, 1.2, 0);
      hojas2.position.set(0, .5, 0);
      //crea conjunto arbol
      var arbol1 = new THREE.Group(); // Crea un grupo para unir las diferentes partes del árbol
      arbol1.add(tronco);
      arbol1.add(hojas);
      var arbol2 = new THREE.Group(); // Crea un grupo para unir las diferentes partes del árbol
      arbol2.add(tronco2);
      arbol2.add(hojas2);
      /*-----------------termina arbol--------------------*/
      arbol1.position.set(-3,-.5,1)
      arbol2.position.set(2.9,.3,-1.5)





      scene.add(cone2)
      scene.add(cone3)
      scene.add(cone4)
      scene.add(cone5)
      scene.add(cone6)
      scene.add(cone7)
      scene.add(cone8)
      scene.add(cone);
      scene.add(gard)
      scene.add(gard2)
      scene.add(banca)
      scene.add(banca2)
      scene.add(line)
      scene.add( arbol1); 
      scene.add( arbol2); 
      scene.add(cube);
      renderer.render(scene, camera);
      
    }

}
