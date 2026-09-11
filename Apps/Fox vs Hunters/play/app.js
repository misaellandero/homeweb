const STORAGE_KEY = "foxHuntersPwaState.v1";
const SETTINGS_KEY = "foxHuntersPwaSettings.v1";

const i18n = {
  en: {
    install: "Install",
    settings: "Settings",
    language: "Language",
    sound: "Sound",
    soundHint: "Soft feedback during reveals and votes.",
    resetData: "Reset local data",
    eyebrow: "Installable web game",
    heroTitle: "Fox Vs Hunters",
    heroLead: "Pass one device around, reveal secret words in private, discuss, vote, and catch the hidden fox.",
    newGame: "New game",
    categories: "Categories",
    continueGame: "Continue game",
    setup: "Setup",
    players: "Players",
    playerName: "Player name",
    addPlayer: "Add player",
    foxes: "Hidden foxes",
    rounds: "Rounds",
    minutes: "Minutes",
    category: "Category",
    startGame: "Start game",
    needPlayers: "Add at least 3 players.",
    needCategory: "Choose a category with at least 10 words.",
    customCategories: "Custom categories",
    categoryName: "Category name",
    categoryWords: "Words, one per line",
    saveCategory: "Save category",
    delete: "Delete",
    edit: "Edit",
    validWords: "{count} words",
    invalidCategory: "Use at least 10 unique words.",
    turn: "Your turn",
    unrevealed: "Unrevealed",
    revealed: "Revealed",
    holdReveal: "Hold to reveal",
    nextPlayer: "Next player",
    youAreFox: "You are the fox",
    discuss: "Discussion",
    discussionHint: "Give clues, listen carefully, and look for suspicious answers.",
    pause: "Pause",
    resume: "Resume",
    reset: "Reset",
    goVoting: "Go to voting",
    voting: "Voting",
    voteFor: "Vote for",
    pickSuspects: "Pick {count} suspect(s).",
    castVote: "Cast vote",
    skipVote: "Skip vote",
    results: "Results",
    huntersWin: "Hunters win",
    foxesWin: "Foxes win",
    secretWord: "Secret word",
    hiddenFoxes: "Hidden foxes",
    votes: "Votes",
    playAgain: "Play again",
    home: "Home",
    emptyCategories: "Create a category to play with your own words.",
    offlineReady: "Works offline after the first load.",
    installHint: "Use your browser menu to add it to your home screen.",
    food: "Food",
    animals: "Animals",
    places: "Places"
  },
  es: {
    install: "Instalar",
    settings: "Ajustes",
    language: "Idioma",
    sound: "Sonido",
    soundHint: "Feedback suave al revelar y votar.",
    resetData: "Borrar datos locales",
    eyebrow: "Juego web instalable",
    heroTitle: "Zorros Vs Cazadores",
    heroLead: "Pasa un dispositivo, revela palabras secretas en privado, discutan, voten y atrapen al zorro oculto.",
    newGame: "Nueva partida",
    categories: "Categorías",
    continueGame: "Continuar",
    setup: "Configuración",
    players: "Jugadores",
    playerName: "Nombre del jugador",
    addPlayer: "Agregar jugador",
    foxes: "Zorros ocultos",
    rounds: "Rondas",
    minutes: "Minutos",
    category: "Categoría",
    startGame: "Iniciar partida",
    needPlayers: "Agrega al menos 3 jugadores.",
    needCategory: "Elige una categoría con al menos 10 palabras.",
    customCategories: "Categorías personalizadas",
    categoryName: "Nombre de categoría",
    categoryWords: "Palabras, una por línea",
    saveCategory: "Guardar categoría",
    delete: "Eliminar",
    edit: "Editar",
    validWords: "{count} palabras",
    invalidCategory: "Usa al menos 10 palabras únicas.",
    turn: "Tu turno",
    unrevealed: "Sin revelar",
    revealed: "Revelado",
    holdReveal: "Mantén para revelar",
    nextPlayer: "Siguiente jugador",
    youAreFox: "Eres el zorro",
    discuss: "Discusión",
    discussionHint: "Den pistas, escuchen con cuidado y busquen respuestas sospechosas.",
    pause: "Pausar",
    resume: "Continuar",
    reset: "Reiniciar",
    goVoting: "Ir a votación",
    voting: "Votación",
    voteFor: "Vota",
    pickSuspects: "Elige {count} sospechoso(s).",
    castVote: "Votar",
    skipVote: "Saltar voto",
    results: "Resultados",
    huntersWin: "Ganan los cazadores",
    foxesWin: "Ganan los zorros",
    secretWord: "Palabra secreta",
    hiddenFoxes: "Zorros ocultos",
    votes: "Votos",
    playAgain: "Jugar otra vez",
    home: "Inicio",
    emptyCategories: "Crea una categoría para jugar con tus palabras.",
    offlineReady: "Funciona sin conexión después de la primera carga.",
    installHint: "Usa el menú del navegador para agregarlo a tu pantalla de inicio.",
    food: "Comida",
    animals: "Animales",
    places: "Lugares"
  }
};

