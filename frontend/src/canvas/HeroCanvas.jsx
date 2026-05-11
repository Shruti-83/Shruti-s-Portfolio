import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Floating torus knot (main 3D object sticking out)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x003344,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    torusKnot.position.set(3.5, 0.5, 2); // Positioned to appear "outside" screen
    scene.add(torusKnot);

    // Icosahedron floating top-left
    const icoGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x0a2200,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-4, 2.5, 1.5);
    scene.add(ico);

    // Octahedron bottom right
    const octGeo = new THREE.OctahedronGeometry(0.7);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xff4500,
      emissive: 0x330a00,
      metalness: 0.7,
      roughness: 0.3,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(4, -2.5, 1);
    scene.add(oct);

    // Ring / Torus
    const ringGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x00f5ff, emissive: 0x002233, metalness: 1, roughness: 0 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(-3.5, -1.5, 2);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Particles
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00f5ff, size: 0.04, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Grid plane
    const gridHelper = new THREE.GridHelper(30, 40, 0x00f5ff, 0x001122);
    gridHelper.position.y = -4;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f5ff, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x39ff14, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff4500, 2, 20);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      torusKnot.rotation.x = t * 0.4;
      torusKnot.rotation.y = t * 0.3;
      torusKnot.position.y = 0.5 + Math.sin(t * 0.8) * 0.3;

      ico.rotation.x = t * 0.5;
      ico.rotation.z = t * 0.3;
      ico.position.y = 2.5 + Math.sin(t * 0.6 + 1) * 0.4;

      oct.rotation.y = t * 0.6;
      oct.rotation.x = t * 0.4;
      oct.position.y = -2.5 + Math.cos(t * 0.7) * 0.3;

      ring.rotation.z = t * 0.3;
      ring.rotation.y = t * 0.1;

      particles.rotation.y = t * 0.03;
      particles.rotation.x = t * 0.01;

      // Parallax on mouse
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
};

export default HeroCanvas;