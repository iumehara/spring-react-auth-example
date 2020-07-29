import FetchWrapper from './FetchWrapper'

export default class SpyFetchWrapper implements FetchWrapper {
  callFetch_arg_url: string | undefined
  callFetch_arg_option: any | undefined

  callFetch(url: string, option: any): Promise<Response> {
    this.callFetch_arg_url = url
    this.callFetch_arg_option = option
    return Promise.resolve(new Response('0'))
  }
}