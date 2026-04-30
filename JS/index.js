function irCateg() {
    window.location.href = "categories.html"; 
}

function IrCrear() {
    window.location.href = "crear-tasca.html"
}

function IrIndex () {
    window.location.href = "index.html"
}

const picker = document.getElementById('color-picker');

const actualizarColor = () => {
  picker.style.backgroundColor = picker.value;
};

picker.addEventListener('input', actualizarColor);
actualizarColor();