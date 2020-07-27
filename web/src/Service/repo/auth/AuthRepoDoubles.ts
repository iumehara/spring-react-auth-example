import AuthRepo from './AuthRepo'
import UserDto from '../../../DTO/UserDto'
import BooleanDto from '../../../DTO/BooleanDto'

export class StubAuthRepo implements AuthRepo {
  login_returnValue = Promise.resolve(new UserDto(''))
  logout_returnValue = Promise.resolve(new BooleanDto(true))
  currentUsername_returnValue = Promise.resolve('Amy')

  login(username: string, password: string): Promise<UserDto> {
    return this.login_returnValue
  }

  logout(): Promise<BooleanDto> {
    return this.logout_returnValue
  }

  currentUsername(): Promise<string> {
    return this.currentUsername_returnValue
  }
}

export class SpyAuthRepo implements AuthRepo {
  login_arg_username: string = ''
  login_arg_password: string = ''

  login(username: string, password: string): Promise<UserDto> {
    this.login_arg_username = username
    this.login_arg_password = password

    return Promise.resolve(new UserDto(''));
  }

  logout(): Promise<BooleanDto> {
    return Promise.resolve(new BooleanDto(true));
  }

  currentUsername(): Promise<string> {
    return Promise.resolve('');
  }
}
