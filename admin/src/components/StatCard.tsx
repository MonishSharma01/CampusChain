'use client';
import { useEffect, useState } from 'react';
import Card from './Card';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ title, value, prefix = '', suffix = '', icon }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }
    
    // Total duration of animation in ms
    const duration = 1500;
    // How frequently to update (60fps = ~16ms)
    const delay = 16;
    const steps = duration / delay;
    const increment = end / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, delay);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className={styles.statCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
      </div>
      <div className={styles.valueContainer}>
        <span className={styles.value}>
          {prefix}{displayValue.toLocaleString()}{suffix}
        </span>
      </div>
    </Card>
  );
}
