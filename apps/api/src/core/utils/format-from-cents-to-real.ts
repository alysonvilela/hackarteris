export function formatCentsToReal(centsValues: number) {
  const valorEmReais = centsValues / 100; // Convertendo centavos para reais
  const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatoReal.format(valorEmReais);
}