import React, { useEffect, useRef } from 'react';

export const School3DHeroCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = container.offsetWidth || 700);
    let height = (canvas.height = container.offsetHeight || 440);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse Interaction Coordinates
    let targetCamX = 0;
    let targetCamY = 0;
    let camX = 0;
    let camY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetCamX = (x / (width / 2)) * 30;
      targetCamY = (y / (height / 2)) * 15;
    };

    const handleMouseLeave = () => {
      targetCamX = 0;
      targetCamY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Walking Students Data
    const students = [
      { x: -180, speed: 1.2, legPhase: 0, scale: 0.85, color: '#38bdf8', hairColor: '#1e293b', backpack: '#e11d48' },
      { x: -320, speed: 0.95, legPhase: 2.1, scale: 0.75, color: '#818cf8', hairColor: '#475569', backpack: '#4f46e5' },
      { x: -60, speed: 1.1, legPhase: 1.0, scale: 0.9, color: '#f43f5e', hairColor: '#0f172a', backpack: '#10b981' },
      { x: -440, speed: 1.3, legPhase: 3.5, scale: 0.7, color: '#10b981', hairColor: '#334155', backpack: '#f59e0b' },
    ];

    // Floating 3D Academic Items (Graduation Caps, Books, A+ Badges, Math Icons)
    const items = [
      { x: -160, y: -110, z: 40, type: 'cap', rot: 0, rotSpeed: 0.015, pulse: 0 },
      { x: 170, y: -130, z: -20, type: 'book', rot: 1.2, rotSpeed: 0.02, pulse: 1 },
      { x: 220, y: -40, z: 60, type: 'badge', rot: 0.5, rotSpeed: 0.01, pulse: 2 },
      { x: -220, y: -30, z: 10, type: 'star', rot: 2.0, rotSpeed: 0.025, pulse: 3 },
    ];

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // Smooth Camera Perspective Motion
      camX += (targetCamX - camX) * 0.05;
      camY += (targetCamY - camY) * 0.05;

      const centerX = width / 2 + camX;
      const centerY = height / 2 + camY + 20;

      // 1. Draw 3D School Building Background Facade
      ctx.save();
      ctx.translate(centerX, centerY - 60);

      // Building Base & Main Block
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;

      // Main Central Building
      ctx.beginPath();
      ctx.roundRect(-140, -100, 280, 140, 8);
      ctx.fill();
      ctx.stroke();

      // Left Wing
      ctx.beginPath();
      ctx.roundRect(-240, -70, 100, 110, 6);
      ctx.fill();
      ctx.stroke();

      // Right Wing
      ctx.beginPath();
      ctx.roundRect(140, -70, 100, 110, 6);
      ctx.fill();
      ctx.stroke();

      // Clock Tower Spire
      ctx.beginPath();
      ctx.moveTo(-40, -100);
      ctx.lineTo(0, -170);
      ctx.lineTo(40, -100);
      ctx.closePath();
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.stroke();

      // Clock Face
      ctx.beginPath();
      ctx.arc(0, -125, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#4f46e5';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#6366f1';
      ctx.fill();
      ctx.shadowBlur = 0;

      // School Entrance Arched Doors
      ctx.beginPath();
      ctx.arc(0, 40, 25, Math.PI, 0);
      ctx.rect(-25, 15, 50, 25);
      ctx.fillStyle = '#6366f1';
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1.0;

      // Illuminated Windows Grid
      const winCols = [-200, -175, -80, -40, 40, 80, 175, 200];
      const winRows = [-40, -10];
      winCols.forEach((wx) => {
        winRows.forEach((wy) => {
          ctx.beginPath();
          ctx.roundRect(wx - 8, wy - 10, 16, 20, 3);
          ctx.fillStyle = Math.sin(time + wx) > 0 ? '#38bdf8' : '#818cf8';
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        });
      });

      ctx.restore();

      // 2. Draw School Pathway & Grass Lawn Ground
      ctx.save();
      ctx.translate(centerX, centerY + 80);

      // Perspective Pathway to Entrance
      ctx.beginPath();
      ctx.moveTo(-30, -40);
      ctx.lineTo(30, -40);
      ctx.lineTo(width / 2 + 100, 120);
      ctx.lineTo(-width / 2 - 100, 120);
      ctx.closePath();
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      // Pathway Border Lights
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      // 3. Draw Walking Students Animation
      students.forEach((st) => {
        st.x += st.speed;
        st.legPhase += 0.12;

        if (st.x > width / 2 + 100) {
          st.x = -width / 2 - 120;
        }

        const screenX = centerX + st.x;
        const screenY = centerY + 65 + Math.sin(st.x * 0.05) * 5;
        const s = st.scale;

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.scale(s, s);

        // Shadow under student
        ctx.beginPath();
        ctx.ellipse(0, 28, 12, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fill();

        // Walking Leg Swing Animation
        const legAngle = Math.sin(st.legPhase) * 14;

        // Left Leg
        ctx.beginPath();
        ctx.moveTo(-3, 10);
        ctx.lineTo(-3 + Math.sin(st.legPhase) * 10, 28);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Right Leg
        ctx.beginPath();
        ctx.moveTo(3, 10);
        ctx.lineTo(3 - Math.sin(st.legPhase) * 10, 28);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Torso / Jacket
        ctx.beginPath();
        ctx.roundRect(-8, -10, 16, 22, 4);
        ctx.fillStyle = st.color;
        ctx.fill();

        // Backpack on back
        ctx.beginPath();
        ctx.roundRect(-13, -8, 7, 16, 3);
        ctx.fillStyle = st.backpack;
        ctx.fill();

        // Head & Hair
        ctx.beginPath();
        ctx.arc(0, -18, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#f87171'; // skin
        ctx.fill();

        // Hair
        ctx.beginPath();
        ctx.arc(0, -20, 9.5, Math.PI, Math.PI * 2);
        ctx.fillStyle = st.hairColor;
        ctx.fill();

        // Waving Arm Animation
        const armAngle = Math.cos(st.legPhase) * 10;
        ctx.beginPath();
        ctx.moveTo(6, -6);
        ctx.lineTo(12 + armAngle * 0.4, 4);
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.restore();
      });

      // 4. Draw Floating 3D Academic Items (Cap, Book, A+ Badge, Star)
      items.forEach((item) => {
        item.rot += item.rotSpeed;
        item.pulse += 0.03;
        const floatY = Math.sin(item.pulse) * 12;

        const ix = centerX + item.x;
        const iy = centerY + item.y + floatY;

        ctx.save();
        ctx.translate(ix, iy);
        ctx.rotate(Math.sin(item.rot) * 0.15);

        if (item.type === 'cap') {
          // 3D Graduation Cap
          ctx.beginPath();
          ctx.moveTo(0, -15);
          ctx.lineTo(25, 0);
          ctx.lineTo(0, 12);
          ctx.lineTo(-25, 0);
          ctx.closePath();
          ctx.fillStyle = '#6366f1';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#818cf8';
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.rect(-10, 4, 20, 8);
          ctx.fillStyle = '#312e81';
          ctx.fill();
        } else if (item.type === 'book') {
          // 3D Open Book
          ctx.beginPath();
          ctx.roundRect(-20, -12, 40, 24, 4);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.moveTo(0, -12);
          ctx.lineTo(0, 12);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (item.type === 'badge') {
          // A+ Grade Badge
          ctx.beginPath();
          ctx.arc(0, 0, 16, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#34d399';
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('A+', 0, 1);
        } else if (item.type === 'star') {
          // 3D Star
          ctx.fillStyle = '#f59e0b';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#fbbf24';
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
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
      className="relative w-full h-[440px] flex items-center justify-center overflow-hidden rounded-3xl select-none"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 via-slate-900 to-purple-950/40 rounded-3xl border border-slate-800 backdrop-blur-md" />

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10" />

      {/* Interactive Floating Badge Overlays */}
      <div className="absolute top-5 left-5 z-20 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md shadow-2xl text-left space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-white tracking-wide">Live School Campus Grounds</span>
        </div>
        <p className="text-[10px] text-slate-400">Animated students walking towards Greenfield College entrance</p>
      </div>

      <div className="absolute bottom-5 right-5 z-20 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-md shadow-2xl text-left space-y-0.5">
        <span className="text-[10px] font-bold text-brand-400 block uppercase tracking-wider">EduSphere 3D Campus</span>
        <span className="text-[11px] font-bold text-white">Interactive 3D School Scene</span>
      </div>
    </div>
  );
};
