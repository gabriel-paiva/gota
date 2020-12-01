import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '../styles/Profile.module.css';

import Navbar from '../components/Navbar';

import api from '../services/backendapi';

export default function Profile() {
  const router = useRouter();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    const isLoged = localStorage.getItem('isLoged');
    if (!isLoged) {
      router.push('/login');
    }
  }, []);

  async function handleChangeName(e) {
    e.preventDefault();

    const headers = { 'Authorization': `${localStorage.getItem('userId')}`};

    try {
      await api.put('/profile/edit_name', {newName}, {headers});
      alert("Nome editado com sucesso!")
      localStorage.setItem('userName', newName);
    }
    catch (erro) {
      alert(erro.response.data);
    }
  }

  async function handleChangeEmail(e){
    e.preventDefault();

    const headers = { 'Authorization': `${localStorage.getItem('userId')}`};

    try {
      await api.put('/profile/edit_email', { newEmail }, { headers });
      alert("E-mail editado com sucesso!")
      localStorage.setItem('userEmail', newEmail);
    }
    catch (erro) {
      alert(erro.response.data);
    }
  }

  async function handleChangePassword(e){
    e.preventDefault();

    const headers = { 'Authorization': `${localStorage.getItem('userId')}`};

    try {
      if(newPassword === confirmPassword){
        await api.put('/profile/new_password', { newPassword, oldPassword }, { headers });
        alert("Senha editada com sucesso!");
      }
      else{
        alert("A nova senha e a confirmação precisam ser iguais!");
      }
    }
    catch (erro) {
      alert(erro.response.data.error);
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
                required
              />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Novo e-mail:</h2>
          <form onSubmit={handleChangeEmail}>
            <div className={styles.inputdiv} >
              <label htmlFor="email">Novo e-mail:</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Insira seu novo e-mail aqui"
                required
              />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>

        <div className={styles.formdiv}>
          <h2>Nova senha:</h2>
          <form onSubmit={handleChangePassword}>
            <div className={styles.inputdiv} >
              <label htmlFor="senhaAntiga">Senha antiga:</label>
              <input 
                type="password" 
                name="senhaAntiga" 
                id="senhaAntiga"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Insira sua antiga senha aqui"
                required
              />
            </div>
            <div className={styles.inputdiv} >
              <label htmlFor="senha">Nova senha:</label>
              <input 
                type="password" 
                name="senha" 
                id="senha"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Insira sua nova senha aqui"
                required
              />
            </div>
            <div className={styles.inputdiv} >
              <label htmlFor="confirmaSenha">Confirme sua nova senha:</label>
              <input 
                type="password" 
                name="confirmaSenha" 
                id="confirmaSenha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Digite novamente sua nova senha aqui"
                required
              />
            </div>
            <button type="submit" className="clicavel">Enviar</button>
          </form>
        </div>
      </div>
    </>
  );
}