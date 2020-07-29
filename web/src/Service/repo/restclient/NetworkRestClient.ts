import RestClient from './RestClient'
import FetchWrapper from '../../wrapper/FetchWrapper'
import DocumentWrapper from '../../wrapper/DocumentWrapper'

class NetworkRestClient implements RestClient {
  private baseUrl = process.env.REACT_APP_SERVER_URL

  private fetchWrapper: FetchWrapper
  private documentWrapper: DocumentWrapper

  constructor(fetchWrapper: FetchWrapper, documentWrapper: DocumentWrapper) {
    this.fetchWrapper = fetchWrapper
    this.documentWrapper = documentWrapper
  }

  fetchJson(path: string, options: any): Promise<any> {
    const updatedOptions = this.createUpdatedOptions(options)
    const url = this.baseUrl + path

    return this.fetchWrapper
      .callFetch(url, updatedOptions)
      .then(response => response.json())
  }

  getCookieForKey(key: CookieKey): string | null {
    const allCookies = this.documentWrapper.cookie()

    const cookieKeyValue = allCookies
      .split('; ')
      .find(entry => entry.startsWith(key))

    if (cookieKeyValue === undefined) {
      return null
    }

    return cookieKeyValue!.split('=')[1]
  }

  private createUpdatedOptions(options: any) {
    const xsrfCookie = this.getCookieForKey(CookieKey.XSRF_TOKEN)
    const updatedHeaders = Object.assign({}, options.headers, {'X-XSRF-TOKEN': xsrfCookie})
    return Object.assign({}, options, {headers: updatedHeaders})
  }

}

export enum CookieKey {
  XSRF_TOKEN = 'XSRF-TOKEN'
}

export default NetworkRestClient