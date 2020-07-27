import AuthRepo from './AuthRepo'
import UserDto from '../dto/UserDto'
import FetchWrapper from './FetchWrapper'
import HttpMethod from './HttpMethod'
import BooleanDto from '../dto/BooleanDto'
import StorageRepo from './StorageRepo'

class NetworkAuthRepo implements AuthRepo {
  private fetchWrapper: FetchWrapper
  private storageRepo: StorageRepo

  constructor(fetchWrapper: FetchWrapper, localStorageRepo: StorageRepo) {
    this.fetchWrapper = fetchWrapper
    this.storageRepo = localStorageRepo
  }

  login(username: string, password: string): Promise<UserDto> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const path = '/login'
    const options = {
      method: HttpMethod.POST,
      credentials: 'include',
      body: formData
    }

    return this.fetchWrapper
      .fetchJson(path, options)
      .then(user => this.storageRepo.saveUser(user))
  }

  logout(): Promise<BooleanDto> {
    const path = '/logout'
    const options = {
      method: HttpMethod.GET,
      credentials: 'include'
    }

    return this.fetchWrapper
      .fetchJson(path, options)
      .then(() => this.storageRepo.deleteUser())
  }
}

export default NetworkAuthRepo