let isWaiting = false;
let isBiting = false;
let currentFish = null;
let biteTimeout = null;

function getTierColor(tier) {
  switch (tier) {
    case "Common": return "gray";
    case "Uncommon": return "blue";
    case "Rare": return "purple";
    case "Legend": return "red";
    case "Prover": return "gold";
    default: return "black";
  }
}

function renderGame(team) {
  app.innerHTML = `
    <h2>Welcome ${localStorage.getItem("username")} from Team ${team.name}!</h2>
    <div class="rod" style="color: ${team.color};">
      🎣 ${team.name} Rod | Succinct
    </div>
    <button id="cast-btn">🎯 Cast Line</button>
    <button id="pull-btn" style="display:none;">🎣 Pull!</button>
    <div id="result" style="margin-top:20px;"></div>
    <button onclick="showLeaderboard()">🏆 Leaderboard</button>
  `;

  document.getElementById('cast-btn').onclick = castLine;
  document.getElementById('pull-btn').onclick = pullLine;
}

function castLine() {
  if (isWaiting || isBiting) return;

  isWaiting = true;
  const result = document.getElementById("result");
  let dots = 0;

  result.textContent = "🎣 Waiting";

  const loadingInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    result.textContent = "🎣 Waiting" + ".".repeat(dots);
  }, 500);

  const waitTime = Math.floor(Math.random() * 3000) + 2000;

  biteTimeout = setTimeout(() => {
    clearInterval(loadingInterval);
    isWaiting = false;
    isBiting = true;

    const fishes = [
      { name: "Mini Fish", tier: "Common", point: 10 },
      { name: "Fat Fish", tier: "Uncommon", point: 20 },
      { name: "Golden Tuna", tier: "Rare", point: 40 },
      { name: "Sharky", tier: "Legend", point: 80 },
      { name: "Succinct Whale", tier: "Prover", point: 200 },
    ];

    currentFish = fishes[Math.floor(Math.random() * fishes.length)];

    result.innerHTML = `
      🐟 A <strong>${currentFish.name}</strong> is biting! 
      <br><em>(${currentFish.tier} Tier)</em><br>Pull now!
    `;
    document.getElementById("pull-btn").style.display = "inline-block";
  }, waitTime);
}

function pullLine() {
  if (!isBiting) return;

  isBiting = false;
  document.getElementById("pull-btn").style.display = "none";

  const success = Math.random() < 0.8;
  const result = document.getElementById("result");

  if (success) {
    result.innerHTML = `
      ✅ You caught a 
      <span style="color:${getTierColor(currentFish.tier)}">
        <strong>${currentFish.name}</strong> (${currentFish.tier})
      </span>! +${currentFish.point} pts
    `;
    saveScore(currentFish.point);
  } else {
    result.innerHTML = `❌ The fish escaped! Better luck next time.`;
  }

  currentFish = null;
}

function saveScore(points) {
  const username = localStorage.getItem("username");
  const dateKey = new Date().toISOString().slice(0, 10);
  const scores = JSON.parse(localStorage.getItem("scores") || "{}");

  if (!scores[dateKey]) scores[dateKey] = {};
  if (!scores[dateKey][username]) scores[dateKey][username] = 0;
  scores[dateKey][username] += points;

  localStorage.setItem("scores", JSON.stringify(scores));
}
