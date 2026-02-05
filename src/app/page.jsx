import styles from "./page.module.css";

import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import HomeClient from "@/components/HomeClient/HomeClient";

import recipesData from "@/data/recipes.json";

export default function HomePage() {
  const recipes = Array.isArray(recipesData) ? recipesData : [];

  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className={styles.mainSection}>
          <div className={styles.container}>
            <HomeClient recipes={recipes} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
