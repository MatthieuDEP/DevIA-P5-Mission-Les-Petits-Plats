import styles from "./RecipeGrid.module.css";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

export default function RecipeGrid({ recipes }) {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
