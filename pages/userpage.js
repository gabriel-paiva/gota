import styles from '../styles/Userpage.module.css';

import Navbar from '../components/Navbar';

export default function Userpage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Central do Usuário</h1>

        <div className={styles.formdiv}>
          <h2>Cadastrar conta</h2>
          <form>
            <div className={styles.inputdiv}>
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                name="data"
                id="data"
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
                placeholder="Insira o consumo da sua conta"
                required
              />
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="empresa">Empresa de saneamento:</label>
              <select
                name="empresa"
                id="empresa"
                required
              >
                <option>Escolha uma empresa de saneamento</option>
                <option>Águas Guariroba</option>
                <option>Caesb</option>
                <option>Saneago</option>
                <option>Sanesul</option>
              </select>
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="categoria">Categoria:</label>
              <select
                name="categoria"
                id="categoria"
                required
              >
                <option>Escolha a categoria da sua conta</option>
                <option>Residencial Padrão</option>
                <option>Residencial Social</option>
                <option>Público</option>
                <option>Industrial</option>
              </select>
            </div>

            <div className={styles.inputdiv} >
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                id="status"
                required
              >
                <option>Defina o status da sua conta</option>
                <option>Pago</option>
                <option>Pendente</option>
              </select>
            </div>
            <button type="submit" className="clicavel">Salvar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Contas salvas</h2>
        </div>

        <div className={styles.formdiv}>
          <h2>Relatórios</h2>
        </div>

      </div>
    </>
  );
}