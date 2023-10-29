import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"

enum Status {
  STOPPED, 
  STARTING, 
  SCAN_QR_CODE, 
  WORKING, 
  FAILED
}

type IStatus = keyof typeof Status

interface SuccessRequest {
  me: {
    id: string
    pushName: string
  } | null
  status: IStatus
}
// interface SuccessRequest {
//   id: string
//   pushName: string
// }

interface FailRequest {
  error: string
  message: string
}

interface Params {
  enabled?: boolean
}

const fetchWhatsAppSession= async () => {
  const res = await axios.get<SuccessRequest>('http://localhost:4000/dev/admin/session')
  return res.data
}

const useWhatsAppSession = (enabled: boolean) => {
  return useQuery<SuccessRequest, AxiosError<FailRequest>>(['wp-session'], fetchWhatsAppSession, {
    retry: 3,
    retryDelay: 800,
    staleTime: 30,
    cacheTime: 1000 * 60 * 60 * 12, // 12 hours
    ...(enabled && {
      refetchIntervalInBackground: true,
      refetchInterval: 3000
    })
  })
}

export { useWhatsAppSession, fetchWhatsAppSession }
