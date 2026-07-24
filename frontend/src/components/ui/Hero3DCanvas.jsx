import React, { useEffect, useRef } from 'react';

export const Hero3DCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = container.offsetWidth || 600);
    let height = (canvas.height = container.offsetHeight || 420);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Interaction Coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;
    let isHovered = false;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / (width / 2)) * 0.8;
      targetRotX = -(y / (height / 2)) * 0.8;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
      isHovered = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Scroll Physics Tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3D Nodes & Particles System
    const numParticles = 80;
    const particles = [];
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      particles.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        baseRadius: radius,
        size: Math.random() * 3 + 1.5,
        color: i % 4 === 0 ? '#38bdf8' : i % 4 === 1 ? '#818cf8' : i % 4 === 2 ? '#c084fc' : '#34d399',
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let autoAngleY = 0;
    let autoAngleX = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth Mouse Interpolation
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      autoAngleY += 0.004 + (scrollY * 0.00002);
      autoAngleX += 0.002;

      const currentRotX = autoAngleX + rotX;
      const currentRotY = autoAngleY + rotY;

      // Scroll Zoom & Expansion Effect
      const scrollFactor = 1 + Math.min(0.5, scrollY * 0.0008);
      const cx = width / 2;
      const cy = height / 2;
      const fov = 380;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // Transform 3D Points
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        const currentRadius = radius * (1 + Math.sin(p.pulsePhase) * 0.08) * scrollFactor;

        // Scale coordinates
        const scaleRad = currentRadius / radius;
        const origX = p.x * scaleRad;
        const origY = p.y * scaleRad;
        const origZ = p.z * scaleRad;

        // Rotate Y
        let x1 = origX * cosY - origZ * sinY;
        let z1 = origZ * cosY + origX * sinY;

        // Rotate X
        let y1 = origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + origY * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 220);
        p.projX = cx + x1 * scale;
        p.projY = cy + y1 * scale;
        p.projSize = p.size * scale * (isHovered ? 1.3 : 1.0);
        p.alpha = Math.max(0.15, (z2 + radius) / (2 * radius));
      });

      // Draw 3D Connecting Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].projX - particles[j].projX;
          const dy = particles[i].projY - particles[j].projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isHovered ? 120 : 95;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35 * particles[i].alpha;
            ctx.beginPath();
            ctx.moveTo(particles[i].projX, particles[i].projY);
            ctx.lineTo(particles[j].projX, particles[j].projY);
            ctx.strokeStyle = isHovered
              ? `rgba(129, 140, 248, ${alpha})`
              : `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = isHovered ? 1.2 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw 3D Spherical Particle Nodes
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(0.5, p.projSize), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = isHovered ? 16 : 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 via-indigo-600/15 to-purple-600/20 rounded-3xl blur-2xl pointer-events-none transition-all" />

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10" />

      {/* Interactive 3D Badges */}
      <div className="absolute top-5 left-5 z-20 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 text-left space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-white tracking-wide">3D Interactive Physics Engine</span>
        </div>
        <p className="text-[10px] text-slate-400">Hover mouse & scroll page to rotate 3D sphere</p>
      </div>

      <div className="absolute bottom-5 right-5 z-20 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 text-left space-y-1">
        <span className="text-[10px] font-bold text-brand-400 block uppercase tracking-wider">Autonomous Core</span>
        <span className="text-[11px] font-bold text-white">60 FPS 3D Neural Mesh</span>
      </div>
    </div>
  );
};
