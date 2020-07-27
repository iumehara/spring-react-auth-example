import UserDto from '../../DTO/UserDto'
import BooleanDto from '../../DTO/BooleanDto'

interface AuthRepo {
  login(username: string, password: string): Promise<UserDto>

  logout(): Promise<BooleanDto>

  currentUsername(): Promise<string>
}

export default AuthRepo