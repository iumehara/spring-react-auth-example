import MBRouter from './MBRouter'

export class SpyMBRouter implements MBRouter {
  goToBookListPage_wasCalled = false
  goToLoginPage_wasCalled = false

  goToBookListPage(): void {
    this.goToBookListPage_wasCalled = true
  }

  goToLoginPage(): void {
    this.goToLoginPage_wasCalled = true
  }
}
