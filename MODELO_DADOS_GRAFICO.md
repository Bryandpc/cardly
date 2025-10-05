# Modelo de Dados para Gráfico de Evolução de Preço

O gráfico de evolução de preço no componente `VisualizadorCarta` espera dados no seguinte formato:

## Estrutura de Dados do Gráfico

```typescript
interface PontoGrafico {
  data: string;           // Data no formato 'DD/MM' (ex: '01/12')
  preco: number;          // Preço numérico em reais (ex: 135.75)
  precoFormatado: string; // Preço formatado para exibição (ex: 'R$ 135,75')
}

interface EstatisticasGrafico {
  precoMinimo: number;      // Menor preço do período
  precoMaximo: number;      // Maior preço do período  
  precoMedio: number;       // Preço médio do período
  variacaoPercentual: number; // Variação percentual (ex: 15.5 para +15.5%)
  tendencia: 'alta' | 'baixa' | 'estavel'; // Tendência do gráfico
}
```

## Exemplo de Dados Mockados

### Carta com Tendência de ALTA (📈)
```javascript
const dadosGraficoAlta = [
  { data: '01/01', preco: 89.50, precoFormatado: 'R$ 89,50' },
  { data: '01/02', preco: 92.30, precoFormatado: 'R$ 92,30' },
  { data: '01/03', preco: 95.80, precoFormatado: 'R$ 95,80' },
  { data: '01/04', preco: 98.20, precoFormatado: 'R$ 98,20' },
  { data: '01/05', preco: 103.45, precoFormatado: 'R$ 103,45' },
  { data: '01/06', preco: 107.90, precoFormatado: 'R$ 107,90' },
  { data: '01/07', preco: 112.60, precoFormatado: 'R$ 112,60' },
  { data: '01/08', preco: 115.30, precoFormatado: 'R$ 115,30' },
  { data: '01/09', preco: 119.80, precoFormatado: 'R$ 119,80' },
  { data: '01/10', preco: 124.50, precoFormatado: 'R$ 124,50' },
  { data: '01/11', preco: 128.90, precoFormatado: 'R$ 128,90' },
  { data: '01/12', preco: 135.75, precoFormatado: 'R$ 135,75' }
];

// Estatísticas calculadas:
// - Variação: +51.7% (de R$ 89,50 para R$ 135,75)
// - Tendência: 'alta'
// - Mínimo: R$ 89,50 | Máximo: R$ 135,75 | Médio: R$ 110,42
```

### Carta com Tendência de BAIXA (📉)
```javascript
const dadosGraficoBaixa = [
  { data: '01/01', preco: 245.80, precoFormatado: 'R$ 245,80' },
  { data: '01/02', preco: 238.90, precoFormatado: 'R$ 238,90' },
  { data: '01/03', preco: 232.15, precoFormatado: 'R$ 232,15' },
  // ... continua decrescendo
  { data: '01/12', preco: 178.90, precoFormatado: 'R$ 178,90' }
];

// Estatísticas calculadas:
// - Variação: -27.2% (de R$ 245,80 para R$ 178,90)
// - Tendência: 'baixa'
// - Mínimo: R$ 178,90 | Máximo: R$ 245,80 | Médio: R$ 211,03
```

### Carta com Tendência ESTÁVEL (📊)
```javascript
const dadosGraficoEstavel = [
  { data: '01/01', preco: 67.30, precoFormatado: 'R$ 67,30' },
  { data: '01/02', preco: 69.15, precoFormatado: 'R$ 69,15' },
  { data: '01/03', preco: 65.80, precoFormatado: 'R$ 65,80' },
  // ... oscila em torno do mesmo valor
  { data: '01/12', preco: 68.95, precoFormatado: 'R$ 68,95' }
];

// Estatísticas calculadas:
// - Variação: +2.5% (de R$ 67,30 para R$ 68,95)
// - Tendência: 'estavel'
// - Mínimo: R$ 65,80 | Máximo: R$ 71,40 | Médio: R$ 68,62
```

## Como Funciona a Geração Automática

Atualmente, o gráfico gera dados automaticamente baseado no ID da carta:

1. **Seed baseado no ID**: Usa `parseInt(carta.id)` como semente para consistência
2. **12 meses de dados**: Gera dados retroativos dos últimos 12 meses
3. **Variação controlada**: Aplica variações matemáticas baseadas na semente
4. **Preço final**: Garante que o último ponto seja sempre o preço atual da carta

## Funcionalidades do Gráfico

- **Dois tipos de visualização**: Linha e Área
- **Interativo**: Tooltip mostra data e preço ao passar o mouse
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Estatísticas**: Mostra mínimo, máximo e preço médio
- **Indicador de tendência**: Ícone e cor mudam conforme a tendência
- **Animação suave**: Transições entre tipos de gráfico

## Cores por Tendência

- **Alta** 📈: Verde (`#10b981`) - Indica crescimento
- **Baixa** 📉: Vermelho (`#dc2626`) - Indica queda  
- **Estável** 📊: Azul (`#3b82f6`) - Indica estabilidade

## Integração com a API

Para integrar com dados reais, você precisará:

1. Adicionar um campo `historico_precos` na API
2. Modificar a função `gerarDadosGrafico()` para usar dados reais
3. Manter a mesma estrutura de dados mostrada acima

O gráfico está totalmente funcional com dados mockados para demonstração!