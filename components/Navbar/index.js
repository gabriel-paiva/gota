import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { User, LogIn, LogOut, Settings, Percent } from 'react-feather';


import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoged(localStorage.getItem('isLoged'));
      setUsername(localStorage.getItem('userName'));
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
      <Link href="/">
        <a>
          <Percent color="#6E9DC9" size={24} />
        </a>
      </Link>
      {isLoged &&
        <Link href="/userpage">
          <a>
            <User color="#6E9DC9" size={24} />
          </a>
        </Link>}
      {isLoged &&
        <Link href="/profile">
          <a>
            <Settings color="#6E9DC9" size={24} />
          </a>
        </Link>}
      {!isLoged &&
        <Link href="/login">
          <a>
            <LogIn color="#6E9DC9" size={24} />
          </a>
        </Link>}
      {isLoged &&
        <Link href="#" >
          <a>
            <LogOut color="#6E9DC9" size={24} onClick={handleLogout} />
          </a>
        </Link>}
    </header>
  );
}