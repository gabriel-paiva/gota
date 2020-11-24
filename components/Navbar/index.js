import Image from 'next/image';
import Link from 'next/link';

import { User, LogIn, LogOut, Settings, PlusSquare } from 'react-feather';


import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link href="/">
        <a>
          <Image className="clicavel" src="/gota-azul.png" alt="Logo Gota" width={120} height={68.89} />
        </a>
      </Link>
      <Link href="/userpage">
        <a>
          <User color="#6E9DC9" size={24} />
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <Settings color="#6E9DC9" size={24} />
        </a>
      </Link>
      {/* <Link href="/">
        <a>
          <PlusSquare color="#6E9DC9" size={24} />
        </a>
      </Link> */}
      <Link href="/login">
        <a>
          <LogIn color="#6E9DC9" size={24} />
        </a>
      </Link>
      {/* <Link href="#">
        <a>
          <LogOut color="#6E9DC9" size={24} />
        </a>
      </Link> */}
    </header>
  );
}