const defaultCategories = [
  {
    id: "food",
    nameKey: "food",
    words: ["pizza", "taco", "sushi", "hamburger", "pasta", "salad", "banana", "coffee", "chocolate", "cheese", "soup", "bread"]
  },
  {
    id: "animals",
    nameKey: "animals",
    words: ["dog", "cat", "fox", "lion", "tiger", "horse", "rabbit", "whale", "eagle", "panda", "shark", "bear"]
  },
  {
    id: "places",
    nameKey: "places",
    words: ["school", "beach", "forest", "museum", "airport", "restaurant", "park", "hotel", "cinema", "library", "stadium", "market"]
  }
];

const app = document.getElementById("app");
const backButton = document.getElementById("back-button");
const installButton = document.getElementById("install-button");
const settingsButton = document.getElementById("settings-button");
const settingsDialog = document.getElementById("settings-dialog");
const languageSelect = document.getElementById("language-select");
const soundToggle = document.getElementById("sound-toggle");
const resetButton = document.getElementById("reset-button");

let installPrompt = null;
let timerId = null;
let revealHoldId = null;

const defaultState = {
  route: "home",
  players: ["Player 1", "Player 2", "Player 3"],
  impostorCount: 1,
  roundCount: 3,
  discussionMinutes: 3,
  categoryId: "food",
  customCategories: [],
  session: null
};

let settings = readJSON(SETTINGS_KEY, {
  language: "auto",
  sound: true
});

let state = readJSON(STORAGE_KEY, defaultState);

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function lang() {
  if (settings.language !== "auto") {
    return settings.language;
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function t(key, vars = {}) {
  let value = i18n[lang()][key] ?? i18n.en[key] ?? key;
  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replace(`{${name}}`, replacement);
  });
  return value;
}

