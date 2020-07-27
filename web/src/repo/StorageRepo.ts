import UserDto from '../dto/UserDto'
import BooleanDto from '../dto/BooleanDto'

interface StorageRepo {
  saveUser(user: UserDto): Promise<UserDto>

  deleteUser(): Promise<BooleanDto>
}

export default StorageRepo