/**
 * Ultra-Lightweight Web Audio API Sound Synthesizer
 * Generates iconic PS5 UI audio effects on the fly with 0 network latency,
 * zero audio file loading delay, and minimal CPU footprint.
 */

class PS5AudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.6;
    this.isMuted = false;
    this.hasInteracted = false;

    // Init on first user gesture
    this.setupAutoUnlock();
  }

  setupAutoUnlock() {
    const unlock = () => {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.hasInteracted = true;
      ['keydown', 'click', 'pointerdown', 'touchstart'].forEach(e => {
        window.removeEventListener(e, unlock);
      });
    };

    ['keydown', 'click', 'pointerdown', 'touchstart'].forEach(e => {
      window.addEventListener(e, unlock, { once: true, passive: true });
    });
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx({ latencyHint: 'interactive' });
      }
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  setMuted(muted) {
    this.isMuted = !!muted;
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    return !this.isMuted;
  }

  /**
   * PS5 Navigation Tick - Quick crisp focus click
   */
  playTick() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1450, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.025);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.Q.setValueAtTime(3.0, t);

      const baseVol = this.volume * 0.16;
      gain.gain.setValueAtTime(baseVol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (_) {}
  }

  /**
   * PS5 Confirm / Select Chime - Elegant melodic double chime
   */
  playConfirm() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const baseVol = this.volume * 0.22;

      // Primary tone
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, t); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, t + 0.04); // A5

      gain1.gain.setValueAtTime(baseVol, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.3);

      // Harmony tone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, t + 0.03); // D6

      gain2.gain.setValueAtTime(0, t);
      gain2.gain.setValueAtTime(baseVol * 0.6, t + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.03);
      osc2.stop(t + 0.36);
    } catch (_) {}
  }

  /**
   * PS5 Cancel / Back Sound - Smooth soft descending drop
   */
  playBack() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const baseVol = this.volume * 0.18;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.12);

      gain.gain.setValueAtTime(baseVol, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch (_) {}
  }

  /**
   * PS5 Tab Switch Swoosh
   */
  playTabSwitch() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const baseVol = this.volume * 0.14;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.08);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(baseVol, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.2);
    } catch (_) {}
  }

  /**
   * PS5 Control Center (PS Button) Quick Menu Sound
   */
  playQuickMenu() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const chord = [440, 554.37, 659.25]; // A major
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        const baseVol = (this.volume * 0.12) / chord.length;
        gain.gain.setValueAtTime(baseVol, t + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35 + idx * 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.02);
        osc.stop(t + 0.4);
      });
    } catch (_) {}
  }

  /**
   * Launch Game sound effect
   */
  playLaunch() {
    if (this.isMuted || !this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // Sub-bass sweep
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(90, t);
      sub.frequency.exponentialRampToValueAtTime(45, t + 0.4);

      subGain.gain.setValueAtTime(this.volume * 0.3, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);

      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(t);
      sub.stop(t + 0.65);

      // Shimmer
      const shimmer = this.ctx.createOscillator();
      const shimGain = this.ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(800, t);
      shimmer.frequency.exponentialRampToValueAtTime(1600, t + 0.35);

      shimGain.gain.setValueAtTime(this.volume * 0.15, t);
      shimGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

      shimmer.connect(shimGain);
      shimGain.connect(this.ctx.destination);
      shimmer.start(t);
      shimmer.stop(t + 0.55);
    } catch (_) {}
  }
}

window.ps5Audio = new PS5AudioEngine();
