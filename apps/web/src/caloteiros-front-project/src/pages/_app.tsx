import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {queryClient as reactQueryLibQueryClient} from '@/lib/react-query'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(reactQueryLibQueryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
