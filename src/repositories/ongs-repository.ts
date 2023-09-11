import { Prisma, ONG } from "@prisma/client"

export interface OngsRepository {
  findById(id: string): Promise<ONG | null>
  findByEmail(email: string): Promise<ONG | null>
  create(data: Prisma.ONGCreateInput): Promise<ONG>
}