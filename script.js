document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    const fieldMap = {
        nombre: "nombre-value",
        apellido: "apellido-value",
        email: "email-value",
        tel: "tel-value",
        edad: "edad-value",
        dir: "dir-value",
        prov: "prov-value",
        cod: "cod-value",
        contacto: "contacto-value",
        sus: "sus-value"
    };

    form.addEventListener("input", function(event) {
        const field = event.target;
        const fieldName = field.name;
        let fieldValue = field.value;

        if (field.type === "checkbox" || field.type === "radio") {
            const selectedValues = Array.from(form.elements[fieldName])
                .filter(input => input.checked)
                .map(input => input.nextElementSibling.textContent);
            fieldValue = selectedValues.join(", ");
        }

        const cellId = fieldMap[fieldName];
        const cell = document.getElementById(cellId);

        if (cell) {
            cell.textContent = fieldValue;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const botonLeerMas = document.getElementById("boton-leer-mas");
    const resumen = document.getElementById("resumen");
    const contenidoCompleto = document.getElementById("contenido-completo");

    if (botonLeerMas && resumen && contenidoCompleto) {
        botonLeerMas.addEventListener("click", function() {
            if (contenidoCompleto.style.display === "none") {
                contenidoCompleto.style.display = "block";
                resumen.style.display = "none";
                botonLeerMas.textContent = "Leer menos";
            } else {
                contenidoCompleto.style.display = "none";
                resumen.style.display = "block";
                botonLeerMas.textContent = "Leer más";
            }
        });
    }
});
