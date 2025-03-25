import { UpdateCommentResponseData } from '../../comment/response/UpdateCommnetResponseData'
import { UpdateProfileResponseData } from '../response/UpdateProfileResponseData'
import { IProfilePresenter } from './IProfilePresenter'

export class ProfilePresenter implements IProfilePresenter {
  updateProfileViewModel!: UpdateProfileResponseData 

  updateProfilePresenter(data: UpdateCommentResponseData): void {
    this.updateProfileViewModel = data
  }

  getUpdateProfileViewModel() {
    return this.updateProfileViewModel
  }
}
