import { ChargeRepository } from "../charge-repository"
import { ServiceOwnerRepository } from "../service-owners-repository"
import { TeamRepository } from "../team-repository"
import { ChargeRepositoryInMemory } from "./charge-repository"
import { ServiceOwnerRepositoryInMemory } from "./service-owners-repository"
import { TeamRepositoryInMemory } from "./team-repository"

export const inMemoryRepositories = {
  serviceOwnerRepository: ServiceOwnerRepositoryInMemory.getInstance() as ServiceOwnerRepository,
  chargeRepository: ChargeRepositoryInMemory.getInstance() as ChargeRepository,
  teamRepository: TeamRepositoryInMemory.getInstance() as TeamRepository,
}