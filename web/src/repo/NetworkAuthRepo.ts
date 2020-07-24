import AuthRepo from './AuthRepo'
import UserDto from '../dto/UserDto'
import FetchWrapper from './FetchWrapper'
import HttpMethod from './HttpMethod'
import BooleanDto from '../dto/BooleanDto'

class NetworkAuthRepo implements AuthRepo {
  private fetchWrapper: FetchWrapper

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper
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

    return this.fetchWrapper.fetchJson(path, options);
  }

  logout(): Promise<BooleanDto> {
    const path = '/logout'
    const options = {
      method: HttpMethod.GET,
      credentials: 'include'
    }

    return this.fetchWrapper.fetchJson(path, options);
  }
}

export default NetworkAuthRepo