import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editProfile(editedProfile) {
    try {
      const res = await api.put('/account', editedProfile)
      logger.log('edited profile', res.data)
      AppState.account = res.data
      AppState.profile = res.data
    } catch (error) {
      logger.error('Unable to edit profile')
    }
  }
}

export const accountService = new AccountService()
