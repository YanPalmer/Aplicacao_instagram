const button = document.getElementById("cadastrar");
button.addEventListener('click', cadastrarUsuario);

async function cadastrarUsuario() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    try {
        if (nome && email && senha) {
            const response = await fetch('/cadastrarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nome,
                    email: email,
                    password: senha
                })
            })
            // Parei aqui...
            const responseJSON = await response.json();
            console.log(responseJSON.message);
            if (responseJSON.redirect === true) {
                window.alert("Usuário cadastrado com sucesso!");
                window.location.href = 'http://localhost:3000/index.html';
            }

        } else {
            const camposFaltando = [];
            if (!nome) camposFaltando.push("Nome");
            if (!email) camposFaltando.push("Email");
            if (!senha) camposFaltando.push("Senha");
            const mensagemDeErro = `Campos faltando: ${camposFaltando.join(", ")}`;
            throw new Error(mensagemDeErro);
        }
    } catch (error) {
        alert(error.message)
    }

}