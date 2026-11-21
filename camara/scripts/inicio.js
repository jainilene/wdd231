"use strict";
// Informe sua chave gratuita do OpenWeatherMap (https://openweathermap.org/api).
const API_KEY = "94dcd8d0b31534804e23fc9e2479ac3a";
const CIDADE = { lat: -2.5307, lon: -44.3068 };

function criarElemento(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto !== undefined) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}

async function carregarDestaques() {
  const destino = document.querySelector("#destaque-empresas");
  try {
    const resposta = await fetch("dados/membros.json");
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const empresas = await resposta.json();
    const elegiveis = empresas.filter(e => [2, 3].includes(Number(e.nivelAssociacao)));
    // Fisher-Yates: embaralha e seleciona entre 2 e 3 sem repetir.
    for (let i = elegiveis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [elegiveis[i], elegiveis[j]] = [elegiveis[j], elegiveis[i]];
    }
    const quantidade = Math.min(elegiveis.length, Math.random() < .5 ? 2 : 3);
    destino.replaceChildren();
    for (const empresa of elegiveis.slice(0, quantidade)) {
      const card = criarElemento("article", undefined, "empresa");
      const logo = criarElemento("img");
      logo.src = `imagens/${encodeURIComponent(empresa.imagem)}`;
      logo.alt = `Logotipo da empresa ${empresa.nome}`;
      logo.loading = "lazy";
      logo.width = 150; logo.height = 110;
      card.append(logo, criarElemento("h3", empresa.nome),
        criarElemento("p", `Associação: ${Number(empresa.nivelAssociacao) === 3 ? "Ouro" : "Prata"}`, "nivel-associacao"),
        criarElemento("p", `Endereço: ${empresa.endereco}`),
        criarElemento("p", `Telefone: ${empresa.telefone}`));
      const link = criarElemento("a", "Visitar site");
      if (/^https:\/\//i.test(empresa.site)) {
        link.href = empresa.site; link.target = "_blank"; link.rel = "noopener noreferrer";
        card.append(link);
      }
      destino.append(card);
    }
  } catch (erro) {
    console.error("Não foi possível carregar as empresas:", erro);
    destino.replaceChildren(criarElemento("p", "Não foi possível carregar as empresas no momento."));
  }
}

function horaLocal(timestamp, deslocamento) {
  return new Date((timestamp + deslocamento) * 1000).toLocaleTimeString("pt-BR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
}
async function carregarClima() {
  if (API_KEY === "SUA_CHAVE_OPENWEATHERMAP") {
    document.querySelector("#temperatura").textContent = "Configurar API";
    document.querySelector("#descricao-clima").textContent = "Insira sua chave OpenWeatherMap no arquivo scripts/inicio.js.";
    document.querySelector("#previsao-dias").textContent = "Aguardando chave da API meteorológica.";
    return;
  }
  const parametros = `lat=${CIDADE.lat}&lon=${CIDADE.lon}&appid=${encodeURIComponent(API_KEY)}&units=metric&lang=pt_br`;
  try {
    const [atualResp, previsaoResp] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?${parametros}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?${parametros}`)
    ]);
    if (!atualResp.ok || !previsaoResp.ok) throw new Error("Falha na API meteorológica");
    const atual = await atualResp.json();
    const previsao = await previsaoResp.json();
    document.querySelector("#temperatura").textContent = `${Math.round(atual.main.temp)} °C`;
    document.querySelector("#descricao-clima").textContent = atual.weather[0].description;
    document.querySelector("#maxima").textContent = `${Math.round(atual.main.temp_max)} °C`;
    document.querySelector("#minima").textContent = `${Math.round(atual.main.temp_min)} °C`;
    document.querySelector("#umidade").textContent = `${atual.main.humidity}%`;
    document.querySelector("#hora-nascer-sol").textContent = horaLocal(atual.sys.sunrise, atual.timezone);
    document.querySelector("#hora-por-do-sol").textContent = horaLocal(atual.sys.sunset, atual.timezone);
    const containerIconeClima = document.querySelector("#container-icone-clima");

    const icone = document.createElement("img");

    icone.src = `https://openweathermap.org/img/wn/${atual.weather[0].icon}@2x.png`;
    icone.alt = atual.weather[0].description;
    icone.width = 70;
    icone.height = 70;

    containerIconeClima.replaceChildren(icone);
    // A API de previsão fornece intervalos de três horas; usa o horário mais próximo de 12h local.
    const grupos = new Map();
    const hoje = new Date((atual.dt + atual.timezone) * 1000).toISOString().slice(0, 10);
    for (const item of previsao.list) {
      const local = new Date((item.dt + previsao.city.timezone) * 1000);
      const dia = local.toISOString().slice(0, 10);
      if (dia <= hoje) continue;
      const distancia = Math.abs(local.getUTCHours() - 12);
      if (!grupos.has(dia) || distancia < grupos.get(dia).distancia) grupos.set(dia, { item, distancia });
    }
    const container = document.querySelector("#previsao-dias"); container.replaceChildren();
    for (const [dia, { item }] of [...grupos].slice(0, 3)) {
      const nomeDia = new Date(`${dia}T12:00:00Z`).toLocaleDateString("pt-BR", { timeZone: "UTC", weekday: "long" });
      const linha = criarElemento("div", undefined, "previsao-item");
      linha.append(criarElemento("span", nomeDia), criarElemento("strong", `${Math.round(item.main.temp)} °C`));
      container.append(linha);
    }
  } catch (erro) {
    console.error("Erro ao obter clima:", erro);
    document.querySelector("#temperatura").textContent = "Indisponível";
    document.querySelector("#descricao-clima").textContent = "Não foi possível consultar o clima.";
    document.querySelector("#previsao-dias").textContent = "Previsão temporariamente indisponível.";
  }
}

carregarDestaques();
carregarClima();
