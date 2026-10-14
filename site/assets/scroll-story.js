(() => {
  const story = document.querySelector('[data-scroll-story]');
  if (!story) return;
  const beats = [...story.querySelectorAll('[data-thread-beat]')];
  const panels = [...story.querySelectorAll('[data-proof-panel]')];
  const slots = [...story.querySelectorAll('[data-proof-slot]')];
  const narrations = [...story.querySelectorAll('[data-story-narration]')];
  const links = [...story.querySelectorAll('[data-chapter-link]')];
  const markers = [...story.querySelectorAll('[data-story-marker]')];
  const layout = story.querySelector('.story-layout');
  const deck = story.querySelector('.proof-deck');
  const motionToggle = story.querySelector('[data-motion-toggle]');
  const taskState = story.querySelector('[data-task-state]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const linearViewport = matchMedia('(max-width: 1100px), (max-height: 780px)');
  const phases = ['Request', 'Plan proposed', 'Cloud build', 'Check failed', 'Fresh results', 'Draft PR'];
  let current = 0;
  let linear = null;
  let overflowLinear = false;
  let userReduced = false;
  let planManuallyRevealed = false;
  let positions = [];
  let storyEnd = 0;
  let frame = 0;
  let inView = false;
  let measuredWidth = innerWidth;
  let measuredHeight = innerHeight;

  function isReduced() { return userReduced || reduced.matches; }
  function setMotion() {
    const off = isReduced();
    [story, document.body, document.documentElement].forEach(node => node.classList.toggle('motion-reduced', off));
    motionToggle.setAttribute('aria-pressed', String(off));
    motionToggle.textContent = reduced.matches ? 'Reduced motion · system' : off ? 'Enable motion' : 'Reduce motion';
    motionToggle.disabled = reduced.matches;
    schedule();
  }
  function select(index) {
    const prior = current;
    const focusWillHide = !linear && (
      beats.some((beat, i) =>
        (i !== index && beat.querySelector('.beat-content').contains(document.activeElement)) ||
        (i >= index && beat.querySelector('.beat-memory').contains(document.activeElement))
      ) ||
      panels.some((panel, i) => i !== index && panel.contains(document.activeElement))
    );
    current = index;
    beats.forEach((beat, i) => {
      beat.hidden = !linear && i > index;
      beat.classList.toggle('is-past', i < index);
      beat.classList.toggle('is-current', i === index);
    });
    panels.forEach((panel, i) => { panel.hidden = !linear && i !== index; });
    narrations.forEach((node, i) => { node.hidden = i !== index; });
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    taskState.textContent = phases[index];
    story.dataset.chapter = String(index);
    if (index !== 1 && story.dataset.planReplay) {
      planManuallyRevealed = false;
      setPlanReplay('reset');
    }
    if (focusWillHide) links[index].focus({ preventScroll:true });
    if (prior !== index) {
      story.classList.remove('revision-replayed');
      schedule();
    }
  }
  function movePanels(nextLinear) {
    panels.forEach((panel, i) => (nextLinear ? slots[i] : deck).append(panel));
  }
  function measure() {
    const viewportChanged = innerWidth !== measuredWidth || innerHeight !== measuredHeight;
    const previous = current;
    const focused = document.activeElement;
    const focusInPanel = panels.some(panel => panel.contains(focused));
    if (viewportChanged) overflowLinear = false;
    measuredWidth = innerWidth;
    measuredHeight = innerHeight;
    // Only measure a pinned layout for overflow. The complete linear transcript
    // is deliberately longer than the viewport and must not lock us in that mode.
    if (linear === false && layout.getBoundingClientRect().height > innerHeight - 40) overflowLinear = true;
    // Keep an overflow fallback until a viewport change. Measuring the full
    // transcript as though it were pinned would oscillate between both modes.
    const nextLinear = linearViewport.matches || overflowLinear;
    const changed = linear !== nextLinear;
    linear = nextLinear;
    story.classList.toggle('story-linear', linear);
    if (changed) {
      movePanels(linear);
      if (linear) {
        planManuallyRevealed = false;
        setPlanReplay('reset');
      }
    }
    beats.forEach((beat, i) => {
      const id = beat.dataset.anchor;
      beat.removeAttribute('id');
      markers[i].removeAttribute('id');
      (linear ? beat : markers[i]).id = id;
    });
    select(previous);
    story.style.setProperty('--story-height', `${layout.getBoundingClientRect().height}px`);
    positions = (linear ? beats : markers).map(node => scrollY + node.getBoundingClientRect().top);
    const last = (linear ? beats : markers).at(-1);
    storyEnd = positions.at(-1) + last.offsetHeight;
    if ((changed || viewportChanged) && inView) goTo(previous, false);
    if (changed && focusInPanel && focused.getClientRects().length) {
      focused.focus({ preventScroll:true });
      const bounds = focused.getBoundingClientRect();
      if (bounds.top < 0 || bounds.bottom > innerHeight) focused.scrollIntoView({ block:'nearest', behavior:'instant' });
    }
    schedule();
  }
  function chapterAt(cursor) {
    let index = 0;
    for (let i = 1; i < positions.length; i++) if (cursor >= positions[i]) index = i;
    return index;
  }
  function update() {
    frame = 0;
    if (innerWidth !== measuredWidth || innerHeight !== measuredHeight) { measure(); return; }
    if (!positions.length) return;
    const cursor = scrollY + innerHeight * .22;
    inView = cursor >= positions[0] - innerHeight && cursor <= storyEnd;
    if (!inView) return;
    select(chapterAt(cursor));
    if (linear) return;
    const length = current < positions.length - 1 ? positions[current + 1] - positions[current] : markers[current].offsetHeight;
    const progress = Math.max(0, Math.min(1, (cursor - positions[current]) / Math.max(1,length)));
    if (current === 1 && !planManuallyRevealed) setPlanReplay(progress > .45 ? 'after' : 'before');
    // The thread shell and retained decisions stay put. Only the arriving beat
    // moves, and all readable content keeps sufficient opacity throughout.
    const reveal = isReduced() ? 1 : Math.max(.82, Math.min(1, .82 + progress));
    story.style.setProperty('--reveal-opacity', String(reveal));
    story.style.setProperty('--reveal-offset', `${isReduced() ? 0 : (1 - reveal) * 40}px`);
    story.style.setProperty('--artifact-opacity', String(isReduced() ? 1 : Math.max(.9,reveal)));
    const activity = story.querySelectorAll('.cloud-activity li');
    activity.forEach((item, i) => item.classList.toggle('is-active', current === 2 && i === Math.min(2,Math.floor(progress * 3))));
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  function setPlanReplay(mode) {
    if (mode === 'reset') delete story.dataset.planReplay;
    else story.dataset.planReplay = mode;
    panels[1].querySelector('h3').textContent = mode === 'before' ? 'Plan v1 · proposed' : 'Plan v2 · proposed';
    panels[1].querySelector('.plan-delta span').textContent = mode === 'before' ? 'Date rule · awaiting revision' : 'Sam’s clarification';
    story.classList.toggle('revision-replayed', mode === 'after');
  }
  function goTo(index, smooth = true) {
    const target = linear ? beats[index] : markers[index];
    window.scrollTo({ top:scrollY + target.getBoundingClientRect().top - (linear ? 100 : 24), behavior:smooth && !isReduced() ? 'smooth' : 'instant' });
    inView = true;
    select(index);
    history.replaceState(null, '', `#${beats[index].dataset.anchor}`);
  }
  story.addEventListener('click', event => {
    const link = event.target.closest('[data-chapter-link], [data-go-chapter]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const index = Number(link.dataset.chapterLink ?? link.dataset.goChapter);
    if (!Number.isInteger(index) || index < 0 || index >= beats.length) return;
    event.preventDefault();
    goTo(index);
  });
  motionToggle.addEventListener('click', () => { userReduced = !userReduced; setMotion(); });
  reduced.addEventListener('change', setMotion);
  linearViewport.addEventListener('change', measure);
  window.addEventListener('resize', measure);
  window.addEventListener('scroll', () => {
    if (innerWidth !== measuredWidth || innerHeight !== measuredHeight) measure();
    const cursor = scrollY + innerHeight * .22;
    inView = positions.length > 0 && cursor >= positions[0] - innerHeight && cursor <= storyEnd;
    if (inView) select(chapterAt(cursor));
    schedule();
  }, { passive:true });
  story.classList.add('story-ready');
  measure();
  setMotion();
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(layout);
  document.fonts?.ready.then(measure);
  window.addEventListener('load', async () => {
    await document.fonts?.ready;
    measure();
    const index = beats.findIndex(beat => `#${beat.dataset.anchor}` === location.hash);
    if (index >= 0) goTo(index,false);
    else if (location.hash) {
      // The story changes height during setup. Resolve supporting-section
      // anchors after that layout is measured, rather than the static transcript.
      const target = document.getElementById(location.hash.slice(1));
      target?.scrollIntoView({ block:'start', behavior:'instant' });
    }
  }, {once:true});

  document.querySelectorAll('[data-story-dialog]').forEach(trigger => {
    const dialog = document.getElementById(trigger.dataset.storyDialog);
    if (!dialog?.showModal) return;
    trigger.addEventListener('click', () => {
      const laterResult = dialog.querySelector('[data-later-result]');
      if (laterResult) laterResult.hidden = current < 4;
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('[data-close-story-dialog]')?.focus();
      const returnFocus = () => {
        document.body.classList.remove('modal-open');
        const target = trigger.getClientRects().length ? trigger : links[current];
        target.focus({ preventScroll:true });
        dialog.removeEventListener('close',returnFocus);
      };
      dialog.addEventListener('close',returnFocus);
    });
  });
  document.querySelectorAll('.story-dialog').forEach(dialog => {
    dialog.querySelector('[data-close-story-dialog]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });
  document.querySelector('[data-apply-example-revision]')?.addEventListener('click', event => {
    event.target.closest('dialog').close();
    planManuallyRevealed = false;
    goTo(1,false);
    setPlanReplay('before');
  });
  document.querySelector('[data-reveal-plan]')?.addEventListener('click', () => {
    planManuallyRevealed = true;
    setPlanReplay('after');
    beats[1].querySelector('[data-go-chapter="2"]').focus({ preventScroll:true });
  });
  const form = document.querySelector('[data-demo-comment]');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const value = form.querySelector('textarea').value.trim();
    if (!value) { form.querySelector('textarea').focus(); return; }
    const comment = document.createElement('div');
    comment.className = 'demo-comment';
    const author = document.createElement('b');
    author.textContent = 'Your demo comment · input for the next step';
    const content = document.createElement('span');
    content.textContent = value;
    comment.append(author,content);
    story.querySelector('[data-demo-comments]').append(comment);
    form.querySelector('[data-comment-receipt]').textContent = 'Added to the example conversation as input. Owner decisions stay separate.';
    form.reset();
  });
})();
