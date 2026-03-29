import { useEffect, useState } from 'react';
import styles from './BlockchainOverlay.module.css';

interface BlockchainOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
  message?: string;
}

export default function BlockchainOverlay({ isVisible, onComplete, message = 'Syncing with Blockchain...' }: BlockchainOverlayProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isVisible) return;

    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000); // 3 second simulation

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner}></div>
        <h2 className={styles.title}>{message.replace('...', '')}{dots}</h2>
        <p className={styles.subtitle}>Securing transaction via CampusChain Node</p>
        <div className={styles.hashMock}>
          0x{Math.random().toString(16).substr(2, 40)}
        </div>
      </div>
    </div>
  );
}
