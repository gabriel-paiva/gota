export default function escolheMunicipio(tarifas, municipioSelecionado){
  for (let tarifa of tarifas){
    let contemMunicipio = tarifa.municipios.indexOf(municipioSelecionado);
    if(contemMunicipio > -1){
      return tarifa;
    }
  }
}