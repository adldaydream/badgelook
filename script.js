let badges = [];

fetch("badges.json")
  .then(res => res.json())
  .then(data => badges = data);

function searchBadges() {
  const name = document.getElementById("nameInput").value.toLowerCase().trim();
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (!name) {
    results.innerHTML = `
      <p>
        Enter your name as it appears on your Attendee card.<br>
        Need help? <a href="mailto:adelaide.daydream@gmail.com">Contact us</a>.
      </p>`;
    return;
  }

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

