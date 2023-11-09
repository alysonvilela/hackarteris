"use client"

import { QueryClientProvider } from "react-query"
import { queryClient } from "./react-query"

export const QueryWrapper = ({children}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    
  )
}