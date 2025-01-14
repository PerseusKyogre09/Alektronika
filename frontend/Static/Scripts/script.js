// Function to create a line chart
function createLineChart(ctx, label, data, borderColor, backgroundColor) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.time),
      datasets: [{
        label: label,
        data: data.map(item => item.value),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        tension: 0.4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: borderColor,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#fff' // White legend text
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date',
            color: '#fff' // White axis title
          },
          ticks: {
            color: '#ffffff', // White ticks
          },
          grid: {
            color: '#232323' // White grid lines
          },
        },
        y: {
          title: {
            display: true,
            text: `Usage (${label.split(' ')[0]})`,
            color: '#fff' // White axis title
          },
          ticks: {
            color: '#ffffff', // White ticks
          },
          grid: {
            color: '#232323' // White grid lines
          },
          beginAtZero: true
        }
      }
    }
  });
}

// Electricity Chart
async function fetchElectricityData() {
  try {
    const response = await fetch('/database/Usage.json');
    const data = await response.json();
    const ctx = document.getElementById('electricityChart').getContext('2d');
    createLineChart(ctx, 'Electricity Usage (kWh)', data.electricity.usageData, '#ff9a00', 'rgba(255, 154, 0, 0.3)');
  } catch (error) {
    console.error('Error fetching the JSON data:', error);
  }
}

// Gas Chart
async function fetchGasData() {
  try {
    const response = await fetch('/database/Usage.json');
    const data = await response.json();
    const ctx = document.getElementById('gasChart').getContext('2d');
    createLineChart(ctx, 'Gas Usage (m³)', data.gas.usageData, '#e12576', 'rgba(225, 37, 118, 0.3)');
  } catch (error) {
    console.error('Error fetching the JSON data:', error);
  }
}

// Water Chart
async function fetchWaterData() {
  try {
    const response = await fetch('/database/Usage.json');
    const data = await response.json();
    const ctx = document.getElementById('waterChart').getContext('2d');
    createLineChart(ctx, 'Water Usage (L)', data.water.usageData, '#6576ff', 'rgba(101, 118, 255, 0.3)');
  } catch (error) {
    console.error('Error fetching the JSON data:', error);
  }
}

// Sidebar toggle functionality
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');
const mainContent = document.querySelector('.main-content');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('visible');
  mainContent.classList.toggle('expanded');
});

// Navbar navigation
document.getElementById('resources-btn').addEventListener('click', () => {
  window.location.href = 'resources.html';
});

document.getElementById('products-btn').addEventListener('click', () => {
  window.location.href = 'products.html';
});

document.getElementById('ai-btn').addEventListener('click', () => {
  window.location.href = 'ai.html';
});

document.getElementById('conservation-plans-btn').addEventListener('click', () => {
  window.location.href = 'conservation-plans.html';
});

document.getElementById('about-btn').addEventListener('click', () => {
  window.location.href = 'about.html';
});

// Sidebar navigation
document.getElementById('notifications-btn').addEventListener('click', () => {
  window.location.href = 'notifications.html';
});

document.getElementById('conservation-btn').addEventListener('click', () => {
  window.location.href = 'conservation.html';
});

document.getElementById('electrocoins-btn').addEventListener('click', () => {
  window.location.href = 'electrocoins.html';
});

document.getElementById('gov-sites-btn').addEventListener('click', () => {
  window.location.href = 'gov-sites.html';
});

document.getElementById('username').addEventListener('click', () => {
  window.location.href = 'user-details.html';
});

// AI bot click event
document.getElementById('ai-bot').addEventListener('click', () => {
  alert('AI Bot Activated!');
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', async () => {
  const dateInput = document.getElementById('search-date').value;
  const searchResultElement = document.querySelector('#block1 .search-result p');

  if (dateInput) {
    const usageData = await fetchUsageData();
    const filteredData = filterDataByDate(usageData, dateInput);

    searchResultElement.textContent = `Electricity: ${filteredData.electricity.day}, Gas: ${filteredData.gas.day}, Water: ${filteredData.water.day}`;
  } else {
    alert('Please select a date.');
    searchResultElement.textContent = 'No data to display.';
  }
});

// Fetch and render data
document.addEventListener('DOMContentLoaded', async () => {
  const usageData = await fetchUsageData();
  updateDashboard(usageData);
  fetchElectricityData();
  fetchGasData();
  fetchWaterData();
});

// Function to fetch data from JSON file
async function fetchUsageData() {
  const response = await fetch('/database/Usage.json');
  const data = await response.json();
  return data;
}

// Function to filter data based on selected date
function filterDataByDate(data, date) {
  const filteredData = { ...data };
  ['electricity', 'gas', 'water'].forEach((key) => {
    const usageEntry = data[key].usageData.find((entry) => entry.time === date);
    filteredData[key].day = usageEntry ? `${usageEntry.value} ${key === 'water' ? 'L' : key === 'gas' ? 'm³' : 'kWh'}` : 'No data';
  });
  return filteredData;
}

// Update dashboard with fetched data
function updateDashboard(data) {
  document.getElementById('electricity-day').textContent = data.electricity.day;
  document.getElementById('electricity-week').textContent = data.electricity.week;
  document.getElementById('electricity-month').textContent = data.electricity.month;

  document.getElementById('gas-day').textContent = data.gas.day;
  document.getElementById('gas-week').textContent = data.gas.week;
  document.getElementById('gas-month').textContent = data.gas.month;

  document.getElementById('water-day').textContent = data.water.day;
  document.getElementById('water-week').textContent = data.water.week;
  document.getElementById('water-month').textContent = data.water.month;
}
