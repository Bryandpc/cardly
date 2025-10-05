import styles from './QuickActions.module.css';

interface ActionItem {
  icon: string;
  label: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: ActionItem[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        Ações rápidas
      </h2>
      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <button 
            key={index}
            className={styles.actionButton}
            onClick={action.onClick}
          >
            <div className={styles.actionIcon}>{action.icon}</div>
            <span className={styles.actionText}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}