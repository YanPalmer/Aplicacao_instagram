
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

    // CÓDIGO PARA PEGAR AS IMAGENS DO BANCO DE DADOS

}


// Copiado do chatGPT
// Código que cria um bloco para realizar uma postagem
function adicionarPostagem() {
    const adicionarPostagem = document.getElementById("adicionarPostagem");
    adicionarPostagem.addEventListener('click', novaPostagem);

    function novaPostagem() {
        const article = document.createElement('article');

        const img = document.createElement('img');
        img.src = "../../images/sem_imagem.jpg";

        const input = document.createElement('input');
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener('change', function () {
            exibirImagemSelecionada(input, img);
        });

        const descricao = document.createElement('input');
        descricao.id = "descricao";
        descricao.placeholder = "Escreva o que está pensando";

        const button = document.createElement('button');
        button.id = "enviarPostagem";
        button.innerHTML = "Enviar";


        article.appendChild(img);
        article.appendChild(input);
        article.appendChild(descricao);
        article.appendChild(button);

        const section = document.getElementById("postagens");
        section.appendChild(article);
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
}




adicionarPostagem();