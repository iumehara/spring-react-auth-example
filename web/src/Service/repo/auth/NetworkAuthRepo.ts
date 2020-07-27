import AuthRepo from './AuthRepo'
import UserDto from '../../../DTO/UserDto'
import FetchWrapper from '../fetch/FetchWrapper'
import HttpMethod from '../fetch/HttpMethod'
import BooleanDto from '../../../DTO/BooleanDto'
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

  currentUsername(): Promise<string> {
    return this.storageRepo.getUsername()
  }
}

export default NetworkAuthRepo