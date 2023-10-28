import { ServiceOwner } from "../domains/service-owner";

export abstract class ServiceOwnerRepository {
  abstract queryByPhone(phone: string): Promise<ServiceOwner | null>
  abstract queryById(id: string): Promise<ServiceOwner | null>
  abstract register(serviceOwner: ServiceOwner): Promise<ServiceOwner | null>
}