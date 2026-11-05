const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    // console.table(dados.profetas);
    exibirProfetas(dados.profetas);
}

obterDadosDeProfetas();

const exibirProfetas = (profetas) => {
    profetas.forEach(profeta => {
        let cartao = document.createElement("section");
        let nomeCompleto = document.createElement("h2");

        let dataNasc = document.createElement("h3");
        let lugar = document.createElement("h3");
        let filhos = document.createElement("h3");
        let anosServ = document.createElement("h3");
        let falecimento = document.createElement("h3");

        dataNasc.innerHTML = `<span>Nascimento: </span>${profeta.nascimento}`;
        lugar.innerHTML = `<span>Lugar: </span>${profeta.localNascimento}`;
        filhos.innerHTML = `<span>Crianças: </span>${profeta.numeroFilhos}`;
        anosServ.innerHTML = `<span>Anos de Serviço: </span>${profeta.duracao}`;
        falecimento.innerHTML = `<span>Falecimento: </span>${profeta.morte}`;


        let retrato = document.createElement("img");
        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', 340);
        retrato.setAttribute('height', 440);

        cartao.appendChild(nomeCompleto);

        cartao.appendChild(dataNasc);
        cartao.appendChild(lugar);
        cartao.appendChild(filhos);
        cartao.appendChild(anosServ);
        cartao.appendChild(falecimento);

        cartao.appendChild(retrato);

        cartoes.appendChild(cartao);

    });
}