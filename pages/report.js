import styles from '../styles/Chart.module.css';

export default function Relatorio() {

  function printDiv(divName) {
    if (process.browser) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;

      window.print();

      document.body.innerHTML = originalContents;
    }
  }
  return (
    <>
      <div id="printableArea">
        <div className={styles.formdiv}>
          <h1>Relatório</h1>
          <h2>Esse relatório é muito legal,</h2>
          <h2>solta a minha mão e pega no meu...</h2>
        </div>
      </div>
      <button type="button" onClick={e => printDiv('printableArea')} value="print a div!">Imprimir</button>
    </>
  );
}