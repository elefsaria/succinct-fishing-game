function showLeaderboard() {
  const dateKey = new Date().toISOString().slice(0, 10);
  const scores = JSON.parse(localStorage.getItem("scores") || "{}")[dateKey] || {};

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  app.innerHTML = `<h2>🏆 Daily Leaderboard (${dateKey})</h2>`;
  sorted.forEach(([name, score], index) => {
    app.innerHTML += `<p>${index + 1}. ${name} – ${score} pts</p>`;
  });

  app.innerHTML += `<button onclick="renderGame(JSON.parse(localStorage.getItem('team')))">⬅ Back to Game</button>`;
}
