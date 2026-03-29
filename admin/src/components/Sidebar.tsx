'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  QrCode, 
  ArrowLeftRight, 
  Users, 
  Library, 
  Calendar 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'QR Generator', href: '/qr-generator', icon: QrCode },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Library', href: '/library', icon: Library },
  { name: 'Events', href: '/events', icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>CC</div>
        <h1 className={styles.logoText}>CampusChain<br/><span>Admin Panel</span></h1>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon className={styles.icon} size={20} />
              <span>{item.name}</span>
              {isActive && <div className={styles.activeIndicator} />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
