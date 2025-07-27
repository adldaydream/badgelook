let badges = [];

fetch("badges.json")
  .then(res => res.json())
  .then(data => badges = data);

function searchBadges() {
  const name = document.getElementById("nameInput").value.toLowerCase().trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  let found = false;

  badges.forEach(badge => {
    const person = badge.people.find(p => p.name.toLowerCase() === name);
    if (person) {
      found = true;
      const badgeDiv = document.createElement("div");
      badgeDiv.className = "badge";
      badgeDiv.innerHTML = `<img src="${badge.image}" alt="${badge.name}">`;
      badgeDiv.onclick = () => showModal(badge, person.date);
      results.appendChild(badgeDiv);
    }
  });

  if (!found) {
    results.innerHTML = "<p>No badges found for this name.</p>";
  }
}

function showModal(badge, date) {
  document.getElementById("badgeName").textContent = badge.name;
  document.getElementById("badgeImage").src = badge.image;
  document.getElementById("badgeDesc").textContent = badge.description;
  document.getElementById("badgeDate").textContent = "Unlocked on: " + date;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}