export function renderGrafic(activitats) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;

    const dadesMesos = new Array(12).fill(0);
    activitats.filter(a => a.realitzada).forEach(a => {
        const mes = new Date(a.fecha).getMonth();
        dadesMesos[mes]++;
    });

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
            datasets: [{
                label: 'Tasques Realitzades',
                data: dadesMesos,
                backgroundColor: 'rgba(54, 162, 235, 0.5)'
            }]
        }
    });
}