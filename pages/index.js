import { useState } from 'react';

import Head from 'next/head'
import Navbar from '../components/Navbar';
import Resultado from '../components/Resultado';

import styles from '../styles/Home.module.css'

import listaDeRegioes from '../utils/listaDeEmpresas.json';
import api from '../services/gotaapi';
import escolheCategoria from '../utils/escolheCategoria';
import escolheMunicipio from '../utils/escolheMunicipio';
import calculaTarifa from '../utils/calculaTarifa';

export default function Home() {

  const [regiao, setRegiao] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [listaDeEmpresas, setListaDeEmpresas] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [consumo, setConsumo] = useState(0);
  const [municipio, setMunicipio] = useState(['todos']);
  const [listaDeMunicipios, setListaDeMunicipios] = useState(['todos']);
  const [listaDeCategorias, setListaDeCategorias] = useState([]);
  const [dadosEmpresa, setDadosEmpresa] = useState({});

  let dados = {};
  const [renderMunicipio, setRenderMunicipio] = useState(null);
  const [renderResultado, setRenderResultado] = useState(null);

  async function trataDados(e) {
    e.preventDefault();

    if (listaDeMunicipios[0] === "todos") {
      const dadosDaCategoria = escolheCategoria(dadosEmpresa.tarifas[0].categorias, categoria);
      const tarifaAgua = await calculaTarifa(
        dadosDaCategoria.valorFixoAgua,
        dadosDaCategoria.aliquotasAgua,
        dadosDaCategoria.faixasDeConsumo,
        consumo);
      const tarifaEsgoto = await calculaTarifa(
        dadosDaCategoria.valorFixoEsgoto,
        dadosDaCategoria.aliquotasEsgoto,
        dadosDaCategoria.faixasDeConsumo,
        consumo);
      handleRenderResultado(
        tarifaAgua,
        tarifaEsgoto,
        dadosEmpresa.tarifas[0].ultimaModificacao,
        dadosEmpresa.tarifas[0].validoAte
      );
    }
    else {
      const dadosDoMunicipio = escolheMunicipio(dadosEmpresa.tarifas, municipio);
      const dadosDaCategoria = escolheCategoria(dadosDoMunicipio.categorias, categoria);
      const tarifaAgua = await calculaTarifa(
        dadosDaCategoria.valorFixoAgua,
        dadosDaCategoria.aliquotasAgua,
        dadosDaCategoria.faixasDeConsumo,
        consumo);
      const tarifaEsgoto = await calculaTarifa(
        dadosDaCategoria.valorFixoEsgoto,
        dadosDaCategoria.aliquotasEsgoto,
        dadosDaCategoria.faixasDeConsumo,
        consumo);
      handleRenderResultado(
        tarifaAgua,
        tarifaEsgoto,
        dadosDoMunicipio.ultimaModificacao,
        dadosDoMunicipio.validoAte
      );
    }

  }

  async function criarListaEmpresas(regiaoEscolhida) {
    if(regiaoEscolhida){
      const novaListaDeEmpresas = listaDeRegioes[regiaoEscolhida];
      setListaDeEmpresas(novaListaDeEmpresas);
    } 
  }

  async function getDadosDaEmpresa(nomeEmpresa) {
    nomeEmpresa = nomeEmpresa.toLowerCase();

    await api.get(`${regiao}/${nomeEmpresa}`).then(response => {
      dados = response.data;
    });

    setDadosEmpresa(dados);
    setListaDeMunicipios(dados.listaDeMunicipios);
    handleRenderMunicipio(dados.listaDeMunicipios);
  }

  async function getCategoria() {
    setListaDeCategorias(dados.listaDeCategorias);
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

  function handleRenderResultado(tarifaAgua, tarifaEsgoto, ultimaModificacao, validoAte) {
    setRenderResultado(
      <Resultado
        precoAgua={tarifaAgua}
        precoEsgoto={tarifaEsgoto}
        ultimaModificacao={ultimaModificacao}
        validoAte={validoAte}
      />
    );
    document.getElementById("resultado").scrollIntoView({ behavior: 'smooth' });
  }


  return (
    <>
      <Head>
        <title>GOTA - Calculadora de Tarifas de Água</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <Navbar />
      <div className="container">
        <h1>Gerenciador Online de Tarifas de Água</h1>
        <div className={styles.formdiv}>
          <h2>Calculadora de Tarifas de Água</h2>
          <form onSubmit={trataDados}>
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

            <div className={styles.inputdiv} >
              <label htmlFor="consumo">Indique seu consumo em m³:</label>
              <input
                type="number"
                id="consumo"
                name="consumo"
                min="0"
                max="999999"
                placeholder="Consumo em m³"
                value={consumo}
                onChange={e => setConsumo(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="clicavel">Calcular</button>
          </form>
        </div>
        {renderResultado}
      </div>
    </>
  );
}
