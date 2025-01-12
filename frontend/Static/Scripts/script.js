// Redirect to respective pages on navbar button click
document.getElementById('resources-btn').addEventListener('click', () => {
  window.location.href = 'resources.html'; // Replace with your actual URL for Resources
});

document.getElementById('products-btn').addEventListener('click', () => {
  window.location.href = 'products.html'; // Replace with your actual URL for Products
});

document.getElementById('ai-btn').addEventListener('click', () => {
  window.location.href = 'ai.html'; // Replace with your actual URL for AI
});

document.getElementById('conservation-plans-btn').addEventListener('click', () => {
  window.location.href = 'conservation-plans.html'; // Replace with your actual URL for Conservation Plans
});

document.getElementById('about-btn').addEventListener('click', () => {
  window.location.href = 'about.html'; // Replace with your actual URL for About
});


// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');
const mainContent = document.querySelector('.main-content');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('visible');
  mainContent.classList.toggle('expanded');
});

// Redirect to respective pages on button click
document.getElementById('notifications-btn').addEventListener('click', () => {
  window.location.href = 'notifications.html'; // Replace with your actual URL
});

document.getElementById('conservation-btn').addEventListener('click', () => {
  window.location.href = 'conservation.html'; // Replace with your actual URL
});

document.getElementById('electrocoins-btn').addEventListener('click', () => {
  window.location.href = 'electrocoins.html'; // Replace with your actual URL
});

document.getElementById('gov-sites-btn').addEventListener('click', () => {
  window.location.href = 'gov-sites.html'; // Replace with your actual URL
});

// AI Bot activation
document.getElementById('ai-bot').addEventListener('click', () => {
  alert('AI Bot Activated!');
});

// Username click - user details page
document.getElementById('username').addEventListener('click', () => {
  window.location.href = 'user-details.html'; // Replace with actual user details page URL
});

// Example function to fetch data from API (replace URL and key as needed)
async function fetchUsageData(date) {
  const response = await fetch(`https://api.example.com/usage?date=${date}`);
  const data = await response.json();
  return data;
}

// Function to update the dashboard with fetched data
function updateDashboard(data) {
  document.getElementById('electricity-day').textContent = `${data.electricity.day} kWh`;
  document.getElementById('electricity-week').textContent = `${data.electricity.week} kWh`;
  document.getElementById('electricity-month').textContent = `${data.electricity.month} kWh`;

  document.getElementById('gas-day').textContent = `${data.gas.day} m³`;
  document.getElementById('gas-week').textContent = `${data.gas.week} m³`;
  document.getElementById('gas-month').textContent = `${data.gas.month} m³`;

  document.getElementById('water-day').textContent = `${data.water.day} L`;
  document.getElementById('water-week').textContent = `${data.water.week} L`;
  document.getElementById('water-month').textContent = `${data.water.month} L`;
}

// Setup search button functionality
document.getElementById('search-btn').addEventListener('click', async () => {
  const date = document.getElementById('search-date').value;
  if (date) {
    const usageData = await fetchUsageData(date);
    updateDashboard(usageData);
  } else {
    alert('Please select a date.');
  }
});



