import UserDto from '../../DTO/UserDto'
import BooleanDto from '../../DTO/BooleanDto'

interface StorageRepo {
  saveUser(user: UserDto): Promise<UserDto>

  deleteUser(): Promise<BooleanDto>
}

export default StorageRepo