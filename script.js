let currentRoundIndex = 0;
let rounds = [];

const roundTitle = document.getElementById("roundTitle");
const gamesList = document.getElementById("gamesList");
const prevRoundButton = document.getElementById("prevRound");
const nextRoundButton = document.getElementById("nextRound");

const shields = {
  "time-a": "images/team_shield_a.png",
  "time-b": "images/team_shield_b.png",
  "time-c": "images/team_shield_c.png",
  "time-d": "images/team_shield_d.png",
  "time-e": "images/team_shield_e.png",
  "time-f": "images/team_shield_f.png",
  "time-g": "images/team_shield_g.png",
  "time-h": "images/team_shield_h.png",
};

async function fetchRounds() {
  try {
    const response = await fetch("https://sevn-pleno-esportes.deno.dev/");
    if (!response.ok) {
      throw new Error("Erro ao buscar os dados da API");
    }
    rounds = await response.json();
    updateRound();
  } catch (error) {
    console.error("Erro:", error);
  }
}

function updateRound() {
  if (rounds.length === 0) return;

  const currentRound = rounds[currentRoundIndex];
  roundTitle.textContent = `Rodada ${currentRound.round}`;
  gamesList.innerHTML = "";

  currentRound.games.forEach((game) => {
    const listItem = document.createElement("li");
    listItem.className = "game-item";
    listItem.innerHTML = `
            <img src="${shields[game.team_home_id]}" alt="${
      game.team_home_name
    }" class="team-icon">
            <span>${game.team_home_name}</span>
            <span class="score">${game.team_home_score}</span>
            <img src="images/vs.png" alt="Versus" class="vs-icon">
            <span class="score">${game.team_away_score}</span>
            <span>${game.team_away_name}</span>
            <img src="${shields[game.team_away_id]}" alt="${
      game.team_away_name
    }" class="team-icon">
        `;
    gamesList.appendChild(listItem);
  });

  prevRoundButton.disabled = currentRoundIndex === 0;
  nextRoundButton.disabled = currentRoundIndex === rounds.length - 1;
}

prevRoundButton.addEventListener("click", () => {
  if (currentRoundIndex > 0) {
    currentRoundIndex--;
    updateRound();
  }
});

nextRoundButton.addEventListener("click", () => {
  if (currentRoundIndex < rounds.length - 1) {
    currentRoundIndex++;
    updateRound();
  }
});

fetchRounds();
