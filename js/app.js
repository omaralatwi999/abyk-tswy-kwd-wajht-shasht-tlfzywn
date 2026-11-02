/**
 * Main Application Orchestrator for PS5 UI
 * Manages UI rendering, dynamic background crossfade, tabs, search, settings,
 * game launcher, and interactive modals.
 */

class PS5App {
  constructor() {
    this.currentTab = 'games'; // 'games' | 'media'
    this.currentLanguage = 'ar'; // Default Arabic as requested
    this.selectedIndex = 1; // Marvel's Spider-Man 2
    this.activeBgLayer = 1;
    this.searchQuery = '';

    this.init();
  }

  init() {
    this.setupClock();
    this.renderCurrentTab();
    this.setupEventListeners();
    this.updateBackground(this.getCurrentList()[this.selectedIndex]);

    // Check for query params for deep-linking or automated tests
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'settings') {
      setTimeout(() => this.openSettingsModal(), 100);
    } else if (viewParam === 'media') {
      setTimeout(() => this.switchTab('media'), 100);
    } else if (viewParam === 'controlcenter') {
      setTimeout(() => {
        if (window.ps5Nav) window.ps5Nav.toggleControlCenter(true);
      }, 100);
    } else if (viewParam === 'launcher') {
      setTimeout(() => this.launchCurrentItem(), 100);
    }
  }

  getCurrentList() {
    return this.currentTab === 'games' ? PS5_DATA.games : PS5_DATA.media;
  }

  getCurrentItem() {
    const list = this.getCurrentList();
    return list[this.selectedIndex] || list[0];
  }

  setupClock() {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const isArabic = this.currentLanguage === 'ar';

      // 12-hour format with period
      const ampm = hours >= 12 ? (isArabic ? 'م' : 'PM') : (isArabic ? 'ص' : 'AM');
      hours = hours % 12;
      hours = hours ? hours : 12;

      const clockEl = document.getElementById('ps5-clock');
      if (clockEl) {
        clockEl.textContent = `${hours}:${minutes} ${ampm}`;
      }
    };

    updateTime();
    setInterval(updateTime, 1000);
  }

  setupEventListeners() {
    // Top Tabs
    const tabGames = document.getElementById('tab-games');
    const tabMedia = document.getElementById('tab-media');

    if (tabGames) {
      tabGames.addEventListener('click', () => this.switchTab('games'));
    }
    if (tabMedia) {
      tabMedia.addEventListener('click', () => this.switchTab('media'));
    }

    // Top Action Buttons
    const btnSearch = document.getElementById('btn-top-search');
    const btnSettings = document.getElementById('btn-top-settings');
    const btnProfile = document.getElementById('btn-top-profile');

    if (btnSearch) {
      btnSearch.addEventListener('click', () => this.openSearchModal());
    }
    if (btnSettings) {
      btnSettings.addEventListener('click', () => this.openSettingsModal());
    }
    if (btnProfile) {
      btnProfile.addEventListener('click', () => this.openProfileModal());
    }

    // Control Center Dock Button
    const btnPSLogo = document.getElementById('btn-ps-home');
    if (btnPSLogo) {
      btnPSLogo.addEventListener('click', () => {
        if (window.ps5Nav) window.ps5Nav.toggleControlCenter();
      });
    }

    // Modal close backdrops
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeAllModals();
        }
      });
    });
  }

  switchTab(tabName) {
    if (this.currentTab === tabName) return;

    this.currentTab = tabName;
    this.selectedIndex = 0;

    // Visual tab indicator
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    if (window.ps5Audio) window.ps5Audio.playTabSwitch();

    // Re-render shelf
    this.renderCurrentTab();

    if (window.ps5Nav) {
      window.ps5Nav.shelfIndex = 0;
      window.ps5Nav.updateFocusVisuals();
    }
  }

  renderCurrentTab() {
    const list = this.getCurrentList();
    const shelfContainer = document.getElementById('games-shelf');
    if (!shelfContainer) return;

    shelfContainer.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `game-card ${index === this.selectedIndex ? 'active' : ''}`;
      card.setAttribute('data-index', index);
      card.setAttribute('data-nav-id', item.id);
      card.setAttribute('data-nav-item', 'true');

      card.innerHTML = `
        <div class="card-inner" style="border-color: ${item.accentColor}44;">
          <div class="card-glow" style="background: radial-gradient(circle, ${item.accentColor}33 0%, transparent 70%);"></div>
          ${item.vectorArt ? `<div class="card-vector-wrapper">${item.vectorArt}</div>` : ''}
          ${item.poster ? `<img class="card-cover-img" src="${item.poster}" alt="${item.title[this.currentLanguage]}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.remove()" />` : ''}
          <div class="card-overlay">
            <span class="card-badge">${item.badge}</span>
          </div>
          <div class="card-active-border"></div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectItemByIndex(index);
        this.launchCurrentItem();
      });

      card.addEventListener('mouseenter', () => {
        if (this.selectedIndex !== index) {
          this.selectItemByIndex(index);
        }
      });

      shelfContainer.appendChild(card);
    });

    this.selectItemByIndex(this.selectedIndex);
  }

  selectItemByIndex(index) {
    const list = this.getCurrentList();
    if (index < 0 || index >= list.length) return;

    this.selectedIndex = index;
    const item = list[index];

    // Update active class on shelf cards
    document.querySelectorAll('.game-card').forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    // Update Stage info & Activities
    this.renderGameStage(item);

    // Cross-fade background
    this.updateBackground(item);

    // Keep active card centered smoothly
    const activeCard = document.querySelector(`.game-card[data-index="${index}"]`);
    if (activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  renderGameStage(item) {
    const stageContainer = document.getElementById('game-stage');
    if (!stageContainer) return;

    const lang = this.currentLanguage;
    const isStore = item.type === 'store';

    // Format trophies
    let trophyHTML = '';
    if (item.trophies) {
      trophyHTML = `
        <div class="trophy-pill">
          <svg viewBox="0 0 24 24" class="trophy-icon">
            <path fill="#ffd700" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
          </svg>
          <div class="trophy-stats">
            <span class="trophy-progress-txt">${item.trophies.percent}%</span>
            <div class="trophy-bar">
              <div class="trophy-bar-fill" style="width: ${item.trophies.percent}%;"></div>
            </div>
            <span class="trophy-sub-txt">${item.trophies.earned}/${item.trophies.total}</span>
          </div>
        </div>
      `;
    }

    // Format activities
    let activitiesHTML = '';
    if (item.activities && item.activities.length) {
      activitiesHTML = item.activities.map((act, idx) => `
        <div class="activity-card" data-index="${idx}" data-nav-item="true" style="background: ${act.bg};">
          <div class="activity-content">
            <span class="activity-tag">${act.tag[lang]}</span>
            <h4 class="activity-title">${act.title[lang]}</h4>
            <p class="activity-desc">${act.subtitle[lang]}</p>
          </div>
          <div class="activity-arrow">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      `).join('');
    }

    stageContainer.innerHTML = `
      <div class="stage-header">
        <div class="stage-badge-row">
          <span class="stage-ps-badge">${item.badge}</span>
          <span class="stage-last-played">${item.lastPlayed[lang]}</span>
        </div>
        <h1 class="stage-title">${item.title[lang]}</h1>
        <p class="stage-desc">${item.subtitle[lang]}</p>
      </div>

      <div class="game-stage-actions">
        <button id="btn-main-action" class="btn-ps5 btn-primary" data-nav-item="true">
          <svg viewBox="0 0 24 24" class="btn-icon">
            <path fill="currentColor" d="M8 5v14l11-7z"/>
          </svg>
          <span>${item.primaryAction[lang]}</span>
        </button>

        <button id="btn-options-action" class="btn-ps5 btn-secondary" data-nav-item="true" title="Options">
          <svg viewBox="0 0 24 24" class="btn-icon">
            <path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>

        ${trophyHTML}
      </div>

      <div class="stage-activities-wrapper">
        <div class="activities-header">
          <span class="activities-label">${lang === 'ar' ? 'الأنشطة الموصى بها والمتابعة السريعة' : 'Official Activities & Quick Resume'}</span>
        </div>
        <div class="activities-shelf" id="activities-shelf">
          ${activitiesHTML}
        </div>
      </div>
    `;

    // Bind action buttons
    const btnPlay = document.getElementById('btn-main-action');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => this.launchCurrentItem());
    }

    const btnOpts = document.getElementById('btn-options-action');
    if (btnOpts) {
      btnOpts.addEventListener('click', () => {
        this.showToast(lang === 'ar' ? '⚙️ خيارات اللعبة متوفرة' : '⚙️ Game options ready');
      });
    }

    // Bind activity cards
    stageContainer.querySelectorAll('.activity-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        const act = item.activities[idx];
        if (act) {
          this.launchActivity(act);
        }
      });
    });
  }

  updateBackground(item) {
    if (!item) return;

    const layer1 = document.getElementById('bg-layer-1');
    const layer2 = document.getElementById('bg-layer-2');
    if (!layer1 || !layer2) return;

    const targetLayer = this.activeBgLayer === 1 ? layer2 : layer1;
    const currentLayer = this.activeBgLayer === 1 ? layer1 : layer2;

    targetLayer.style.backgroundImage = `url("${item.bgImage}"), ${item.bgFallbackGradient}`;
    targetLayer.style.opacity = '1';
    currentLayer.style.opacity = '0';

    this.activeBgLayer = this.activeBgLayer === 1 ? 2 : 1;

    // Set CSS theme variable for accent glow
    document.documentElement.style.setProperty('--ps-accent', item.accentColor);
  }

  launchCurrentItem() {
    const item = this.getCurrentItem();
    if (window.ps5Audio) window.ps5Audio.playLaunch();

    const launcher = document.getElementById('game-launcher-modal');
    if (!launcher) return;

    const lang = this.currentLanguage;
    const titleEl = launcher.querySelector('.launcher-game-title');
    const bgEl = launcher.querySelector('.launcher-bg');
    const subtitleEl = launcher.querySelector('.launcher-subtitle');

    if (titleEl) titleEl.textContent = item.title[lang];
    if (subtitleEl) subtitleEl.textContent = item.subtitle[lang];
    if (bgEl) {
      bgEl.style.backgroundImage = `url("${item.bgImage}"), ${item.bgFallbackGradient}`;
    }

    launcher.classList.add('active');
    this.openModal('game-launcher-modal');

    // Simulate progress bar
    const bar = launcher.querySelector('.launcher-progress-bar');
    if (bar) {
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = '100%'; }, 50);
    }
  }

  launchActivity(activity) {
    if (window.ps5Audio) window.ps5Audio.playLaunch();
    const lang = this.currentLanguage;
    this.showToast(`🚀 ${lang === 'ar' ? 'جاري استئناف' : 'Resuming'}: ${activity.title[lang]}`);
  }

  /* ---------------- Modals Management ---------------- */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    if (window.ps5Nav) {
      window.ps5Nav.isModalOpen = true;
      window.ps5Nav.currentModalId = modalId;
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    if (window.ps5Nav) {
      window.ps5Nav.isModalOpen = false;
      window.ps5Nav.currentModalId = null;
      window.ps5Nav.updateFocusVisuals();
    }
  }

  openSearchModal() {
    if (window.ps5Audio) window.ps5Audio.playConfirm();
    this.openModal('search-modal');
    const input = document.getElementById('search-input');
    if (input) {
      input.value = '';
      input.focus();
      this.filterSearch('');
    }
  }

  filterSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    const all = [...PS5_DATA.games, ...PS5_DATA.media];
    const q = query.trim().toLowerCase();
    const filtered = q
      ? all.filter(it => it.title.en.toLowerCase().includes(q) || it.title.ar.includes(q))
      : all;

    const lang = this.currentLanguage;
    resultsContainer.innerHTML = filtered.map(item => `
      <div class="search-item" data-modal-nav="true" onclick="ps5App.selectAndOpenItem('${item.id}')">
        <img src="${item.poster}" class="search-item-img" alt="${item.title[lang]}"/>
        <div class="search-item-info">
          <div class="search-item-title">${item.title[lang]}</div>
          <div class="search-item-badge">${item.badge}</div>
        </div>
      </div>
    `).join('');
  }

  selectAndOpenItem(itemId) {
    this.closeAllModals();

    const gIndex = PS5_DATA.games.findIndex(g => g.id === itemId);
    if (gIndex !== -1) {
      this.switchTab('games');
      this.selectItemByIndex(gIndex);
      return;
    }

    const mIndex = PS5_DATA.media.findIndex(m => m.id === itemId);
    if (mIndex !== -1) {
      this.switchTab('media');
      this.selectItemByIndex(mIndex);
    }
  }

  openSettingsModal() {
    if (window.ps5Audio) window.ps5Audio.playConfirm();
    this.openModal('settings-modal');
  }

  openProfileModal() {
    if (window.ps5Audio) window.ps5Audio.playConfirm();
    this.openModal('profile-modal');
  }

  /* ---------------- Settings Actions ---------------- */
  setRemoteSensitivity(speed) {
    if (window.airMouse) {
      window.airMouse.setSensitivity(speed);
    }
    const labels = {
      normal: { ar: 'السرعة العادية (1.0x)', en: 'Normal Speed (1.0x)' },
      fast: { ar: 'سريع وسلس جداً (1.6x)', en: 'Very Fast & Smooth (1.6x)' },
      ultra: { ar: 'فائق السرعة وخفيف (2.4x)', en: 'Hyper Ultra Fast (2.4x)' }
    };
    this.showToast(`🎯 ${this.currentLanguage === 'ar' ? 'تم ضبط حساسية الريموت والماوس' : 'Remote sensitivity updated'}: ${labels[speed][this.currentLanguage]}`);
  }

  toggleSound() {
    if (window.ps5Audio) {
      const active = window.ps5Audio.toggleSound();
      const txt = active
        ? (this.currentLanguage === 'ar' ? '🔊 تم تفعيل المؤثرات الصوتية' : '🔊 Sound Effects Enabled')
        : (this.currentLanguage === 'ar' ? '🔇 تم كتم المؤثرات الصوتية' : '🔇 Sound Effects Muted');
      this.showToast(txt);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      this.showToast(this.currentLanguage === 'ar' ? '📺 ملء الشاشة مفعل' : '📺 Fullscreen Active');
    } else {
      document.exitFullscreen().catch(() => {});
      this.showToast(this.currentLanguage === 'ar' ? '📺 تم الخروج من ملء الشاشة' : '📺 Fullscreen Exited');
    }
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    const isAr = this.currentLanguage === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';

    // Update text labels in DOM
    document.querySelectorAll('[data-i18n-ar]').forEach(el => {
      el.textContent = isAr ? el.getAttribute('data-i18n-ar') : el.getAttribute('data-i18n-en');
    });

    this.renderCurrentTab();
    this.showToast(isAr ? '🌐 تم تغيير اللغة إلى العربية' : '🌐 Language switched to English');
  }

  /* ---------------- PS5 Toast Notification System ---------------- */
  showToast(message, duration = 3200) {
    const container = document.getElementById('ps5-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'ps5-toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </div>
      <div class="toast-body">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  /* ---------------- Quick Menu / Control Center Actions ---------------- */
  triggerControlCenterAction(action) {
    const lang = this.currentLanguage;
    if (window.ps5Audio) window.ps5Audio.playConfirm();

    switch (action) {
      case 'home':
        if (window.ps5Nav) window.ps5Nav.toggleControlCenter(false);
        this.switchTab('games');
        break;
      case 'switcher':
        this.openSearchModal();
        break;
      case 'notifications':
        this.showToast(lang === 'ar' ? '🔔 لا توجد إشعارات جديدة حالياً' : '🔔 No new notifications');
        break;
      case 'gamebase':
        this.openProfileModal();
        break;
      case 'music':
        this.switchTab('media');
        this.selectItemByIndex(4); // Spotify
        if (window.ps5Nav) window.ps5Nav.toggleControlCenter(false);
        break;
      case 'settings':
        this.openSettingsModal();
        break;
      case 'sound':
        this.toggleSound();
        break;
      case 'power':
        this.simulatePowerMenu();
        break;
      default:
        this.showToast(`✨ ${lang === 'ar' ? 'ميزة نشطة' : 'Active Feature'}: ${action}`);
    }
  }

  simulatePowerMenu() {
    const lang = this.currentLanguage;
    const choice = confirm(lang === 'ar' ? 'هل ترغب في وضع السكون للشاشة؟' : 'Enter rest mode?');
    if (choice) {
      document.body.classList.add('ps5-sleep-mode');
      this.showToast(lang === 'ar' ? '🌙 وضع السكون.. اضغط أي زر للاستيقاظ' : '🌙 Rest Mode.. Press any key');
      const wakeUp = () => {
        document.body.classList.remove('ps5-sleep-mode');
        window.removeEventListener('keydown', wakeUp);
        window.removeEventListener('click', wakeUp);
      };
      setTimeout(() => {
        window.addEventListener('keydown', wakeUp, { once: true });
        window.addEventListener('click', wakeUp, { once: true });
      }, 500);
    }
  }
}

// Instantiate and expose globally
window.ps5App = new PS5App();
