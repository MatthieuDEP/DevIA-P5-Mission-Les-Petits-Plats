import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/">
          <Image
            src="/logo/Logo.png"
            alt="Les Petits Plats"
            width={180}
            height={32}
            className={styles.logo}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
