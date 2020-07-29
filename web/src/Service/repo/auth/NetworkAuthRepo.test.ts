import NetworkAuthRepo from './NetworkAuthRepo'
import BooleanDto from '../../../DTO/BooleanDto'
import UserDto from '../../../DTO/UserDto'
import {SpyRestClient, StubRestClient} from '../restclient/RestClientDoubles'
import {SpyStorageRepo, StubStorageRepo} from './StorageRepoDoubles'

describe('NetworkAuthRepo', () => {
  describe('preLogin', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


      repo.preLogin()


      expect(fetchWrapper.fetchJson_arg_path.length).toEqual(1)
      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/pre-login')
    })
  })

  describe('loginWithCSRF', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


      repo.loginWithCSRF('user1', 'secret1')


      const expectedBody = new FormData()
      expectedBody.append('username', 'user1')
      expectedBody.append('password', 'secret1')

      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/login')
      expect(fetchWrapper.fetchJson_arg_options[0]).toEqual(
        {
          credentials: 'include',
          method: 'POST',
          body: expectedBody
        })
    })
  })

  describe('login', () => {
    test('makes correct requests', async () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


      await repo.login('user1', 'secret1')


      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/pre-login')
      expect(fetchWrapper.fetchJson_arg_options[0]).toEqual({method: 'GET', credentials: 'include'})

      const expectedBody = new FormData()
      expectedBody.append('username', 'user1')
      expectedBody.append('password', 'secret1')
      expect(fetchWrapper.fetchJson_arg_path[1]).toEqual('/login')
      expect(fetchWrapper.fetchJson_arg_options[1]).toEqual({
        credentials: 'include',
        method: 'POST',
        body: expectedBody
      })
    })

    test('handles response', async () => {
      const restClient = new StubRestClient()
      restClient.fetchJson_response = new UserDto('user1')
      const storageRepo = new SpyStorageRepo()
      const repo = new NetworkAuthRepo(restClient, storageRepo)


      const user = await repo.login('user1', 'secret1')


      expect(storageRepo.saveUser_arg_user).toEqual(new UserDto('user1'))
      expect(user).toEqual(new UserDto('user1'))
    })
  })

  describe('logout', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyRestClient()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


      repo.logout()


      expect(fetchWrapper.fetchJson_arg_path[0]).toEqual('/logout')
      expect(fetchWrapper.fetchJson_arg_options[0]).toEqual({credentials: 'include', method: 'POST'})
    })

    test('handles response', async () => {
      const fetchWrapper = new StubRestClient()
      fetchWrapper.fetchJson_response = true
      const storageRepo = new SpyStorageRepo()
      const repo = new NetworkAuthRepo(fetchWrapper, storageRepo)


      const response = await repo.logout()


      expect(storageRepo.deleteUser_wasCalled).toEqual(true)
      expect(response).toEqual(new BooleanDto(true))
    })
  })

  describe('currentUsername', () => {
    test('returns correct data', async () => {
      const fetchWrapper = new StubRestClient()
      const storageRepo = new StubStorageRepo()
      storageRepo.getUsername_returnValue = 'Amy'
      const repo = new NetworkAuthRepo(fetchWrapper, storageRepo)


      const username = await repo.currentUsername()


      expect(username).toEqual('Amy')
    })
  })
})
