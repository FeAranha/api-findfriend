import { Prisma, ONG } from "@prisma/client";
import { OngsRepository } from "../ongs-repository";

export class InMemoryOngsRepository implements OngsRepository {
  public items: ONG[] = []

  async findById(id: string) {
    const ong = this.items.find(item => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByEmail(email: string): Promise<ONG | null> {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async create(data: Prisma.ONGCreateInput): Promise<ONG> {
    const ong = {
      id: 'ong-1',
      name: data.name,
      email: data.email,
      phone: data.phone,
      cep: data.cep,
      street: data.cep,
      number: data.number,
      city: data.city,
      country: data.country,
      avatar: null,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(ong)

    return ong
  }
}