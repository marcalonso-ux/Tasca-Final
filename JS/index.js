import { storage } from './storage.js';
import { renderGrafic } from './grafics.js';

window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

async function inicialitzar() {
    await storage.importarDesdeJSON('dades/activitats_001.json');
    
    const activitats = storage.getActivitats();
    renderLlista(activitats);
    renderGrafic(activitats);
}

function renderLlista(llista) {
    const pendents = document.getElementById('tasques-pendents');
    const acabades = document.getElementById('tasques-acabades');
    
    pendents.innerHTML = '';
    acabades.innerHTML = '';

    llista.forEach(act => {
        const div = document.createElement('div');
        div.className = 'tasca-card';
        div.style.borderLeft = `8px solid ${act.color}`;
        div.innerHTML = `
            <span>${act.titol}</span>
            <button onclick="canviarEstat('${act.id}')">${act.realitzada ? '🔄' : '✅'}</button>
            <button onclick="borrar('${act.id}')">🗑️</button>
        `;
        (act.realitzada ? acabades : pendents).appendChild(div);
    });
}

window.canviarEstat = (id) => {
    const acts = storage.getActivitats();
    const task = acts.find(a => a.id === id);
    if(task) task.realitzada = !task.realitzada;
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
    
    if(btnPujar) {
        btnPujar.onclick = async () => {
            await storage.importarDesdeJSON('dades/' + inputUrl.value);
            inicialitzar();
        };
    }
});