import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterOngUseCase } from './registerONG'
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository'
import { AlreadyExistsError } from './errors/already-exists-error'

describe('Register ONG Use Case', () => {
  it('should to register', async () => {
    const ongsRepository = new InMemoryOngsRepository()
    const registerUseCase = new RegisterOngUseCase(ongsRepository)

    const { ong } = await registerUseCase.execute({
      name: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '123456789',
      cep: '123456789123',
      city: 'tal',
      country: 'aquele',
      number: 3,
      street: 'fulano'
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should hash ong password upon registration', async () => {
    const ongsRepository = new InMemoryOngsRepository()
    const registerUseCase = new RegisterOngUseCase(ongsRepository)

    const { ong } = await registerUseCase.execute({
      name: 'john Doe',
      email: 'johndoe@email.com',
      password: '123456',
      phone: '123456789',
      cep: '123456789123',
      city: 'tal',
      country: 'aquele',
      number: 3,
      street: 'fulano'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      ong.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const ongsRepository = new InMemoryOngsRepository()
    const registerUseCase = new RegisterOngUseCase(ongsRepository)

    const email = 'johndoe@exemple.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
      phone: '123456789',
      cep: '123456789123',
      city: 'tal',
      country: 'aquele',
      number: 3,
      street: 'fulano'
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
        phone: '123456789',
        cep: '123456789123',
        city: 'tal',
        country: 'aquele',
        number: 3,
        street: 'fulano'
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError)
  })
})