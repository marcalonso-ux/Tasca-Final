export function renderGrafic(activitats) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;

    const totalMesos = new Array(12).fill(0);
    const realitzadesMesos = new Array(12).fill(0);

    activitats.forEach(a => {
        const mes = new Date(a.fecha).getMonth();
        totalMesos[mes]++;
        if (a.realitzada) realitzadesMesos[mes]++;
    });

    // Proporció (0 a 1) — si no hi ha tasques aquell mes, deixa 0
    const proporcions = realitzadesMesos.map((r, i) =>
        totalMesos[i] > 0 ? parseFloat((r / totalMesos[i]).toFixed(2)) : 0
    );

    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
            datasets: [{
                label: 'Tasques realitzades',
                data: proporcions,
                backgroundColor: 'rgba(173, 216, 230, 0.65)',
                borderColor: 'rgba(100, 180, 210, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (item) => {
                            const mes = item.dataIndex;
                            return `${realitzadesMesos[mes]} de ${totalMesos[mes]} tasques (${(item.raw * 100).toFixed(0)}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 1,
                    ticks: {
                        stepSize: 0.1,
                        callback: v => v.toFixed(1)
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