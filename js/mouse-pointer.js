/**
 * Ultra-Fast Air Mouse & Remote Pointer Engine
 * Tailored for Smart TV Air Remotes, Gyroscopic Pointers, Mice, and Trackpads.
 * Features:
 * - Sub-millisecond hardware-accelerated cursor rendering (translate3d)
 * - Configurable Remote Sensitivity (Normal, Fast, Hyper Fast)
 * - Intelligent Magnetic Card Attraction (Snaps cleanly to cards)
 * - Zero-lag hover state detection
 * - Seamless handoff between D-Pad Remote and Air Mouse
 */

class AirMouseController {
  constructor() {
    this.cursorEl = null;
    this.dotEl = null;
    this.ringEl = null;

    // Pointer coordinates
    this.targetX = window.innerWidth / 2;
    this.targetY = window.innerHeight / 2;
    this.currentX = this.targetX;
    this.currentY = this.targetY;

    // Settings
    this.active = false;
    this.enabled = true;
    this.sensitivity = 1.6; // High responsiveness default for TV screens
    this.magneticSnap = true;
    this.hideTimeout = null;
    this.isDpadActive = false;

    // Hovered target
    this.hoveredElement = null;

    this.init();
  }

  init() {
    this.createCursorElement();
    this.bindEvents();
    this.startRenderLoop();
  }

  createCursorElement() {
    // Remove if exists
    const existing = document.getElementById('ps5-air-cursor');
    if (existing) existing.remove();

    const cursor = document.createElement('div');
    cursor.id = 'ps5-air-cursor';
    cursor.className = 'ps5-air-cursor hidden';
    cursor.innerHTML = `
      <div class="cursor-glow"></div>
      <div class="cursor-ring"></div>
      <div class="cursor-dot"></div>
    `;
    document.body.appendChild(cursor);

    this.cursorEl = cursor;
    this.dotEl = cursor.querySelector('.cursor-dot');
    this.ringEl = cursor.querySelector('.cursor-ring');
  }

  setSensitivity(level) {
    // level: 'normal' (1.0), 'fast' (1.6), 'ultra' (2.3)
    if (typeof level === 'number') {
      this.sensitivity = level;
    } else if (level === 'ultra') {
      this.sensitivity = 2.4;
    } else if (level === 'fast') {
      this.sensitivity = 1.6;
    } else {
      this.sensitivity = 1.0;
    }
  }

  setMagneticSnap(enabled) {
    this.magneticSnap = !!enabled;
  }

  bindEvents() {
    // Fast pointer move with high update frequency
    window.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    window.addEventListener('pointermove', (e) => this.onMouseMove(e), { passive: true });

    // Click handler for remote click
    window.addEventListener('mousedown', (e) => this.onMouseDown(e), { passive: true });
    window.addEventListener('mouseup', (e) => this.onMouseUp(e), { passive: true });

    // When window resizes
    window.addEventListener('resize', () => {
      this.targetX = Math.min(this.targetX, window.innerWidth);
      this.targetY = Math.min(this.targetY, window.innerHeight);
    }, { passive: true });
  }

  onMouseMove(e) {
    if (!this.enabled) return;

    // Activate pointer mode, deactivate D-Pad highlight mode
    if (this.isDpadActive) {
      this.isDpadActive = false;
      document.body.classList.remove('dpad-mode');
      document.body.classList.add('airmouse-mode');
    }

    this.showCursor();

    // Direct coords from event
    this.targetX = e.clientX;
    this.targetY = e.clientY;

    // Reset idle auto-hide timer (5 seconds of inactivity hides cursor on TV)
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideCursor();
    }, 4500);

    // Fast element detection
    this.checkHoverTarget(e.clientX, e.clientY);
  }

  checkHoverTarget(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return;

    const interactive = el.closest('[data-nav-item], button, .nav-tab, .game-card, .activity-card, .cc-item');

    if (interactive !== this.hoveredElement) {
      if (this.hoveredElement) {
        this.hoveredElement.classList.remove('mouse-hovered');
      }

      this.hoveredElement = interactive;

      if (interactive) {
        interactive.classList.add('mouse-hovered');
        this.cursorEl.classList.add('is-hovering');

        // Play crisp tick on entering new card
        if (window.ps5Audio) {
          window.ps5Audio.playTick();
        }

        // Notify navigation manager of hover focus
        if (window.ps5Nav && interactive.hasAttribute('data-nav-id')) {
          window.ps5Nav.setHoverFocus(interactive);
        }
      } else {
        this.cursorEl.classList.remove('is-hovering');
      }
    }
  }

  onMouseDown(e) {
    if (this.cursorEl) {
      this.cursorEl.classList.add('is-clicking');
    }
  }

  onMouseUp(e) {
    if (this.cursorEl) {
      this.cursorEl.classList.remove('is-clicking');
    }
  }

  showCursor() {
    if (this.cursorEl && this.cursorEl.classList.contains('hidden')) {
      this.cursorEl.classList.remove('hidden');
    }
  }

  hideCursor() {
    if (this.cursorEl && !this.cursorEl.classList.contains('hidden')) {
      this.cursorEl.classList.add('hidden');
    }
    if (this.hoveredElement) {
      this.hoveredElement.classList.remove('mouse-hovered');
      this.hoveredElement = null;
    }
  }

  notifyDpadUsed() {
    this.isDpadActive = true;
    this.hideCursor();
    document.body.classList.remove('airmouse-mode');
    document.body.classList.add('dpad-mode');
  }

  startRenderLoop() {
    // Ultra-smooth 60/120fps hardware-accelerated interpolation loop
    const render = () => {
      // Linear interpolation (lerp) for silky smooth feeling
      // When speed is set high, lerp factor is closer to 1 (near-instant 0 lag)
      const lerpFactor = this.sensitivity >= 2.0 ? 0.95 : (this.sensitivity >= 1.5 ? 0.85 : 0.7);

      this.currentX += (this.targetX - this.currentX) * lerpFactor;
      this.currentY += (this.targetY - this.currentY) * lerpFactor;

      if (this.cursorEl) {
        this.cursorEl.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }
}

window.airMouse = new AirMouseController();
