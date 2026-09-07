import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

export function ProjectModelViewer({
  src,
  title,
  annotations = [],
}: {
  src: string;
  title: string;
  annotations?: Array<{ label: string; position: [number, number, number] }>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-label', title);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.className = 'project-model-labels';
    labelRenderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(labelRenderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf5efe4, 0x302b25, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.screenSpacePanning = true;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      labelRenderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.178.0/examples/jsm/libs/draco/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    let model: THREE.Object3D | null = null;
    let disposed = false;

    loader.load(src, (gltf) => {
      if (disposed) return;
      model = gltf.scene;
      scene.add(model);
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z) * 0.5;
      model.position.sub(center);
      annotations.forEach((annotation) => {
        const label = document.createElement('span');
        label.className = 'project-model-annotation';
        label.textContent = annotation.label;
        const object = new CSS2DObject(label);
        object.position.set(
          annotation.position[0] * size.x * 0.5,
          annotation.position[1] * size.y * 0.5,
          annotation.position[2] * size.z * 0.5,
        );
        model.add(object);
      });
      camera.position.set(radius * 1.8, radius * 1.1, radius * 1.8);
      camera.near = Math.max(radius / 1000, 0.001);
      camera.far = Math.max(radius * 20, 100);
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.maxDistance = radius * 8;
      controls.minDistance = Math.max(radius * 0.2, 0.05);
      controls.update();
    });

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      dracoLoader.dispose();
      model?.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => {
          if (!material) return;
          Object.values(material).forEach((value) => {
            if (value && typeof value === 'object' && 'isTexture' in value) (value as THREE.Texture).dispose();
          });
          material.dispose();
        });
      });
      renderer.dispose();
      labelRenderer.domElement.remove();
      renderer.domElement.remove();
    };
  }, [annotations, src, title]);

  return <div ref={containerRef} className="project-model-canvas" role="img" aria-label={title} />;
}
