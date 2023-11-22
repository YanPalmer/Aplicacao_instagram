

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
        console.log(element.email, element.imagem, element.descricao);

        const article = document.createElement('article');

        const h3 = document.createElement('h3');
        h3.innerHTML = element.email;

        const img = document.createElement('img');
        // img.src = "../../images/sem_imagem.jpg";
        img.src = element.image;

        const p = document.createElement('p');
        p.innerHTML = element.descricao;

        article.appendChild(h3);
        article.appendChild(img);
        article.appendChild(p);

        const section = document.getElementById('postagens');
        section.appendChild(article);
        
    });
}