import { storage } from './storage.js';

window.irCateg = () => window.location.href = "categories.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrIndex = () => window.location.href = "index.html";

document.addEventListener('DOMContentLoaded', () => {
    const botonCrear = document.querySelector('.NovaT');

    botonCrear.addEventListener('click', () => {
        const titol = document.getElementById('titol_name').value.trim();
        const descripcio = document.getElementById('titol_descripcio').value.trim();
        const data = document.getElementById('fecha').value;
        const categoria = document.getElementById('opcionesCat').value;
        const prioritat = document.getElementById('opcionesPrio').value;
        const inputColor = document.getElementById('color-picker');
        const color = inputColor ? inputColor.value : "#ccc"; 

        if (!titol || !data) {
            alert("Per favor, introdueix al menys el títol y la data.");
            return;
        }

        const activitatsActuals = storage.getActivitats();
        const nouId = generarProximId(activitatsActuals);

        const novaTasca = {
            id: nouId,
            titol: titol,
            descripcio: descripcio,
            fecha: data,
            categoria: categoria,
            prioritat: prioritat,
            color: color,
            realitzada: false 
        };

        activitatsActuals.push(novaTasca);
        storage.saveActivitats(activitatsActuals);

        alert("Tasca '" + titol + "' creada correctament!");
        window.location.href = "index.html";
    });
});

function generarProximId(activitats) {
    if (activitats.length === 0) return "task-001";

    const numeros = activitats.map(a => {
        const idParts = a.id.split('-'); 
        return parseInt(idParts[1]);
    });

    const maxId = Math.max(...numeros);
    const seguent = maxId + 1;
    return `task-${seguent.toString().padStart(3, '0')}`;
}