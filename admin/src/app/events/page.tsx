'use client';
import { useState, useEffect } from 'react';
import { Users, Ticket, MapPin, CalendarDays } from 'lucide-react';
import Card from '@/components/Card';
import styles from './Events.module.css';

interface CampusEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  entryFee: number;
  seatsFilled: number;
  totalSeats: number;
  image: string;
}

const initialEvents: CampusEvent[] = [
  { id: 'e1', name: 'Annual Tech Symposium', date: 'April 12, 2026', location: 'Main Auditorium', entryFee: 150, seatsFilled: 342, totalSeats: 500, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 'e2', name: 'Creative Writing Workshop', date: 'April 15, 2026', location: 'Library Hall B', entryFee: 50, seatsFilled: 48, totalSeats: 50, image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=800&q=80' },
  { id: 'e3', name: 'Campus Spring Festival', date: 'May 01, 2026', location: 'Central Grounds', entryFee: 200, seatsFilled: 890, totalSeats: 2000, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80' },
];

export default function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Simulate seats filling over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => prev.map(evt => {
        // Randomly add 1-2 seats every few seconds if not full
        if (evt.seatsFilled < evt.totalSeats && Math.random() > 0.5) {
          return { ...evt, seatsFilled: Math.min(evt.seatsFilled + Math.floor(Math.random() * 3), evt.totalSeats) };
        }
        return evt;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className="title-xl">Campus Events Management</h1>
        <p className={styles.subtitle}>Track live ticket sales and seating metrics generated via CampusChain.</p>
      </header>

      <div className={styles.grid}>
        {events.map((evt) => {
          const fillPercentage = (evt.seatsFilled / evt.totalSeats) * 100;
          const isSoldOut = evt.seatsFilled >= evt.totalSeats;
          
          return (
            <Card key={evt.id} padding="none" className={styles.eventCard}>
              <div 
                className={styles.imageHeader} 
                style={{ backgroundImage: `url(${evt.image})` }}
              >
                <div className={styles.imageOverlay}>
                  <div className={styles.feeTag}>{evt.entryFee} CC</div>
                  {isSoldOut && <div className={styles.soldOutTag}>SOLD OUT</div>}
                </div>
              </div>
              
              <div className={styles.eventBody}>
                <h2 className={styles.eventName}>{evt.name}</h2>
                
                <div className={styles.eventMeta}>
                  <div className={styles.metaItem}>
                    <CalendarDays size={16} />
                    <span>{evt.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <MapPin size={16} />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className={styles.seatsContainer}>
                  <div className={styles.seatsHeader}>
                    <span className={styles.seatsLabel}>
                      <Users size={16} /> Live Capacity
                    </span>
                    <span className={styles.seatsNumbers}>
                      <strong>{evt.seatsFilled}</strong> / {evt.totalSeats}
                    </span>
                  </div>
                  
                  <div className={styles.progressBarBg}>
                    <div 
                      className={`${styles.progressBarFill} ${isSoldOut ? styles.progressFull : ''}`} 
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
