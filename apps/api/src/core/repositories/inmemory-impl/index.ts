import { ChargeRepository } from "../charge-repository"
import { TeamRepository } from "../team-repository"
import { ChargeRepositoryInMemory } from "./charge-repository"
import { TeamRepositoryInMemory } from "./team-repository"

export const inMemoryRepositories = {
  teamRepository: TeamRepositoryInMemory.getInstance() as TeamRepository,
}