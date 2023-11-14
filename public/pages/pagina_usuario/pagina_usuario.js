
window.addEventListener('beforeunload', () => {
    // Remove o dado do sessionStorage
    sessionStorage.removeItem('Id');
    sessionStorage.removeItem('Name');
    sessionStorage.removeItem('Email');
})

window.addEventListener('load', preencherCampos);

const numPostagens = 0;
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

    // CÓDIGO PARA PEGAR AS IMAGENS DO BANCO DE DADOS
    if (Name && Email) {
        pegarImagensDB();

    } else {
        console.log("Faça login");
    }

    const input = document.getElementById("inputImagem");
    const img = document.getElementById("imagemSelecionada");
    input.addEventListener('change', function () {
        exibirImagemSelecionada(input, img);
    });
}



// const listaDePostagens = [];
// Copiado do chatGPT
// Código que cria um bloco para realizar uma postagem
const adicionarPostagem = document.getElementById("adicionarPostagem");
adicionarPostagem.addEventListener('click', novaPostagem);

async function novaPostagem() {
    const imagem = document.getElementById("imagemSelecionada");
    const descricaoUsuario = document.getElementById("descricaoUsuario").value;
    const postagem = {
        // imagem: imagem.src,
        descricao: descricaoUsuario
    }
    console.log(postagem);

    const response = await fetch('/salvarPostagem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: sessionStorage.getItem("Id"),
            postagem: postagem
        })
    });
    const resposta = await response.json();
    console.log(resposta);
    // A partir daqui a postagem foi salva no banco de dados

    pegarImagensDB();

    /*
        const article = document.createElement('article');
    
        const buttonX = document.createElement('button');
        buttonX.id = "removeChild";
        buttonX.innerHTML = "X"
    
        const img = document.createElement('img');
        img.src = postagem.imagem;
    
        const p = document.createElement('p');
        p.id = "descricao";
        p.innerHTML = postagem.descricao;
    
        article.appendChild(buttonX);
        article.appendChild(img);
        article.appendChild(p);
    
        const section = document.getElementById("postagens");
        section.appendChild(article);
    */
}
function exibirImagemSelecionada(input, img) {
    if (input.files && input.files[0]) {
        var leitor = new FileReader();

        leitor.onload = function (e) {
            img.src = e.target.result;
        };

        leitor.readAsDataURL(input.files[0]);
    }
} // Copiado do chatGPT


async function pegarImagensDB() {
    const response = await fetch('/buscarPostagens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: sessionStorage.getItem("Id")
        })
    });
    const resposta = await response.json();
    // console.log("Postagens encontradas do banco", resposta.body);

    if (resposta.body.length > 0) {
        console.log("Existem postagens no nosso banco", resposta.body);

        const pagina = document.getElementById("postagens");
        pagina.innerHTML = "";

        // Construir as postagens na página do usuário
        resposta.body.forEach(element => {
            // console.log("elemento",element);

            const article = document.createElement('article');

            const buttonX = document.createElement('button');
            buttonX.id = "removeChild";
            buttonX.innerHTML = "X"

            const img = document.createElement('img');
            img.src = "../../images/sem_imagem.jpg";

            const p = document.createElement('p');
            p.id = "descricao";
            p.innerHTML = element.description;

            article.appendChild(buttonX);
            article.appendChild(img);
            article.appendChild(p);

            const section = document.getElementById("postagens");
            section.appendChild(article);
        });


    } else if (resposta.body.length == 0) {
        alert("Você ainda não tem nenhuma postagem!");
    }

}