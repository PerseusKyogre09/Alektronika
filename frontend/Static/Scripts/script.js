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

const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebarToggle');
const mainContent = document.querySelector('.main-content');

toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('visible');
  mainContent.classList.toggle('expanded');
});

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

document.getElementById('ai-bot').addEventListener('click', () => {
  alert('AI Bot Activated!');
});

document.getElementById('username').addEventListener('click', () => {
  window.location.href = 'user-details.html';
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

// Function to update the dashboard with fetched data
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

  updateChart('electricity-chart', data.electricity.usageData);
  updateChart('gas-chart', data.gas.usageData);
  updateChart('water-chart', data.water.usageData);
}

// Function to update the usage charts
function updateChart(chartId, usageData) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const labels = usageData.map(entry => entry.time);
  const data = usageData.map(entry => entry.value);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Usage Over Time',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Usage'
          }
        }
      }
    }
  });
}

// Search button event handler
document.getElementById('search-btn').addEventListener('click', async () => {
  const dateInput = document.getElementById('search-date').value;
  const searchResultElement = document.querySelector('#block1 .search-result p');
  
  if (dateInput) {
    const usageData = await fetchUsageData();
    const filteredData = filterDataByDate(usageData, dateInput);

    // Display search results
    searchResultElement.textContent = `Electricity: ${filteredData.electricity.day}, Gas: ${filteredData.gas.day}, Water: ${filteredData.water.day}`;
  } else {
    alert('Please select a date.');
    searchResultElement.textContent = 'No data to display.';
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const usageData = await fetchUsageData();
  updateDashboard(usageData);
});
