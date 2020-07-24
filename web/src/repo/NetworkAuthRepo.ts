import AuthRepo from './AuthRepo'
import User from '../dto/User'
import FetchWrapper from './FetchWrapper'
import HttpMethod from './HttpMethod'

class NetworkAuthRepo implements AuthRepo {
  private fetchWrapper: FetchWrapper

  constructor(fetchWrapper: FetchWrapper) {
    this.fetchWrapper = fetchWrapper
  }

  login(username: string, password: string): Promise<User> {
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
}

export default NetworkAuthRepo