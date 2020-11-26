import styles from '../../styles/Resultado.module.css';

export default function Resultado(props) {

  const ultimaModificacaoBarra = props.ultimaModificacao.replace(/-/g, '/');
  const validoAteBarra = props.validoAte.replace(/-/g, '/');

  return (
    <div id="resultado" className={styles.resultadoDiv}>
      <h2>Resultado:</h2>
      <p>Valor da Tarifa de Água: R$ {props.precoAgua.toFixed(2)}</p>
      <p>Valor da Tarifa de Esgoto: R$ {props.precoEsgoto.toFixed(2)}</p>
      <p>Valor total da Tarifa: R$ {(props.precoAgua + props.precoEsgoto).toFixed(2)}</p>
      <br/>
      <br/>
      <h2>Aviso:</h2>
      <p>Esse cálculo foi feito com base em dados disponibilizados pelas empresas de água e saneamento e coletados manualmente.</p>
      <p>Ultima atualização: {ultimaModificacaoBarra}</p>
      <p>Válidos até: {validoAteBarra}</p>
    </div>
  );
}