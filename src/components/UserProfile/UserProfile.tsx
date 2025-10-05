import styles from './UserProfile.module.css';

export interface UserProfileProps {
  name: string;
  walletValue: string;
  walletChange: {
    percentage: string;
    isPositive: boolean;
  };
}

export function UserProfile({ name, walletValue, walletChange }: UserProfileProps) {
  const getInitials = (fullName: string) => {
    return fullName.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.avatar}>
        <span className={styles.avatarText}>
          {getInitials(name)}
        </span>
      </div>
      <div>
        <h1 className={styles.userName}>
          {name}
        </h1>
        <p className={styles.walletValue}>
          {walletValue} <span className={`${styles.walletChange} ${walletChange.isPositive ? styles.changePositive : styles.changeNegative}`}>
            ({walletChange.percentage})
          </span>
        </p>
      </div>
    </div>
  );
}