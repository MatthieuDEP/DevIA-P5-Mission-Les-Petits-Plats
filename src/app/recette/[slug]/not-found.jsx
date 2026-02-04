import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.overlay} />

        <div className={styles.center}>
          <div className={styles.code}>404 :(</div>
          <div className={styles.text}>La page que vous demandez est introuvable.</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
