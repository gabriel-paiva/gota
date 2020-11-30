import styles from '../styles/Userpage.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { X, Edit, Repeat } from 'react-feather';


import Navbar from '../components/Navbar';

import apiAgua from '../services/gotaapi';
import apiContas from '../services/backendapi';

import listaDeRegioes from '../utils/listaDeEmpresas.json';
import transformDate from '../utils/transformDate';

import escolheMunicipio from '../utils/escolheMunicipio';
import escolheCategoria from '../utils/escolheCategoria';
import calculaTarifa from '../utils/calculaTarifa';

export default function Userpage() {
  const router = useRouter();

  const [data, setData] = useState('');
  const [valor, setValor] = useState(0.0);
  const [consumo, setConsumo] = useState(0);
  const [status, setStatus] = useState(false);

  const [regiao, setRegiao] = useState('');
  const [listaDeEmpresas, setListaDeEmpresas] = useState([]);
  const [empresa, setEmpresa] = useState('');
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [categoria, setCategoria] = useState('');
  const [listaDeCategorias, setListaDeCategorias] = useState([]);
  const [municipio, setMunicipio] = useState('todos');
  const [listaDeMunicipios, setListaDeMunicipios] = useState(['todos']);

  const [contasSalvas, setContasSalvas] = useState([]);

  let dados = {};

    const [renderMunicipio, setRenderMunicipio] = useState(null);

    useEffect(() => {
    const isLoged = localStorage.getItem('isLoged');
    if (!isLoged) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}` };

    apiContas.get('profile/bills', { headers }).then(response => {
      setContasSalvas(response.data);
    });
  }, [contasSalvas]);

  async function criarListaEmpresas(regiaoEscolhida) {
    if (regiaoEscolhida) {
      const novaListaDeEmpresas = listaDeRegioes[regiaoEscolhida];
      setListaDeEmpresas(novaListaDeEmpresas);
    }
  }

  async function getDadosDaEmpresa(nomeEmpresa) {
    nomeEmpresa = nomeEmpresa.toLowerCase();

    await apiAgua.get(`${regiao}/${nomeEmpresa}`).then(response => {
      dados = response.data;
    });

    setDadosEmpresa(dados);
    setListaDeMunicipios(dados.listaDeMunicipios);
    handleRenderMunicipio(dados.listaDeMunicipios);
  }

  function handleRenderMunicipio(listaDeMunicipios) {
    if (listaDeMunicipios[0] !== "todos") {
      setRenderMunicipio(<div className={styles.inputdiv} >
        <label htmlFor="empresa">Municipio:</label>
        <select
          name="empresa"
          id="empresa"
          onChange={e => { setMunicipio(e.target.value); getCategoria(e.target.value) }}
          required
        >
          <option value={''}>Escolha um municipio</option>
          {listaDeMunicipios.map(municipio =>
            <option key={municipio} value={municipio}>{municipio}</option>)}
        </select>
      </div>);
    }
    else {
      setRenderMunicipio(null);
      getCategoria();
    }
  }

  async function getCategoria() {
    setListaDeCategorias(dados.listaDeCategorias);
  }

  async function handleSalvarConta(e) {
    e.preventDefault();
    const dados = {
      data,
      valor,
      consumo,
      empresa,
      categoria,
      status,
      regiao,
      municipio
    }

    const headers = { 'Authorization': `${localStorage.getItem('userId')}` };

    try {
      await apiContas.post('profile/new_bill', dados, { headers });
      alert("Conta cadastrada com sucesso!")
    }
    catch (erro) {
      alert(erro.response.data.message);
    }
  }

  async function handleUpdateStatus(status, id) {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}`, 'id': id };

    const newStatus = !status;

    try {
      await apiContas.put('/profile/update_bill', { newStatus }, { headers });
      alert("Status alterado com sucesso!")
    }
    catch (erro) {
      alert(erro.response.data.message);
    }
  }

  async function handleDeleteBill(id) {
    const headers = { 'Authorization': `${localStorage.getItem('userId')}`, 'id': id };

    try {
      await apiContas.delete('/profile/delete_bill', { headers });
      alert("Conta deletada com sucesso!")
    }
    catch (erro) {
      alert(erro.response.data.message);
    }
  }

  function handleGerarGrafico(){
    router.push('/chart');
  }

  async function handleRecalcular(contaSalva){
    let dadosAtualizados;

    await apiAgua.get(`${contaSalva.regiao.toLowerCase()}/${contaSalva.empresa.toLowerCase()}`).then(response => {
      dadosAtualizados = response.data;
    });
    
    if (contaSalva.municipio === "todos") {
      const dadosDaCategoria = escolheCategoria(dadosAtualizados.tarifas[0].categorias, contaSalva.categoria);
      const tarifaAgua = await calculaTarifa(
        dadosDaCategoria.valorFixoAgua,
        dadosDaCategoria.aliquotasAgua,
        dadosDaCategoria.faixasDeConsumo,
        contaSalva.consumo);
      const tarifaEsgoto = await calculaTarifa(
        dadosDaCategoria.valorFixoEsgoto,
        dadosDaCategoria.aliquotasEsgoto,
        dadosDaCategoria.faixasDeConsumo,
        contaSalva.consumo);
      alert(`Calculando com as tarifas mais recentes do GOTA, sua tarifa seria de R$ ${tarifaAgua + tarifaEsgoto}, sendo R$ ${tarifaAgua} de água e R$ ${tarifaEsgoto} de esgoto.`);
    }
    else {
      const dadosDoMunicipio = escolheMunicipio(dadosAtualizados.tarifas, contaSalva.municipio);
      const dadosDaCategoria = escolheCategoria(dadosDoMunicipio.categorias, contaSalva.categoria);
      const tarifaAgua = await calculaTarifa(
        dadosDaCategoria.valorFixoAgua,
        dadosDaCategoria.aliquotasAgua,
        dadosDaCategoria.faixasDeConsumo,
        contaSalva.consumo);
      const tarifaEsgoto = await calculaTarifa(
        dadosDaCategoria.valorFixoEsgoto,
        dadosDaCategoria.aliquotasEsgoto,
        dadosDaCategoria.faixasDeConsumo,
        contaSalva.consumo);
        alert(`Calculando com as tarifas mais recentes do GOTA, sua tarifa seria de R$ ${tarifaAgua + tarifaEsgoto}, sendo R$ ${tarifaAgua} de água e R$ ${tarifaEsgoto} de esgoto.`);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Central do Usuário</h1>

        <div className={styles.formdiv}>
          <h2>Contas salvas</h2>
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
              <th>#</th>
            </tr>
            {contasSalvas.map(contaSalva => {
              const dataFormatada = transformDate(contaSalva.data);

              return (
                <tr key={contaSalva.id}>
                  <td>{dataFormatada}</td>
                  <td>R$ {contaSalva.valor} <div className="tooltip"><Repeat onClick={e => handleRecalcular(contaSalva)} color="#6E9DC9" size={18} className="clicavel" /><span className="tooltiptext">Recalcular</span></div></td>
                  <td>{contaSalva.consumo} m³</td>
                  <td>{contaSalva.regiao.toUpperCase()}</td>
                  <td>{contaSalva.empresa}</td>
                  <td>{contaSalva.municipio === 'todos' ? 'N/A' : contaSalva.municipio}</td>
                  <td>{contaSalva.categoria}</td>
                  <td>{contaSalva.status ? 'Pago ' : 'Pendente '}<div className="tooltip"><Edit onClick={e => handleUpdateStatus(contaSalva.status, contaSalva.id)} color="#6E9DC9" size={18} className="clicavel" /><span className="tooltiptext">Alterar status</span></div></td>
                  <td ><div className="tooltip"><X color="#A60000" size={24} className="clicavel" onClick={e => handleDeleteBill(contaSalva.id)} /><span className="tooltiptext">Excluir conta</span></div></td>
                </tr>
              );
            })}
          </table>
          <button 
            type="button" 
            className="clicavel"
          >
            Gerar Relatório
          </button>

          <button 
            onClick={handleGerarGrafico} 
            type="button" 
            className="clicavel"
          >
            Gerar Gráfico
          </button>
        </div>

        <div className={styles.formdiv}>
          <h2>Cadastrar conta</h2>
          <form onSubmit={handleSalvarConta}>
            <div className={styles.inputdiv}>
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                name="data"
                id="data"
                value={data}
                onChange={e => setData(e.target.value)}
                placeholder="Insira a data da sua conta"
                required
                autoFocus
              />
            </div>

            <div className={styles.inputdiv}>
              <label htmlFor="valor">Valor (R$):</label>
              <input
                type="number"
                name="valor"
                id="valor"
                step=".01"
                min="0.00"
                max="999999"
                value={valor}
                onChange={e => setValor(e.target.value)}
                placeholder="Insira o valor da sua conta"
                required
              />
            </div>

            <div className={styles.inputdiv}>
              <label htmlFor="consumo">Consumo (m³):</label>
              <input
                type="number"
                name="consumo"
                id="consumo"
                step="1"
                min="0"
                max="999999"
                value={consumo}
                onChange={e => setConsumo(e.target.value)}
                placeholder="Insira o consumo da sua conta"
                required
              />
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                id="status"
                required
                onChange={e => setStatus(e.target.value)}
              >
                <option value={''}>Defina o status da sua conta</option>
                <option value={true}>Pago</option>
                <option value={false}>Pendente</option>
              </select>
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="regiao">Região:</label>
              <select
                name="regiao"
                id="regiao"
                onChange={e => { setRegiao(e.target.value); criarListaEmpresas(e.target.value) }}
                required
              >
                <option value={''} >Escolha uma região</option>
                <option value="df">Distrito Federal</option>
                <option value="go">Goiás</option>
                <option value="ms">Mato Grosso do Sul</option>
              </select>
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="empresa">Empresa de saneamento:</label>
              <select
                name="empresa"
                id="empresa"
                onChange={e => { setEmpresa(e.target.value); getDadosDaEmpresa(e.target.value) }}
                required
              >
                <option value={''}>Escolha uma empresa de saneamento</option>
                {listaDeEmpresas.map(empresa =>
                  <option key={empresa} value={empresa}>{empresa}</option>)}
              </select>
            </div>

            {renderMunicipio}

            <div className={styles.inputdiv} >
              <label htmlFor="categoria">Categoria:</label>
              <select
                name="categoria"
                id="categoria"
                onChange={e => setCategoria(e.target.value)}
                required
              >
                <option value={''}>Escolha uma categoria</option>
                {listaDeCategorias.map(nomeDaCategoria =>
                  <option key={nomeDaCategoria} value={nomeDaCategoria}>{nomeDaCategoria}</option>)}
              </select>
            </div>
            <button type="submit" className="clicavel">Salvar</button>
          </form>
        </div>

      </div>
    </>
  );
}