/**
 * High-Performance TV Remote, D-Pad, and Gamepad Spatial Navigation Engine
 * Zero input delay, hardware-accelerated transitions, 120Hz/60Hz Gamepad polling,
 * Smart TV keycode mapping (Samsung Tizen, LG webOS, Android TV, Fire TV, standard keyboards).
 */

class PS5NavigationEngine {
  constructor() {
    // Navigation state
    this.currentZone = 'shelf'; // 'topbar', 'shelf', 'actions', 'activities', 'controlcenter', 'modal'
    this.shelfIndex = 1; // Default to first game after store (Spider-Man 2) or Store (0)
    this.activityIndex = 0;
    this.topbarIndex = 0; // 0: Games, 1: Media, 2: Search, 3: Settings, 4: Profile
    this.actionIndex = 0; // 0: Play Button, 1: Options
    this.controlCenterIndex = 0;
    this.isControlCenterOpen = false;
    this.isModalOpen = false;
    this.currentModalId = null;

    // Gamepad state
    this.gamepadConnected = false;
    this.lastGamepadPollTime = 0;
    this.lastGamepadAxes = { x: 0, y: 0 };
    this.gamepadDebounce = { left: 0, right: 0, up: 0, down: 0, a: 0, b: 0, ps: 0, l1: 0, r1: 0 };

    this.init();
  }

  init() {
    this.bindKeyboardAndRemote();
    this.initGamepad();
  }

