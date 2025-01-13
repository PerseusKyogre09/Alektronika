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
  
  async function fetchData() {
    try {
      // Fetch the data from the JSON file
      const response = await fetch('/database/Usage.json');
      const data = await response.json();

      // Use the data to create the chart
      const ctx = document.getElementById('lineChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Sample Data',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Values'
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  }

  // Call the fetchData function
  fetchData();
//Electricity chart code
  async function fetchElectricityData() {
    try {
      // Fetch the data from the JSON file
      const response = await fetch('/database/Usage.json');
      const data = await response.json();

      // Extract labels (dates) and values (electricity usage)
      const labels = data.electricity.usageData.map(item => item.time);
      const values = data.electricity.usageData.map(item => item.value);

      // Create the line chart
      const ctx = document.getElementById('electricityChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Electricity Usage (kWh)',
            data: values,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Usage (kWh)'
              },
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  }

  // Fetch and render the data
  fetchElectricityData();

  //Gas chart code
  async function fetchGasData() {
    try {
      // Fetch the data from the JSON file
      const response = await fetch('/database/Usage.json');
      const data = await response.json();

      // Extract labels (dates) and values (electricity usage)
      const labels = data.gas.usageData.map(item => item.time);
      const values = data.gas.usageData.map(item => item.value);

      // Create the line chart
      const ctx = document.getElementById('gasChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Gas Usage (m³)',
            data: values,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Usage (m³)'
              },
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  }

  // Fetch and render the data
  fetchGasData();
//water chart code
  async function fetchWaterData() {
    try {
      // Fetch the data from the JSON file
      const response = await fetch('/database/Usage.json');
      const data = await response.json();

      // Extract labels (dates) and values (electricity usage)
      const labels = data.water.usageData.map(item => item.time);
      const values = data.water.usageData.map(item => item.value);

      // Create the line chart
      const ctx = document.getElementById('waterChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Water Usage (L)',
            data: values,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Usage (L)'
              },
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  }

  // Fetch and render the data
  fetchWaterData();