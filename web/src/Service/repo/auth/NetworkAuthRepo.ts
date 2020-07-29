import AuthRepo from './AuthRepo'
import UserDto from '../../../DTO/UserDto'
import RestClient from '../restclient/RestClient'
import HttpMethod from '../restclient/HttpMethod'
import BooleanDto from '../../../DTO/BooleanDto'
import StorageRepo from './StorageRepo'

class NetworkAuthRepo implements AuthRepo {
  private restClient: RestClient
  private storageRepo: StorageRepo

  constructor(restClient: RestClient, localStorageRepo: StorageRepo) {
    this.restClient = restClient
    this.storageRepo = localStorageRepo
  }

  login(username: string, password: string): Promise<UserDto> {
    return this.preLogin()
      .then(() => this.loginWithCSRF(username, password))
      .then(user => this.storageRepo.saveUser(user))
  }

  preLogin(): Promise<BooleanDto> {
    const path = '/pre-login'
    const options = {
      method: HttpMethod.GET,
      credentials: 'include'
    }

    return this.restClient.fetchJson(path, options)
  }

  loginWithCSRF(username: string, password: string): Promise<UserDto> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const path = '/login'
    const options = {
      method: HttpMethod.POST,
      credentials: 'include',
      body: formData
    }

    return this.restClient.fetchJson(path, options)
  }

  logout(): Promise<BooleanDto> {
    const path = '/logout'
    const options = {
      method: HttpMethod.POST,
      credentials: 'include'
    }

    return this.restClient
      .fetchJson(path, options)
      .then(() => this.storageRepo.deleteUser())
  }

  currentUsername(): Promise<string> {
    return this.storageRepo.getUsername()
  }
}

export default NetworkAuthRepo