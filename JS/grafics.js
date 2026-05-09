export function renderGrafic(activitats) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;

    const realitzadesMesos = new Array(12).fill(0);

    activitats.filter(a => a.realitzada).forEach(a => {
        const fecha = a.fecha || a.data || '';
        const mes = new Date(fecha).getMonth();
        if (!isNaN(mes)) realitzadesMesos[mes]++;
    });

    const maxVal = Math.max(...realitzadesMesos, 1);
    const maxEix = maxVal <= 1 ? 1 : Math.ceil(maxVal / 0.2) * 0.2;

    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
            datasets: [{
                label: 'Tasques realitzades',
                data: realitzadesMesos,
                backgroundColor: 'rgba(173, 216, 230, 0.65)',
                borderColor: 'rgba(100, 180, 210, 1)',
                borderWidth: 1
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
                    max: maxEix + 0.2,
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