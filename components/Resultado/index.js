import styles from '../../styles/Resultado.module.css';

export default function Resultado(props) {
  return (
    <div id="resultado" className={styles.resultadoDiv}>
      <h2>Resultado:</h2>
      <p>Valor da Tarifa de Água: R$ {props.precoAgua.toFixed(2)}</p>
      <p>Valor da Tarifa de Esgoto: R$ {props.precoEsgoto.toFixed(2)}</p>
      <p>Valor total da Tarifa: R$ {(props.precoAgua + props.precoEsgoto).toFixed(2)}</p>
      <br/>
      <br/>
      <h2>Aviso:</h2>
      <p>Os dados utilizados para esse cálculo foram pegos manualmente no site da empresa.</p>
      <p>Ultima atualização dos dados: {props.ultimaModificacao}</p>
      <p>São válidos até: {props.validoAte}</p>
    </div>
  );
}