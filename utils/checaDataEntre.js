export default function checaDataEntre(dataInicial, dataFinal, dataTeste){
  console.log(dataInicial, dataFinal, dataTeste)
  const data1 = new Date(dataInicial);
  const data2 = new Date(dataFinal);
  const data3 = new Date(dataTeste);

  console.log(data1, data2, data3);

  const ms1 = data1.getTime();
  const ms2 = data2.getTime();
  const ms3 = data3.getTime();

  console.log(ms1, ms2, ms3);

  return ms3 >= ms1 && ms3 <= ms2;
}