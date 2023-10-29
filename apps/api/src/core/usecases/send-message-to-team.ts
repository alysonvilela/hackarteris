import { TeamRepository } from "../repositories/team-repository";
import { makeMessage } from "../../utils/make-message";
import { HttpClient } from "../../adapters/http-client";
import { WorkReflectorRepository } from "../repositories/work-reflector-repository";
import { ResourceNotFound } from "../errors/not-found";

interface SendMessageToTeamRequest {
  work_id: string;
  team_id: string;
}

interface RegisterTeamResponse {
  body?: ResourceNotFound;
  status: 200 | 404 | 500;
}
export class SendMessageToTeamUseCase {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly workReflectorRepository: WorkReflectorRepository,
    private readonly teamRepository: TeamRepository
  ) {}

  async execute(req: SendMessageToTeamRequest): Promise<RegisterTeamResponse> {
    try {
      const existantTeam = await this.teamRepository.queryById(req.team_id);

      if (!existantTeam) {
        return {
          status: 404,
          body: new ResourceNotFound(),
        };
      }

      const work = await this.workReflectorRepository.queryByWorkId(
        req.work_id
      );
      
      if (!work) {
        return {
          status: 404,
          body: new ResourceNotFound(),
        };
      }

      await this.httpClient.request.post(
        `${
          process.env.WHATSAPP_BASE_URL ?? "http://localhost:3002"
        }/api/sendText`,
        {
          chatId: existantTeam?.flatted.wp_group_id,
          text: makeMessage({ work }),
          session: "default",
        }
      );

      return {
        status: 200,
      };
    } catch (err) {
      console.log({ err });
      return {
        status: 500,
      };
    }
  }
}
