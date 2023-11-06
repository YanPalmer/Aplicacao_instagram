const button = document.getElementById("validar");
button.addEventListener('click', validar);

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
            console.log(responseJSON.message);
            if (responseJSON.redirect === true) {
                window.alert("Usuário validado com sucesso");
                const response2 = fetch(`/pages/pagina_inicial/${responseJSON.id}/${responseJSON.email}/pagina_inicial.html`)
                // window.location.href = 'http://localhost:3000/pages/pagina_inicial/pagina_inicial.html';
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