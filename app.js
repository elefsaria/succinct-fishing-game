const app = document.getElementById('app');

function showUsernameInput() {
  app.innerHTML = `
    <h1>Succinct Fishing Battle 🎣</h1>
    <input type="text" id="username" placeholder="Enter username..." />
    <button onclick="selectTeam()">Continue</button>
  `;
}

function selectTeam() {
  const username = document.getElementById('username').value.trim();
  if (!username) return alert("Please enter a username!");
  localStorage.setItem("username", username);
  renderTeamSelection();
}

function renderTeamSelection() {
  app.innerHTML = `<h2>Select Your Team</h2>`;
  teams.forEach(team => {
    const btn = document.createElement("button");
    btn.textContent = team.name;
    btn.className = "team-button";
    btn.style.backgroundColor = team.color;
    btn.onclick = () => startGame(team);
    app.appendChild(btn);
  });
}

function startGame(team) {
  localStorage.setItem("team", JSON.stringify(team));
  renderGame(team);
}

window.onload = showUsernameInput;
