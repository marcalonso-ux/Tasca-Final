const picker = document.getElementById('color-picker');

const actualizarColor = () => {
  picker.style.backgroundColor = picker.value;
};

picker.addEventListener('input', actualizarColor);
actualizarColor();