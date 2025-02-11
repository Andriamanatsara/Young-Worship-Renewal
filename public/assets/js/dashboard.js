// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
  }

  // Close the sidebar when a menu item is clicked
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.remove('show');
    });
  });



  // Données fictives pour la répartition des âges des membres
  const ageData = {
    labels: ['-18', '19-25', '26-30', '31-50', '50+'],  // Tranches d'âge
    datasets: [{
      data: [12, 20, 5, 6, 3], // Nombre de membres dans chaque tranche d'âge
      backgroundColor: '#FBBA16', // Couleur des barres
      borderColor: '#FBBA16',
      borderWidth: 1,
      borderRadius: 3, 
    }]
  };

  // Configuration du graphique
  const config = {
    type: 'bar',
    data: ageData,
    options: {
      plugins: {
        legend: {
          display: false, // Masquer la légende
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.raw + ' membres';
            }
          }
        },
        datalabels: {
          anchor: 'center', 
          align: 'start',
          color: '#fff', 
          font: {
            weight: 'bold',
          },
          formatter: function(value) {
            const total = ageData.datasets[0].data.reduce((sum, val) => sum + val, 0); // Calcul du total
            const percentage = ((value / total) * 100).toFixed(1); // Calcul du pourcentage
            return percentage + '%'; 
          }
        }
      },
      scales: {
        x: {
          beginAtZero: false,
          ticks: {
            color: 'white', // Couleur des tranches d'âge en blanc
          },
          grid: {
            display: false, // Grille en blanc clair
          }
        },
        y: {
          beginAtZero: true,
          display : false
        }
      }
    }
  };

  // Création du graphique
  const ctx = document.getElementById('ageChart').getContext('2d');
  new Chart(ctx, config);