import UserDto from '../dto/UserDto'
import BooleanDto from '../dto/BooleanDto'

interface AuthRepo {
  login(username: string, password: string): Promise<UserDto>

  logout(): Promise<BooleanDto>
}

export default AuthRepo