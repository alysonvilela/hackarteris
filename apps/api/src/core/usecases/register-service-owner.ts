import { Flatted } from "../base/entity";
import { IServiceOwner, ServiceOwner } from "../domains/service-owner";
import { ConflictError } from "../errors/conflict-error";
import { ServiceOwnerRepository } from "../repositories/service-owners-repository";

interface UsecaseResquest {
  name: string;
  phone: string;
  pixKey: string;
}

interface UsecaseResponse {
  body?: Flatted<IServiceOwner> | ConflictError
  status: 201 | 409;
}

export class RegisterServiceOwnerUseCase {
  constructor(
    private readonly serviceOwnersRepository: ServiceOwnerRepository
  ) {}

  async execute(req: UsecaseResquest): Promise<UsecaseResponse> {
    const existing = await this.serviceOwnersRepository.queryByPhone(req.phone);

    if (existing) {
      return {
        status: 409,
        body: new ConflictError()
      };
    }

    const owner = ServiceOwner.create({
      name: req.name,
      phone: req.phone,
      pix_key: req.pixKey,
    });

    await this.serviceOwnersRepository.register(owner);

    return {
      body: owner.flatted,
      status: 201,
    };
  }
}
