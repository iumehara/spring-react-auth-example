import NetworkAuthRepo from './NetworkAuthRepo'
import FetchWrapper from './FetchWrapper'

class SpyFetchWrapper implements FetchWrapper {
  fetchJson_arg_path: string = ""
  fetchJson_arg_options: any = {}

  fetchJson(path: string, options: {}): Promise<any> {
    this.fetchJson_arg_path = path
    this.fetchJson_arg_options = options

    return Promise.resolve([]);
  }
}

describe('NetworkAuthRepo', () => {
  describe('login', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyFetchWrapper()
      const repo = new NetworkAuthRepo(fetchWrapper)


      repo.login('user1', 'secret1')


      const expectedBody = new FormData()
      expectedBody.append('username', 'user1')
      expectedBody.append('password', 'secret1')

      expect(fetchWrapper.fetchJson_arg_path).toEqual('/login')
      expect(fetchWrapper.fetchJson_arg_options).toEqual(
        {
          credentials: 'include',
          method: 'POST',
          body: expectedBody
        })
    })
  })

  describe('logout', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyFetchWrapper()
      const repo = new NetworkAuthRepo(fetchWrapper)


      repo.logout()


      expect(fetchWrapper.fetchJson_arg_path).toEqual('/logout')
      expect(fetchWrapper.fetchJson_arg_options).toEqual({credentials: 'include', method: 'GET'})
    })
  })
})