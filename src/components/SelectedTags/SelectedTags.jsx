"use client";

import styles from "./SelectedTags.module.css";

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default function SelectedTags({ selected, onRemove }) {
  // selected = { ingredients:[keys], appliances:[keys], ustensils:[keys] }
  // Ici on affiche la key telle quelle. Si tu veux afficher le "label d'origine", je te le fais.
  const pills = [
    ...selected.ingredients.map((k) => ({ type: "ingredients", key: k })),
    ...selected.appliances.map((k) => ({ type: "appliances", key: k })),
    ...selected.ustensils.map((k) => ({ type: "ustensils", key: k })),
  ];

  if (pills.length === 0) return null;

  return (
    <div className={styles.wrap}>
      {pills.map((p) => (
        <button
          type="button"
          key={`${p.type}-${p.key}`}
          className={styles.pill}
          onClick={() => onRemove(p.type, p.key)}
          aria-label={`Supprimer le tag ${p.key}`}
        >
          <span className={styles.text}>{capitalize(p.key)}</span>
          <span className={styles.x}>✕</span>
        </button>
      ))}
    </div>
  );
}
