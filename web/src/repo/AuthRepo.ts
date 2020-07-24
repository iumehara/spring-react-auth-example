import User from '../dto/User'

interface AuthRepo {
  login(username: string, password: string): Promise<User>
}

export default AuthRepo