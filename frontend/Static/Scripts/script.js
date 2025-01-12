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
