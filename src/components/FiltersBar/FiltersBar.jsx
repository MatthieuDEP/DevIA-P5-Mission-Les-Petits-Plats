import styles from "./FiltersBar.module.css";
import Select from "@/components/Select/Select";

export default function FiltersBar({ count }) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <Select label="Ingrédients" options={["Citron", "Tomate", "Lait de coco"]} />
        <Select label="Appareils" options={["Four", "Blender", "Cocotte"]} />
        <Select label="Ustensiles" options={["Couteau", "Saladier", "Fouet"]} />
      </div>

      <div className={styles.count}>{count} recettes</div>
    </div>
  );
}
