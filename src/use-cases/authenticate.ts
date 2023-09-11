import { UsersRepository } from '@/repositories/users-repository'
import { OngsRepository } from '@/repositories/ongs-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { User, ONG } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
  userType: 'user' | 'ong'
}

interface AuthenticateUseCaseResponse {
  authenticated: User | ONG
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private ongsRepository: OngsRepository,
  ) { }

  async execute({
    email,
    password,
    userType,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    let authenticated: User | ONG | null = null;

    if (userType === 'user') {
      authenticated = await this.usersRepository.findByEmail(email)
    } else if (userType === 'ong') {
      authenticated = await this.ongsRepository.findByEmail(email)
    }
    else {
      throw new InvalidCredentialsError()
    }

    if(!authenticated) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, authenticated.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      authenticated,
    }
  }
}