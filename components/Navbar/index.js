import Image from 'next/image';
import Link from 'next/link';


import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link href="/">
        <a>
          <Image className="clicavel" src="/gota-azul.png" alt="Logo Gota" width={120} height={68.89} />
        </a>
      </Link>

    </header>
  );
}