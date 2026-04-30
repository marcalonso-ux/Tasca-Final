import { storage } from './storage.js';

window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

document.addEventListener('DOMContentLoaded', () => {
    const selectCat = document.getElementById('opcionesCat');
    const catsGuardades = JSON.parse(localStorage.getItem('categories_list')) || ["Estudis", "Feina", "Casa"];

    if (selectCat) {
        selectCat.innerHTML = ''; // Limpiamos opciones estáticas
        catsGuardades.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat; // Mantenemos el nombre original
            option.textContent = cat;
            selectCat.appendChild(option);
        });
    }

    const btnCrear = document.querySelector('.NovaT');

    if (btnCrear) {
        btnCrear.onclick = (e) => {
            e.preventDefault();

            const titol = document.getElementById('titol_name').value.trim();
            const desc = document.getElementById('titol_descripcio').value.trim();
            const data = document.getElementById('fecha').value;
            const cat = document.getElementById('opcionesCat').value;
            const prio = document.getElementById('opcionesPrio').value;
            const inputColor = document.getElementById('color-picker');
            const colorEscogido = inputColor ? inputColor.value : "#4A90E2";

            if (!titol || !data) {
                alert("Per favor, omple el títol i la data.");
                return;
            }

            const activitatsActuals = storage.getActivitats();
            const nouId = generarId(activitatsActuals);
            const novaTasca = {
                id: nouId,
                titol: titol,
                descripcio: desc,
                fecha: data,
                categoria: cat,
                prioritat: prio,
                color: colorEscogido,
                realitzada: false
            };

            activitatsActuals.push(novaTasca);
            storage.saveActivitats(activitatsActuals);
            alert("Tasca creada!");
            window.location.href = "index.html";
        };
    }
});

function generarId(activitats) {
    if (activitats.length === 0) return "task-001";

    const numeros = activitats.map(a => {
    const partes = String(a.id).split('-');
        return partes.length > 1 ? parseInt(partes[1]) : 0;
    });

    const max = Math.max(...numeros);
    const siguiente = max + 1;
    return `task-${siguiente.toString().padStart(3, '0')}`;
}