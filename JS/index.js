import { storage } from './storage.js';
import { renderGrafic } from './grafics.js';
import { crearTasca } from './models.js';

window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

function hexToRgba(hex, alpha) {
    if (!hex || !hex.startsWith('#')) return `rgba(200,200,200,${alpha})`;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function renderLlista(llista) {
    const pendents = document.getElementById('tasques-pendents');
    const acabades = document.getElementById('tasques-acabades');

    pendents.innerHTML = '';
    acabades.innerHTML = '';

    const prioritatColor = {
        'Alta': '#e74c3c', 'alta': '#e74c3c',
        'Mitjana': '#f1c40f', 'mitjana': '#f1c40f',
        'Baixa': '#2ecc71', 'baixa': '#2ecc71'
    };

    const ordenada = [...llista].sort((a, b) => {
        const fechaA = new Date(a.fecha || a.data || '');
        const fechaB = new Date(b.fecha || b.data || '');
        return fechaA - fechaB;
    });

    ordenada.forEach(act => {
        const color = prioritatColor[act.prioritat] || '#cccccc';
        const categoriaNom = act.categoria?.nom || act.categoria || 'General';
        const fecha = act.fecha || act.data || '';

        const div = document.createElement('div');
        div.className = `tasca-card ${act.realitzada ? 'tasca-acabada' : ''}`;
        div.style.backgroundColor = hexToRgba(color, 0.15);
        div.style.borderLeft = `6px solid ${color}`;
        div.innerHTML = `
            <div class="tasca-card-top">
                <span class="tasca-titol">${act.titol}</span>
                <span class="tasca-prioritat">${act.prioritat}</span>
            </div>
            <span class="tasca-badge" style="background-color: ${color}">
                ${categoriaNom}
            </span>
            <span class="tasca-data">${fecha}</span>
            <div class="tasca-card-bot">
                <span class="tasca-desc">${act.descripcio}</span>
                <div class="tasca-accions">
                    <button class="btn-check" onclick="canviarEstat('${act.id}')">✅</button>
                    <button class="btn-trash" onclick="borrar('${act.id}')">🗑️</button>
                </div>
            </div>
        `;
        (act.realitzada ? acabades : pendents).appendChild(div);
    });
}

async function inicialitzar() {
    const activitats = storage.getActivitats();
    renderLlista(activitats);
    renderGrafic(activitats);
}

window.canviarEstat = (id) => {
    const acts = storage.getActivitats();
    const task = acts.find(a => a.id === id);
    if (task) task.realitzada = !task.realitzada;
    storage.saveActivitats(acts);
    inicialitzar();
};

window.borrar = (id) => {
    const acts = storage.getActivitats().filter(a => a.id !== id);
    storage.saveActivitats(acts);
    inicialitzar();
};

window.crearRapid = () => {
    const input = document.querySelector('.escribir');
    const titol = input.value.trim();
    if (!titol) return;

    const acts = storage.getActivitats();
    const novaTasca = crearTasca({ titol });
    acts.push(novaTasca);
    storage.saveActivitats(acts);
    input.value = '';
    inicialitzar();
};

document.addEventListener('DOMContentLoaded', () => {
    inicialitzar();

    const btnPujar = document.querySelector('.conjunt .NovaT');
    const inputUrl = document.querySelector('.escribir');

    if (btnPujar) {
        btnPujar.onclick = async () => {
            const nom = inputUrl.value.trim();
            if (!nom) return;
            await storage.importarDesdeJSON('dades/' + nom);
            inputUrl.value = '';
            inicialitzar();
        };
    }
});