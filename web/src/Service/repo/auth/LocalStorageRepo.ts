import StorageRepo from './StorageRepo'
import UserDto from '../../../DTO/UserDto'
import BooleanDto from '../../../DTO/BooleanDto'

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
  getUsername(): Promise<string> {
    const username = LocalStorageRepo.get(LocalStorageKey.MB_USERNAME)

    if (username == null) {
      return Promise.reject('username not found')
    }

    return Promise.resolve(username!);
  }

  saveUser(user: UserDto): Promise<UserDto> {
    LocalStorageRepo.save(new LocalStorageToken(LocalStorageKey.MB_USERNAME, user.username))
    return Promise.resolve(user)
  }

  deleteUser(): Promise<BooleanDto> {
    LocalStorageRepo.delete(LocalStorageKey.MB_USERNAME)
    return Promise.resolve(new BooleanDto(true))
  }

  private static save(token: LocalStorageToken) {
    localStorage.setItem(token.key, token.value)
  }

  private static get(key: LocalStorageKey): string | null {
    return localStorage.getItem(key)
  }

  private static delete(key: LocalStorageKey) {
    localStorage.removeItem(key)
  }
}

export default LocalStorageRepo