function vibrate(pattern = 18) {
  if (settings.sound && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

function setRoute(route) {
  clearTimer();
  state.route = route;
  save();
  render();
}

function allCategories() {
  return [
    ...defaultCategories.map((category) => ({
      ...category,
      name: t(category.nameKey)
    })),
    ...state.customCategories
  ];
}

function selectedCategory() {
  return allCategories().find((category) => category.id === state.categoryId) ?? allCategories()[0];
}

function normalizeWords(raw) {
  return [...new Set(raw
    .split(/\n|,/)
    .map((word) => word.trim())
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))];
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function startSession() {
  const names = state.players.map((name) => name.trim()).filter(Boolean);
  const category = selectedCategory();
  if (names.length < 3 || !category || category.words.length < 10) {
    return;
  }

  const players = shuffle(names).map((name) => ({
    id: crypto.randomUUID(),
    name,
    score: 0
  }));
  const secretWord = shuffle(category.words)[0];
  const impostorIds = new Set(shuffle(players).slice(0, state.impostorCount).map((player) => player.id));

  state.session = {
    players,
    round: 1,
    totalRounds: state.roundCount,
    categoryName: category.name,
    secretWord,
    impostorIds: [...impostorIds],
    revealIndex: 0,
    revealedPlayerIds: [],
    discussionSeconds: state.discussionMinutes * 60,
    votingIndex: 0,
    votes: {},
    completed: false
  };
  setRoute("reveal");
}

function nextRound() {
  const session = state.session;
  if (!session || session.round >= session.totalRounds) {
    setRoute("home");
    state.session = null;
    save();
    return;
  }

  const category = selectedCategory();
  const players = shuffle(session.players).map((player) => ({ ...player }));
  const secretWord = shuffle(category.words)[0];
  const impostorIds = shuffle(players).slice(0, state.impostorCount).map((player) => player.id);

  state.session = {
    ...session,
    players,
    round: session.round + 1,
    categoryName: category.name,
    secretWord,
    impostorIds,
    revealIndex: 0,
    revealedPlayerIds: [],
    discussionSeconds: state.discussionMinutes * 60,
    votingIndex: 0,
    votes: {},
    completed: false
  };
  setRoute("reveal");
}

function finishVoting() {
  const session = state.session;
  const totals = Object.fromEntries(session.players.map((player) => [player.id, 0]));
  Object.values(session.votes).flat().forEach((id) => {
    totals[id] = (totals[id] ?? 0) + 1;
  });

  const topSuspects = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, session.impostorIds.length)
    .map(([id]) => id);

  const huntersWin = session.impostorIds.every((id) => topSuspects.includes(id));
  session.completed = true;
  session.huntersWin = huntersWin;
  session.voteTotals = totals;
  session.players = session.players.map((player) => ({
    ...player,
    score: player.score + (huntersWin && !session.impostorIds.includes(player.id) ? 100 : 0) + (!huntersWin && session.impostorIds.includes(player.id) ? 150 : 0)
  }));
  state.session = session;
  setRoute("results");
}

function clearTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function render() {
  document.documentElement.lang = lang();
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  languageSelect.value = settings.language;
  soundToggle.checked = settings.sound;
  backButton.hidden = state.route === "home";
  app.innerHTML = "";

  const routes = {
    home: renderHome,
    setup: renderSetup,
    categories: renderCategories,
    reveal: renderReveal,
    discussion: renderDiscussion,
    voting: renderVoting,
    results: renderResults
  };

  app.append(routes[state.route]?.() ?? renderHome());
}

function renderHome() {
  const screen = element("section", "screen hero-screen");
  const card = element("div", "hero-card");
  const content = element("div", "hero-content");
  content.innerHTML = `
    <p class="eyebrow">${t("eyebrow")}</p>
    <h1>${t("heroTitle")}</h1>
    <p class="lead">${t("heroLead")}</p>
    <p class="muted">${t("offlineReady")} ${t("installHint")}</p>
  `;

  const actions = element("div", "action-stack");
  actions.append(button(t("newGame"), "primary-button", () => setRoute("setup")));
  if (state.session && !state.session.completed) {
    actions.append(button(t("continueGame"), "secondary-button", () => setRoute(state.session.revealedPlayerIds.length < state.session.players.length ? "reveal" : "discussion")));
  }
  actions.append(button(t("categories"), "secondary-button", () => setRoute("categories")));
  content.append(actions);
  card.append(content);
  screen.append(card);
  return screen;
}

function renderSetup() {
  const screen = element("section", "screen");
  screen.append(titleBlock(t("setup"), t("heroLead")));

  const playersCard = element("div", "glass-card");
  playersCard.append(sectionTitle(t("players")));
  const list = element("div", "list");
  state.players.forEach((name, index) => {
    const row = element("div", "player-row");
    row.innerHTML = `<span class="avatar">${index + 1}</span>`;
    const input = element("input");
    input.value = name;
    input.placeholder = `${t("playerName")} ${index + 1}`;
    input.addEventListener("input", () => {
      state.players[index] = input.value;
      save();
    });
    row.append(input);
    row.append(button("×", "small-button", () => {
      state.players.splice(index, 1);
      save();
      render();
    }));
    list.append(row);
  });
  playersCard.append(list);
  playersCard.append(button(t("addPlayer"), "secondary-button", () => {
    state.players.push(`${t("players")} ${state.players.length + 1}`);
    save();
    render();
  }));
  screen.append(playersCard);

  const settingsGrid = element("div", "grid-3");
  settingsGrid.append(stepperCard(t("foxes"), state.impostorCount, 1, Math.max(1, state.players.length - 1), (value) => state.impostorCount = value));
  settingsGrid.append(stepperCard(t("rounds"), state.roundCount, 1, 9, (value) => state.roundCount = value));
  settingsGrid.append(stepperCard(t("minutes"), state.discussionMinutes, 1, 10, (value) => state.discussionMinutes = value));
  screen.append(settingsGrid);

  const categoryCard = element("div", "glass-card");
  categoryCard.append(sectionTitle(t("category")));
  const selectLabel = element("label", "field");
  const select = element("select");
  allCategories().forEach((category) => {
    const option = element("option");
    option.value = category.id;
    option.textContent = `${category.name} · ${t("validWords", { count: category.words.length })}`;
    select.append(option);
  });
  select.value = state.categoryId;
  select.addEventListener("change", () => {
    state.categoryId = select.value;
    save();
  });
  selectLabel.append(select);
  categoryCard.append(selectLabel);
  categoryCard.append(button(t("categories"), "secondary-button", () => setRoute("categories")));
  screen.append(categoryCard);

  const canStart = state.players.filter((name) => name.trim()).length >= 3 && selectedCategory()?.words.length >= 10;
  const start = button(t("startGame"), "primary-button", startSession);
  start.disabled = !canStart;
  screen.append(start);
  if (!canStart) {
    const warning = element("p", "muted");
    warning.textContent = state.players.filter((name) => name.trim()).length < 3 ? t("needPlayers") : t("needCategory");
    screen.append(warning);
  }
  return screen;
}

function renderCategories() {
  const screen = element("section", "screen");
  screen.append(titleBlock(t("customCategories"), t("emptyCategories")));

  const editor = element("div", "glass-card");
  const nameField = field(t("categoryName"), "input");
  const wordsField = field(t("categoryWords"), "textarea");
  editor.append(nameField.wrap, wordsField.wrap);
  editor.append(button(t("saveCategory"), "primary-button", () => {
    const name = nameField.control.value.trim();
    const words = normalizeWords(wordsField.control.value);
    if (!name || words.length < 10) {
      alert(t("invalidCategory"));
      return;
    }
    const existing = state.customCategories.find((category) => category.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.words = words;
    } else {
      state.customCategories.push({ id: crypto.randomUUID(), name, words });
    }
    state.categoryId = existing?.id ?? state.customCategories.at(-1).id;
    save();
    render();
  }));
  screen.append(editor);

  const list = element("div", "list");
  state.customCategories.forEach((category) => {
    const row = element("div", "choice-row");
    row.innerHTML = `<span class="avatar">${category.name.slice(0, 1).toUpperCase()}</span><span><strong class="row-title">${category.name}</strong><small class="row-subtitle">${t("validWords", { count: category.words.length })}</small></span>`;
    row.append(button(t("delete"), "small-button", () => {
      state.customCategories = state.customCategories.filter((item) => item.id !== category.id);
      if (state.categoryId === category.id) {
        state.categoryId = "food";
      }
      save();
      render();
    }));
    list.append(row);
  });
  screen.append(list.children.length ? list : empty(t("emptyCategories")));
  return screen;
}

function renderReveal() {
  const session = state.session;
  if (!session) {
    return renderHome();
  }
  const player = session.players[session.revealIndex];
  const isFox = session.impostorIds.includes(player.id);
  const screen = element("section", "screen reveal-stage");
  const heading = element("div", "turn-heading");
  heading.innerHTML = `<p class="eyebrow">${session.revealedPlayerIds.includes(player.id) ? t("revealed") : t("unrevealed")}</p><strong>${t("turn")}</strong><h2>${player.name}</h2>`;
  screen.append(heading);

  const stage = element("div", "secret-card");
  const card = element("div", "card-inner");
  card.innerHTML = `
    <div class="card-face front"><img class="fox-head" src="../assets/images/mascot.png" alt=""><span class="secret-word">?</span></div>
    <div class="card-face back"><span class="secret-word">${isFox ? t("youAreFox") : session.secretWord}</span></div>
  `;
  stage.append(card);
  screen.append(stage);

  const reveal = button(t("holdReveal"), "primary-button", () => {});
  const next = button(session.revealIndex + 1 >= session.players.length ? t("discuss") : t("nextPlayer"), "secondary-button", () => {
    session.revealedPlayerIds = [...new Set([...session.revealedPlayerIds, player.id])];
    if (session.revealIndex + 1 >= session.players.length) {
      session.revealIndex = session.players.length - 1;
      setRoute("discussion");
    } else {
      session.revealIndex += 1;
      state.session = session;
      save();
      render();
    }
  });
  next.disabled = !session.revealedPlayerIds.includes(player.id);

  const show = () => {
    card.classList.add("revealed");
    session.revealedPlayerIds = [...new Set([...session.revealedPlayerIds, player.id])];
    state.session = session;
    next.disabled = false;
    save();
    vibrate([10, 20, 10]);
  };
  const hide = () => card.classList.remove("revealed");

  reveal.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    revealHoldId = window.setTimeout(show, 120);
  });
  const stopReveal = () => {
    window.clearTimeout(revealHoldId);
    hide();
  };
  reveal.addEventListener("pointerup", stopReveal);
  reveal.addEventListener("pointercancel", stopReveal);
  reveal.addEventListener("pointerleave", stopReveal);
  stage.addEventListener("pointerdown", show);
  stage.addEventListener("pointerup", hide);
  stage.addEventListener("pointercancel", hide);

  screen.append(reveal, next);
  return screen;
}

