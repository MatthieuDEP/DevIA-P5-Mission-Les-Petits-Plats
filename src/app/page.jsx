import styles from "./page.module.css";

import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import FiltersBar from "@/components/FiltersBar/FiltersBar";
import RecipeGrid from "@/components/RecipeGrid/RecipeGrid";
import Footer from "@/components/Footer/Footer";

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
            <FiltersBar count={recipes.length} />
            <RecipeGrid recipes={recipes} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

