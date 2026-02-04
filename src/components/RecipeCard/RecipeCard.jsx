import Image from "next/image";
import styles from "./RecipeCard.module.css";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const imageSrc = recipe.image ? `/images/${recipe.image}` : "/images/placeholder.jpg";

  return (
    <article className={styles.card}>
      <Link href={`/recette/${recipe.slug}`} className={styles.cardLink} aria-label={`Voir la recette ${recipe.name}`}>
        <div className={styles.media}>
          <Image
            src={imageSrc}
            alt={recipe.name}
            width={380}
            height={180}
            className={styles.img}
          />
          <div className={styles.badge}>{recipe.time}min</div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.title}>{recipe.name}</h2>
          <div className={styles.block}>
            <div className={styles.kicker}>RECETTE</div>
            <p className={styles.desc}>{recipe.description}</p>
          </div>
          <div className={styles.block}>
            <div className={styles.kicker}>INGRÉDIENTS</div>
            <ul className={styles.ingredients}>
              {recipe.ingredients.slice(0, 6).map((ing, i) => (
                <li key={`${ing.ingredient}-${i}`} className={styles.ingredient}>
                  <span className={styles.ingName}>{ing.ingredient}</span>
                  {ing.quantity !== undefined && ing.quantity !== "" && (
                    <span className={styles.ingQty}>
                      {" "}
                      {ing.quantity}
                      {ing.unit ? ` ${ing.unit}` : ""}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </article>
  );
}
