import StorageRepo from './StorageRepo'
import UserDto from '../../../DTO/UserDto'
import BooleanDto from '../../../DTO/BooleanDto'

export class SpyStorageRepo implements StorageRepo {
  getUsername_wasCalled = false
  saveUser_arg_user: UserDto | null = null
  deleteUser_wasCalled = false

  getUsername(): Promise<string> {
    this.getUsername_wasCalled = true
    return Promise.resolve('')
  }

  saveUser(user: UserDto): Promise<UserDto> {
    this.saveUser_arg_user = user
    return Promise.resolve(user);
  }

  deleteUser(): Promise<BooleanDto> {
    this.deleteUser_wasCalled = true
    return Promise.resolve(new BooleanDto(true));
  }
}

export class StubStorageRepo implements StorageRepo {
  deleteUser_returnValue = new BooleanDto(false)
  getUsername_returnValue = ''
  saveUser_returnValue = new UserDto('')

  deleteUser(): Promise<BooleanDto> {
    return Promise.resolve(this.deleteUser_returnValue)
  }

  getUsername(): Promise<string> {
    return Promise.resolve(this.getUsername_returnValue)
  }

  saveUser(user: UserDto): Promise<UserDto> {
    return Promise.resolve(this.saveUser_returnValue)
  }
}
