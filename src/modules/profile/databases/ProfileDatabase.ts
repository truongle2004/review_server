import { In, Repository } from 'typeorm'
import { AppDataSource } from '../../../config/data-source';
import { Profile, Gender } from '../../../entities/profile.entity';
import { Users } from '../../../entities/users.entity';
import { IProfileDatabase } from './IProfileDatabase';

export class ProfileDatabase implements IProfileDatabase {
  private userRepository: Repository<Users>;
  private profileRepository: Repository<Profile>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(Users);
    this.profileRepository = AppDataSource.getRepository(Profile);
  }

  async findUserInfoByUserId(userId: string): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async getProfileByProfileId(profileId: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    if (!profile) throw new Error('Profile not found');
    return profile;
  }

  async update(
    userId: string,
    phone?: string,
    bio?: string,
    profilePicture?: string,
    country?: string,
    gender?: string,
    birthday?: Date
  ): Promise<Profile> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (!user) throw new Error('User not found');

    let profile = user.profile || new Profile();

    if (bio !== undefined) profile.bio = bio;
    if (birthday !== undefined) profile.birthday = birthday;
    if (country !== undefined) profile.country = country;
    if (profilePicture !== undefined) profile.profile_picture = profilePicture;
    if (gender !== undefined) {
      profile.gender =
        gender === 'MALE' ? Gender.MALE :
        gender === 'FEMALE' ? Gender.FEMALE :
        Gender.OTHER;
    }
    if (phone !== undefined) {
      if (phone.length === 10) {
        profile.phone = phone;
      } else {
        throw new Error('Phone number must be 10 digits');
      }
    }

    await this.profileRepository.save(profile);

    if (!user.profile) {
      user.profile = profile;
      await this.userRepository.save(user);
    }

    return profile;
  }

  async findUsersWithProfiles(userIds: string[]): Promise<Users[]> {
    return this.userRepository.find({
      where: { id: In(userIds) },
      relations: ['profile'],
    });
  }
}
