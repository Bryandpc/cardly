import styles from './CardsList.module.css';

export interface Card {
  id: string;
  name: string;
  set: string;
  number: string;
  rarity: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface CardsListProps {
  title: string;
  cards: Card[];
}

export function CardsList({ title, cards }: CardsListProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>
      <div className={styles.cardsList}>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <div className={styles.cardContent}>
              <div className={styles.cardInfo}>
                <h3>{card.name}</h3>
                <p className={styles.cardSet}>{card.set} #{card.number}</p>
                <p className={styles.cardRarity}>{card.rarity}</p>
              </div>
              <div className={styles.cardPrice}>
                <p className={`${styles.priceValue} ${card.isPositive ? styles.priceUp : styles.priceDown}`}>
                  {card.price}
                </p>
                <p className={styles.priceChange}>{card.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}