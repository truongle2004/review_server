import { IProfileDatabase } from '../databases/IProfileDatabase'
import { IProfilePresenter } from '../presenters/IProfilePresenter'
import { UpdateProfileRequestData } from '../request/UpdateProfileRequestData'
import { IProfileService } from './IProfileService'
import { UpdateProfileResponseData } from '../response/UpdateProfileResponseData'

export class ProfileService implements IProfileService {
  _profilePresenter: IProfilePresenter
  _profileDatabase: IProfileDatabase
  constructor(
    createCommentPresenter: IProfilePresenter,
    createCommentDatabase: IProfileDatabase
  ) {
    this._profilePresenter = createCommentPresenter
    this._profileDatabase = createCommentDatabase
  }
  async update(data: UpdateProfileRequestData): Promise<void> {
    const { userId, phone, bio, profilePicture, country, gender, birthday } =
      data.data
    try {
      await this._profileDatabase.update(
        userId,
        phone,
        bio,
        profilePicture,
        country,
        gender,
        birthday
      )
      const resData = new UpdateProfileResponseData(200, 'Update success', {})
      await this._profilePresenter.updateProfilePresenter(resData)
      return
    } catch (error) {
      const resData = new UpdateProfileResponseData(
        400,
        (error as Error).message,
        {}
      )
      await this._profilePresenter.updateProfilePresenter(resData)
      return
    }
  }
}
