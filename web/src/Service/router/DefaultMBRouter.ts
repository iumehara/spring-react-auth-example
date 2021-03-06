import {History, LocationState} from 'history'
import MBRouter from './MBRouter'

class DefaultMBRouter implements MBRouter {
  private browserHistory: History
  constructor(browserHistory: History<LocationState>) {
    this.browserHistory = browserHistory
  }

  goToBookListPage(): void {
    this.browserHistory.push('/')
  }

  goToLoginPage(): void {
    this.browserHistory.push('/login')
  }

  goToNewBookPage(): void {
    this.browserHistory.push('/books/new')
  }
}

export default DefaultMBRouter