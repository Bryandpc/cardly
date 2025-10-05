import styles from './PerfilUsuario.module.css';

export interface PerfilUsuarioProps {
  nome: string;
  valorCarteira: string;
  variacao: {
    porcentagem: string;
    ehPositiva: boolean;
  };
}

export function PerfilUsuario({ nome, valorCarteira, variacao }: PerfilUsuarioProps) {
  const obterIniciais = (nomeCompleto: string) => {
    return nomeCompleto.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className={styles.secaoPerfil}>
      <div className={styles.avatar}>
        <span className={styles.textoAvatar}>
          {obterIniciais(nome)}
        </span>
      </div>
      <div>
        <h1 className={styles.nomeUsuario}>
          {nome}
        </h1>
        <p className={styles.valorCarteira}>
          {valorCarteira} <span className={`${styles.variacaoCarteira} ${variacao.ehPositiva ? styles.variacaoPositiva : styles.variacaoNegativa}`}>
            ({variacao.porcentagem})
          </span>
        </p>
      </div>
    </div>
  );
}