import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback, useEffect} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import img from '@/utils/img'
import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default () => {
  const {
    serviceParamsGet,
    setServiceParamsGet,
    serviceParamsPost,
    setServiceParamsPost,
    serviceParamsPut,
    setServiceParamsPut,
    serviceParamsDelete,
    setServiceParamsDelete,
    componentParamsPrivate,
    setComponentParamsPrivate
  } = useModel('Template.model');

  const threeRef = useRef<HTMLDivElement>(null);

  const loadHdr = useCallback(async () => {
    return new Promise<any>((resolve, reject) =>{
      new RGBELoader().load('./hdr/company.hdr', (texture) => {
        resolve(texture)
      })
    })
  },[]);

  const loadGlb = useCallback(async () => {
    return new Promise<any>((resolve, reject) => {
      new GLTFLoader().load('./model/company.glb',(gltf)=>{
        resolve(gltf)
      })
    })
  },[]);

  const init = useCallback(async (renderer) => {
    if(threeRef.current){
      const scene = new THREE.Scene();

      const texture = await loadHdr();
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      scene.background = envMap;
      texture.dispose();
      pmremGenerator.dispose();

      const gltf = await loadGlb();
      scene.add(gltf.scene);

      const camera = new THREE.PerspectiveCamera(
        75,
        threeRef.current.clientWidth / threeRef.current.clientHeight,
        0.1,
        1000000
      );
      camera.position.z = 200;
      camera.position.y = 200;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.rotateSpeed = 5;
      controls.panSpeed = 2;

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update()
        renderer.render(scene, camera);
      };
      animate();
    }
  },[loadGlb, loadHdr])

  useEffect(() => {
    let renderer;
    if(threeRef.current){
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(threeRef.current.clientWidth, threeRef.current.clientHeight);
      threeRef.current.appendChild(renderer.domElement);
      init(renderer)
    }

    return () => {
      if(threeRef.current){
        threeRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    }
  },[init])
  return (
    <div className={styles.global}>
      <div className={styles.title}>
        div
      </div>
      <div ref={threeRef} className={styles.threeGlobal}>
      </div>
    </div>
  );
};
