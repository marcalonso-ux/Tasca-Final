import { storage } from './storage.js';
import { renderGrafic } from './grafics.js';

window.irCateg = () => {
    window.location.href = "categories.html"; 
};

window.IrCrear = () => {
    window.location.href = "crear-tasca.html";
};

window.IrIndex = () => {
    window.location.href = "index.html";
};

async function inicialitzar() {
    // Importamos los datos de los dos archivos JSON
    await storage.importarDesdeJSON('dades/activitats_001.json');
    await storage.importarDesdeJSON('dades/activitats_002.json');
    
    const activitats = storage.getActivitats();
    
    renderLlista(activitats);
    renderGrafic(activitats);
}

function renderLlista(llista) {
    const contenedor = document.getElementById('llista-activitats');
    if (!contenedor) return;
    
    contenedor.innerHTML = ''; 

    llista.forEach(act => {
        const div = document.createElement('div');
        div.className = `tasca ${act.realitzada ? 'completada' : ''}`;
        div.style.borderLeft = `8px solid ${act.color || '#ccc'}`; // Usamos el color del picker
        
        div.innerHTML = `
            <div class="info-tasca">
                <h3>${act.titol}</h3>
                <p>${act.fecha || 'Sin fecha'}</p>
            </div>
            <div class="acciones">
                <button onclick="marcarRealitzada(${act.id})">${act.realitzada ? '🔄' : '✅'}</button>
                <button onclick="eliminarTasca(${act.id})">🗑️</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

window.marcarRealitzada = (id) => {
    let acts = storage.getActivitats();
    const index = acts.findIndex(a => a.id === id);
    if (index !== -1) {
        acts[index].realitzada = !acts[index].realitzada;
        storage.saveActivitats(acts);
        inicialitzar(); 
    }
};

window.eliminarTasca = (id) => {
    if (confirm('Segur que vols eliminar aquesta tasca?')) {
        let acts = storage.getActivitats();
        acts = acts.filter(a => a.id !== id);
        storage.saveActivitats(acts);
        inicialitzar();
    }
};

document.addEventListener('DOMContentLoaded', inicialitzar);