function renderDiscussion() {
  const session = state.session;
  if (!session) {
    return renderHome();
  }
  const screen = element("section", "screen");
  screen.append(titleBlock(t("discuss"), t("discussionHint")));
  const card = element("div", "glass-card");
  const timer = element("div", "timer");
  timer.textContent = formatTime(session.discussionSeconds);
  card.append(timer);
  const controls = element("div", "grid-3");
  let running = false;
  const toggle = button(t("resume"), "secondary-button", () => {
    running = !running;
    toggle.textContent = running ? t("pause") : t("resume");
    if (running) {
      clearTimer();
      timerId = setInterval(() => {
        session.discussionSeconds = Math.max(0, session.discussionSeconds - 1);
        timer.textContent = formatTime(session.discussionSeconds);
        save();
        if (session.discussionSeconds === 0) {
          clearTimer();
          vibrate([40, 30, 40]);
        }
      }, 1000);
    } else {
      clearTimer();
    }
  });
  controls.append(toggle);
  controls.append(button(t("reset"), "secondary-button", () => {
    session.discussionSeconds = state.discussionMinutes * 60;
    timer.textContent = formatTime(session.discussionSeconds);
    save();
  }));
  controls.append(button(t("goVoting"), "primary-button", () => setRoute("voting")));
  card.append(controls);
  screen.append(card);
  return screen;
}

