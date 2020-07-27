import FetchWrapper from './FetchWrapper'
import BookDto from '../dto/BookDto'
import UserDto from '../dto/UserDto'

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

  static userStub(): StubFetchWrapper {
    const wrapper = new StubFetchWrapper()
    wrapper.fetchJson_response = new UserDto('user1')
    return wrapper
  }

  fetchJson(path: string, options: {}): Promise<any> {
    return Promise.resolve(this.fetchJson_response);
  }
}

