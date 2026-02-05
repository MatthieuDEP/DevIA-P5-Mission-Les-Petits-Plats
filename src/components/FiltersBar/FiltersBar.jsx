"use client";

import styles from "./FiltersBar.module.css";
import TagDropdown from "@/components/TagDropdown/TagDropdown";
import SelectedTags from "@/components/SelectedTags/SelectedTags";

export default function FiltersBar({ count, tags, selected, onSelectTag, onRemoveTag }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.left}>
          <TagDropdown
            label="Ingrédients"
            type="ingredients"
            options={tags.ingredients}
            onSelect={(key) => onSelectTag("ingredients", key)}
          />
          <TagDropdown
            label="Appareils"
            type="appliances"
            options={tags.appliances}
            onSelect={(key) => onSelectTag("appliances", key)}
          />
          <TagDropdown
            label="Ustensiles"
            type="ustensils"
            options={tags.ustensils}
            onSelect={(key) => onSelectTag("ustensils", key)}
          />
        </div>

        <div className={styles.count}>{count} recettes</div>
      </div>

      <SelectedTags selected={selected} onRemove={onRemoveTag} />
    </div>
  );
}