function renderVoting() {
  const session = state.session;
  if (!session) {
    return renderHome();
  }
  const voter = session.players[session.votingIndex];
  const selected = new Set(session.votes[voter.id] ?? []);
  const screen = element("section", "screen");
  screen.append(titleBlock(`${t("voteFor")}: ${voter.name}`, t("pickSuspects", { count: session.impostorIds.length })));

  const grid = element("div", "vote-grid");
  session.players.filter((player) => player.id !== voter.id).forEach((player) => {
    const row = element("button", `choice-row ${selected.has(player.id) ? "selected" : ""}`);
    row.type = "button";
    row.innerHTML = `<span class="avatar">${player.name.slice(0, 1).toUpperCase()}</span><span><strong class="row-title">${player.name}</strong></span><span>${selected.has(player.id) ? "✓" : ""}</span>`;
    row.addEventListener("click", () => {
      if (selected.has(player.id)) {
        selected.delete(player.id);
      } else if (selected.size < session.impostorIds.length) {
        selected.add(player.id);
      }
      session.votes[voter.id] = [...selected];
      save();
      render();
    });
    grid.append(row);
  });
  screen.append(grid);

  const submit = button(t("castVote"), "primary-button", () => {
    vibrate(18);
    if (session.votingIndex + 1 >= session.players.length) {
      finishVoting();
    } else {
      session.votingIndex += 1;
      state.session = session;
      save();
      render();
    }
  });
  submit.disabled = selected.size !== session.impostorIds.length;
  screen.append(submit);
  screen.append(button(t("skipVote"), "secondary-button", () => {
    session.votes[voter.id] = [];
    if (session.votingIndex + 1 >= session.players.length) {
      finishVoting();
    } else {
      session.votingIndex += 1;
      save();
      render();
    }
  }));
  return screen;
}

