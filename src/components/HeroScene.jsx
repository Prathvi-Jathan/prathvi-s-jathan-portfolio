import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Dimensions
    let width = container.clientWidth || 300
    let height = container.clientHeight || 300

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    const canvas = renderer.domElement
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    container.appendChild(canvas)

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
    camera.position.z = 7

    // Scene & Main Group
    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    // 1. Outer Shell: Icosahedron Edges in Signal Orange
    const shellBaseGeom = new THREE.IcosahedronGeometry(1.9, 1)
    const shellEdgesGeom = new THREE.EdgesGeometry(shellBaseGeom)
    const shellMaterial = new THREE.LineBasicMaterial({
      color: 0xff5b1f,
      transparent: true,
      opacity: prefersReducedMotion ? 0.9 : 0,
    })
    const shell = new THREE.LineSegments(shellEdgesGeom, shellMaterial)
    group.add(shell)

    // 2. Inner Core: Dense Starburst Points
    const coreGeom = new THREE.IcosahedronGeometry(1.15, 4)
    const coreMaterial = new THREE.PointsMaterial({
      color: 0xe8e6df,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    })
    const core = new THREE.Points(coreGeom, coreMaterial)
    group.add(core)

    // 3. Orbit Ring: Tilted Ellipse Curve
    const orbitCurve = new THREE.EllipseCurve(0, 0, 2.7, 2.7)
    const orbitPoints = orbitCurve.getPoints(128)
    const ringGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints)
    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0xe8e6df,
      transparent: true,
      opacity: 0.18,
    })
    const ring = new THREE.LineLoop(ringGeom, ringMaterial)
    ring.rotation.x = Math.PI / 2.4
    group.add(ring)

    // Initial scale
    if (prefersReducedMotion) {
      group.scale.set(1, 1, 1)
    } else {
      group.scale.set(0.6, 0.6, 0.6)
    }

    // Interaction states
    let targetTiltX = 0
    let targetTiltY = 0
    let currentTiltX = 0
    let currentTiltY = 0

    let isDragging = false
    let prevPointerX = 0
    let prevPointerY = 0
    let dragRotX = 0
    let dragRotY = 0

    let autoSpinY = 0

    const onPointerMoveWindow = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = (e.clientY / window.innerHeight) * 2 - 1
      targetTiltY = normX * 0.4
      targetTiltX = normY * 0.25

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX
        const deltaY = e.clientY - prevPointerY
        dragRotY += deltaX * 0.01
        dragRotX += deltaY * 0.01
        prevPointerX = e.clientX
        prevPointerY = e.clientY
      }
    }

    const onPointerDownCanvas = (e) => {
      isDragging = true
      prevPointerX = e.clientX
      prevPointerY = e.clientY
    }

    const onPointerUpWindow = () => {
      isDragging = false
    }

    window.addEventListener('pointermove', onPointerMoveWindow)
    canvas.addEventListener('pointerdown', onPointerDownCanvas)
    window.addEventListener('pointerup', onPointerUpWindow)

    // Visibility management via IntersectionObserver
    let isVisible = true
    let animationFrameId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate)
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(container)

    // Resize handler
    const onResize = () => {
      if (!container) return
      width = container.clientWidth || 300
      height = container.clientHeight || 300
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    const startTime = performance.now()

    const animate = (time) => {
      if (!isVisible) {
        animationFrameId = null
        return
      }

      const elapsedSec = (time - startTime) * 0.001

      // Entrance materialisation over 1s
      if (!prefersReducedMotion && elapsedSec < 1.0) {
        const p = Math.min(elapsedSec / 1.0, 1)
        const easeOut = 1 - Math.pow(1 - p, 3)
        const currentScale = 0.6 + 0.4 * easeOut
        group.scale.set(currentScale, currentScale, currentScale)
        shellMaterial.opacity = 0.9 * easeOut
      } else if (!prefersReducedMotion && elapsedSec >= 1.0) {
        group.scale.set(1, 1, 1)
        shellMaterial.opacity = 0.9
      }

      // Auto-spin and rotation easing
      if (!prefersReducedMotion) {
        autoSpinY += 0.0025
        currentTiltX += (targetTiltX - currentTiltX) * 0.06
        currentTiltY += (targetTiltY - currentTiltY) * 0.06
      }

      group.rotation.x = dragRotX + currentTiltX
      group.rotation.y = autoSpinY + dragRotY + currentTiltY

      // Inner points rotate in reverse direction
      core.rotation.y = -elapsedSec * 0.15

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Complete cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMoveWindow)
      canvas.removeEventListener('pointerdown', onPointerDownCanvas)
      window.removeEventListener('pointerup', onPointerUpWindow)

      // Geometries & materials disposal
      shellBaseGeom.dispose()
      shellEdgesGeom.dispose()
      shellMaterial.dispose()
      coreGeom.dispose()
      coreMaterial.dispose()
      ringGeom.dispose()
      ringMaterial.dispose()

      renderer.dispose()
      renderer.forceContextLoss()

      if (container.contains(canvas)) {
        container.removeChild(canvas)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label="Interactive 3D shape — drag to rotate"
      data-cursor="hot"
    />
  )
}

