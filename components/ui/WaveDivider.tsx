import styles from "./WaveDivider.module.css";

export default function WaveDivider() {
  return (
    <div aria-hidden="true" className={styles.container}>
      <svg viewBox="0 0 1440 120" className={styles.wave} preserveAspectRatio="none">
        <path d="M0,64C96,96,192,112,288,106.7C384,101,480,75,576,58.7C672,43,768,37,864,48C960,59,1056,85,1152,90.7C1248,96,1344,80,1392,69.3L1440,59V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z" />
      </svg>
    </div>
  );
}
