import FetchWrapper from './FetchWrapper'

class BrowserFetchWrapper implements FetchWrapper {
  private baseUrl = process.env.REACT_APP_SERVER_URL

  fetchJson(path: string, option: {} = {}): Promise<any> {
    const url = this.baseUrl + path
    return fetch(url, option)
      .then(response => response.json())
  }
}

export default BrowserFetchWrapper