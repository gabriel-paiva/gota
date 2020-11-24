import Navbar from '../components/Navbar';

import styles from '../styles/Login.module.css';

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className={styles.formsContainer}>
          <div className={styles.logindiv}>
            <h2>Login</h2>
            <form>
              <div className={styles.inputdiv}>
                <label htmlFor="email">Insira seu e-mail:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Insira seu e-mail aqui"
                  required
                />
              </div>
              <div className={styles.inputdiv}>
                <label htmlFor="senha">Insira sua senha:</label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Insira sua senha aqui"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>

          <div className={styles.cadastrodiv}>
            <h2>Cadastro</h2>
            <form>
            <div className={styles.inputdiv}>
                <label htmlFor="nome">Insira seu e-mail:</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Insira seu nome aqui"
                  required
                />
              </div>
              <div className={styles.inputdiv}>
                <label htmlFor="email">Insira seu e-mail:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Insira seu e-mail aqui"
                  required
                />
              </div>
              <div className={styles.inputdiv}>
                <label htmlFor="senha">Insira sua senha:</label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Insira sua senha aqui"
                />
              </div>
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}