'use client';

import {
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart
} from 'recharts';
import styles from './GraficoEvolucao.module.css';

interface DadosGrafico {
  data: string;
  preco: number;
}

interface GraficoEvolucaoProps {
  dados: DadosGrafico[];
  corLinha: string;
}

// Componente personalizado para o tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipPreco}>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function GraficoEvolucao({ dados, corLinha }: GraficoEvolucaoProps) {
  return (
    <div className={styles.graficoEvolucao}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={dados} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <defs>
            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={corLinha} stopOpacity={0.3} />
              <stop offset="95%" stopColor={corLinha} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--borda-secundaria)" 
            strokeOpacity={0.2}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: 'var(--texto-secundario)' }}
            tickFormatter={(value) => 
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="preco"
            stroke={corLinha}
            strokeWidth={2}
            fill="url(#gradientArea)"
            dot={false}
            activeDot={{ r: 4, stroke: corLinha, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}