import styles from './PerfilUsuario.module.css';

export interface PerfilUsuarioProps {
  nome: string;
}

export function PerfilUsuario({ nome }: PerfilUsuarioProps) {
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
      </div>
    </div>
  );
}