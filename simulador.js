/*
    Arquivo: simulador.js
    Projeto: DuoDrive - aluguel de veículos elétricos e a gasolina
    Disciplina: Desenvolvimento Front-End para Web
    Descrição: Calcula o custo estimado do aluguel (usa dados.js).
*/

const formulario = document.getElementById("form-simulador");
const campoVeiculo = document.getElementById("veiculo");
const areaResultado = document.getElementById("resultado");

function calcularDesconto(dias) {
    if (dias >= 30) {
        return 0.2;
    } else if (dias >= 7) {
        return 0.1;
    }
    return 0;
}

function simular(evento) {
    evento.preventDefault();
    const veiculo = frota.find(function (item) {
        return item.id === Number(campoVeiculo.value);
    });
    const dias = Number(document.getElementById("dias").value);
    const kmPorDia = Number(document.getElementById("km").value);
    const percentual = calcularDesconto(dias);

    const subtotal = veiculo.diaria * dias;
    const desconto = subtotal * percentual;

    let valorAdicionais = 0;
    const marcados = document.querySelectorAll('input[name="adicionais"]:checked');
    for (const caixa of marcados) {
        valorAdicionais += adicionais[caixa.value].valor * dias;
    }

    const kmTotal = kmPorDia * dias;
    const energia = kmTotal * custoPorKm[veiculo.tipo];
    const total = subtotal - desconto + valorAdicionais + energia;

    let rotuloEnergia = "Combustível";
    let comparativo = "";
    if (veiculo.tipo === "eletrico") {
        const economia = kmTotal * (custoPorKm.gasolina - custoPorKm.eletrico);
        rotuloEnergia = "Recarga";
        comparativo = `<p class="mb-0 mt-2">Em comparação com um carro a gasolina, você economiza cerca de ${formatarMoeda(economia)} em energia.</p>`;
    }

    areaResultado.innerHTML = `
        <div class="alert alert-marinho" role="alert">
            <h2 class="h5 alert-heading">Resumo da simulação</h2>
            <p class="mb-2">${veiculo.nome} (${nomeDoTipo(veiculo.tipo)}) por ${dias} dia(s)</p>
            <ul class="mb-3">
                <li>Diárias: ${formatarMoeda(subtotal)}</li>
                <li>Desconto de ${percentual * 100}%: ${formatarMoeda(desconto)}</li>
                <li>Adicionais: ${formatarMoeda(valorAdicionais)}</li>
                <li>${rotuloEnergia} estimada para ${kmTotal} km: ${formatarMoeda(energia)}</li>
            </ul>
            <p class="fs-5 fw-bold mb-0">Custo total estimado: ${formatarMoeda(total)}</p>
            ${comparativo}
        </div>`;
}

preencherVeiculos(campoVeiculo);
formulario.addEventListener("submit", simular);
formulario.addEventListener("reset", function () {
    areaResultado.innerHTML = "";
});
