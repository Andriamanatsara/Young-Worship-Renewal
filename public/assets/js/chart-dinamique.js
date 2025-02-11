fetch('/api/get-age-distribution')  // Exemple d'API
  .then(response => response.json())
  .then(data => {
    const updatedData = {
      labels: data.labels, // Tranches d'âge venant de l'API
      datasets: [{
        label: 'Nombre de membres',
        data: data.values, // Valeurs venant de l'API
        backgroundColor: '#FBBA16',
        borderColor: '#FBBA16',
        borderWidth: 1
      }]
    };

    // Mise à jour du graphique avec les nouvelles données
    chart.data = updatedData;
    chart.update();
  });





















//   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>

  async function getAgeDistributionData() {

    const response = await fetch('https://api.example.com/members/age-distribution');
    const data = await response.json();
    
    return data; 
  }

  async function updateChart() {
    const data = await getAgeDistributionData();

    const ageData = {
      labels: data.ageRanges, // Tranches d'âge récupérées dynamiquement
      datasets: [{
        data: data.membersCount, 
        backgroundColor: '#FBBA16', 
        borderColor: '#FBBA16',
        borderWidth: 1,
        borderRadius: 5, 
      }]
    };

    
    const config = {
      type: 'bar',
      data: ageData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, 
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + ' membres';
              }
            }
          },
          datalabels: {
            anchor: 'end', // Ancrage des étiquettes au-dessus des barres
            align: 'start', // Alignement au sommet des barres
            color: '#fff', // Couleur des pourcentages en blanc
            font: {
              weight: 'bold',
            },
            formatter: function(value) {
              const total = ageData.datasets[0].data.reduce((sum, val) => sum + val, 0); // Calcul du total
              const percentage = ((value / total) * 100).toFixed(1); // Calcul du pourcentage
              return percentage + '%'; // Affichage du pourcentage
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white', // Couleur des tranches d'âge en blanc
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Grille en blanc clair
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white', // Couleur des valeurs de l'axe Y en blanc
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)', // Grille en blanc clair
            }
          }
        }
      }
    };

    // Vérifier si le graphique existe déjà et le mettre à jour, sinon créer un nouveau graphique
    const ctx = document.getElementById('ageChart').getContext('2d');
    if (window.myChart) {
      window.myChart.data = ageData; // Mettre à jour les données
      window.myChart.update(); // Mettre à jour le graphique
    } else {
      window.myChart = new Chart(ctx, config); // Créer un nouveau graphique si inexistant
    }
  }

  // Appeler la fonction de mise à jour du graphique au chargement de la page
  window.onload = updateChart;