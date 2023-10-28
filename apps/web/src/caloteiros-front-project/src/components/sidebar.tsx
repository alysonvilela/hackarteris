/* eslint-disable @next/next/no-img-element */
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Playlist } from "../data/playlists";
import { Calendar, History, Link, PlusIcon } from "lucide-react";
import { useWhatsAppQr } from "@/services/queries/use-whatsapp-qr";
import { useWhatsAppSession } from "@/services/queries/use-whatsapp-session";
import { Separator } from "./ui/separator";
import { useEffect, useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  const [enabled, setEnabled] = useState(true) // Move to zustand
  const {data: session, isFetched} = useWhatsAppSession(enabled)
  const {data: qr} = useWhatsAppQr(isFetched && session?.status === 'SCAN_QR_CODE')

  useEffect(() => {
    if(session?.me?.id) {
      setEnabled(false)
    }
  }, [session?.me])


  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Cobranças
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Agendadas
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <PlusIcon className="mr-2 h-4 w-4" />
              Adicionar cobrança
            </Button>
            {/* <Button variant="ghost" className="w-full justify-start">
            <History
                className="mr-2 h-4 w-4"
              />
              Enviadas
            </Button> */}
          </div>
          <div>
            <Separator className="my-4" />
            {!session?.me?.id ?
          <img src={qr?.image} alt="" className=""/>
           : <>
            <p className="text-xs">Conectado com: {session?.me?.pushName}</p>
            <p className="text-xs">Telefone: {session?.me?.id.slice(0, session?.me.id.length - 5)}</p>
           </>}
          </div>
        </div>
      </div>
    </div>
  );
}
