import { useRef, useEffect, useCallback, useMemo } from 'react';
import './BorderGlow.css';

const DEFAULT_COLORS = ['#8350e8', '#ff6b9d', '#4ecdc4', '#ffd93d', '#6c5ce7'];

function hexToRgba(hex, alpha = 1) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(
    cleaned.length === 3
      ? cleaned
          .split('')
          .map(c => c + c)
          .join('')
      : cleaned,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parseHSL(str) {
  const match = str.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 260, s: 84, l: 66 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  return {
    '--glow-h': `${h}deg`,
    '--glow-s': `${s}%`,
    '--glow-l': `${l}%`,
    '--glow-base': base
  };
}

const BorderGlow = ({
  children,
  className = '',
  style = {},
  colors = DEFAULT_COLORS,
  animationDuration = 8,
  backgroundColor = '#0b0b12',
  borderRadius = 20,
  glowColor = '260 84% 66%',
  glowRadius = 26,
  glowIntensity = 1,
  coneSpread = 34,
  disabled = false
}) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 50, y: 50, active: false });
  const currentRef = useRef({ x: 50, y: 50, opacity: 0 });

  const meshStyle = useMemo(() => {
    const stops = colors
      .map((c, i) => {
        const angle = (360 / colors.length) * i;
        return `${c} ${angle}deg`;
      })
      .join(', ');
    return {
      background: `conic-gradient(from 0deg, ${stops}, ${colors[0]} 360deg)`,
      animationDuration: `${animationDuration}s`
    };
  }, [colors, animationDuration]);

  const glowVars = useMemo(() => buildGlowVars(glowColor), [glowColor]);

  const applyFrame = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const target = targetRef.current;
    const current = currentRef.current;
    const ease = 0.18;

    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    const targetOpacity = target.active ? glowIntensity : 0;
    current.opacity += (targetOpacity - current.opacity) * 0.15;

    el.style.setProperty('--pointer-x', `${current.x}%`);
    el.style.setProperty('--pointer-y', `${current.y}%`);
    el.style.setProperty('--glow-opacity', current.opacity.toFixed(3));

    const stillMoving =
      Math.abs(target.x - current.x) > 0.05 ||
      Math.abs(target.y - current.y) > 0.05 ||
      Math.abs(targetOpacity - current.opacity) > 0.002;

    if (stillMoving) {
      rafRef.current = requestAnimationFrame(applyFrame);
    } else {
      rafRef.current = null;
    }
  }, [glowIntensity]);

  const scheduleFrame = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyFrame);
    }
  }, [applyFrame]);

  const handlePointerMove = useCallback(
    e => {
      if (disabled) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      targetRef.current = { x, y, active: true };
      scheduleFrame();
    },
    [disabled, scheduleFrame]
  );

  const handlePointerLeave = useCallback(() => {
    targetRef.current = { ...targetRef.current, active: false };
    scheduleFrame();
  }, [scheduleFrame]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cssVars = {
    '--border-glow-bg': backgroundColor,
    '--border-glow-radius': `${borderRadius}px`,
    '--glow-radius': `${glowRadius}`,
    '--cone-spread': `${coneSpread}deg`,
    ...glowVars,
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={`border-glow ${disabled ? 'border-glow--disabled' : ''} ${className}`}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="border-glow__mesh" style={meshStyle} aria-hidden="true" />
      <div className="border-glow__cone" aria-hidden="true" />
      <div className="border-glow__content">{children}</div>
    </div>
  );
};

export default BorderGlow;
export { hexToRgba };
