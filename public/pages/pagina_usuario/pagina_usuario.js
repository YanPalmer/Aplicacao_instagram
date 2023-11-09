

// Código que irá enviar uma nova postagem para minhas rotas no app

async function receberDados() {
    // Pegar o NOME e EMAIL no banco
    const response = await fetch('/pagina_usuario/receberDadosDaPagina', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resposta = await response.json();
    console.log(resposta);

}


// Desabilitar quando conseguir pegar os dados do usuário
// receberDados();