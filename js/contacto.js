function exportToTxt() {
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    const data = `
        Email: ${email}
        Nombre: ${firstName}
        Apellido: ${lastName}
        Teléfono: ${phone}
        Mensaje: ${message}
    `;

    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formulario_contacto.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
