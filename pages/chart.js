import Navbar from '../components/Navbar';
import Grafico from '../components/Grafico';
import styles from '../styles/Chart.module.css';
import { useEffect, useState } from 'react';
import apiContas from '../services/backendapi';

import transformDate from '../utils/transformDate';
import checaDataEntre from '../utils/checaDataEntre';

export default function Chart() {
  const [contasSalvas, setContasSalvas] = useState([]);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const [listaDeDatas, setListaDeDatas] = useState([]);
  const [listaDeConsumos, setListaDeConsumos] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}` };

    apiContas.get('profile/bills', { headers }).then(response => {
      setContasSalvas(response.data);
    });
  }, [contasSalvas]);

  function handleGerarGrafico(e) {
    e.preventDefault();

    let todosConsumos = [];
    let datasFormatadas = [];
    let todosDados = [];

    for (let conta of contasSalvas) {
      if (checaDataEntre(dataInicial, dataFinal, conta.data)) {
        todosDados.push({ data: conta.data, consumo: conta.consumo });
      }
    }
    todosDados.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));

    for (let dado of todosDados) {
      datasFormatadas.push(transformDate(dado.data));
      todosConsumos.push(dado.consumo);
    }
    setListaDeDatas(datasFormatadas);
    setListaDeConsumos(todosConsumos);
  }

  const dadosGrafico = {
    labels: listaDeDatas,
    datasets: [
      {
        label: 'Consumo',
        backgroundColor: '#6E9DC9',
        borderColor: '#245483',
        borderWidth: 1,
        hoverBackgroundColor: '#245483',
        hoverBorderColor: '#245483',
        data: listaDeConsumos
      }
    ]
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className={styles.formdiv}>
          <h2>Gerar Gráfico</h2>
          <form>
            <div className={styles.inputdiv}>
              <label htmlFor="inicio">Data inicial</label>
              <input
                type="date"
                name="inicio"
                id="inicio"
                value={dataInicial}
                onChange={e => setDataInicial(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputdiv}>
              <label htmlFor="final">Data final</label>
              <input
                type="date"
                name="final"
                id="final"
                value={dataFinal}
                onChange={e => setDataFinal(e.target.value)}
                required
              />
            </div>
            <button onClick={handleGerarGrafico} type="submit" className="clicavel">Gerar gráfico</button>
          </form>
        </div>
        <div className={styles.chartdiv}>
          <Grafico dadosGrafico={dadosGrafico} />
        </div>
      </div>
    </>
  );
}