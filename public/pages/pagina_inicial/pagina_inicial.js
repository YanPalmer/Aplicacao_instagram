

window.addEventListener('load', preencherPaginaInicial);

async function preencherPaginaInicial() {
    const response = await fetch('/carregarPaginaInicial', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resposta = await response.json();
    alert(resposta.message);
    // console.log(resposta.dados)

    resposta.dados.forEach(element => {
        // Função que renderiza as postagens na página inicial
        // SÓ FALTA ISSO

        
    });
}