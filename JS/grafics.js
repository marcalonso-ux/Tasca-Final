let myChart = null;

export function renderGrafic(activitats) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;

    const realitzadesMesos = new Array(12).fill(0);

    activitats.filter(a => a.realitzada).forEach(a => {
        const fecha = a.fecha || a.data || '';
        const mes = new Date(fecha).getMonth();
        if (!isNaN(mes)) realitzadesMesos[mes]++;
    });

    const maxVal = Math.max(...realitzadesMesos, 0);
    const maxEix = Math.ceil((maxVal + 1) / 0.2) * 0.2;
    
    if (myChart) {
        myChart.data.datasets[0].data = realitzadesMesos;
        myChart.options.scales.y.max = maxEix;
        myChart.update();
        return;
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
            datasets: [{
                label: 'Tasques realitzades',
                data: realitzadesMesos,
                borderColor: 'rgba(100, 180, 210, 1)',
                backgroundColor: 'rgba(173, 216, 230, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(100, 180, 210, 1)',
                pointRadius: 4,
                tension: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                y: {
                    min: 0,
                    max: maxEix,
                    ticks: {
                        stepSize: 0.2,
                        callback: v => parseFloat(v.toFixed(1))
                    },
                    grid: { color: 'rgba(0,0,0,0.06)' }
                },
                x: {
                    ticks: { autoSkip: false },
                    grid: { color: 'rgba(0,0,0,0.06)' }
                }
            }
        }
    });
}