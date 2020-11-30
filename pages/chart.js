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

  const [renderGrafico, setRenderGrafico] = useState(null);
  const [tipoGrafico, setTipoGrafico] = useState('');

  useEffect(() => {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}` };

    apiContas.get('profile/bills', { headers }).then(response => {
      setContasSalvas(response.data);
    });
  }, [contasSalvas]);

  function handleGerarGrafico(e) {
    e.preventDefault();

    let todosY = [];
    let datasFormatadas = [];
    let todosDados = [];

    for (let conta of contasSalvas) {
      if (checaDataEntre(dataInicial, dataFinal, conta.data)) {
        todosDados.push({ data: conta.data, consumo: conta.consumo, valor: conta.valor });
      }
    }
    todosDados.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));

    for (let dado of todosDados) {
      datasFormatadas.push(transformDate(dado.data));
      if(tipoGrafico === 'Consumo (m³)'){
        todosY.push(dado.consumo);
      }
      else{
        todosY.push(dado.valor);
      }
    }

    const dadosGrafico = {
      labels: datasFormatadas,
      datasets: [
        {
          label: tipoGrafico,
          backgroundColor: '#6E9DC9',
          borderColor: '#245483',
          borderWidth: 1,
          hoverBackgroundColor: '#245483',
          hoverBorderColor: '#245483',
          data: todosY
        }
      ]
    };
    handleRenderGrafico(dadosGrafico);
  }

  function handleRenderGrafico(dadosGrafico) {
    setRenderGrafico(
      <div className={styles.chartdiv}>
        <Grafico dadosGrafico={dadosGrafico} />
      </div>
    );
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

            <div className={styles.inputdiv}>
              <label htmlFor="tipo">Tipo de Gráfico</label>
              <select
                name="tipo"
                id="tipo"
                onChange={e => setTipoGrafico(e.target.value)}
                required
              >
                <option value={''} >Escolha um tipo de Gráfico</option>
                <option value="Consumo (m³)">Consumo (m³)</option>
                <option value="Valor (R$)">Valor (R$)</option>
              </select>
            </div>

            <button onClick={handleGerarGrafico} type="submit" className="clicavel">Gerar gráfico</button>
          </form>
        </div>
        {renderGrafico}
      </div>
    </>
  );
}