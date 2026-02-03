import styles from "./Select.module.css";

export default function Select({ label, options }) {
  return (
    <div className={styles.wrapper}>
      <select className={styles.select} defaultValue="">
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