  bindKeyboardAndRemote() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Handle Samsung / LG specific TV remote return/back
    window.addEventListener('tizenhwkey', (e) => {
      if (e.keyName === 'back') {
        this.handleBack();
      }
    });
  }

  handleKeyDown(e) {
    // Notify air mouse engine that D-pad was used
    if (window.airMouse) {
      window.airMouse.notifyDpadUsed();
    }

    const key = e.key;
    const keyCode = e.keyCode;

    // Common TV Remote Key Codes
    // Samsung Tizen: Return=10009, Menu=10133, Info=457
    // LG webOS: Back=461, Exit=1001
    // Android TV: Back=4, D-pad Center=23, D-pad Up=19, Down=20, Left=21, Right=22
    const isUp = key === 'ArrowUp' || key === 'Up' || key === 'w' || key === 'W' || keyCode === 38 || keyCode === 19;
    const isDown = key === 'ArrowDown' || key === 'Down' || key === 's' || key === 'S' || keyCode === 40 || keyCode === 20;
    const isLeft = key === 'ArrowLeft' || key === 'Left' || key === 'a' || key === 'A' || keyCode === 37 || keyCode === 21;
    const isRight = key === 'ArrowRight' || key === 'Right' || key === 'd' || key === 'D' || keyCode === 39 || keyCode === 22;
    const isEnter = key === 'Enter' || key === ' ' || key === 'Select' || keyCode === 13 || keyCode === 23;
    const isBack = key === 'Escape' || key === 'Backspace' || keyCode === 27 || keyCode === 8 || keyCode === 10009 || keyCode === 461 || keyCode === 4;
    const isPSButton = key === 'Home' || key === 'Menu' || key === 'm' || key === 'M' || key === 'p' || key === 'P' || keyCode === 10133;

    // Prevent default scrolling on arrow keys and space
    if (isUp || isDown || isLeft || isRight || isEnter) {
      e.preventDefault();
    }

    if (isPSButton) {
      this.toggleControlCenter();
      return;
    }

    if (isBack) {
      this.handleBack();
      return;
    }

    if (isEnter) {
      this.handleSelect();
      return;
    }

    if (isUp) {
      this.navigateDirection('UP');
    } else if (isDown) {
      this.navigateDirection('DOWN');
    } else if (isLeft) {
      this.navigateDirection('LEFT');
    } else if (isRight) {
      this.navigateDirection('RIGHT');
    }
  }

  navigateDirection(dir) {
    if (this.isModalOpen) {
      this.navigateModal(dir);
      return;
    }

    if (this.isControlCenterOpen) {
      this.navigateControlCenter(dir);
      return;
    }

    const isRTL = document.documentElement.dir === 'rtl';
    const effectiveLeft = isRTL ? (dir === 'RIGHT') : (dir === 'LEFT');
    const effectiveRight = isRTL ? (dir === 'LEFT') : (dir === 'RIGHT');

    switch (this.currentZone) {
      case 'topbar':
        if (dir === 'DOWN') {
          this.switchZone('shelf');
        } else if (effectiveLeft) {
          this.navigateTopbar(-1);
        } else if (effectiveRight) {
          this.navigateTopbar(1);
        }
        break;

      case 'shelf':
        if (dir === 'UP') {
          this.switchZone('topbar');
        } else if (dir === 'DOWN') {
          this.switchZone('actions');
        } else if (effectiveLeft) {
          this.navigateShelf(-1);
        } else if (effectiveRight) {
          this.navigateShelf(1);
        }
        break;

      case 'actions':
        if (dir === 'UP') {
          this.switchZone('shelf');
        } else if (dir === 'DOWN') {
          this.switchZone('activities');
        } else if (effectiveLeft) {
          this.navigateActions(-1);
        } else if (effectiveRight) {
          this.navigateActions(1);
        }
        break;

      case 'activities':
        if (dir === 'UP') {
          this.switchZone('actions');
        } else if (dir === 'DOWN') {
          this.toggleControlCenter(true);
        } else if (effectiveLeft) {
          this.navigateActivities(-1);
        } else if (effectiveRight) {
          this.navigateActivities(1);
        }
        break;
    }
  }

  switchZone(newZone) {
    this.currentZone = newZone;
    if (window.ps5Audio) window.ps5Audio.playTick();
    this.updateFocusVisuals();
  }

  navigateTopbar(delta) {
    const items = document.querySelectorAll('.top-nav-item');
    if (!items.length) return;

    this.topbarIndex = (this.topbarIndex + delta + items.length) % items.length;
    if (window.ps5Audio) window.ps5Audio.playTick();
    this.updateFocusVisuals();
  }

  navigateShelf(delta) {
    const cards = document.querySelectorAll('.game-card');
    if (!cards.length) return;

    const newIndex = this.shelfIndex + delta;
    if (newIndex >= 0 && newIndex < cards.length) {
      this.shelfIndex = newIndex;
      if (window.ps5Audio) window.ps5Audio.playTick();
      if (window.ps5App) window.ps5App.selectItemByIndex(this.shelfIndex);
      this.updateFocusVisuals();
    }
  }

  navigateActions(delta) {
    const buttons = document.querySelectorAll('.game-stage-actions .btn-ps5');
    if (!buttons.length) return;

    const newIndex = this.actionIndex + delta;
    if (newIndex >= 0 && newIndex < buttons.length) {
      this.actionIndex = newIndex;
      if (window.ps5Audio) window.ps5Audio.playTick();
      this.updateFocusVisuals();
    }
  }

  navigateActivities(delta) {
    const cards = document.querySelectorAll('.activity-card');
    if (!cards.length) return;

    const newIndex = this.activityIndex + delta;
    if (newIndex >= 0 && newIndex < cards.length) {
      this.activityIndex = newIndex;
      if (window.ps5Audio) window.ps5Audio.playTick();
      this.updateFocusVisuals();
    }
  }

  navigateControlCenter(dir) {
    const items = document.querySelectorAll('.cc-item');
    if (!items.length) return;

    const isRTL = document.documentElement.dir === 'rtl';
    const effectiveLeft = isRTL ? (dir === 'RIGHT') : (dir === 'LEFT');
    const effectiveRight = isRTL ? (dir === 'LEFT') : (dir === 'RIGHT');

    if (dir === 'UP') {
      this.toggleControlCenter(false);
      return;
    }

    if (effectiveLeft) {
      this.controlCenterIndex = (this.controlCenterIndex - 1 + items.length) % items.length;
      if (window.ps5Audio) window.ps5Audio.playTick();
      this.updateFocusVisuals();
    } else if (effectiveRight) {
      this.controlCenterIndex = (this.controlCenterIndex + 1) % items.length;
      if (window.ps5Audio) window.ps5Audio.playTick();
      this.updateFocusVisuals();
    }
  }

  navigateModal(dir) {
    const modalItems = document.querySelectorAll('.modal.active [data-modal-nav]');
    if (!modalItems.length) return;

    let currentIndex = Array.from(modalItems).findIndex(el => el.classList.contains('focused'));
    if (currentIndex === -1) currentIndex = 0;

    let nextIndex = currentIndex;
    if (dir === 'DOWN' || dir === 'RIGHT') {
      nextIndex = (currentIndex + 1) % modalItems.length;
    } else if (dir === 'UP' || dir === 'LEFT') {
      nextIndex = (currentIndex - 1 + modalItems.length) % modalItems.length;
    }

    modalItems.forEach(el => el.classList.remove('focused'));
    modalItems[nextIndex].classList.add('focused');
    modalItems[nextIndex].focus();
    if (window.ps5Audio) window.ps5Audio.playTick();
  }

  handleSelect() {
    if (window.ps5Audio) window.ps5Audio.playConfirm();

    if (this.isModalOpen) {
      const activeModalFocused = document.querySelector('.modal.active [data-modal-nav].focused');
      if (activeModalFocused) {
        activeModalFocused.click();
      }
      return;
    }

    if (this.isControlCenterOpen) {
      const items = document.querySelectorAll('.cc-item');
      if (items[this.controlCenterIndex]) {
        items[this.controlCenterIndex].click();
      }
      return;
    }

    switch (this.currentZone) {
      case 'topbar':
        const topItems = document.querySelectorAll('.top-nav-item');
        if (topItems[this.topbarIndex]) {
          topItems[this.topbarIndex].click();
        }
        break;

      case 'shelf':
        // Clicking selected shelf item triggers play
        if (window.ps5App) window.ps5App.launchCurrentItem();
        break;

      case 'actions':
        const actionBtns = document.querySelectorAll('.game-stage-actions .btn-ps5');
        if (actionBtns[this.actionIndex]) {
          actionBtns[this.actionIndex].click();
        }
        break;

      case 'activities':
        const actCards = document.querySelectorAll('.activity-card');
        if (actCards[this.activityIndex]) {
          actCards[this.activityIndex].click();
        }
        break;
    }
  }

  handleBack() {
    if (this.isModalOpen) {
      if (window.ps5Audio) window.ps5Audio.playBack();
      if (window.ps5App) window.ps5App.closeAllModals();
      return;
    }

    if (this.isControlCenterOpen) {
      this.toggleControlCenter(false);
      return;
    }

    if (this.currentZone !== 'shelf') {
      if (window.ps5Audio) window.ps5Audio.playBack();
      this.switchZone('shelf');
    }
  }

  toggleControlCenter(forceOpen) {
    const shouldOpen = forceOpen !== undefined ? forceOpen : !this.isControlCenterOpen;
    this.isControlCenterOpen = shouldOpen;

    const dock = document.getElementById('control-center-dock');
    if (dock) {
      if (shouldOpen) {
        dock.classList.add('active');
        if (window.ps5Audio) window.ps5Audio.playQuickMenu();
      } else {
        dock.classList.remove('active');
        if (window.ps5Audio) window.ps5Audio.playBack();
        this.currentZone = 'shelf';
      }
    }

    this.updateFocusVisuals();
  }

  updateFocusVisuals() {
    // Clear all existing focus classes
    document.querySelectorAll('.is-focused').forEach(el => el.classList.remove('is-focused'));

    if (this.isControlCenterOpen) {
      const items = document.querySelectorAll('.cc-item');
      if (items[this.controlCenterIndex]) {
        items[this.controlCenterIndex].classList.add('is-focused');
      }
      return;
    }

    if (this.currentZone === 'topbar') {
      const items = document.querySelectorAll('.top-nav-item');
      if (items[this.topbarIndex]) {
        items[this.topbarIndex].classList.add('is-focused');
      }
    } else if (this.currentZone === 'shelf') {
      const cards = document.querySelectorAll('.game-card');
      if (cards[this.shelfIndex]) {
        cards[this.shelfIndex].classList.add('is-focused');
        cards[this.shelfIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    } else if (this.currentZone === 'actions') {
      const buttons = document.querySelectorAll('.game-stage-actions .btn-ps5');
      if (buttons[this.actionIndex]) {
        buttons[this.actionIndex].classList.add('is-focused');
      }
    } else if (this.currentZone === 'activities') {
      const actCards = document.querySelectorAll('.activity-card');
      if (actCards[this.activityIndex]) {
        actCards[this.activityIndex].classList.add('is-focused');
        actCards[this.activityIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  setHoverFocus(element) {
    if (!element) return;

    // Check what kind of item it is
    if (element.classList.contains('game-card')) {
      const index = parseInt(element.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        this.currentZone = 'shelf';
        this.shelfIndex = index;
        if (window.ps5App) window.ps5App.selectItemByIndex(index);
        this.updateFocusVisuals();
      }
    } else if (element.classList.contains('top-nav-item')) {
      const index = Array.from(document.querySelectorAll('.top-nav-item')).indexOf(element);
      if (index !== -1) {
        this.currentZone = 'topbar';
        this.topbarIndex = index;
        this.updateFocusVisuals();
      }
    } else if (element.classList.contains('btn-ps5')) {
      const index = Array.from(document.querySelectorAll('.game-stage-actions .btn-ps5')).indexOf(element);
      if (index !== -1) {
        this.currentZone = 'actions';
        this.actionIndex = index;
        this.updateFocusVisuals();
      }
    } else if (element.classList.contains('activity-card')) {
      const index = Array.from(document.querySelectorAll('.activity-card')).indexOf(element);
      if (index !== -1) {
        this.currentZone = 'activities';
        this.activityIndex = index;
        this.updateFocusVisuals();
      }
    } else if (element.classList.contains('cc-item')) {
      const index = Array.from(document.querySelectorAll('.cc-item')).indexOf(element);
      if (index !== -1) {
        this.controlCenterIndex = index;
        this.updateFocusVisuals();
      }
    }
  }

  /* ---------------- Gamepad (DualSense / Controller) API ---------------- */
  initGamepad() {
    window.addEventListener('gamepadconnected', (e) => {
      this.gamepadConnected = true;
      if (window.ps5App) {
        window.ps5App.showToast(`🎮 متصل: ${e.gamepad.id.split('(')[0] || 'DualSense'}`);
      }
    });

    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadConnected = false;
    });

    const pollGamepad = (time) => {
      this.pollGamepadInputs(time);
      requestAnimationFrame(pollGamepad);
    };
    requestAnimationFrame(pollGamepad);
  }

  pollGamepadInputs(now) {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0] || gamepads[1];
    if (!gp) return;

    const deadzone = 0.45;
    const cooldown = 180; // ms between repeated steps

    // D-Pad buttons: 12=Up, 13=Down, 14=Left, 15=Right
    // Analog stick axes: 0=X, 1=Y
    const axisX = gp.axes[0] || 0;
    const axisY = gp.axes[1] || 0;

    const isLeft = (gp.buttons[14] && gp.buttons[14].pressed) || axisX < -deadzone;
    const isRight = (gp.buttons[15] && gp.buttons[15].pressed) || axisX > deadzone;
    const isUp = (gp.buttons[12] && gp.buttons[12].pressed) || axisY < -deadzone;
    const isDown = (gp.buttons[13] && gp.buttons[13].pressed) || axisY > deadzone;

    // Cross / A button = 0
    // Circle / B button = 1
    // PS / Guide button = 16 or 8 or 9
    // L1 = 4, R1 = 5
    const isCross = gp.buttons[0] && gp.buttons[0].pressed;
    const isCircle = gp.buttons[1] && gp.buttons[1].pressed;
    const isL1 = gp.buttons[4] && gp.buttons[4].pressed;
    const isR1 = gp.buttons[5] && gp.buttons[5].pressed;
    const isPS = (gp.buttons[16] && gp.buttons[16].pressed) || (gp.buttons[8] && gp.buttons[8].pressed);

    if (isLeft && now - this.gamepadDebounce.left > cooldown) {
      this.navigateDirection('LEFT');
      this.gamepadDebounce.left = now;
    }
    if (isRight && now - this.gamepadDebounce.right > cooldown) {
      this.navigateDirection('RIGHT');
      this.gamepadDebounce.right = now;
    }
    if (isUp && now - this.gamepadDebounce.up > cooldown) {
      this.navigateDirection('UP');
      this.gamepadDebounce.up = now;
    }
    if (isDown && now - this.gamepadDebounce.down > cooldown) {
      this.navigateDirection('DOWN');
      this.gamepadDebounce.down = now;
    }
    if (isCross && now - this.gamepadDebounce.a > 300) {
      this.handleSelect();
      this.gamepadDebounce.a = now;
    }
    if (isCircle && now - this.gamepadDebounce.b > 300) {
      this.handleBack();
      this.gamepadDebounce.b = now;
    }
    if (isPS && now - this.gamepadDebounce.ps > 400) {
      this.toggleControlCenter();
      this.gamepadDebounce.ps = now;
    }
    if (isL1 && now - this.gamepadDebounce.l1 > 300) {
      if (window.ps5App) window.ps5App.switchTab('games');
      this.gamepadDebounce.l1 = now;
    }
    if (isR1 && now - this.gamepadDebounce.r1 > 300) {
      if (window.ps5App) window.ps5App.switchTab('media');
      this.gamepadDebounce.r1 = now;
    }
  }
}

window.ps5Nav = new PS5NavigationEngine();
