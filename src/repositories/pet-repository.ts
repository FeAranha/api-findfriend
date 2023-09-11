import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findAllByCityId(cityId: string, coutry: string): Promise<Pet[]>
  findById(petId: string): Promise<Pet | null>
  findByCharacteristics(age: number, energy: number, size: number, independence: number ): Promise<Pet[]>
  findBySpecie(specie: 'dog' | 'cat'): Promise<Pet[]>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  delete(id: string): Promise<void>
  update(id: string, data: Prisma.PetUpdateInput): Promise<Pet | null>
}