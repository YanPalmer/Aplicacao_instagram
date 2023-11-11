
window.addEventListener('beforeunload', () => {
    // Remove o dado do sessionStorage
    sessionStorage.removeItem('Id');
    sessionStorage.removeItem('Name');
    sessionStorage.removeItem('Email');
})

window.addEventListener('load', preencherCampos);

function preencherCampos() {
    // Recebe os valores dos campos
    const nomeUsuario = document.getElementById("nomeUsuario");
    const emailUsuario = document.getElementById("emailUsuario");
    const Name = sessionStorage.getItem('Name');
    const Email = sessionStorage.getItem('Email');

    if (Name === null && Email === null) {
        alert("Você deve logar novamente");
    } else {
        // Insere o valor dos campos no documento
        nomeUsuario.textContent = Name;
        emailUsuario.textContent = Email;
        alert(`Bem vindo "${nomeUsuario.textContent}"`);
    }

}
