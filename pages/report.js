import styles from '../styles/Report.module.css';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import apiContas from '../services/backendapi';
import Image from 'next/image';
import { useRouter } from 'next/router'

import transformDate from '../utils/transformDate';
import checaDataEntre from '../utils/checaDataEntre';

export default function Relatorio() {
  const [contasSalvas, setContasSalvas] = useState([]);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [renderRelatorio, setRenderRelatorio] = useState(null);
  const router = useRouter()

  let consumoTotal = 0;
  let valorTotal = 0;

  useEffect(() => {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}` };

    apiContas.get('profile/bills', { headers }).then(response => {
      setContasSalvas(response.data);
    });
  }, [contasSalvas]);

  function handleGerarRelatorio(e) {
    e.preventDefault();

    let todosDados = [];

    for (let conta of contasSalvas) {
      if (checaDataEntre(dataInicial, dataFinal, conta.data)) {
        todosDados.push(conta);
      }
    }
    todosDados.sort((a, b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));

    for (let dado of todosDados) {
      dado.data = transformDate(dado.data);
    }
    handleRenderRelatorio(todosDados);
  }

  function handleRenderRelatorio(todosDados) {
    setRenderRelatorio(
      <div className={styles.formdiv}>
        <div id="printableArea">
          <div className={styles.reporttitle}>
            <Image src="/gota-azul.png" alt="Logo Gota" width={120} height={68.89} />
            <br />
            <h1>Gerenciador Online de Tarifas de Água</h1>
            <br />
            <h2>Relatório</h2>
            <br />
          </div>
          <table border="1" className={styles.table}>
            <tr>
              <th>Data</th>
              <th>Valor</th>
              <th>Consumo</th>
              <th>Região</th>
              <th>Empresa</th>
              <th>Municipio</th>
              <th>Categoria</th>
              <th>Status</th>
            </tr>
            {todosDados.map(dado => {
              { consumoTotal += dado.consumo }
              { valorTotal += dado.valor }
              return (
                <tr key={dado.id}>
                  <td>{dado.data}</td>
                  <td>R$ {dado.valor}</td>
                  <td>{dado.consumo} m³</td>
                  <td>{dado.regiao.toUpperCase()}</td>
                  <td>{dado.empresa}</td>
                  <td>{dado.municipio === 'todos' ? 'N/A' : dado.municipio}</td>
                  <td>{dado.categoria}</td>
                  <td>{dado.status ? 'Pago ' : 'Pendente '}</td>
                </tr>
              );
            })}
          </table>
          <div className={styles.reporttitle}>
            <br />
            <h2>Consumo Total: {consumoTotal} m³</h2>
            <br />
            <h2>Valor Total: R$ {valorTotal}</h2>
          </div>
        </div>
        <button type="button" onClick={printDiv}>Salvar</button>
      </div>
    );
  }

  function printDiv() {
    var printContents = document.getElementById('printableArea').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    router.reload();
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <div className={styles.formdiv}>
          <h2>Gerar Relatório</h2>
          <form onSubmit={handleGerarRelatorio}>
            <div className={styles.inputdiv}>
              <label htmlFor="inicio">Data inicial</label>
              <input
                type="date"
                name="inicio"
                id="inicio"
                value={dataInicial}
                onChange={e => setDataInicial(e.target.value)}
                placeholder="Insira a data inicial"
                required
                autoFocus
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

            <button type="submit" className="clicavel">Gerar relatório</button>
          </form>
        </div>

        {renderRelatorio}
      </div>
    </>
  );
}