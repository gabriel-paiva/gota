import { useRouter } from 'next/router';
import { useEffect } from 'react';

import styles from '../styles/Profile.module.css';

import Navbar from '../components/Navbar';

export default function Profile() {
  const router = useRouter();

  useEffect(() => {
    const isLoged = localStorage.getItem('isLoged');
    if(!isLoged){
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Editar Perfil</h1>
        <div className={styles.formdiv}>
          <h2>Novo nome:</h2>
          <form>
            <div className={styles.inputdiv} >
              <label htmlFor="nome">Escolha um novo nome:</label>
              <input type="text" name="nome" id="nome"/>
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Novo e-mail:</h2>
          <form>
            <div className={styles.inputdiv} >
              <label htmlFor="email">Escolha um novo e-mail:</label>
              <input type="email" name="email" id="email"/>
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Nova senha:</h2>
          <form>
            <div className={styles.inputdiv} >
              <label htmlFor="senha">Escolha uma nova senha:</label>
              <input type="password" name="senha" id="senha"/>
            </div>
            <div className={styles.inputdiv} >
              <label htmlFor="confirmaSenha">Confirme sua nova senha:</label>
              <input type="password" name="confirmaSenha" id="confirmaSenha"/>
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}