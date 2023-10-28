import Image from "next/image";

import { cn } from "@/utils/cn";

import { Service } from "../data/albums";
import { playlists } from "../data/playlists";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { DivideCircle, PlusCircleIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  service: Service;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function DashboardCard({
  service,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: DashboardCardProps) {
  const distribuitorValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0)
  const nonDistribuitorValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.value / 100 / service.team.length)
  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.value / 100)
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card>
          <CardHeader className="bg-neutral-100 bg-opacity-40 rounded-t-md">
          <div className="overflow-hidden flex gap-4 items-center">
                <Image
                  src={service?.cover}
                  alt={service.name}
                  width={width}
                  height={height}
                  className={cn(
                    "h-[48px] w-[48px] object-cover transition-all hover:scale-105 rounded-md border border-neutral-300",
                    aspectRatio === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-square"
                  )}
                />
                          <CardTitle className="text-sm">{service.name}</CardTitle>
              </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className={cn("", className)} {...props}>
            <div className="space-y-3 w-full">
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-500">Dia de envio</p>
                  <p className="text-sm text-muted-foreground">Todo dia 20</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-500">Integrantes</p>
                  <p className="text-sm text-muted-foreground">{service.team.length}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-500">Sua parte</p>
                  <p className="text-sm text-muted-foreground">{service.is_distribuitor ? distribuitorValue : nonDistribuitorValue}</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-500">Valor total</p>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </div>
              </div>
 
              {/* // TODO: Add actions like favorite services */}
              <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>

            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
    </ContextMenu>
  );
}