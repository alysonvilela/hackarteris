import { Menu } from "@/components/menu"
import { Sidebar } from "@/components/sidebar"
import { playlists } from "@/data/playlists"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import Image from "next/image"
import { PlusCircleIcon } from "lucide-react"
import { madeForYouAlbums } from "@/data/albums"
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder"
import { DashboardCard } from "@/components/dashboard-cards"
import { useUserCharges } from "@/services/queries/use-user-charges"

export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export function MusicPage() {
  const {data} = useUserCharges('01HC3ETBH0ZD5R3WDDYJY0BTQC')

  console.log({data})

  return (
    <main>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        {/* <Menu /> */}
        <div className="border-t">
          <div className="bg-background ">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block min-h-[calc(100vh)] max-h-[calc(100vh_-_41px)]" />
              {/* <Sidebar playlists={playlists} className="hidden lg:block min-h-[calc(100vh_-_41px)] max-h-[calc(100vh_-_41px)]" /> */}
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircleIcon className="mr-2 h-4 w-4" />
                          Adicionar cobrança
                        </Button>
                      </div>
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Suas cobranças agendadas
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Your personal playlists. Updated daily.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                          <div className="flex flex-wrap gap-4 pb-4">
                            {data?.map((charge) => (
                              <DashboardCard
                                key={charge.service.name}
                                service={{
                                  name: charge.service.name,
                                  is_distribuitor: false,
                                  team: charge.team.members.map((i) => i.phone),
                                  value: charge.service.value,
                                  cover: 'https://images.unsplash.com/photo-1696351145352-043b9cc77a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1895&q=80'
                                }}
                                className="w-[300px]"
                                aspectRatio="square"
                                width={80}
                                height={80}
                              />
                            ))}
                          </div>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
