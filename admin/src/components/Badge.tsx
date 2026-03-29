import styles from './Badge.module.css';

type BadgeVariant = 'canteen' | 'library' | 'events' | 'fees' | 'success' | 'pending' | 'warning';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {label}
    </span>
  );
}
