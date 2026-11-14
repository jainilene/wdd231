async function carregarEmpresas() {
    try {
        // Busca os dados do arquivo JSON
        const resposta = await fetch("./dados/membros.json");

        // Verifica se a requisição foi bem-sucedida
        if (!resposta.ok) {
            throw new Error("Erro ao carregar empresas");
        }

        // Converte o JSON em um array JavaScript
        const empresas = await resposta.json();

        // Seleciona o elemento HTML
        const lista = document.querySelector("#lista-empresas");

        // Percorre todas as empresas
        empresas.forEach(empresa => {

            // Converte o nível em uma descrição
            let associacao;

            switch (empresa.nivelAssociacao) {
                case 1:
                    associacao = "Membro";
                    break;
                case 2:
                    associacao = "Prata";
                    break;
                case 3:
                    associacao = "Ouro";
                    break;
                default:
                    associacao = "Não informado";
            }

            // Cria o HTML de cada empresa
            const card = `
                <div class="empresa">
                    <img src="imagens/${empresa.imagem}"
                         alt="Logo da ${empresa.nome}">

                    <h2>${empresa.nome}</h2>

                    <p>Endereço: ${empresa.endereco}</p>

                    <p>Telefone: ${empresa.telefone}</p>

                    <p>Associação: ${associacao}</p>

                    <a href="${empresa.site}" target="_blank"
                       rel="noopener noreferrer">
                        Visitar site
                    </a>
                </div>
            `;

            // Adiciona o card na página
            lista.innerHTML += card;
        });

    } catch (erro) {
        console.error("Erro:", erro);
    }
}

// Executa a função
carregarEmpresas();

const botaoGrade = document.querySelector("#botao-grade");
const botaoLista = document.querySelector("#botao-lista");
const listaEmpresas = document.querySelector("#lista-empresas");

// Exibir empresas em grade
botaoGrade.addEventListener("click", () => {
    listaEmpresas.classList.remove("lista");
    listaEmpresas.classList.add("grade");
});

// Exibir empresas em lista
botaoLista.addEventListener("click", () => {
    listaEmpresas.classList.remove("grade");
    listaEmpresas.classList.add("lista");
});