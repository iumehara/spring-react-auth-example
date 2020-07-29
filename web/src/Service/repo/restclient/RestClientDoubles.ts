import RestClient from './RestClient'
import BookDto from '../../../DTO/BookDto'

export class SpyRestClient implements RestClient {
  fetchJson_arg_path: string[] = []
  fetchJson_arg_options: any[] = []

  fetchJson(path: string, options: {}): Promise<any> {
    this.fetchJson_arg_path.push(path)
    this.fetchJson_arg_options.push(options)

    return Promise.resolve([]);
  }
}

export class StubRestClient implements RestClient {
  fetchJson_response: any = [new BookDto('BookDto 1')]

  fetchJson(path: string, options: {}): Promise<any> {
    return Promise.resolve(this.fetchJson_response);
  }
}

