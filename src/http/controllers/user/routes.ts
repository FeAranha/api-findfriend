import { FastifyInstance } from 'fastify'
import { register } from '@/http/controllers/user/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}