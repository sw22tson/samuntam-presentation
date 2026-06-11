/* ============================================================
   Obsidian Editorial — Presentation Engine (Vanilla JS)
   State management for slides, fragments, and interactions
   ============================================================ */

(function () {
  'use strict';

  // ---- State ----
  const state = {
    currentSlide: 0,
    totalSlides: 0,
    fragmentMap: {},      // { slideIndex: [fragGroup1, fragGroup2, ...] }
    fragmentState: {},    // { slideIndex: currentFragmentIndex (-1 = none revealed) }
    slides: [],
  };

  // ---- DOM References ----
  const surface = document.getElementById('presentation-surface');
  const progressBar = document.getElementById('progress-bar');

  // ---- Initialize ----
  function init() {
    state.slides = Array.from(document.querySelectorAll('.slide'));
    state.totalSlides = state.slides.length;

    // Build fragment map for each slide
    state.slides.forEach((slide, idx) => {
      const frags = slide.querySelectorAll('.fragment');
      const groups = [];
      const seen = new Set();

      frags.forEach(frag => {
        const group = frag.getAttribute('data-frag-group');
        if (group && !seen.has(group)) {
          seen.add(group);
          groups.push(group);
        }
      });

      // Sort groups naturally
      groups.sort((a, b) => {
        const [, aIdx] = a.split('-').map(Number);
        const [, bIdx] = b.split('-').map(Number);
        return aIdx - bIdx;
      });

      state.fragmentMap[idx] = groups;
      state.fragmentState[idx] = -1; // nothing revealed
    });

    // Show first slide
    goToSlide(0);
    updateProgress();

    // Keyboard bindings
    document.addEventListener('keydown', handleKeydown);

    // Timeline slider interaction (Slide 5 — capability curve)
    const slider = document.getElementById('timeline-slider');
    if (slider) {
      slider.addEventListener('input', handleSlider);
    }

    // AI 2027 slider interaction (Slide 4 — methodology)
    const ai2027Slider = document.getElementById('ai2027-slider');
    if (ai2027Slider) {
      ai2027Slider.addEventListener('input', handleAI2027Slider);
      // Initialize the diagram
      initAI2027Diagram();
    }

    // Prevent iframe from capturing keyboard when slide is active
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'IFRAME') return;
      surface.focus();
    });
  }

  // ---- Keyboard Handler ----
  function handleKeydown(e) {
    const key = e.key;
    const shift = e.shiftKey;

    switch (key) {
      case 'ArrowRight':
      case 'PageDown':
        e.preventDefault();
        navigateForward();
        break;
      case ' ':
        e.preventDefault();
        if (shift) {
          navigateBackward();
        } else {
          navigateForward();
        }
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        navigateBackward();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(state.totalSlides - 1);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
    }
  }

  // ---- Navigation ----
  function navigateForward() {
    const idx = state.currentSlide;
    const frags = state.fragmentMap[idx];
    const fragIdx = state.fragmentState[idx];

    // If there are unrevealed fragments, reveal next
    if (frags.length > 0 && fragIdx < frags.length - 1) {
      state.fragmentState[idx]++;
      revealFragments(idx);
      applySlideSpecificLogic(idx, 'forward');
    } else {
      // Move to next slide
      if (idx < state.totalSlides - 1) {
        goToSlide(idx + 1);
      }
    }
  }

  function navigateBackward() {
    const idx = state.currentSlide;
    const fragIdx = state.fragmentState[idx];

    // If there are revealed fragments, hide last
    if (fragIdx >= 0) {
      applySlideSpecificLogic(idx, 'backward');
      state.fragmentState[idx]--;
      revealFragments(idx);
    } else {
      // Move to previous slide (reveal all its fragments)
      if (idx > 0) {
        const prevIdx = idx - 1;
        const prevFrags = state.fragmentMap[prevIdx];
        state.fragmentState[prevIdx] = prevFrags.length - 1;
        goToSlide(prevIdx);
        revealFragments(prevIdx);
        applySlideSpecificLogicFull(prevIdx);
      }
    }
  }

  function goToSlide(idx) {
    if (idx < 0 || idx >= state.totalSlides) return;

    // Deactivate current
    state.slides[state.currentSlide].classList.remove('active');

    // Reset fragment state for newly entered slide (unless going backward)
    if (idx > state.currentSlide) {
      state.fragmentState[idx] = -1;
      resetFragments(idx);
      resetSlideSpecificLogic(idx);
    }

    // Activate new
    state.currentSlide = idx;
    state.slides[idx].classList.add('active');
    revealFragments(idx);
    updateProgress();
  }

  // ---- Fragment System ----
  function revealFragments(slideIdx) {
    const slide = state.slides[slideIdx];
    const frags = state.fragmentMap[slideIdx];
    const currentFrag = state.fragmentState[slideIdx];

    frags.forEach((group, i) => {
      const elements = slide.querySelectorAll(`[data-frag-group="${group}"]`);
      elements.forEach(el => {
        if (i <= currentFrag) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
      });
    });
  }

  function resetFragments(slideIdx) {
    const slide = state.slides[slideIdx];
    const allFrags = slide.querySelectorAll('.fragment');
    allFrags.forEach(f => f.classList.remove('visible'));
  }

  // ---- Slide-Specific Logic ----
  function applySlideSpecificLogic(slideIdx, direction) {
    const fragIdx = state.fragmentState[slideIdx];

    // Slide 2 (index 1) — Timeline
    if (slideIdx === 1) {
      const timeline = document.getElementById('timeline-container');
      if (direction === 'forward' && fragIdx === 1) {
        // Fragment 2: dim timeline, show key question
        timeline.classList.add('dimmed');
      }
      if (direction === 'backward' && fragIdx === 1) {
        timeline.classList.remove('dimmed');
      }
    }

    // Slide 5 (index 4) — Theory: dim graph on fragment
    if (slideIdx === 4) {
      const graph = document.getElementById('ai2027-diagram');
      if (direction === 'forward' && fragIdx === 0) {
        graph.classList.add('dimmed');
      }
      if (direction === 'backward' && fragIdx === 0) {
        graph.classList.remove('dimmed');
      }
    }

    // Slide 6 (index 5) — Evidence: dim chart and card
    if (slideIdx === 5) {
      const chart = document.getElementById('layoffs-chart');
      const card1 = document.getElementById('ev-card-1');

      if (direction === 'forward') {
        if (fragIdx === 0) {
          // Just show card 1
        }
      }

      if (direction === 'backward') {
        if (fragIdx === 0) {
          // Just hide card 1
        }
      }
    }

    // Slide 7 (index 6) — Conclusion: strike-through
    if (slideIdx === 6) {
      const strike1 = document.getElementById('strike-1');
      const correction1 = document.getElementById('correction-1');
      const strike2 = document.getElementById('strike-2');

      if (direction === 'forward') {
        if (fragIdx === 0) {
          strike1.classList.add('struck');
          setTimeout(() => correction1.classList.add('visible'), 400);
        }
        if (fragIdx === 1) {
          strike2.classList.add('struck');
          setTimeout(() => strike2.classList.add('faded'), 600);
        }
      }
      if (direction === 'backward') {
        if (fragIdx === 1) {
          strike2.classList.remove('faded');
          strike2.classList.remove('struck');
        }
        if (fragIdx === 0) {
          correction1.classList.remove('visible');
          strike1.classList.remove('struck');
        }
      }
    }
  }

  // Apply all fragment logic fully (used when going back to a prev slide)
  function applySlideSpecificLogicFull(slideIdx) {
    const fragIdx = state.fragmentState[slideIdx];

    if (slideIdx === 1 && fragIdx >= 1) {
      document.getElementById('timeline-container').classList.add('dimmed');
    }
    if (slideIdx === 4 && fragIdx >= 0) {
      document.getElementById('ai2027-diagram').classList.add('dimmed');
    }
    if (slideIdx === 5) {
      const chart = document.getElementById('layoffs-chart');
      const card1 = document.getElementById('ev-card-1');
      if (fragIdx >= 0) {
        // card1 is visible, no dimming needed
      }
    }
    if (slideIdx === 6) {
      const strike1 = document.getElementById('strike-1');
      const correction1 = document.getElementById('correction-1');
      const strike2 = document.getElementById('strike-2');
      if (fragIdx >= 0) {
        strike1.classList.add('struck');
        correction1.classList.add('visible');
      }
      if (fragIdx >= 1) {
        strike2.classList.add('struck');
        strike2.classList.add('faded');
      }
    }
  }

  function resetSlideSpecificLogic(slideIdx) {
    if (slideIdx === 1) {
      document.getElementById('timeline-container').classList.remove('dimmed');
    }
    if (slideIdx === 4) {
      document.getElementById('ai2027-diagram').classList.remove('dimmed');
    }
    if (slideIdx === 5) {
      const chart = document.getElementById('layoffs-chart');
      const card1 = document.getElementById('ev-card-1');
      chart.classList.remove('dimmed');
      card1.classList.remove('dimmed');
    }
    if (slideIdx === 6) {
      const strike1 = document.getElementById('strike-1');
      const correction1 = document.getElementById('correction-1');
      const strike2 = document.getElementById('strike-2');
      strike1.classList.remove('struck');
      correction1.classList.remove('visible');
      strike2.classList.remove('struck');
      strike2.classList.remove('faded');
    }
  }

  // ---- Slide 5 Slider (Capability Curve) ----
  function handleSlider(e) {
    const value = parseFloat(e.target.value);
    const marker = document.getElementById('curve-marker');
    const label = document.getElementById('curve-marker-label');

    if (!marker || !label) return;

    const t = (value - 2020) / 10; // 0..1
    const x = 80 + t * 620;
    const y = 255 - (225 * Math.pow(t, 1.8));

    marker.setAttribute('cx', x);
    marker.setAttribute('cy', y);
    label.setAttribute('x', x);
    label.setAttribute('y', y - 15);
    label.textContent = Math.round(value);
  }

  // ---- AI 2027 Diagram Smooth Interpolation ----
  const AI2027_STAGES = [
    { // t=0 (Sep 2025)
      date: 'Sep 2025',
      pTop: [40, 110, 160, 105, 300, 95, 450, 80],
      pMid: [40, 120, 160, 115, 300, 105, 450, 90],
      pBot: [40, 130, 160, 125, 300, 115, 450, 100],
      m1Op: 1, m1X: 240, m1Y: 100, m1T: 'Unreliable Agent',
      m2Op: 0, m2X: 240, m2Y: 100, m2T: 'Reliable Agent',
      m3Op: 0, m3X: 240, m3Y: 100, m3T: 'Superhuman coder',
      x2Op: 0, x3Op: 0,
      dTop: [450, 80], dMid: [450, 90], dBot: [450, 100],
      copiesNum: 5000, copiesStr: 'Unreliable Agent copies thinking at 10x human speed',
      blocks: 6,
      approval: -25, revenue: 122, valuation: 6098, importance: 1, datacenters: 3509, timeline: 2040,
      donutGreen: 40, donutGrey: 20,
      caps: [1, 1, 1, 0, 0, 1], // H, B, C, R, P, F
      catEx: 8, catEm: 4, catSci: 10,
      catExSpc: 1, catSciSpc: [1, 5, 8] // special icons indices
    },
    { // t=1 (Sep 2026)
      date: 'Sep 2026',
      pTop: [40, 110, 160, 100, 300, 80, 450, 50],
      pMid: [40, 120, 160, 110, 300, 90, 450, 60],
      pBot: [40, 130, 160, 120, 300, 100, 450, 70],
      m1Op: 1, m1X: 160, m1Y: 95, m1T: 'Unreliable Agent',
      m2Op: 1, m2X: 350, m2Y: 70, m2T: 'Reliable Agent',
      m3Op: 0, m3X: 350, m3Y: 70, m3T: 'Superhuman coder',
      x2Op: 1, x3Op: 0,
      dTop: [450, 50], dMid: [450, 60], dBot: [450, 70],
      copiesNum: 50000, copiesStr: 'Reliable Agent copies thinking at 15x human speed',
      blocks: 50,
      approval: -26, revenue: 379, valuation: 2000, importance: 2, datacenters: 5241, timeline: 2038,
      donutGreen: 80, donutGrey: 40,
      caps: [2, 2, 2, 0, 0, 2],
      catEx: 9, catEm: 3, catSci: 10,
      catExSpc: 1, catSciSpc: [1, 5, 8]
    },
    { // t=2 (May 2027)
      date: 'May 2027',
      pTop: [40, 110, 200, 100, 350, 60, 450, 30],
      pMid: [40, 120, 200, 110, 350, 80, 450, 60],
      pBot: [40, 130, 200, 120, 350, 90, 450, 70],
      m1Op: 0, m1X: 160, m1Y: 95, m1T: 'Unreliable Agent',
      m2Op: 1, m2X: 200, m2Y: 95, m2T: 'Reliable Agent',
      m3Op: 1, m3X: 380, m3Y: 40, m3T: 'Superhuman coder',
      x2Op: 1, x3Op: 1,
      dTop: [450, 30], dMid: [450, 60], dBot: [450, 70],
      copiesNum: 220000, copiesStr: 'Superhuman coder copies thinking at 31x human speed',
      blocks: 120,
      approval: -29, revenue: 819, valuation: 4000, importance: 6, datacenters: 7114, timeline: 2035,
      donutGreen: 120, donutGrey: 60,
      caps: [2, 2, 2, 0, 2, 2],
      catEx: 11, catEm: 4, catSci: 8,
      catExSpc: 1, catSciSpc: [1, 5, 7]
    },
    { // t=3 (Aug 2027)
      date: 'Aug 2027',
      pTop: [40, 110, 200, 100, 400, 40, 460, 10],
      pMid: [40, 120, 200, 110, 400, 60, 460, 40],
      pBot: [40, 130, 200, 120, 400, 70, 460, 50],
      m1Op: 0, m1X: 160, m1Y: 95, m1T: 'Unreliable Agent',
      m2Op: 1, m2X: 180, m2Y: 95, m2T: 'Reliable Agent',
      m3Op: 1, m3X: 320, m3Y: 35, m3T: 'Superhuman coder',
      x2Op: 1, x3Op: 1,
      dTop: [460, 10], dMid: [460, 40], dBot: [460, 50],
      copiesNum: 270000, copiesStr: 'Superhuman coder copies thinking at 38x human speed',
      blocks: 160,
      approval: -35, revenue: 1201, valuation: 5000, importance: 10, datacenters: 8083, timeline: 2034,
      donutGreen: 160, donutGrey: 80,
      caps: [2, 2, 2, 2, 2, 2],
      catEx: 14, catEm: 5, catSci: 6,
      catExSpc: 1, catSciSpc: [1, 5]
    },
    { // t=4 (Aug 2027 max)
      date: 'Aug 2027',
      pTop: [40, 110, 200, 100, 400, 40, 480, 0],
      pMid: [40, 120, 200, 110, 400, 60, 480, 20],
      pBot: [40, 130, 200, 120, 400, 70, 480, 30],
      m1Op: 0, m1X: 160, m1Y: 95, m1T: 'Unreliable Agent',
      m2Op: 1, m2X: 180, m2Y: 95, m2T: 'Reliable Agent',
      m3Op: 1, m3X: 320, m3Y: 35, m3T: 'Superhuman coder',
      x2Op: 1, x3Op: 1,
      dTop: [480, 0], dMid: [480, 20], dBot: [480, 30],
      copiesNum: 270000, copiesStr: 'Superhuman coder copies thinking at 38x human speed',
      blocks: 160,
      approval: -35, revenue: 1201, valuation: 5000, importance: 10, datacenters: 8083, timeline: 2034,
      donutGreen: 180, donutGrey: 90,
      caps: [2, 2, 2, 2, 2, 2],
      catEx: 14, catEm: 5, catSci: 6,
      catExSpc: 1, catSciSpc: [1, 5]
    }
  ];

  function lerp(a, b, r) { return a + (b - a) * r; }
  function lerpArray(a, b, r) { return a.map((v, i) => lerp(v, b[i], r)); }
  function arrToPath(arr) { return `M ${arr[0]},${arr[1]} C ${arr[2]},${arr[3]} ${arr[4]},${arr[5]} ${arr[6]},${arr[7]}`; }

  function initAI2027Diagram() {
    // Generate initial grid
    const grid = document.getElementById('ai2027-copies-grid');
    if (grid) {
      grid.innerHTML = '';
      for (let i = 0; i < 200; i++) {
        const block = document.createElement('div');
        block.className = 'copies-block';
        block.style.opacity = '0';
        grid.appendChild(block);
      }
    }
    renderAI2027(0);
  }

  function handleAI2027Slider(e) {
    renderAI2027(parseFloat(e.target.value));
  }

  function renderAI2027(t) {
    const idx = Math.floor(t);
    const nextIdx = Math.min(idx + 1, AI2027_STAGES.length - 1);
    const ratio = t - idx;
    const current = AI2027_STAGES[idx];
    const next = AI2027_STAGES[nextIdx];
    const target = (ratio > 0.5) ? next : current; // for discrete toggles

    // Badge
    const dateEl = document.getElementById('ai2027-date');
    if (dateEl) dateEl.textContent = target.date;

    // SVG paths
    document.getElementById('ai2027-path-top').setAttribute('d', arrToPath(lerpArray(current.pTop, next.pTop, ratio)));
    document.getElementById('ai2027-path-mid').setAttribute('d', arrToPath(lerpArray(current.pMid, next.pMid, ratio)));
    document.getElementById('ai2027-path-bot').setAttribute('d', arrToPath(lerpArray(current.pBot, next.pBot, ratio)));

    // Labels & Dots
    const m1 = document.getElementById('ai2027-milestone-1');
    m1.setAttribute('x', lerp(current.m1X, next.m1X, ratio));
    m1.setAttribute('y', lerp(current.m1Y, next.m1Y, ratio));
    m1.setAttribute('opacity', lerp(current.m1Op, next.m1Op, ratio));

    const m2 = document.getElementById('ai2027-milestone-2');
    m2.setAttribute('x', lerp(current.m2X, next.m2X, ratio));
    m2.setAttribute('y', lerp(current.m2Y, next.m2Y, ratio));
    m2.setAttribute('opacity', lerp(current.m2Op, next.m2Op, ratio));

    const m3 = document.getElementById('ai2027-milestone-3');
    m3.setAttribute('x', lerp(current.m3X, next.m3X, ratio));
    m3.setAttribute('y', lerp(current.m3Y, next.m3Y, ratio));
    m3.setAttribute('opacity', lerp(current.m3Op, next.m3Op, ratio));

    document.getElementById('ai2027-dot-top').setAttribute('transform', `translate(${lerp(current.dTop[0], next.dTop[0], ratio)}, ${lerp(current.dTop[1], next.dTop[1], ratio)})`);
    document.getElementById('ai2027-dot-mid').setAttribute('transform', `translate(${lerp(current.dMid[0], next.dMid[0], ratio)}, ${lerp(current.dMid[1], next.dMid[1], ratio)})`);
    document.getElementById('ai2027-dot-bot').setAttribute('transform', `translate(${lerp(current.dBot[0], next.dBot[0], ratio)}, ${lerp(current.dBot[1], next.dBot[1], ratio)})`);

    document.getElementById('ai2027-x-2').setAttribute('opacity', lerp(current.x2Op, next.x2Op, ratio));
    document.getElementById('ai2027-x-3').setAttribute('opacity', lerp(current.x3Op, next.x3Op, ratio));

    // Capabilities
    const capIds = ['cap-hacking', 'cap-bioweapons', 'cap-coding', 'cap-robotics', 'cap-politics', 'cap-forecasting'];
    capIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) {
        el.className = 'ai2027-cap-item';
        if (target.caps[i] === 1) el.classList.add('black');
        else if (target.caps[i] === 2) el.classList.add('green');
      }
    });

    // Donut
    document.getElementById('donut-green').setAttribute('stroke-dasharray', `${lerp(current.donutGreen, next.donutGreen, ratio)} 219.9`);
    document.getElementById('donut-grey').setAttribute('stroke-dasharray', `${lerp(current.donutGrey, next.donutGrey, ratio)} 219.9`);

    // Copies
    const copiesNum = Math.round(lerp(current.copiesNum, next.copiesNum, ratio));
    document.getElementById('copies-num').textContent = copiesNum >= 10000 ? (Math.round(copiesNum/10000) + '만') : copiesNum.toLocaleString();
    document.getElementById('copies-str').textContent = target.copiesStr;

    const blocks = Math.round(lerp(current.blocks, next.blocks, ratio));
    const gridEl = document.getElementById('ai2027-copies-grid');
    if (gridEl) {
      Array.from(gridEl.children).forEach((block, i) => {
        if(block && block.style) {
          block.style.opacity = (i < blocks) ? '1' : '0';
        }
      });
    }

    // Stats
    const elApp = document.getElementById('stat-approval');
    if (elApp) elApp.textContent = Math.round(lerp(current.approval, next.approval, ratio)) + '%';
    
    const elRev = document.getElementById('stat-revenue');
    if (elRev) elRev.textContent = 'US$' + Math.round(lerp(current.revenue, next.revenue, ratio)) + '억/yr';
    
    let val = Math.round(lerp(current.valuation, next.valuation, ratio));
    const elVal = document.getElementById('stat-valuation');
    if (elVal) elVal.textContent = val >= 1000 ? ('US$' + (val/1000) + '조') : ('US$' + val + '억');
    
    const elImp = document.getElementById('stat-importance');
    if (elImp) elImp.textContent = Math.round(lerp(current.importance, next.importance, ratio)) + '%';
    
    const elDat = document.getElementById('stat-datacenters');
    if (elDat) elDat.textContent = 'US$' + Math.round(lerp(current.datacenters, next.datacenters, ratio)) + '억/yr';
    
    const elTim = document.getElementById('stat-timeline');
    if (elTim) elTim.textContent = Math.round(lerp(current.timeline, next.timeline, ratio));

    // Categories
    renderCatBlocks('cat-exists', target.catEx, target.catExSpc, '🚗');
    renderCatBlocks('cat-emerging', target.catEm, -1, '🧠');
    renderCatBlocks('cat-scifi', target.catSci, target.catSciSpc, ['🧠', '&lt;/&gt;', '🌐']);
  }

  function renderCatBlocks(containerId, count, spcIdx, iconMap) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'cat-block' + (containerId === 'cat-emerging' ? ' green' : '');
      if (Array.isArray(spcIdx) && spcIdx.includes(i)) {
        b.innerHTML = iconMap[spcIdx.indexOf(i)] || '';
      } else if (spcIdx === i) {
        b.innerHTML = iconMap;
      }
      container.appendChild(b);
    }
  }

  // ---- Progress Bar ----
  function updateProgress() {
    const pct = ((state.currentSlide + 1) / state.totalSlides) * 100;
    progressBar.style.width = pct + '%';
  }

  // ---- Fullscreen ----
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      surface.requestFullscreen().catch(() => {});
    }
  }

  // ---- Fragment configuration for Slide 7 (Conclusion) ----
  function registerConclusionFragments() {
    const idx = 6; // Slide 7
    if (state.fragmentMap[idx].length === 0) {
      state.fragmentMap[idx] = ['6-0', '6-1'];
    }
  }

  // ---- Boot ----
  document.addEventListener('DOMContentLoaded', () => {
    init();
    registerConclusionFragments();
  });

})();
