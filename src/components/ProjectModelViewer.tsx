import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SunCalc from 'suncalc';

// Kjenesskreda, Esefjorden / FV55.
const SITE_LATITUDE = 61.22328;
const SITE_LONGITUDE = 6.48036;
const SUN_DATE = '2026-06-21';
// Rotation of the RealityCapture model relative to the north-up reference image.
const MODEL_NORTH_OFFSET = (5 * Math.PI) / 6;

export function ProjectModelViewer({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const timeOutputRef = useRef<HTMLOutputElement>(null);

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

    scene.add(new THREE.HemisphereLight(0xf5efe4, 0x302b25, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xf2b544 }),
    );
    const sunPath = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xd29a54, transparent: true, opacity: 0.78 }),
    );
    scene.add(sun, sunPath);

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

    const parseLocalDate = () => {
      const value = dateInputRef.current?.value || SUN_DATE;
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day, 12, 0, 0, 0);
    };

    const formatTime = (hours: number) => {
      const hour = Math.floor(hours) % 24;
      const minutes = Math.round((hours - Math.floor(hours)) * 60);
      return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    let modelRadius = 1;
    const updateSun = () => {
      const date = parseLocalDate();
      const time = Number(timeInputRef.current?.value ?? 12);
      date.setHours(Math.floor(time), Math.round((time % 1) * 60), 0, 0);
      const position = SunCalc.getPosition(date, SITE_LATITUDE, SITE_LONGITUDE);
      const azimuth = (position.azimuth * Math.PI) / 180 + MODEL_NORTH_OFFSET;
      const altitude = (position.altitude * Math.PI) / 180;
      const distance = modelRadius * 2.1;
      const horizontal = Math.cos(altitude) * distance;
      sun.position.set(Math.sin(azimuth) * horizontal, Math.sin(altitude) * distance, -Math.cos(azimuth) * horizontal);
      sun.visible = altitude > 0;
      keyLight.position.copy(sun.position);
      keyLight.target.position.set(0, 0, 0);
      if (timeOutputRef.current) timeOutputRef.current.value = formatTime(time);
    };

    const updateSunPath = () => {
      const date = parseLocalDate();
      const times = SunCalc.getTimes(date, SITE_LATITUDE, SITE_LONGITUDE);
      const sunrise = times.sunrise ?? new Date(date.setHours(5, 0, 0, 0));
      const sunset = times.sunset ?? new Date(date.setHours(22, 0, 0, 0));
      const points = [];
      const steps = 48;
      const duration = sunset.getTime() - sunrise.getTime();
      for (let index = 0; index <= steps; index += 1) {
        const sample = new Date(sunrise.getTime() + (duration * index) / steps);
        const position = SunCalc.getPosition(sample, SITE_LATITUDE, SITE_LONGITUDE);
        const azimuth = (position.azimuth * Math.PI) / 180 + MODEL_NORTH_OFFSET;
        const altitude = (position.altitude * Math.PI) / 180;
        const distance = modelRadius * 2.1;
        const horizontal = Math.cos(altitude) * distance;
        points.push(
          new THREE.Vector3(
            Math.sin(azimuth) * horizontal,
            Math.max(Math.sin(altitude) * distance, 0),
            -Math.cos(azimuth) * horizontal,
          ),
        );
      }
      sunPath.geometry.dispose();
      sunPath.geometry = new THREE.BufferGeometry().setFromPoints(points);
      updateSun();
    };

    loader.load(src, (gltf) => {
      if (disposed) return;
      model = gltf.scene;
      scene.add(model);
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const radius = Math.max(size.x, size.y, size.z) * 0.5;
      modelRadius = radius;
      model.position.sub(center);
      camera.position.set(radius * 1.8, radius * 1.1, radius * 1.8);
      camera.near = Math.max(radius / 1000, 0.001);
      camera.far = Math.max(radius * 20, 100);
      camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0);
      controls.maxDistance = radius * 8;
      controls.minDistance = Math.max(radius * 0.2, 0.05);
      controls.update();
      updateSunPath();
    });

    const dateInput = dateInputRef.current;
    const timeInput = timeInputRef.current;
    dateInput?.addEventListener('input', updateSunPath);
    timeInput?.addEventListener('input', updateSun);

    renderer.setAnimationLoop(() => {
      controls.update();
      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      resizeObserver.disconnect();
      renderer.setAnimationLoop(null);
      controls.dispose();
      dracoLoader.dispose();
      dateInput?.removeEventListener('input', updateSunPath);
      timeInput?.removeEventListener('input', updateSun);
      sun.geometry.dispose();
      (sun.material as THREE.Material).dispose();
      sunPath.geometry.dispose();
      (sunPath.material as THREE.Material).dispose();
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
      renderer.domElement.remove();
    };
  }, [src, title]);

  return (
    <div className="project-model-viewer-shell">
      <div ref={containerRef} className="project-model-canvas" role="img" aria-label={title} />
      <div className="project-sun-controls" aria-label="Solbane / Sun path">
        <label className="project-sun-date">
          <span className="sr-only">Dato</span>
          <input ref={dateInputRef} type="date" defaultValue={SUN_DATE} aria-label="Dato / Date" />
        </label>
        <label className="project-sun-time">
          <span className="sr-only">Klokkeslett</span>
          <input
            ref={timeInputRef}
            type="range"
            min="0"
            max="23.75"
            step="0.25"
            defaultValue="12"
            aria-label="Klokkeslett / Time"
          />
          <output ref={timeOutputRef}>12:00</output>
        </label>
      </div>
    </div>
  );
}
