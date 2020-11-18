import Head from 'next/head'

import Navbar from '../components/Navbar';

import styles from '../styles/Home.module.css'

export default function Home() {
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
          <form>
            <label htmlFor="regiao">Escolha uma região:</label>
            <select name="regiao" id="regiao">
              <option value="DF">Distrito Federal</option>
              <option value="GO">Goiás</option>
              <option value="MS">Mato Grosso do Sul</option>
            </select>

            <label htmlFor="empresa">Escolha uma empresa de saneamento:</label>
            <select name="empresa" id="empresa">
              <option value="caesb">CAESB</option>
              <option value="saneago">SANEAGO</option>
              <option value="sanesul">SANESUL</option>
            </select>

            <label htmlFor="residencia">Escolha um tipo de residência:</label>
            <select name="residencia" id="residencia">
              <option value="padrao">Padrão</option>
            </select>

            <label htmlFor="consumo">Indique seu consumo em m³:</label>
            <input type="number" id="consumo" name="consumo" min="0" max="999999" />

            <button type="submit" className="clicavel">Calcular</button>
          </form>
        </div>
      </div>
    </>
  );
}
