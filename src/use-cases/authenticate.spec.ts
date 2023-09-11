import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryOngsRepository } from '@/repositories/in-memory/in-memory-ongs-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let ongsRepository: InMemoryOngsRepository;
let userAuthenticateUseCase: AuthenticateUseCase;
let ongAuthenticateUseCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    ongsRepository = new InMemoryOngsRepository();
    
    userAuthenticateUseCase = new AuthenticateUseCase(usersRepository,ongsRepository);
    ongAuthenticateUseCase = new AuthenticateUseCase(usersRepository, ongsRepository);
  });

  it('should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    });

    const { authenticated } = await userAuthenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
      userType: 'user',
    });

    expect(authenticated.id).toEqual(expect.any(String));
  });

  it('should be able to authenticate ong', async () => {
    await ongsRepository.create({
      name: 'My ONG',
      email: 'myong@example.com',
      password_hash: await hash('password123', 6),
      phone: '123456788',
      cep: '12345678',
      city: 'lala',
      country: 'la ele',
      number: 1,
      street: 'rua',

    });

    const { authenticated } = await ongAuthenticateUseCase.execute({
      email: 'myong@example.com',
      password: 'password123',
      userType: 'ong',
    });

    expect(authenticated.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate user with wrong email', async () => {
    await expect(() =>
      userAuthenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: '123456',
        userType: 'user',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate ong with wrong email', async () => {
    await expect(() =>
      ongAuthenticateUseCase.execute({
        email: 'myong@example.com',
        password: 'wrongpassword',
        userType: 'ong',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate user with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '123456789',
    });

    await expect(() =>
      userAuthenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
        userType: 'user',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate ong with wrong password', async () => {
    await ongsRepository.create({
      name: 'My ONG',
      email: 'myong@example.com',
      password_hash: await hash('password123', 6),
      phone: '123456788',
      cep: '12345678',
      city: 'lala',
      country: 'la ele',
      number: 1,
      street: 'rua',
    });

    await expect(() =>
      ongAuthenticateUseCase.execute({
        email: 'myong@example.com',
        password: 'wrongpassword',
        userType: 'ong',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
