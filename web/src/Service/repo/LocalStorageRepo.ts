import StorageRepo from './StorageRepo'
import UserDto from '../../DTO/UserDto'
import BooleanDto from '../../DTO/BooleanDto'

enum LocalStorageKey {
  MB_USERNAME = 'MB_USERNAME'
}

class LocalStorageToken {
  key: LocalStorageKey
  value: string

  constructor(key: LocalStorageKey, value: string) {
    this.key = key
    this.value = value
  }
}

class LocalStorageRepo implements StorageRepo {
  saveUser(user: UserDto): Promise<UserDto> {
    this.save(new LocalStorageToken(LocalStorageKey.MB_USERNAME, user.username))
    return Promise.resolve(user)
  }

  deleteUser(): Promise<BooleanDto> {
    this.delete(LocalStorageKey.MB_USERNAME)
    return Promise.resolve(new BooleanDto(true))
  }

  private save(token: LocalStorageToken) {
    localStorage.setItem(token.key, token.value)
  }

  private get(key: LocalStorageKey): Promise<string | null> {
    return Promise.resolve(localStorage.getItem(key))
  }

  private delete(key: LocalStorageKey) {
    localStorage.removeItem(key)
  }
}

export default LocalStorageRepo