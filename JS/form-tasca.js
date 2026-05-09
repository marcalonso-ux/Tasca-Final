import { storage } from './storage.js';
import { crearTasca } from './models.js';

window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

document.addEventListener('DOMContentLoaded', () => {
    const selectCat = document.getElementById('opcionesCat');

    const catsManuals = JSON.parse(localStorage.getItem('categories_list')) || ["Estudis", "Feina", "Casa"];
    const activitats = storage.getActivitats();
    const catsJSON = activitats
        .map(a => a.categoria?.nom || a.categoria)
        .filter(Boolean);

    const totes = [...new Set([...catsManuals, ...catsJSON])];

    if (selectCat) {
        selectCat.innerHTML = '';
        totes.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
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
            const fecha = document.getElementById('fecha').value;
            const cat = document.getElementById('opcionesCat').value;
            const prio = document.getElementById('opcionesPrio').value;

            if (!titol || !fecha) {
                alert("Per favor, omple el títol i la data.");
                return;
            }

            const activitatsActuals = storage.getActivitats();
            const novaTasca = crearTasca({
                id: generarId(activitatsActuals),
                titol,
                descripcio: desc,
                fecha,
                categoria: { nom: cat, color: '#cccccc' },
                prioritat: prio
            });

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
    return `task-${(max + 1).toString().padStart(3, '0')}`;
}