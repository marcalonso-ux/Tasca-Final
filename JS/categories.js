import { storage } from './storage.js';


const picker = document.getElementById('color-picker');

const actualizarColor = () => {
  picker.style.backgroundColor = picker.value;
};

picker.addEventListener('input', actualizarColor);
actualizarColor();
window.IrIndex = () => window.location.href = "index.html";
window.IrCrear = () => window.location.href = "crear-tasca.html";
window.IrCateg = () => window.location.href = "categories.html";

const LOCAL_CAT_KEY = 'categories_list';

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();

    const btnAfegir = document.getElementById('btn-afegir-categoria');
    const inputCat = document.getElementById('nova-categoria-nom');

    if (btnAfegir) {
        btnAfegir.onclick = () => {
            const nom = inputCat.value.trim();
            if (nom) {
                afegirCategoria(nom);
                inputCat.value = ''; // Limpiar input
            }
        };
    }
});

function getCategories() {
    const cats = JSON.parse(localStorage.getItem(LOCAL_CAT_KEY));
    return cats || ["Estudis", "Feina", "Casa"];
}

function saveCategories(cats) {
    localStorage.setItem(LOCAL_CAT_KEY, JSON.stringify(cats));
}

function renderCategories() {
    const llistaUI = document.getElementById('llista-categories');
    if (!llistaUI) return;

    const cats = getCategories();
    llistaUI.innerHTML = '';

    cats.forEach((cat, index) => {
        const li = document.createElement('li');
        li.className = 'categoria-item';
        li.innerHTML = `
            <span>${cat}</span>
            <button class="btn-borrar" onclick="eliminarCategoria(${index})">🗑️ Borrar</button>
        `;
        llistaUI.appendChild(li);
    });
}

function afegirCategoria(nom) {
    const cats = getCategories();
    if (!cats.includes(nom)) {
        cats.push(nom);
        saveCategories(cats);
        renderCategories();
    } else {
        alert("Aquesta categoria ja existeix");
    }
}

window.eliminarCategoria = (index) => {
    const cats = getCategories();
    cats.splice(index, 1);
    saveCategories(cats);
    renderCategories();
};