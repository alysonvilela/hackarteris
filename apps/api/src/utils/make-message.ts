import { formatCentsToReal } from "./format-from-cents-to-real";

interface MakeMessageParams {
  customMessage: string | null;
  serviceName: string;
  pixKey: string;
  value: number;
}
export const makeMessage = (params: MakeMessageParams) => `
${
  params.customMessage ??
  `Eai caloteiro, lembra do ${params.serviceName}? 
Entao, to aqui pra cobrar, COMEDIA!`
}

----
VALOR: ${formatCentsToReal(params.value)}
PIX: ${params.pixKey}
ATE HOJE MEMO, SE NAO DEPOSITAR OS CARA VAO BATER AI NA SUA PORTA
----

Grato
`;
