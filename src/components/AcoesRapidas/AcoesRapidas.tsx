import styles from './AcoesRapidas.module.css';

interface ItemAcao {
  icone: string;
  rotulo: string;
  aoClicar: () => void;
}

interface AcoesRapidasProps {
  acoes: ItemAcao[];
}

export function AcoesRapidas({ acoes }: AcoesRapidasProps) {
  return (
    <section className={styles.secao}>
      <h2 className={styles.tituloSecao}>
        Ações rápidas
      </h2>
      <div className={styles.gridAcoes}>
        {acoes.map((acao, index) => (
          <button 
            key={index}
            className={styles.botaoAcao}
            onClick={acao.aoClicar}
          >
            <div className={styles.iconeAcao}>{acao.icone}</div>
            <span className={styles.textoAcao}>
              {acao.rotulo}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}