import { AppDataSource } from '../../../config/data-source'
import { Gender, Profile } from '../../../entities/profile.entity'
import { Users } from '../../../entities/users.entity'
import { IProfileDatabase } from './IProfileDatabase'

export class ProfileDatabase implements IProfileDatabase {
  async update(
    userId: string,
    phone?: string,
    bio?: string,
    profilePicture?: string,
    country?: string,
    gender?: string,
    birthday?: Date
  ): Promise<Profile> {
    const profileRepo = AppDataSource.getRepository(Profile)
    const userRepo = AppDataSource.getRepository(Users)

    // Kiểm tra xem user có tồn tại không
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ['profile']
    })
    if (!user) throw new Error('User not found')

    let profile = user.profile

    if (!profile) {
      profile = new Profile()
    }

    // Chỉ cập nhật nếu dữ liệu không bị rỗng
    if (bio !== undefined) profile.bio = bio
    if (birthday !== undefined) profile.birthday = birthday
    if (country !== undefined) profile.country = country
    if (profilePicture !== undefined) profile.profile_picture = profilePicture
    if (gender !== undefined) {
      if (gender === 'MALE') profile.gender = Gender.MALE
      else if (gender === 'FEMALE') profile.gender = Gender.FEMALE
      else profile.gender = Gender.OTHER
    }
    if (phone !== undefined) {
      if (phone.length == 10) {
        profile.phone = phone
      } else throw new Error('Phone number must be 10 digits')

    }

    // Lưu profile
    await profileRepo.save(profile)

    // Gán profile vào user nếu là lần đầu
    if (!user.profile) {
      user.profile = profile
      await userRepo.save(user)
    }

    return profile
  }
}
