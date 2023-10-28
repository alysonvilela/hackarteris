import { ServiceOwner } from "src/core/domains/service-owner";
import { ServiceOwnerRepository } from "../service-owners-repository";
import { sql } from "src/adapters/postgres";
import { pgError } from "src/utils/pg-error";

export class ServiceOwnerRepositoryPg implements ServiceOwnerRepository {
  private static instance: ServiceOwnerRepositoryPg;

  private constructor() {}
  static getInstance(): ServiceOwnerRepositoryPg {
    if (!ServiceOwnerRepositoryPg.instance) {
      ServiceOwnerRepositoryPg.instance = new ServiceOwnerRepositoryPg();
    }

    return ServiceOwnerRepositoryPg.instance;
  }

  async queryByPhone(phone: string): Promise<ServiceOwner> {
    try {
      const result = await sql`
      SELECT * FROM service_owners WHERE phone = ${phone}
    `;

      if (!result.length) {
        return null
      }

      const pg = result[0] as {
        id: string;
        name: string;
        phone: string;
        pixKey: string;
        createdAt: string;
        updatedAt: string;
      };

      const serviceOwner = new ServiceOwner(
        {
          name: pg.name,
          created_at: pg.createdAt,
          phone: pg.phone,
          pix_key: pg.pixKey,
          updated_at: pg.updatedAt,
        },
        pg.id
      );

      return serviceOwner;
    } catch (err) {
      console.error(pgError(this.queryByPhone.name), err)
      return null
    }
  }

  async queryById(id: string): Promise<ServiceOwner> {
    try {
      const result = await sql`
      SELECT * FROM service_owners WHERE id = ${id}
    `;

    if (!result.length) {
      return null
    }

    const pg = result[0] as {
      id: string;
      name: string;
      phone: string;
      pixKey: string;
      createdAt: string;
      updatedAt: string;
    };

    const serviceOwner = new ServiceOwner(
      {
        name: pg.name,
        created_at: pg.createdAt,
        phone: pg.phone,
        pix_key: pg.pixKey,
        updated_at: pg.updatedAt,
      },
      pg.id
    );

    return serviceOwner;
    } catch(err) {
      console.error(pgError(this.queryById.name), err)
      return null
    }
  }

  async register(serviceOwner: ServiceOwner): Promise<ServiceOwner | null> {
    const { id, name, phone, pix_key, created_at, updated_at } = serviceOwner.flatted;

    try {
      await sql`
      INSERT INTO service_owners (id, user_name, phone, pix_key, created_at, updated_at)
      VALUES (${id}, ${name}, ${phone}, ${pix_key}, ${created_at}, ${updated_at})
    `;
    } catch (err) {
      console.error(pgError(this.register.name), err)
      return null
    }
  }
}
