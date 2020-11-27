import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Profile.module.css';

import Navbar from '../components/Navbar';

import api from '../services/backendapi';

export default function Profile() {
  const router = useRouter();

  const [newName, setNewName] = useState('');


  useEffect(() => {
    const isLoged = localStorage.getItem('isLoged');
    if (!isLoged) {
      router.push('/login');
    }
  }, []);

  async function handleChangeName(e) {
    e.preventDefault();

    const headers = { "Authorization": `${localStorage.getItem('userId')}` };

    try {
      await api.put('/profile/edit_name', headers, { newName });
      alert("Nome editado com sucesso!")
    }
    catch (erro) {
      alert(erro.response.data);
      console.log(erro.response.data);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Editar Perfil</h1>
        <div className={styles.formdiv}>
          <h2>Novo nome:</h2>
          <form onSubmit={handleChangeName}>
            <div className={styles.inputdiv} >
              <label htmlFor="nome">Novo nome:</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Insira seu novo nome aqui"
              />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Novo e-mail:</h2>
          <form>
            <div className={styles.inputdiv} >
              <label htmlFor="email">Escolha um novo e-mail:</label>
              <input type="email" name="email" id="email" />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Nova senha:</h2>
          <form>
            <div className={styles.inputdiv} >
              <label htmlFor="senhaAntiga">Senha antiga:</label>
              <input type="password" name="senhaAntiga" id="senhaAntiga" />
            </div>
            <div className={styles.inputdiv} >
              <label htmlFor="senha">Nova senha:</label>
              <input type="password" name="senha" id="senha" />
            </div>
            <div className={styles.inputdiv} >
              <label htmlFor="confirmaSenha">Confirme sua nova senha:</label>
              <input type="password" name="confirmaSenha" id="confirmaSenha" />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}