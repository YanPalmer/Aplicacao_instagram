const button = document.getElementById("validar");
button.addEventListener('click', validar);

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        // A página está ativa
        sessionStorage.removeItem('Id');
        sessionStorage.removeItem('Name');
        sessionStorage.removeItem('Email');
    }
});

async function validar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        if (email && senha) {
            const response = await fetch('/validarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: senha
                })
            });

            const responseJSON = await response.json();

            if (responseJSON.redirect === true) {
                console.log(responseJSON.message);
                window.alert(responseJSON.message);
                // const response2 = fetch(`/pages/pagina_inicial/${responseJSON.id}/${responseJSON.email}/pagina_inicial.html`)
                const id = sessionStorage.setItem("Id", responseJSON.body.id);
                const name = sessionStorage.setItem("Name", responseJSON.body.name);
                const email = sessionStorage.setItem("Email", responseJSON.body.email);
                window.location.href = 'http://localhost:3000/pages/pagina_usuario/pagina_usuario.html';
            } else {
                window.alert(responseJSON.message);
            }


        } else {
            const camposFaltando = [];
            if (!email) camposFaltando.push("Email");
            if (!senha) camposFaltando.push("Senha");
            const mensagemDeErro = `Campos faltando: ${camposFaltando.join(", ")}`;
            throw new Error(mensagemDeErro);
        }
    } catch (error) {
        alert(error.message);
    }
}