import { sql } from "src/adapters/postgres";
import { Charge as EntityCharge } from "../../domains/charge";
import { pgError } from "src/utils/pg-error";
import { ChargeTeamMembersRepository } from "../charge-team-member-repository";
import { Team as EntityTeam } from "src/core/domains/team";
import { Member as EntityMember} from "src/core/domains/members";

interface Charge {
  id: string;
  owner_id: string;
  svs_name: string;
  svs_value_in_cents: number;
  demand_day: string;
  custom_message: null | string;
  created_at: string;
  updated_at: null | string;
  deleted_at: null | string;
}

interface Team {
  id: string;
  charge_id: string;
  created_at: string;
  updated_at: null | string;
}

interface Member {
  id: string;
  phone: string;
  added_at: string;
  deleted_at: null | string;
  team_id: string;
}

interface CombinedData {
  charge_json: Charge;
  team_json: Team;
  member_json: Member;
}


type OutputAdapter = EntityCharge

class PgAdapter {
  static filterData(inputData: CombinedData[]): OutputAdapter[] {
      const uniqueCharges = inputData.filter((item, index, arr) => 
          arr.findIndex(t => t.charge_json.id === item.charge_json.id) === index
      );

      return uniqueCharges.map(chargeItem => {
          const teamItems = inputData.filter(item => item.team_json.charge_id === chargeItem.charge_json.id);
          const members = teamItems.map(item => new EntityMember({
            added_at: item.member_json.added_at,
            deleted_at: item.member_json.deleted_at,
            phone: item.member_json.phone,
            team_id: item.member_json.team_id
          }, item.member_json.id));

          const charge = new EntityCharge({
            owner_id: chargeItem.charge_json.owner_id,
            demand_day: chargeItem.charge_json.demand_day,
            created_at: chargeItem.charge_json.created_at,
            deleted_at: chargeItem.charge_json.demand_day,
            service: {
              name: chargeItem.charge_json.svs_name,
              value: chargeItem.charge_json.svs_value_in_cents,
            },
            updated_at: chargeItem.charge_json.updated_at,
            custom_message: chargeItem.charge_json.custom_message,
            team: new EntityTeam({
              charge_id: chargeItem.team_json.charge_id,
              created_at: chargeItem.team_json.created_at,
              members: members,
              updated_at: chargeItem.team_json.updated_at
            }, chargeItem.team_json.id)
          },
          chargeItem.charge_json.id)
          
          return charge
      });
  }
}



export class ChargeTeamMembersRepositoryPg
  implements ChargeTeamMembersRepository
{
  private static instance: ChargeTeamMembersRepositoryPg;

  private constructor() {}

  static getInstance(): ChargeTeamMembersRepositoryPg {
    if (!ChargeTeamMembersRepositoryPg.instance) {
      ChargeTeamMembersRepositoryPg.instance =
        new ChargeTeamMembersRepositoryPg();
    }

    return ChargeTeamMembersRepositoryPg.instance;
  }

  async queryAllByOwnerId(ownerId: string): Promise<EntityCharge[]> {
    try {
      const result = await sql`
      select row_to_json(charge.*) AS charge_json, row_to_json(team.*) AS team_json, row_to_json(member.*) as member_json
      from charge
      join team ON charge.id = team.charge_id
      join member ON team.id = member.team_id
      where charge.owner_id = ${ownerId}
      `;

      const charges = PgAdapter.filterData(result as unknown as CombinedData[])


      return charges;
    } catch (err) {
      console.error(pgError(this.queryAllByOwnerId.name), err);
      return null;
    }
  }
}