function renderResults() {
  const session = state.session;
  if (!session) {
    return renderHome();
  }
  const screen = element("section", "screen");
  const title = element("h1", "winner-title");
  title.textContent = session.huntersWin ? t("huntersWin") : t("foxesWin");
  const mascot = element("img", "result-mascot");
  mascot.src = "../assets/images/fox.png";
  mascot.alt = "";
  screen.append(mascot, title);
  screen.append(infoCard(t("secretWord"), session.secretWord));
  screen.append(infoCard(t("hiddenFoxes"), session.players.filter((player) => session.impostorIds.includes(player.id)).map((player) => player.name).join(", ")));

  const scores = element("div", "list");
  session.players
    .map((player) => ({ ...player, votes: session.voteTotals?.[player.id] ?? 0 }))
    .sort((a, b) => b.score - a.score)
    .forEach((player) => {
      const row = element("div", "score-row");
      row.innerHTML = `<span class="avatar">${player.name.slice(0, 1).toUpperCase()}</span><span><strong>${player.name}</strong><small class="row-subtitle">${t("votes")}: ${player.votes}</small></span><strong>${player.score}</strong>`;
      scores.append(row);
    });
  screen.append(scores);
  screen.append(button(session.round >= session.totalRounds ? t("home") : t("playAgain"), "primary-button", nextRound));
  screen.append(button(t("home"), "secondary-button", () => {
    state.session = null;
    setRoute("home");
  }));
  return screen;
}

function stepperCard(label, value, min, max, onChange) {
  const card = element("div", "glass-card");
  card.append(sectionTitle(label));
  const stepper = element("div", "stepper");
  const minus = button("−", "small-button", () => {
    const next = Math.max(min, value - 1);
    onChange(next);
    save();
    render();
  });
  const plus = button("+", "small-button", () => {
    const next = Math.min(max, value + 1);
    onChange(next);
    save();
    render();
  });
  stepper.append(minus, element("strong", "", value), plus);
  card.append(stepper);
  return card;
}

function titleBlock(title, subtitle) {
  const block = element("div");
  block.innerHTML = `<h2>${title}</h2><p class="muted">${subtitle}</p>`;
  return block;
}

function sectionTitle(text) {
  const title = element("h3");
  title.textContent = text;
  return title;
}

function infoCard(title, value) {
  const card = element("div", "glass-card");
  card.innerHTML = `<p class="eyebrow">${title}</p><h2>${value}</h2>`;
  return card;
}

function field(label, tag) {
  const wrap = element("label", "field");
  const span = element("span");
  const control = element(tag);
  span.textContent = label;
  wrap.append(span, control);
  return { wrap, control };
}

function empty(text) {
  const box = element("div", "empty");
  box.textContent = text;
  return box;
}

function button(text, className, onClick) {
  const node = element("button", className);
  node.type = "button";
  node.textContent = text;
  node.addEventListener("click", onClick);
  return node;
}

function element(tag, className = "", text = "") {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

backButton.addEventListener("click", () => {
  const fallback = {
    setup: "home",
    categories: "home",
    reveal: "setup",
    discussion: "reveal",
    voting: "discussion",
    results: "home"
  };
  setRoute(fallback[state.route] ?? "home");
});

settingsButton.addEventListener("click", () => settingsDialog.showModal());

languageSelect.addEventListener("change", () => {
  settings.language = languageSelect.value;
  save();
  render();
});

soundToggle.addEventListener("change", () => {
  settings.sound = soundToggle.checked;
  save();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
  settingsDialog.close();
  save();
  render();
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  installButton.hidden = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

render();
