import { resolveJourney, resolveGuidePosition, resolveJourneyMotion } from './journey-state.js?v=scroll-motion-1';

const story = document.querySelector('[data-scroll-story]');
if (story) {
  const beats = [...story.querySelectorAll('[data-journey-beat]')];
  const markers = [...story.querySelectorAll('[data-journey-marker]')];
  const links = [...story.querySelectorAll('[data-journey-link]')];
  const groups = beats.map(beat => Number(beat.dataset.group));
  links.forEach(link => link.style.setProperty('--station',String(Number(link.dataset.group) / Math.max(...groups))));
  const anchors = beats.map(beat => beat.id);
  const layout = story.querySelector('.journey-layout');
  const viewport = story.querySelector('.journey-viewport');
  const log = story.querySelector('.journey-log');
  const guide = story.querySelector('.journey-guide');
  const nav = story.querySelector('.journey-nav');
  const track = story.querySelector('.journey-guide-track');
  const connector = story.querySelector('.journey-connector');
  const caption = story.querySelector('.journey-caption');
  const title = story.querySelector('[data-journey-title]');
  const kicker = story.querySelector('[data-journey-kicker]');
  const taskState = story.querySelector('[data-task-state]');
  const motion = story.querySelector('[data-motion-toggle]');
  const transcript = story.querySelector('[data-transcript-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width:760px) and (min-height:680px)');
  let enhanced = false;
  let current = 0;
  let fullThread = false;
  let userReduced = false;
  let overflowFallback = false;
  let starts = [];
  let offsets = [];
  let end = 0;
  let frame = 0;
  let size = [innerWidth,innerHeight];
  let measuring = false;

  const isReduced = () => userReduced || reduced.matches;
  const currentLink = () => links.find(link => link.dataset.group === beats[current].dataset.group) ?? links[0];
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

  function setMotion() {
    const off = isReduced();
    [story,document.documentElement,document.body].forEach(node => node.classList.toggle('motion-reduced',off));
    motion.setAttribute('aria-pressed',String(off));
    motion.textContent = reduced.matches ? 'Reduced motion · system' : off ? 'Enable motion' : 'Reduce motion';
    motion.disabled = reduced.matches;
    positionGuide();
    schedule();
    // Preferences change movement, never the visible plan version or result.
  }

  function render(index) {
    const focused = document.activeElement;
    const losingFocus = enhanced && beats.some((beat,i) => i !== index && beat.contains(focused));
    current = index;
    if (losingFocus) currentLink().focus({preventScroll:true});
    beats.forEach((beat,i) => {
      beat.hidden = enhanced && i > index;
      beat.inert = enhanced && i !== index;
      if (enhanced && i !== index) beat.setAttribute('aria-hidden','true');
      else beat.removeAttribute('aria-hidden');
      beat.classList.toggle('journey-active',i === index);
    });
    links.forEach(link => {
      if (link.dataset.group === beats[index].dataset.group) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
    title.textContent = beats[index].dataset.title;
    kicker.textContent = beats[index].dataset.kicker;
    taskState.textContent = beats[index].dataset.taskState;
    story.dataset.step = String(index);
    if (enhanced) {
      paint();
    } else log.style.removeProperty('transform');
  }

  function paint(motion = {from:current,to:current,mix:0}) {
    if (!enhanced) return;
    // Reveal only the adjacent incoming beat during its handoff. It remains
    // inert and hidden from assistive technology until selected by render().
    beats.forEach((beat,i) => { beat.hidden = i > motion.to; });
    const offset = offsets[motion.from] + (offsets[motion.to]-offsets[motion.from]) * motion.mix;
    log.style.transform = `translateY(${-offset}px)`;
    // Quiet the connector during the transfer so it never points at two
    // objects or changes route in full view. The chapter point stays aligned.
    connector.style.opacity = String(motion.from === motion.to ? 1 : Math.abs(2*motion.mix-1));
    positionGuide();
  }

  function positionGuide() {
    if (!enhanced) return;
    const guideBounds = guide.getBoundingClientRect();
    const navBounds = nav.getBoundingClientRect();
    const layoutBounds = layout.getBoundingClientRect();
    const frameBounds = story.querySelector('.journey-frame').getBoundingClientRect();
    const focus = beats[current].querySelector('[data-guide-focus]');
    const focusBounds = focus.getBoundingClientRect();
    const focusStyle = getComputedStyle(focus);
    const outlineInset = focusStyle.outlineStyle === 'none' ? 0 : parseFloat(focusStyle.outlineOffset) + parseFloat(focusStyle.outlineWidth) / 2;
    const railHeight = navBounds.height - 44;
    const railTop = navBounds.top - guideBounds.top + 22;
    track.style.top = `${railTop}px`;
    track.style.height = `${railHeight}px`;
    guide.style.setProperty('--guide-tail-start',`${railTop+railHeight}px`);
    guide.style.setProperty('--guide-tail-height',`${Math.max(0,layout.offsetHeight-railTop-railHeight+28)}px`);
    const position = resolveGuidePosition(current,groups);
    guide.style.setProperty('--path-position',String(position));
    const dotY = guideBounds.top - layoutBounds.top + railTop + position * railHeight;
    const targetY = Math.max(frameBounds.top + 118,Math.min(frameBounds.bottom - 52,focusBounds.top + Math.min(28,focusBounds.height / 2))) - layoutBounds.top;
    const dotX = guideBounds.right - layoutBounds.left - 9;
    const targetX = focusBounds.left - outlineInset - layoutBounds.left;
    connector.style.left = `${dotX}px`;
    connector.style.top = `${Math.min(dotY,targetY)}px`;
    connector.style.width = `${Math.max(0,targetX-dotX)}px`;
    connector.style.height = `${Math.abs(targetY-dotY)}px`;
    connector.classList.toggle('route-up',targetY < dotY);
  }

  function measure({ preserve = false } = {}) {
    if (measuring) return;
    measuring = true;
    const oldBounds = story.getBoundingClientRect();
    const wasInView = oldBounds.top < innerHeight && oldBounds.bottom > 0;
    const previousMode = enhanced;
    const changedSize = innerWidth !== size[0] || innerHeight !== size[1];
    if (changedSize) overflowFallback = false;
    size = [innerWidth,innerHeight];
    enhanced = wide.matches && !fullThread && !overflowFallback;
    story.classList.toggle('journey-enhanced',enhanced);
    caption.setAttribute('aria-hidden',String(!enhanced));
    transcript.setAttribute('aria-pressed',String(fullThread));
    transcript.textContent = fullThread ? 'Follow with scroll' : 'Read the full thread';
    beats.forEach((beat,i) => {
      beat.removeAttribute('id');
      markers[i].removeAttribute('id');
      (enhanced ? markers[i] : beat).id = anchors[i];
    });
    if (enhanced) {
      caption.style.minHeight = '0';
      let maxCaption = 0;
      beats.forEach(beat => {
        title.textContent = beat.dataset.title;
        maxCaption = Math.max(maxCaption,caption.offsetHeight);
        beat.hidden = false;
      });
      caption.style.minHeight = `${maxCaption}px`;
    } else caption.style.removeProperty('min-height');
    const chrome = [...story.querySelectorAll('.slack-header,.journey-ticket,.journey-frame-footer')].reduce((sum,node) => sum+node.offsetHeight,2);
    const screenGap = 2 * (parseFloat(getComputedStyle(layout).top) || 24);
    const captionGap = parseFloat(getComputedStyle(caption).marginBottom) || 18;
    const room = Math.max(300,Math.min(560,innerHeight - chrome - caption.offsetHeight - captionGap - story.querySelector('.journey-controls').offsetHeight - 13 - screenGap));
    story.style.setProperty('--journey-room',`${room}px`);
    // Choose one layout for the whole story up front, rather than changing it
    // halfway through when a longer artifact arrives.
    const leadRoom = parseFloat(getComputedStyle(log).paddingTop) + 28;
    if (enhanced && beats.some(beat => Math.ceil(beat.getBoundingClientRect().height) + leadRoom + 8 > room)) {
      overflowFallback = true;
      enhanced = false;
      story.classList.remove('journey-enhanced');
      caption.setAttribute('aria-hidden','true');
      beats.forEach((beat,i) => { markers[i].removeAttribute('id'); beat.id = anchors[i]; });
    }
    const padding = parseFloat(getComputedStyle(log).paddingTop);
    offsets = enhanced ? beats.map((beat,i) => Math.max(0,beat.offsetTop-padding-(i ? 28 : 0))) : [];
    transcript.hidden = !wide.matches || overflowFallback;
    render(current);
    story.style.setProperty('--journey-layout-height',`${layout.offsetHeight}px`);
    const nodes = enhanced ? markers : beats;
    starts = nodes.map(node => scrollY + node.getBoundingClientRect().top);
    end = starts.at(-1) + nodes.at(-1).offsetHeight;
    const installation = document.querySelector('.journey-install');
    const installBounds = installation.getBoundingClientRect();
    const actionBounds = installation.querySelector('.journey-install-action').getBoundingClientRect();
    const installGuide = installation.querySelector('.journey-install-guide').getBoundingClientRect();
    installation.style.setProperty('--install-target-y',`${actionBounds.top-installBounds.top+actionBounds.height/2}px`);
    installation.style.setProperty('--install-target-x',`${actionBounds.left-installGuide.right+9}px`);
    measuring = false;
    if (wasInView && (preserve || (previousMode !== enhanced && changedSize))) goTo(current,false);
    else schedule();
  }

  function update() {
    frame = 0;
    if (!starts.length || document.querySelector('.story-dialog[open]')) return;
    const cursor = scrollY + (enhanced ? 100 : 180);
    if (cursor < starts[0] - innerHeight || cursor > end + 80) return;
    const resolved = enhanced && !isReduced() ? resolveJourneyMotion(cursor,starts,end) : resolveJourney(cursor,starts,end);
    if (resolved.index !== current) {
      render(resolved.index);
      const leadRoom = parseFloat(getComputedStyle(log).paddingTop) + 28;
      if (enhanced && Math.ceil(beats[current].getBoundingClientRect().height) + leadRoom + 8 > viewport.offsetHeight) measure({preserve:true});
    }
    if (enhanced) paint(isReduced() ? undefined : resolved);
  }

  function goTo(index,smooth = true) {
    // During a smooth chapter jump, scroll position owns the visible state.
    // Painting the destination first would flash it before the glide starts.
    if (!(enhanced && smooth && !isReduced())) render(index);
    story.style.setProperty('--journey-layout-height',`${layout.offsetHeight}px`);
    const node = enhanced ? markers[index] : beats[index];
    const inset = enhanced ? parseFloat(getComputedStyle(layout).top) || 24 : 100;
    const top = enhanced && index > 0
      ? resolveJourneyMotion(starts[index],starts,end).settleAt - 100
      : scrollY + node.getBoundingClientRect().top - inset;
    window.scrollTo({top,behavior:smooth && !isReduced() ? 'smooth' : 'instant'});
    history.replaceState(null,'',`#${anchors[index]}`);
    schedule();
  }

  story.addEventListener('click',event => {
    const link = event.target.closest('[data-journey-link]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    goTo(Number(link.dataset.journeyLink));
  });
  motion.addEventListener('click',() => { userReduced = !userReduced; setMotion(); });
  transcript.addEventListener('click',() => { fullThread = !fullThread; overflowFallback = false; measure({preserve:true}); });
  reduced.addEventListener('change',setMotion);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',() => measure({preserve:true}));
  window.addEventListener('hashchange',() => {
    const index = anchors.findIndex(anchor => `#${anchor}` === location.hash);
    if (index >= 0) goTo(index,false);
  });
  story.classList.add('journey-ready');
  setMotion();
  measure();
  document.fonts?.ready.then(() => measure());
  window.addEventListener('load',async () => {
    await document.fonts?.ready;
    measure();
    const index = anchors.findIndex(anchor => `#${anchor}` === location.hash);
    if (index >= 0) goTo(index,false);
    else if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'start',behavior:'instant'});
  },{once:true});

  document.querySelectorAll('[data-story-dialog]').forEach(trigger => {
    const dialog = document.getElementById(trigger.dataset.storyDialog);
    if (!dialog?.showModal) return;
    trigger.addEventListener('click',() => {
      const contextIndex = Number(trigger.closest('[data-journey-beat]')?.dataset.journeyBeat ?? current);
      const later = dialog.querySelector('[data-later-result]');
      if (later) later.hidden = contextIndex < 7;
      const planState = dialog.querySelector('[data-plan-dialog-state]');
      if (planState) planState.textContent = contextIndex >= 3 ? 'Plan v2 · approved approach and check scope' : 'Plan v2 · proposed approach and check scope';
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('[data-close-story-dialog]')?.focus();
      const onClose = () => {
        document.body.classList.remove('modal-open');
        const visible = !trigger.closest('[inert]') && trigger.getClientRects().length;
        (visible ? trigger : currentLink()).focus({preventScroll:true});
        dialog.removeEventListener('close',onClose);
        schedule();
      };
      dialog.addEventListener('close',onClose);
    });
  });
  document.querySelectorAll('.story-dialog').forEach(dialog => {
    dialog.querySelector('[data-close-story-dialog]')?.addEventListener('click',() => dialog.close());
    dialog.addEventListener('click',event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });
}
