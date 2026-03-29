import styles from './Card.module.css';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({ children, className = '', padding = 'medium' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[`padding-${padding}`]} ${className}`}>
      {children}
    </div>
  );
}
