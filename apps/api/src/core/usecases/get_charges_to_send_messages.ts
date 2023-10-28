import { ChargeRepository } from "../repositories/charge-repository";
import { formatDateToCron } from "../../utils/format-date-to-cron"

export class GetChargesToSendMessagesUseCase {
  constructor(
    private readonly queue: any, // TODO - Implement queue
    private readonly chargeRepository: ChargeRepository
  ) {}

  async execute(): Promise<void> {
    const date = formatDateToCron(new Date())
    const chargesIds = await this.chargeRepository.queryAllChargeIdsByDemandDay(date)

    await this.queue.notify('CHARGES_TO_SEND_MESSAGES', chargesIds)
  }
}
