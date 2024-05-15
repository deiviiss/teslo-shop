export interface User {
  id: string
  email: string
  name: string
  password: string | null | undefined
  emailVerified: Date | null
  image: string | null
  role: string
}
