export interface User {
  id: string
  email: string
  name: string
  phoneNumber: string | null
  password: string | null | undefined
  emailVerified: Date | null
  image: string | null
  role: string
}
