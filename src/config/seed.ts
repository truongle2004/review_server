import { AppDataSource } from './data-source'
import { Users, Role, Status } from '../entities/users.entity'
import { hashPassword } from '../utils/utils'

export async function seedDefaultUsers() {
  try {
    const userRepository = AppDataSource.getRepository(Users)

    // Check if admin exists
    const adminExists = await userRepository.findOne({
      where: { email: 'admin@example.com' }
    })

    // Check if default user exists
    const userExists = await userRepository.findOne({
      where: { email: 'user@example.com' }
    })

    if (!adminExists) {
      const adminPassword = await hashPassword('admin123')
      const admin = new Users(
        '00000000-0000-0000-0000-000000000001',
        'admin',
        'admin@example.com',
        adminPassword,
        Status.ACTIVE,
        Role.ADMIN,
        []
      )
      await userRepository.save(admin)
      console.log('Default admin account created')
    }

    if (!userExists) {
      const userPassword = await hashPassword('user123')
      const user = new Users(
        '00000000-0000-0000-0000-000000000002',
        'user',
        'user@example.com',
        userPassword,
        Status.ACTIVE,
        Role.USER,
        []
      )
      await userRepository.save(user)
      console.log('Default user account created')
    }
  } catch (error) {
    console.error('Error seeding default users:', error)
  }
}
