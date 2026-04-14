// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

//Your code here
async function fetchWeatherAlerts(state) {
  try {
    if (!state) throw new Error("State input cannot be empty");

    const res = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!res.ok) throw new Error("Failed to fetch weather alerts");

    const data = await res.json();

    displayAlerts(data);

    document.getElementById("state-input").value = "";

    const errorBox = document.getElementById("error-message");
    errorBox.textContent = "";
    errorBox.classList.add("hidden");

  } catch (err) {
    displayError(err.message);
  }
}

function displayAlerts(data) {
  const display = document.getElementById("alerts-display");
  display.innerHTML = "";

  const alerts = data.features;

  const summary = document.createElement("h2");
  summary.textContent = `Weather Alerts: ${alerts.length}`;

  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties?.headline;
    list.appendChild(li);
  });

  display.appendChild(summary);
  display.appendChild(list);
}

function displayError(message) {
  const errorBox = document.getElementById("error-message");
  const display = document.getElementById("alerts-display");

  display.innerHTML = "";

  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

document
  .getElementById("fetch-alerts")
  .addEventListener("click", () => {
    const state = document
      .getElementById("state-input")
      .value
      .trim()
      .toUpperCase();

    fetchWeatherAlerts(state);
  });
