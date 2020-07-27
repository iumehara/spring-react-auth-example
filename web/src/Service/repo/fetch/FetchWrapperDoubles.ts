import FetchWrapper from './FetchWrapper'
import BookDto from '../../../DTO/BookDto'

export class SpyFetchWrapper implements FetchWrapper {
  fetchJson_arg_path: string = ""
  fetchJson_arg_options: any = {}

  fetchJson(path: string, options: {}): Promise<any> {
    this.fetchJson_arg_path = path
    this.fetchJson_arg_options = options

    return Promise.resolve([]);
  }
}

export class StubFetchWrapper implements FetchWrapper {
  fetchJson_response: any = [new BookDto('BookDto 1')]

  fetchJson(path: string, options: {}): Promise<any> {
    return Promise.resolve(this.fetchJson_response);
  }
}

