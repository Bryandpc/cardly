import toast from 'react-hot-toast';
import { HiRectangleStack, HiStar, HiTrash, HiCheck, HiExclamationTriangle } from 'react-icons/hi2';
import { createElement } from 'react';

export const useToasts = () => {
  const adicionarColecao = (nomeCarta: string) => {
    toast.success(`${nomeCarta} adicionada à coleção!`, {
      icon: createElement(HiRectangleStack, { size: 18 }),
      duration: 2500,
      style: {
        background: 'linear-gradient(135deg, var(--cor-sucesso-500), var(--cor-sucesso-600))',
        color: 'white',
        border: 'none',
        fontWeight: '600',
      },
    });
  };

  const removerColecao = (nomeCarta: string) => {
    toast.success(`${nomeCarta} removida da coleção`, {
      icon: createElement(HiTrash, { size: 18 }),
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, var(--cor-alerta-500), var(--cor-alerta-600))',
        color: 'white',
        border: 'none',
        fontWeight: '600',
      },
    });
  };

  const adicionarFavoritos = () => {
    toast.success('Adicionado aos favoritos!', {
      icon: createElement(HiStar, { size: 18 }),
      duration: 2000,
      style: {
        background: 'linear-gradient(135deg, var(--cor-alerta-500), var(--cor-alerta-600))',
        color: 'white',
        border: 'none',
        fontWeight: '600',
      },
    });
  };

  const removerFavoritos = () => {
    toast('Removido dos favoritos', {
      icon: '💔',
      duration: 1500,
      style: {
        background: 'var(--fundo-primario)',
        color: 'var(--texto-secundario)',
        border: '1px solid var(--borda-primaria)',
        fontWeight: '500',
      },
    });
  };

  const sucesso = (mensagem: string) => {
    toast.success(mensagem, {
      icon: createElement(HiCheck, { size: 18 }),
      duration: 2000,
    });
  };

  const erro = (mensagem: string) => {
    toast.error(mensagem, {
      icon: createElement(HiExclamationTriangle, { size: 18 }),
      duration: 3000,
    });
  };

  const carregando = (mensagem: string = 'Carregando...') => {
    return toast.loading(mensagem, {
      style: {
        background: 'var(--fundo-primario)',
        color: 'var(--texto-primario)',
        border: '1px solid var(--borda-primaria)',
      },
    });
  };

  const dismissCarregando = (toastId: string) => {
    toast.dismiss(toastId);
  };

  return {
    adicionarColecao,
    removerColecao,
    adicionarFavoritos,
    removerFavoritos,
    sucesso,
    erro,
    carregando,
    dismissCarregando,
  };
};