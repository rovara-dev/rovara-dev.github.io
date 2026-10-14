(() => {
  document.documentElement.classList.add("js");
  const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const menu = document.querySelector(".primary-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const setMenu = (open) => {
    menu?.classList.toggle("is-open", open);
    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  };
  menuToggle?.addEventListener("click", () =>
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true"),
  );
  menu?.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.classList.contains("is-open")) {
      setMenu(false);
      menuToggle?.focus();
    }
  });
  document.querySelectorAll("[data-journey]").forEach((player) => {
    const buttons = [...player.querySelectorAll("[data-step]")];
    const panels = [...player.querySelectorAll("[data-panel]")];
    const play = player.querySelector("[data-play]");
    const progress = player.querySelector(".journey-progress > div");
    let index = 0,
      timer,
      running = false,
      finished = false,
      animations = [];
    function stop() {
      clearTimeout(timer);
      running = false;
      if (!play) return;
      play.textContent = finished ? "Replay walkthrough" : "Play walkthrough";
      play.setAttribute("aria-pressed", "false");
    }
    function select(next, animate = true) {
      animations.forEach((a) => a?.stop?.());
      animations = [];
      index = next;
      buttons.forEach((b, i) =>
        b.setAttribute("aria-pressed", String(i === index)),
      );
      panels.forEach((p, i) => {
        p.hidden = i !== index;
        p.style.opacity = "";
        p.style.transform = "";
      });
      if (animate && !motionPreference.matches && window.Motion?.animate) {
        animations.push(
          Motion.animate(
            panels[index],
            { opacity: [0, 1], x: [10, 0] },
            { duration: 0.24 },
          ),
        );
        animations.push(
          Motion.animate(
            progress,
            { scaleX: (index + 1) / buttons.length },
            { duration: 0.35, ease: "easeOut" },
          ),
        );
      } else
        progress.style.transform = `scaleX(${(index + 1) / buttons.length})`;
    }
    function advance() {
      if (!running) return;
      if (index === buttons.length - 1) {
        finished = true;
        stop();
        return;
      }
      select(index + 1);
      timer = setTimeout(advance, 5000);
    }
    play.hidden = motionPreference.matches;
    play.setAttribute("aria-pressed", "false");
    play.addEventListener("click", () => {
      if (running) {
        stop();
        return;
      }
      if (finished || index === buttons.length - 1) {
        finished = false;
        select(0);
      }
      running = true;
      play.textContent = "Pause walkthrough";
      play.setAttribute("aria-pressed", "true");
      timer = setTimeout(advance, 5000);
    });
    buttons.forEach((b, i) => {
      b.disabled = false;
      b.addEventListener("click", () => {
        finished = false;
        stop();
        select(i);
      });
      b.addEventListener("keydown", (e) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
        e.preventDefault();
        const next =
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? buttons.length - 1
              : (i + (e.key === "ArrowRight" ? 1 : -1) + buttons.length) %
                buttons.length;
        buttons[next].focus();
        buttons[next].click();
      });
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
    motionPreference.addEventListener("change", () => {
      stop();
      play.hidden = motionPreference.matches;
      select(index, false);
    });
    if ("IntersectionObserver" in window)
      new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) stop();
        },
        { threshold: 0.1 },
      ).observe(player);
    player.classList.add("player-ready");
    select(0, false);
  });
  // One brief entrance reveals the illustrative handoff; no fake task status.
  const handoff = document.querySelector(".handoff-figure");
  if (handoff && !motionPreference.matches && window.Motion?.animate) {
    const objects = [...handoff.querySelectorAll("[data-handoff-object]")];
    Motion.animate(
      objects,
      { opacity: [0, 1], y: [8, 0] },
      {
        duration: 0.45,
        delay: (i) => 0.12 + i * 0.09,
        ease: "easeOut",
      },
    );
  }
  const dialog = document.querySelector(".evidence-dialog");
  let trigger;
  document.querySelectorAll("[data-evidence]").forEach((link) =>
    link.addEventListener("click", (e) => {
      const source = document.getElementById(link.dataset.evidence);
      if (!source || !dialog?.showModal) return;
      e.preventDefault();
      trigger = link;
      dialog.querySelector("#dialog-title").textContent =
        source.querySelector("summary").textContent;
      dialog
        .querySelector(".dialog-content")
        .replaceChildren(
          source.querySelector(".report-detail").cloneNode(true),
        );
      dialog.showModal();
      document.body.classList.add("modal-open");
      dialog.querySelector(".dialog-close").focus();
      if (!motionPreference.matches && !document.documentElement.classList.contains("motion-reduced") && window.Motion?.animate)
        Motion.animate(
          dialog,
          { opacity: [0, 1], y: [8, 0] },
          { duration: 0.2 },
        );
    }),
  );
  dialog
    ?.querySelector(".dialog-close")
    ?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    trigger?.focus();
  });
  dialog?.addEventListener("click", (e) => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  });
})();
