'use client';

import {
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart
} from 'recharts';
import styles from './GraficoColecao.module.css';

interface DadosColecao {
  periodo: string;
  valor: number;
  cartas: number;
}

interface GraficoColecaoProps {
  dados: DadosColecao[];
  tipo: 'valor' | 'cartas';
}

// Componente personalizado para o tooltip
const CustomTooltip = ({ active, payload, tipo }: {
  active?: boolean, 
  payload?: Array<{payload: DadosColecao, value: number}>, 
  tipo: 'valor' | 'cartas'
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipPeriodo}>{data.periodo}</p>
        <p className={styles.tooltipValor}>
          {tipo === 'valor' ? 
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(payload[0].value) :
            `${payload[0].value} cartas`
          }
        </p>
      </div>
    );
  }
  return null;
};

export default function GraficoColecao({ dados, tipo }: GraficoColecaoProps) {
  const dataKey = tipo === 'valor' ? 'valor' : 'cartas';
  const corGradiente = tipo === 'valor' ? '#3b82f6' : '#10b981';

  return (
    <div className={styles.graficoContainer}>
      <div className={styles.header}>
        <h3 className={styles.titulo}>
          {tipo === 'valor' ? 'Evolução do Valor da Coleção' : 'Crescimento da Coleção'}
        </h3>
      </div>
      
      <div className={styles.grafico}>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={dados} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <defs>
              <linearGradient id={`gradient-${tipo}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={corGradiente} stopOpacity={0.3} />
                <stop offset="95%" stopColor={corGradiente} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--borda-secundaria)" 
              strokeOpacity={0.3}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--texto-secundario)' }}
              tickFormatter={(value) => 
                tipo === 'valor' ?
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value) :
                value.toString()
              }
            />
            <Tooltip content={<CustomTooltip tipo={tipo} />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={corGradiente}
              strokeWidth={3}
              fill={`url(#gradient-${tipo})`}
              dot={{ fill: corGradiente, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: corGradiente, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}