import NetworkRestClient, {CookieKey} from './NetworkRestClient'
import SpyFetchWrapper from '../../wrapper/SpyFetchWrapper'
import StubDocumentWrapper from '../../wrapper/StubDocumentWrapper'

describe('NetworkRestClient', () => {

  describe('fetchJson', () => {
    it('calls fetch with correct url and options', () => {
      process.env.REACT_APP_SERVER_URL = 'testurl'
      const fetchWrapper = new SpyFetchWrapper()
      const documentWrapper = new StubDocumentWrapper()
      const restClient = new NetworkRestClient(fetchWrapper, documentWrapper)


      restClient.fetchJson('/path', {method: 'GET'})


      expect(fetchWrapper.callFetch_arg_url).toEqual('testurl/path')
      const expectedOptions = {
        method: 'GET',
        headers: {'X-XSRF-TOKEN': 'stub-xsrf-token'}
      }
      expect(fetchWrapper.callFetch_arg_option).toEqual(expectedOptions)
    })
  })

  describe('getCookieForKey', () => {
    test('value exists', () => {
      const documentWrapper = new StubDocumentWrapper()
      const restClient = new NetworkRestClient(new SpyFetchWrapper(), documentWrapper)


      const cookie = restClient.getCookieForKey(CookieKey.XSRF_TOKEN)


      expect(cookie).toEqual('stub-xsrf-token')
    })

    test('value does not exist', () => {
      const documentWrapper = new StubDocumentWrapper()
      documentWrapper.cookie_returnValue = ""
      const restClient = new NetworkRestClient(new SpyFetchWrapper(), documentWrapper)


      const cookie = restClient.getCookieForKey(CookieKey.XSRF_TOKEN)


      expect(cookie).toEqual(null)
    })
  })
})
