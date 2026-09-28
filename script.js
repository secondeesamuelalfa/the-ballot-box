const poll = new Map();

function addOption(option) {
  if (!option) {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
  const lines = ["Poll Results:"];
  for (const [option, voters] of poll) {
    lines.push(`${option}: ${voters.size} votes`);
  }
  return lines.join("\n");
}

// ---------- seed data ----------
addOption("Turkey");
addOption("Morocco");
addOption("Spain");
vote("Turkey", "seed-voter-1");
vote("Turkey", "seed-voter-2");
vote("Morocco", "seed-voter-3");

// ---------- persistent per-browser voter id ----------
const VOTER_KEY = "ballot-box-voter-id";

function makeVoterId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID().slice(0, 8)
    : `voter-${Math.random().toString(36).slice(2, 10)}`;
}

let voterId;
try {
  voterId = localStorage.getItem(VOTER_KEY);
  if (!voterId) {
    voterId = makeVoterId();
    localStorage.setItem(VOTER_KEY, voterId);
  }
} catch (err) {
  // localStorage can throw (private browsing, restricted file:// contexts, etc.)
  // — fall back to an id that just lasts for this page load.
  voterId = makeVoterId();
}

// ---------- DOM wiring ----------
const optionsList = document.getElementById("options-list");
const resultsOutput = document.getElementById("results-output");
const addForm = document.getElementById("add-option-form");
const optionInput = document.getElementById("option-input");
const formMessage = document.getElementById("form-message");
const voterIdLabel = document.getElementById("voter-id");

voterIdLabel.textContent = voterId;

function render() {
  optionsList.innerHTML = "";

  for (const [option, voters] of poll) {
    const li = document.createElement("li");
    li.className = "option-row";

    const name = document.createElement("span");
    name.className = "option-name";
    name.textContent = option;

    const count = document.createElement("span");
    count.className = "option-count";
    count.textContent = `${voters.size} vote${voters.size === 1 ? "" : "s"}`;

    const button = document.createElement("button");
    const alreadyVoted = voters.has(voterId);
    button.className = alreadyVoted ? "vote-btn voted" : "vote-btn";
    button.textContent = alreadyVoted ? "Voted" : "Vote";
    button.disabled = alreadyVoted;
    button.addEventListener("click", () => {
      vote(option, voterId);
      render();
    });

    li.append(name, count, button);
    optionsList.appendChild(li);
  }

  resultsOutput.textContent = displayResults();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = optionInput.value.trim();
  const message = addOption(value);

  formMessage.textContent = message;
  formMessage.classList.toggle("ok", message.endsWith("added to the poll."));

  if (message.endsWith("added to the poll.")) {
    optionInput.value = "";
  }

  render();
});

render();