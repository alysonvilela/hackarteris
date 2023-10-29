import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

type SuccessRequest = Charge[];

interface Charge {
  id: string;
  owner_id: string;
  demand_day: string;
  created_at: string;
  deleted_at: string;
  service: Service;
  updated_at?: any;
  custom_message?: any;
  team: Team;
}

interface Team {
  id: string;
  charge_id: string;
  created_at: string;
  members: Member[];
  updated_at?: any;
}

interface Member {
  id: string;
  added_at: string;
  deleted_at?: any;
  phone: string;
  team_id: string;
}

interface Service {
  name: string;
  value: number;
}

interface FailRequest {
  error: string;
  message: string;
}

const fetchUserCharges = async (userId: string) => {
  const res = await axios.get<SuccessRequest>(
    "http://localhost:4000/dev/charge/list",
    {
      headers: {
        "x-owner-id": userId,
      }
    }
  );
  return res.data;
};

const useUserCharges = (userId: string) => {
  return useQuery<SuccessRequest, AxiosError<FailRequest>>(
    ["user-charges", userId],
    () => fetchUserCharges(userId),
    {
      retry: 3,
      retryDelay: 30000,
    }
  );
};

export { useUserCharges, fetchUserCharges };
