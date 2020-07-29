import DocumentWrapper from './DocumentWrapper'

export default class BrowserDocumentWrapper implements DocumentWrapper {
  cookie(): string {
    return document.cookie
  }
}