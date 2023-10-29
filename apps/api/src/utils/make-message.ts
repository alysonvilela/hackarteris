import { Work } from "../core/domains/work";
import { formatCentsToReal } from "./format-from-cents-to-real";

interface MakeMessageParams {
  work: Work;
}

const translateStatus = {
  'DAMAGE': 'Danificado / Vandalizado',
  'LOW_REFLETANCE': 'Baixa refletancia',
}

const translateColors = {
  "YELLOW": "Amarelo",
  "WHITE": "Branco",
  "BROWN": "Marrom",
  "GREEN": "Verde",
  "RED": "Vermelho",
  "BLUE": "Azul"
}

const translateDirection = {
  "NORTH": "Norte",
  "SOUTH": "SUL"
}

export const makeMessage = (params: MakeMessageParams) => { 
  if(params.work.flatted.status === 'OK') return

  return `
*ALERTA DE OCORRÊNCIA*

*Status*: ${translateStatus[params.work.flatted.status]}
*Kilômetro da Placa*: ${params.work.flatted.reflector?.flatted.kilometer_position ?? '- Procurar no app -'}
*Cores a serem trocadas*: ${params.work.flatted.reflector?.flatted.measurements
  .reduce((prev, curr) => `${prev ? `${prev},` : ''} ${translateColors[curr.flatted.color]}`, '')}
*Direção do Percurso*: ${translateDirection[params.work.flatted.reflector?.flatted.direction!]}

*Link de resolucao*: http://localhost:3000/dashboard/issues/${params.work.id}

Por favor, atendam a esta ocorrência o mais rápido possível.
`;
};


