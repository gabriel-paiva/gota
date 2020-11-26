import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Navbar from '../components/Navbar';

import api from '../services/backendapi';

import styles from '../styles/Login.module.css';

export default function Login() {

  const router = useRouter();

  useEffect(() => {
    const isLoged = localStorage.getItem('isLoged');
    if(isLoged){
      router.push('/');
    }
  }, []);

  // Variáveis de cadastro:
  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  // Variáveis de Login:
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  async function handleCadastro(e){
    e.preventDefault();

    const userData = {
      name: nomeCadastro,
      email: emailCadastro,
      senha: senhaCadastro
    };

    try {
      await api.post('/user', userData).then(response => {
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('isLoged', true);
      });
      alert('Usuário cadastrado com sucesso!');
      router.push('/userpage');
    }
    catch(erro){
      alert(erro.response.data.message);
    }
  }

  async function handleLogin(e){
    e.preventDefault();

    const userData = {
      email: emailLogin,
      senha: senhaLogin
    }

    try {
      await api.post('/login', userData).then(response => {
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('isLoged', true);
      });
      router.push('/userpage');
    }
    catch(erro){
      alert(erro.response.data.message);
    }
  }


  return (
    <>
      <Navbar />
      <div className="container">
        <div className={styles.formsContainer}>
          <div className={styles.logindiv}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className={styles.inputdiv}>
                <label htmlFor="emailLogin">Insira seu e-mail:</label>
                <input
                  type="email"
                  name="emailLogin"
                  id="emailLogin"
                  value={emailLogin}
                  onChange={e => setEmailLogin(e.target.value)}
                  placeholder="Insira seu e-mail aqui"
                  required
                />
              </div>
              <div className={styles.inputdiv}>
                <label htmlFor="senhaLogin">Insira sua senha:</label>
                <input
                  type="password"
                  name="senhaLogin"
                  id="senhaLogin"
                  value={senhaLogin}
                  onChange={e => setSenhaLogin(e.target.value)}
                  placeholder="Insira sua senha aqui"
                />
              </div>
              <button type="submit" className="clicavel">Login</button>
            </form>
          </div>

          <div className={styles.cadastrodiv}>
            <h2>Cadastro</h2>
            <form onSubmit={handleCadastro} >
            <div className={styles.inputdiv}>
                <label htmlFor="nome">Insira seu nome:</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  value={nomeCadastro}
                  onChange={e => setNomeCadastro(e.target.value)}
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
                  value={emailCadastro}
                  onChange={e => setEmailCadastro(e.target.value)}
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
                  value={senhaCadastro}
                  onChange={e => setSenhaCadastro(e.target.value)}
                  placeholder="Insira sua senha aqui"
                />
              </div>
              <button type="submit" className="clicavel">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}