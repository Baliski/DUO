/*
    Arquivo: reserva.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Cadastra reservas, salva no localStorage e lista na tabela (usa dados.js).
*/

const CHAVE_RESERVAS = "duodrive_reservas";
const formulario = document.getElementById("form-reserva");
const campoVeiculo = document.getElementById("veiculo");
const campoRetirada = document.getElementById("retirada");
const corpoTabela = document.getElementById("corpo-reservas");
const areaAviso = document.getElementById("aviso");
const botaoLimpar = document.getElementById("limpar-reservas");
let reservas = JSON.parse(localStorage.getItem(CHAVE_RESERVAS)) || [];

function dataDeHoje() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return agora.getFullYear() + "-" + mes + "-" + dia;
}

function salvarReservas() {
    localStorage.setItem(CHAVE_RESERVAS, JSON.stringify(reservas));
}

function mostrarAviso(texto, tipo) {
    const aviso = document.createElement("div");
    const fechar = document.createElement("button");
    aviso.className = "alert alert-" + tipo + " alert-dismissible fade show";
    aviso.setAttribute("role", "alert");
    aviso.textContent = texto;
    fechar.type = "button";
    fechar.className = "btn-close";
    fechar.setAttribute("data-bs-dismiss", "alert");
    fechar.setAttribute("aria-label", "Fechar");
    aviso.appendChild(fechar);
    areaAviso.innerHTML = "";
    areaAviso.appendChild(aviso);
}

function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

function exibirReservas() {
    corpoTabela.innerHTML = "";
    if (reservas.length === 0) {
        const linhaVazia = document.createElement("tr");
        const celulaVazia = criarCelula("Nenhuma reserva cadastrada.");
        celulaVazia.colSpan = 6;
        celulaVazia.className = "text-center text-secondary";
        linhaVazia.appendChild(celulaVazia);
        corpoTabela.appendChild(linhaVazia);
        return;
    }
    for (let i = 0; i < reservas.length; i++) {
        const reserva = reservas[i];
        const linha = document.createElement("tr");
        const numero = document.createElement("th");
        const celulaAcao = document.createElement("td");
        const botaoCancelar = document.createElement("button");
        numero.scope = "row";
        numero.textContent = i + 1;
        botaoCancelar.type = "button";
        botaoCancelar.className = "btn btn-sm btn-outline-danger";
        botaoCancelar.textContent = "Cancelar";
        botaoCancelar.dataset.indice = i;
        celulaAcao.appendChild(botaoCancelar);
        linha.appendChild(numero);
        linha.appendChild(criarCelula(reserva.nome));
        linha.appendChild(criarCelula(reserva.veiculo));
        linha.appendChild(criarCelula(reserva.retirada.split("-").reverse().join("/")));
        linha.appendChild(criarCelula(reserva.dias));
        linha.appendChild(celulaAcao);
        corpoTabela.appendChild(linha);
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const veiculo = frota.find(function (item) {
        return item.id === Number(campoVeiculo.value);
    });
    const novaReserva = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        veiculo: veiculo.nome,
        retirada: campoRetirada.value,
        dias: Number(document.getElementById("dias").value),
        observacoes: document.getElementById("observacoes").value.trim()
    };
    reservas.push(novaReserva);
    salvarReservas();
    exibirReservas();
    formulario.reset();
    mostrarAviso("Reserva do " + novaReserva.veiculo + " confirmada para " + novaReserva.nome + ".", "success");
});

corpoTabela.addEventListener("click", function (evento) {
    const indice = evento.target.dataset.indice;
    if (indice !== undefined) {
        reservas.splice(Number(indice), 1);
        salvarReservas();
        exibirReservas();
        mostrarAviso("Reserva cancelada.", "warning");
    }
});

botaoLimpar.addEventListener("click", function () {
    if (reservas.length > 0 && confirm("Remover todas as reservas salvas neste navegador?")) {
        reservas = [];
        salvarReservas();
        exibirReservas();
        mostrarAviso("Todas as reservas foram removidas.", "warning");
    }
});

preencherVeiculos(campoVeiculo);
campoRetirada.min = dataDeHoje();
const parametros = new URLSearchParams(window.location.search);
if (parametros.get("veiculo")) {
    campoVeiculo.value = parametros.get("veiculo");
}
exibirReservas();
