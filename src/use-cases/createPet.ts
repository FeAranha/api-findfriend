import { Pet, PetImages, Prisma } from '@prisma/client'
import { PetsRepository } from '@/repositories/pet-repository'

interface createPetUseCaseRequest {
  ong_id: string
  name: string
  description: string
  age: number
  specie: 'dog' | 'cat'
  gender: 'male' | 'female'
  size: number
  energy: number
  independence: number,
  user_id?: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) { }
  async execute({
    ong_id,
    user_id,
    name,
    description,
    age,
    specie,
    gender,
    size,
    energy,
    independence,
  }: createPetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    if (!ong_id) {
      throw new Error('OngId é obrigatório')
    }
    const pet = await this.petsRepository.create({
      ong: { connect: { id: ong_id } },
      name,
      description,
      age,
      specie,
      gender,
      size,
      energy,
      independence,
      user: { connect: { id: user_id } },
    })
    return { pet }
  }
}