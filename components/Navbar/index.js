import Image from 'next/image';

import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Image src="/gota.svg" alt="Logo Gota" width={130} height={74.63} />
    </header>
  );
}