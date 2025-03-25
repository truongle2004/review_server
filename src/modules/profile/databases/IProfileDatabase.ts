import { Profile } from '../../../entities/profile.entity'

export interface IProfileDatabase {
  update(
    userId: string,
    phone: string,
    bio: string,
    profilePicture: string,
    country: string,
    gender: string,
    birthday:Date 
  ): Promise<Profile>
}
