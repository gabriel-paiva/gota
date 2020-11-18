import { useState } from 'react';

import Head from 'next/head'
import Navbar from '../components/Navbar';

import styles from '../styles/Home.module.css'

import listaDeRegioes from '../utils/listaDeEmpresas.json';
import api from '../services/gotaapi';

export default function Home() {

  const [regiao, setRegiao] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [listaDeEmpresas, setListaDeEmpresas] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [consumo, setConsumo] = useState(0);
  const [dadosEmpresa, setDadosEmpresa] = useState({});

  async function calculaTarifa(e) {
    e.preventDefault();
    const arrayDeCategorias = [];
    const listaDeCategorias = [];
    dadosEmpresa.empresa.map(empresa => arrayDeCategorias.push(Object.values(empresa.categorias)));
    arrayDeCategorias.map(objetoCategoria => objetoCategoria.map(categoria => listaDeCategorias.push(categoria.categoria)));
    // Tendo o array de categorias, precisamos achar o municipio 
  }

  async function criarListaEmpresas(regiaoEscolhida){

    const novaListaDeEmpresas = listaDeRegioes[regiaoEscolhida];
    setListaDeEmpresas(novaListaDeEmpresas);
  }

  async function getDadosDaEmpresa(nomeEmpresa){
    nomeEmpresa = nomeEmpresa.toLowerCase();
    let dados;

    console.log(regiao);
    console.log(nomeEmpresa);
    
    await api.get(`${regiao}/${nomeEmpresa}`).then(response => {
      dados = response.data;
    });

    setDadosEmpresa(dados);
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
          <form onSubmit={calculaTarifa}>
            <div className={styles.inputdiv} >
              <label htmlFor="regiao">Região:</label>
              <select 
                name="regiao" 
                id="regiao" 
                onChange={e => {setRegiao(e.target.value); criarListaEmpresas(e.target.value)}}
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
                onChange={e => {setEmpresa(e.target.value); getDadosDaEmpresa(e.target.value)}} 
                required
              >
                <option value={''}>Escolha uma empresa de saneamento</option>
                {listaDeEmpresas.map(empresa => 
                  <option key={empresa} value={empresa}>{empresa}</option>)}
              </select>
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="categoria">Categoria:</label>
              <select 
                name="categoria" 
                id="categoria"
                onChange={e=> setCategoria(e.target.value)} 
                required
              >
                <option value={''}>Escolha uma categoria</option>
                <option value="padrao">Padrão</option>
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
                onChange={e=> setConsumo(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="clicavel">Calcular</button>
          </form>
        </div>
      </div>
    </>
  );
}
