import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import recipesData from "@/data/recipes.json";

import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

function formatQtyUnit(ing) {
  const hasQty = ing.quantity !== undefined && ing.quantity !== "";
  if (!hasQty) return "";
  return `${ing.quantity}${ing.unit ? ` ${ing.unit}` : ""}`;
}

export default async function RecipePage({ params }) {
  const { slug } = await params;

  const recipes = Array.isArray(recipesData) ? recipesData : [];
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  const imageSrc = recipe.image
    ? `/images/${recipe.image}`
    : "/images/placeholder.jpg";

  return (
    <>
      <Header />

      <main className={styles.page}>
        <section className={styles.topBanner} />

        <section className={styles.container}>
          <div className={styles.card}>
            <div className={styles.left}>
              <div className={styles.imageBox}>
                <Image
                  src={imageSrc}
                  alt={recipe.name}
                  width={720}
                  height={720}
                  className={styles.image}
                  priority
                />
              </div>
            </div>

            <div className={styles.right}>
              <h1 className={styles.title}>{recipe.name}</h1>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>TEMPS DE PRÉPARATION</div>
                <span className={styles.timeBadge}>{recipe.time}min</span>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>INGRÉDIENTS</div>
                <div className={styles.ingredientsGrid}>
                  {recipe.ingredients.map((ing, i) => (
                    <div
                      key={`${ing.ingredient}-${i}`}
                      className={styles.ingredientItem}
                    >
                      <div className={styles.ingName}>{ing.ingredient}</div>
                      <div className={styles.ingQty}>{formatQtyUnit(ing)}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>USTENSILES NÉCESSAIRES</div>
                <ul className={styles.list}>
                  {recipe.ustensils.map((u, i) => (
                    <li key={`${u}-${i}`}>{u}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>APPAREILS NÉCESSAIRES</div>
                <ul className={styles.list}>
                  <li>{recipe.appliance}</li>
                </ul>
              </div>

              <div className={styles.section}>
                <div className={styles.sectionLabel}>RECETTE</div>
                <p className={styles.description}>{recipe.description}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
