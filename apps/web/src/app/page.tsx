import { WhatsappQrCode } from '@/components/WhatsappQr';
import { QueryWrapper } from '@/lib/query-wrapper';
import Link from 'next/link';

export default async function Home() {
  return (
    <>
      <h2 className="font-bold text-2xl uppercase my-4">Seja bem vindo</h2>
      <p className="text-opacity-70">
        Para acessar os relatorios mensais acesse{' '}
        <Link href={'/dashboard'} className="text-brand-bg underline">
          o dashboard
        </Link>
      </p>
      <hr />
      <p className="text-opacity-70">
        Seu whatsapp encontra-se desconectado, leia o qr code pelo celular e espere alguns minutos.
      </p>
      {/* <QueryWrapper>
      <WhatsappQrCode />
      </QueryWrapper> */}
    </>
  );
}
