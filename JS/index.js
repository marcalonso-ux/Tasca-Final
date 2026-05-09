import { storage } from './storage.js';
import { renderGrafic } from './grafics.js';

window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

async function inicialitzar() {
    const dadesActuals = storage.getActivitats();
    if (dadesActuals.length === 0) {
        await storage.importarDesdeJSON('dades/activitats_001.json');
        await storage.importarDesdeJSON('dades/activitats_002.json');
    }
    const activitats = storage.getActivitats();
    renderLlista(activitats);
    renderGrafic(activitats);
}

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

    llista.forEach(act => {
        const color = act.color || '#cccccc';
        const div = document.createElement('div');
        div.className = 'tasca-card';
        div.style.backgroundColor = hexToRgba(color, 0.15);
        div.style.borderLeft = `6px solid ${color}`;
        div.innerHTML = `
            <div class="tasca-card-top">
                <span class="tasca-titol">${act.titol}</span>
                <span class="tasca-prioritat">${act.prioritat}</span>
            </div>
            <span class="tasca-badge" style="background-color: ${color}">
                ${act.categoria}
            </span>
            <span class="tasca-data">${act.fecha}</span>
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

document.addEventListener('DOMContentLoaded', () => {
    inicialitzar();
    const btnPujar = document.querySelector('.conjunt .NovaT');
    const inputUrl = document.querySelector('.escribir');

    if (btnPujar) {
        btnPujar.onclick = async () => {
            await storage.importarDesdeJSON('dades/' + inputUrl.value);
            inicialitzar();
        };
    }
});