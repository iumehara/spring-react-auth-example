import FetchWrapper from './FetchWrapper'

export default class BrowserFetchWrapper implements FetchWrapper {
  callFetch(url: string, options: any): Promise<Response> {
    return fetch(url, options);
  }
}
