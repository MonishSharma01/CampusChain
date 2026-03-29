'use client';
import { useState } from 'react';
import { QrCode, CheckCircle2 } from 'lucide-react';
import Card from '@/components/Card';
import BlockchainOverlay from '@/components/BlockchainOverlay';
import styles from './QrGenerator.module.css';
import { Category } from '@/lib/mockData';

type Step = 'form' | 'qr' | 'processing' | 'success';

export default function QrGenerator() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    category: 'canteen' as Category,
    description: '',
    amount: '',
    dueDate: '',
  });

  const handleGenerateInit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('qr');
  };

  const handleSimulateScan = () => {
    setStep('processing');
  };

  const handleProcessComplete = () => {
    setStep('success');
    setTimeout(() => {
      setStep('form');
      setFormData({ ...formData, amount: '', description: '', dueDate: '' });
    }, 4000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-xl">Generate Payment QR</h1>
        <p className={styles.subtitle}>Create a campus payment request and simulate a student scan.</p>
      </header>

      <div className={styles.grid}>
        <Card className={styles.formCard}>
          <form onSubmit={handleGenerateInit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Category})}
                className={styles.input}
              >
                <option value="canteen">Canteen</option>
                <option value="library">Library</option>
                <option value="events">Events</option>
                <option value="fees">Fees</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Description</label>
              <input 
                type="text" 
                placeholder="e.g. Lunch Combo" 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Amount (CC)</label>
              <input 
                type="number" 
                placeholder="0" 
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className={styles.input}
                required
                min="1"
              />
            </div>

            {formData.category === 'library' && (
              <div className={styles.formGroup}>
                <label>Due Date (Optional)</label>
                <input 
                  type="date" 
                  value={formData.dueDate}
                  onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  className={styles.input}
                />
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              Generate QR Code
            </button>
          </form>
        </Card>

        <div className={styles.previewArea}>
          {step === 'form' && (
            <div className={styles.emptyState}>
              <QrCode size={48} className={styles.emptyIcon} />
              <p>Fill out the form to generate a QR code</p>
            </div>
          )}

          {step === 'qr' && (
            <div className={`${styles.qrDisplay} animate-slide-in`}>
              <div className={styles.qrGlow}>
                <QrCode size={180} color="#1A1A2E" />
              </div>
              <div className={styles.paymentSummary}>
                <h3>{formData.description}</h3>
                <div className={styles.amountDisplay}>{formData.amount} CC</div>
                <div className={styles.categoryPill}>{formData.category}</div>
              </div>
              <button onClick={handleSimulateScan} className={styles.simulateBtn}>
                Simulate Student Scan
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className={`${styles.successState} animate-slide-in`}>
              <CheckCircle2 size={64} className={styles.successIcon} />
              <h2 className={styles.successTitle}>Payment Successful!</h2>
              <p>Transaction confirmed on CampusChain.</p>
            </div>
          )}
        </div>
      </div>

      <BlockchainOverlay 
        isVisible={step === 'processing'} 
        onComplete={handleProcessComplete} 
      />
    </div>
  );
}
