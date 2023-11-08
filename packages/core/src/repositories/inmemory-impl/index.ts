import { TeamRepository } from "../team-repository"
import { TeamRepositoryInMemory } from "./team-repository"

export const inMemoryRepositories = {
  teamRepository: TeamRepositoryInMemory.getInstance() as TeamRepository,
}