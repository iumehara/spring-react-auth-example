import DocumentWrapper from './DocumentWrapper'

export default class StubDocumentWrapper implements DocumentWrapper {
  cookie_returnValue = 'XSRF-TOKEN=stub-xsrf-token; OTHER-TOKEN=other-token-value'

  cookie(): string {
    return this.cookie_returnValue
  }
}
