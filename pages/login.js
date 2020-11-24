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
          </div>
          <div className={styles.cadastrodiv}>
            <h2>Cadastro</h2>
          </div>
        </div>
      </div>
    </>
  );
}