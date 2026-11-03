const ano = document.querySelector("#anoAtual");
const ultima_modificacao = document.querySelector("#ultimaModificacao");
ultima_modificacao.innerHTML = `<span>${document.lastModified}</span>`

const hoje = new Date();
const anoH = hoje.getFullYear();
const mesH = String(hoje.getMonth() + 1).padStart(2, "0"); // mês começa em 0
const diaH = String(hoje.getDate()).padStart(2, "0");      // dia do mês

ano.innerHTML = `<span>${anoH}</span>`;
