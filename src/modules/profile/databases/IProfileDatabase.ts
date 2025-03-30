import { Profile } from '../../../entities/profile.entity'
import { Users } from '../../../entities/users.entity'

export interface IProfileDatabase {
  update(
    userId: string,
    phone?: string,
    bio?: string,
    profilePicture?: string,
    country?: string,
    gender?: string,
    birthday?: Date
  ): Promise<Profile>

  getProfileByProfileId(profileId: string): Promise<Profile>

  findUserInfoByUserId(userId: string): Promise<Users>
 findUsersWithProfiles(userIds: string[]): Promise<Users[]>;
}
