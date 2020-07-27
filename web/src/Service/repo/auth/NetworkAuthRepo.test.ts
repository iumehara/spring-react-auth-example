import NetworkAuthRepo from './NetworkAuthRepo'
import BooleanDto from '../../../DTO/BooleanDto'
import UserDto from '../../../DTO/UserDto'
import {SpyFetchWrapper, StubFetchWrapper} from '../fetch/FetchWrapperDoubles'
import {SpyStorageRepo, StubStorageRepo} from './StorageRepoDoubles'

describe('NetworkAuthRepo', () => {
  describe('login', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyFetchWrapper()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


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

    test('handles response', async () => {
      const fetchWrapper = new StubFetchWrapper()
      fetchWrapper.fetchJson_response = new UserDto('user1')
      const storageRepo = new SpyStorageRepo()
      const repo = new NetworkAuthRepo(fetchWrapper, storageRepo)


      const user = await repo.login('user1', 'secret1')


      expect(storageRepo.saveUser_arg_user).toEqual(new UserDto('user1'))
      expect(user).toEqual(new UserDto('user1'))
    })
  })

  describe('logout', () => {
    test('makes correct request', () => {
      const fetchWrapper = new SpyFetchWrapper()
      const repo = new NetworkAuthRepo(fetchWrapper, new SpyStorageRepo())


      repo.logout()


      expect(fetchWrapper.fetchJson_arg_path).toEqual('/logout')
      expect(fetchWrapper.fetchJson_arg_options).toEqual({credentials: 'include', method: 'GET'})
    })

    test('handles response', async () => {
      const fetchWrapper = new StubFetchWrapper()
      fetchWrapper.fetchJson_response = true
      const storageRepo = new SpyStorageRepo()
      const repo = new NetworkAuthRepo(fetchWrapper, storageRepo)


      const response = await repo.logout()


      expect(storageRepo.deleteUser_wasCalled).toEqual(true)
      expect(response).toEqual(new BooleanDto(true))
    })
  })

  describe('currentUsername', () => {
    test('returns correct data', async() => {
      const fetchWrapper = new StubFetchWrapper()
      const storageRepo = new StubStorageRepo()
      storageRepo.getUsername_returnValue = 'Amy'
      const repo = new NetworkAuthRepo(fetchWrapper, storageRepo)


      const username = await repo.currentUsername()


      expect(username).toEqual('Amy')
    })
  })
})
