import Head from 'next/head'

import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>GOTA - Calculadora de Tarifas de Água</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="container">
        <h1>Conteúdo da Página</h1>
        <h1>Outro conteúdo</h1>
        <h1>Mais um conteúdo</h1>
      </div>
    </>
  );
}
