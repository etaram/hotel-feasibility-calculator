function calculateFeasibility() {
  // שליפת ערכים מהמשתמש
  const landCost = parseFloat(document.getElementById('landCost').value);
  const minBuildCost = parseFloat(document.getElementById('minBuildCost').value);
  const maxBuildCost = parseFloat(document.getElementById('maxBuildCost').value);
  const occupancyRate = parseFloat(document.getElementById('occupancyRate').value) / 100;
  const avgIncomePerNight = parseFloat(document.getElementById('avgIncomePerNight').value);

  // חישובים כלכליים
  const totalLandCost = landCost * 10; // 10 וילות
  const minTotalBuildCost = minBuildCost * 200 * 10; // 200 מ"ר לוילה * 10 וילות
  const maxTotalBuildCost = maxBuildCost * 200 * 10;
  const minTotalInitialCost = totalLandCost + minTotalBuildCost;
  const maxTotalInitialCost = totalLandCost + maxTotalBuildCost;

  const annualIncome = avgIncomePerNight * occupancyRate * 365 * 10;
  const minOperationalCost = 480000;
  const maxOperationalCost = 1140000;
  const marketingCost = 600000;
  
  // הוספת עלויות נוספות
  const landDevelopmentCost = 200000 * 10;
  const publicAreaDevelopmentCost = 100000 * 10;
  const receptionBuildingCost = 7000 * 100;
  const eventHallCost = 7000 * 100;
  const planningAndConsultingCost = 150000;

  const additionalCosts = landDevelopmentCost + publicAreaDevelopmentCost + receptionBuildingCost + eventHallCost + planningAndConsultingCost;

  const totalMinCost = minTotalInitialCost + additionalCosts + minOperationalCost + marketingCost;
  const totalMaxCost = maxTotalInitialCost + additionalCosts + maxOperationalCost + marketingCost;

  const minProfit = annualIncome - totalMinCost;
  const maxProfit = annualIncome - totalMaxCost;

  const minFeasibility = (minProfit / totalMinCost) * 100;
  const maxFeasibility = (maxProfit / totalMaxCost) * 100;

  // הצגת תוצאות
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `רווח מינימלי: ${minProfit.toFixed(2)} ש"ח <br> רווח מקסימלי: ${maxProfit.toFixed(2)} ש"ח <br> כדאיות מינימלית: ${minFeasibility.toFixed(2)}% <br> כדאיות מקסימלית: ${maxFeasibility.toFixed(2)}%`;
  resultElement.className = (minProfit > 0 && maxProfit > 0) ? 'positive-result' : 'negative-result';

  // עדכון גרף
  updateChart(minFeasibility, maxFeasibility);
}

function updateChart(minFeasibility, maxFeasibility) {
  const ctx = document.getElementById('feasibilityChart').getContext('2d');
  const feasibilityChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['כדאיות מינימלית', 'כדאיות מקסימלית'],
      datasets: [{
        label: 'כדאיות (%)',
        data: [minFeasibility, maxFeasibility],
        backgroundColor: ['#4CAF50', '#FF0000']
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
