import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"

interface SuccessRequest {
  image: string
}

interface FailRequest {
  error: string
  message: string
}

const fetchWhatsAppQr= async () => {
  const res = await axios.get<SuccessRequest>('http://localhost:4000/dev/admin/qr')
  return res.data
}

const useWhatsAppQr = (enabled: boolean) => {
  return useQuery<SuccessRequest, AxiosError<FailRequest>>(['auth-wp'], fetchWhatsAppQr, {
    retry: 5,
    retryDelay: 30000,
    enabled,
  })
}

export { useWhatsAppQr, fetchWhatsAppQr }
