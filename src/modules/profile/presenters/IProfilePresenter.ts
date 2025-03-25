import { UpdateProfileResponseData } from '../response/UpdateProfileResponseData'

export interface IProfilePresenter {
  updateProfilePresenter(data: UpdateProfileResponseData): void
  getUpdateProfileViewModel(): UpdateProfileResponseData
}
