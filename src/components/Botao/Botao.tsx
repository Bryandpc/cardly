import React from 'react';
import styles from './Botao.module.css';

interface BotaoProps {
    icone: React.ReactNode;
    texto?: string;
    onClick?: () => void;
    customClass?: string;
}

const Botao: React.FC<BotaoProps> = ({
    icone,
    texto,
    onClick,
    customClass
}) => {
    return (
        <button className={`${styles.botao} ${customClass}`} onClick={onClick}>
            <span className={styles.icone}>
                {icone}
            </span>
            <span className={styles.texto}>{texto}</span>
        </button>
    );
}
export default Botao;