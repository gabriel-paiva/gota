import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { User, LogIn, LogOut, Settings, Percent } from 'react-feather';


import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [currentRoute, setCurrentRoute] = useState('');
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoged(localStorage.getItem('isLoged'));
      setUsername(localStorage.getItem('userName'));
      setCurrentRoute(window.location.pathname);
    }
  }, [username, isLoged]);

  function handleLogout() {
    localStorage.clear();
    router.push('/');
  }

  return (
    <header className={styles.navbar}>
      <Link href="/">
        <a>
          <Image className="clicavel" src="/gota-azul.png" alt="Logo Gota" width={120} height={68.89} />
        </a>
      </Link>
      {isLoged &&
        <p>Olá, {username}!</p>}
      {currentRoute !== '/' &&
        <Link href="/">
        <a className="tooltip">
          <Percent color="#6E9DC9" size={24} />
          <span className="tooltiptext">Calculadora</span>
        </a>
      </Link>}
      {isLoged && (currentRoute !== '/userpage') &&
        <Link href="/userpage">
          <a className="tooltip">
            <User color="#6E9DC9" size={24} />
            <span className="tooltiptext">Central do Usuário</span>
          </a>
        </Link>}
      {isLoged && (currentRoute !== '/profile') &&
        <Link href="/profile">
          <a className="tooltip">
            <Settings color="#6E9DC9" size={24} />
            <span className="tooltiptext">Perfil</span>
          </a>
        </Link>}
      {!isLoged && (currentRoute !== '/login') &&
        <Link href="/login">
          <a className="tooltip">
            <LogIn color="#6E9DC9" size={24} />
            <span className="tooltiptext">Entrar</span>
          </a>
        </Link>}
      {isLoged &&
        <Link href="#" >
          <a className="tooltip">
            <LogOut color="#6E9DC9" size={24} onClick={handleLogout} />
            <span className="tooltiptext">Sair</span>
          </a>
        </Link>}
    </header>
  );
}