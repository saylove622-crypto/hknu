'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Book3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Textures & Materials
    const textureLoader = new THREE.TextureLoader();
    
    // Load cover texture
    const coverTexture = textureLoader.load('/book-cover.jpg');
    coverTexture.colorSpace = THREE.SRGBColorSpace;
    coverTexture.minFilter = THREE.LinearFilter;

    // Book dimensions: width 3.0, height 4.2, thickness 0.35 (increased slightly for spine text readability)
    const bookWidth = 3.0;
    const bookHeight = 4.2;
    const bookDepth = 0.35;

    // Load spine texture with horizontal centering and aspect ratio correction
    const spineTexture = textureLoader.load('/book-spine.png', (tex) => {
      const imgWidth = tex.image.width;
      const imgHeight = tex.image.height;
      const faceAspect = bookDepth / bookHeight;
      
      // Calculate horizontal repeat to display the image without distortion
      tex.repeat.x = (imgHeight / imgWidth) * faceAspect;
      // Center the cropped area horizontally
      tex.offset.x = 0.5 - tex.repeat.x / 2;
      tex.needsUpdate = true;
    });
    spineTexture.colorSpace = THREE.SRGBColorSpace;
    spineTexture.minFilter = THREE.LinearFilter;

    // Create materials for each face
    // Order: 0: +X (Right/Pages), 1: -X (Left/Spine), 2: +Y (Top/Pages), 3: -Y (Bottom/Pages), 4: +Z (Front/Cover), 5: -Z (Back/Backcover)
    const pageColor = new THREE.Color('#f5ede0'); // Warm paper cream
    const backColor = new THREE.Color('#151230');  // Matching dark indigo for back cover

    const materials = [
      // Right (+X) - Pages
      new THREE.MeshStandardMaterial({
        color: pageColor,
        roughness: 0.8,
        metalness: 0.1,
      }),
      // Left (-X) - Spine (using spine texture)
      new THREE.MeshStandardMaterial({
        map: spineTexture,
        roughness: 0.3,
        metalness: 0.05,
      }),
      // Top (+Y) - Pages
      new THREE.MeshStandardMaterial({
        color: pageColor,
        roughness: 0.8,
        metalness: 0.1,
      }),
      // Bottom (-Y) - Pages
      new THREE.MeshStandardMaterial({
        color: pageColor,
        roughness: 0.8,
        metalness: 0.1,
      }),
      // Front (+Z) - Front Cover
      new THREE.MeshPhysicalMaterial({
        map: coverTexture,
        roughness: 0.25,
        metalness: 0.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
      }),
      // Back (-Z) - Back Cover
      new THREE.MeshStandardMaterial({
        color: backColor,
        roughness: 0.3,
        metalness: 0.05,
      }),
    ];

    // Geometry & Mesh
    const geometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
    const book = new THREE.Mesh(geometry, materials);
    scene.add(book);

    // Initial orientation: slightly turned to show 3D nature
    book.rotation.y = 0.3;
    book.rotation.x = 0.15;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Warm key light from top-right-front
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    // Cool fill light from bottom-left-back
    const fillLight = new THREE.DirectionalLight(0xeaefff, 0.8);
    fillLight.position.set(-5, -3, -4);
    scene.add(fillLight);

    // Point light that follows mouse hover to create a beautiful specular shine on the gloss cover
    const shineLight = new THREE.PointLight(0xffffff, 4.0, 10);
    shineLight.position.set(0, 0, 4);
    scene.add(shineLight);

    // 4. Interaction State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0.15;
    let targetRotationY = 0.3;
    let dragVelocityY = 0;
    let dragVelocityX = 0;
    
    // Hover offset variables
    let mouseX = 0; // range: -1 to 1
    let mouseY = 0; // range: -1 to 1
    let isHovered = false;

    // Time/frame counting for floating animation
    let clock = new THREE.Clock();

    // 5. Interaction Event Listeners
    const getCanvasMousePos = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        normX: ((clientX - rect.left) / rect.width) * 2 - 1,
        normY: -((clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const handleStart = (e) => {
      isDragging = true;
      const pos = getCanvasMousePos(e);
      previousMousePosition = { x: pos.x, y: pos.y };
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const handleMove = (e) => {
      const pos = getCanvasMousePos(e);

      // Track hover coords for shininess and subtle tilt when NOT dragging
      mouseX = pos.normX;
      mouseY = pos.normY;

      // Update shine light position based on mouse position
      shineLight.position.x = mouseX * 3;
      shineLight.position.y = mouseY * 3;

      if (!isDragging) return;

      const deltaX = pos.x - previousMousePosition.x;
      const deltaY = pos.y - previousMousePosition.y;

      // Rotate book directly on drag
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      // Clamp X rotation to avoid flipping upside down
      targetRotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotationX));

      // Calculate simple velocity for inertia
      dragVelocityY = deltaX * 0.001;
      dragVelocityX = deltaY * 0.001;

      previousMousePosition = { x: pos.x, y: pos.y };
    };

    const handleEnd = () => {
      isDragging = false;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      isDragging = false;
      mouseX = 0;
      mouseY = 0;
    };

    // Attach listeners
    container.addEventListener('mousedown', handleStart);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    // Touch events
    container.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating/idle motion
      const floatOffsetY = Math.sin(elapsedTime * 1.2) * 0.08;
      const floatRotationY = Math.sin(elapsedTime * 0.6) * 0.06;
      const floatRotationX = Math.cos(elapsedTime * 0.5) * 0.03;

      // Calculate target rotation incorporating all interactions
      let finalTargetX = targetRotationX;
      let finalTargetY = targetRotationY;

      if (isDragging) {
        // Just use drag targets directly
      } else if (isHovered) {
        // Merge drag position with cursor hover tilt
        finalTargetX += mouseY * 0.4 + floatRotationX;
        finalTargetY += mouseX * 0.4 + floatRotationY;
      } else {
        // Auto float when idle (stop continuous spinning)
        finalTargetY = targetRotationY + floatRotationY;
        finalTargetX = targetRotationX + floatRotationX;
      }

      // Smooth interpolation (Lerp) to targets
      book.rotation.y += (finalTargetY - book.rotation.y) * 0.08;
      book.rotation.x += (finalTargetX - book.rotation.x) * 0.08;

      // Apply float offset to position
      book.position.y += (floatOffsetY - book.position.y) * 0.08;

      // Inertia decay
      if (!isDragging) {
        targetRotationY += dragVelocityY;
        targetRotationX += dragVelocityX;
        dragVelocityY *= 0.95;
        dragVelocityX *= 0.95;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      
      container.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      
      container.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
      
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      materials.forEach(mat => mat.dispose());
      coverTexture.dispose();
      spineTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '480px', 
        position: 'relative', 
        cursor: 'grab',
        touchAction: 'none'
      }} 
      className="book3d-container"
    />
  );
}
