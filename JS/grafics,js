export function renderGrafic(activitats) {
    const ctx = document.getElementById('miGrafico');
    if (!ctx) return;

    const dadesMesos = new Array(12).fill(0);
    activitats.forEach(act => {
        if (act.realitzada) {
            const mes = new Date(act.fecha).getMonth();
            dadesMesos[mes]++;
        }
    });

    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des'],
            datasets: [{
                label: 'Tasques Completades',
                data: dadesMesos,
                backgroundColor: '#4A90E2'
            }]
        }
    });
}