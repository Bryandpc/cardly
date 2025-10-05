import styles from './ListaCartas.module.css';

export interface Carta {
  id: string;
  nome: string;
  conjunto: string;
  numero: string;
  raridade: string;
  preco: string;
  variacao: string;
  ehPositiva: boolean;
}

interface ListaCartasProps {
  titulo: string;
  cartas: Carta[];
}

export function ListaCartas({ titulo, cartas }: ListaCartasProps) {
  return (
    <section className={styles.secao}>
      <h2 className={styles.tituloSecao}>
        {titulo}
      </h2>
      <div className={styles.listaCartas}>
        {cartas.map((carta) => (
          <div key={carta.id} className={styles.itemCarta}>
            <div className={styles.conteudoCarta}>
              <div className={styles.infoCarta}>
                <h3>{carta.nome}</h3>
                <p className={styles.conjuntoCarta}>{carta.conjunto} #{carta.numero}</p>
                <p className={styles.raridadeCarta}>{carta.raridade}</p>
              </div>
              <div className={styles.precoCarta}>
                <p className={`${styles.valorPreco} ${carta.ehPositiva ? styles.precoAlta : styles.precoBaixa}`}>
                  {carta.preco}
                </p>
                <p className={styles.variacaoPreco}>{carta.variacao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}