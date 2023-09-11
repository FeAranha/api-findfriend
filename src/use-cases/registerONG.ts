import { OngsRepository } from '@/repositories/ongs-repository'
import { hash } from 'bcryptjs'
import { AlreadyExistsError } from './errors/already-exists-error'
import { ONG } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  cep: string
  street: string
  number: number
  city: string
  country: string
}

interface RegisterUseCaseResponse {
  ong: ONG
}

export class RegisterOngUseCase {
  constructor(private ongsRepository: OngsRepository) { }

  async execute({ name, email, password, phone, cep, city, country, number, street }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const ongWithSameEmail = await this.ongsRepository.findByEmail(email)

    if (ongWithSameEmail) {
      throw new AlreadyExistsError()
    }

    const ong = await this.ongsRepository.create({
      name,
      email,
      password_hash,
      cep,
      street,
      number,
      city,
      country,
      phone,
    })

    return { ong }
  }
}