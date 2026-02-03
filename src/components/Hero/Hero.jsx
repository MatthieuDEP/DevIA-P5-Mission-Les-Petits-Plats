import styles from "./Hero.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          DÉCOUVREZ NOS RECETTES
          <br />
          DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
        </h1>
        <SearchBar />
      </div>
    </section>
  );
}
