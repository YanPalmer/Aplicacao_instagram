
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
            // console.log(resposta.body);

            if (resposta.body.length == 0) {
                alert("Você ainda não tem nenhuma postagem!");
            } else if (resposta.body.length > 0) {
                console.log(resposta.body);

                // Construir as postagens na página do usuário
            }

        }
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



const listaDePostagens = [];
// Copiado do chatGPT
// Código que cria um bloco para realizar uma postagem
const adicionarPostagem = document.getElementById("adicionarPostagem");
adicionarPostagem.addEventListener('click', novaPostagem);

async function novaPostagem() {
    const imagem = document.getElementById("imagemSelecionada");
    const descricaoUsuario = document.getElementById("descricaoUsuario").value;
    const postagem = {
        imagem: imagem.src,
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

    // function varificador() {
    //     if (numPostagens) {

    //     }
    // }
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


    // Adicionar postagem no banco de dados
    async function criarPostagemDB() {
        // Implementar uma regra que crie uma postagem com os valores crescentes P1, P2, P3...
        // const postagem = document.getElementById("P1");
        alert("Enviando:",)
        // const response = await fetch('/criarPostagemDB', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: senha
        //     })
        // });
    }

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
