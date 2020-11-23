export default function CalculaTarifa(valorFixo, aliquotas, faixasDeConsumo, consumo) {
  const quantidadeDeAliquotas = aliquotas.length;
  const quantidadeDeFaixas = faixasDeConsumo.length;
  let faixaAtual = 0;

  if(consumo===0){
    return 0;
  }


  function VerificaFaixaAtual() {
    for (let i = 0; i < quantidadeDeFaixas; i += 1) {
      if (i === quantidadeDeFaixas - 1) {
        faixaAtual = i;
        break;
      } else if (consumo > faixasDeConsumo[i] && consumo <= faixasDeConsumo[i + 1]) {
        faixaAtual = i;
        break;
      }
    }
  }

  function CalculaPrecoPorFaixa() {
    const precoPorFaixa = [0];
    for (let i = 0; i < quantidadeDeAliquotas - 1; i += 1) {
      precoPorFaixa.push(aliquotas[i] * (faixasDeConsumo[i + 1] - faixasDeConsumo[i]));
    }
    return precoPorFaixa;
  }

  function CalculaPrecoTotalFaixas(faixaAtual, precoPorFaixa) {
    let precoTotalFaixas = 0;
    for (let i = 0; i <= faixaAtual; i += 1) {
      precoTotalFaixas += precoPorFaixa[i];
    }
    return precoTotalFaixas;
  }

  function CalculaValorVariavel(faixaAtual, precoTotalFaixas) {
    const valorVariavel = (aliquotas[faixaAtual] * (consumo - faixasDeConsumo[faixaAtual])) + precoTotalFaixas;
    return valorVariavel;
  }

  VerificaFaixaAtual();
  const precoPorFaixa = CalculaPrecoPorFaixa();
  const precoTotalFaixas = CalculaPrecoTotalFaixas(faixaAtual, precoPorFaixa);
  const valorVariavel = CalculaValorVariavel(faixaAtual, precoTotalFaixas);
  const tarifa = valorFixo + valorVariavel;

  if(tarifa<0){
    return 0;
  }

  return tarifa;
}
