/* eslint-disable @next/next/no-img-element */
'use client';

import { useWhatsAppQr } from "@/services/queries/use-whatsapp-qr";

export const WhatsappQrCode = () => {
  const {data} = useWhatsAppQr(true)

  console.log({data})
  
  return (
   <>
        <p className="text-opacity-70">
        Seu whatsapp encontra-se desconectado, leia o qr code pelo celular e espere alguns minutos.
      </p>
      <img src={data?.image} alt="" />
   </>
  );
};
