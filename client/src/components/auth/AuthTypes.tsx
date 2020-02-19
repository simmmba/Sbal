import { Study } from '../main/MainTypes'
import { UserInfoType } from '../userDetail/UserDetailTypes'
import * as H from 'history'

export type AuthTemplateProps = {
  children: React.ReactNode
}

export type AuthFormProps = {
  type: string
}

export type SignupState = {
  email: string
  emailState: boolean
  isCheckedEmail: boolean
  emailDupMessage: string
  nickname: string
  nicknameState: boolean
  isCheckedNickname: boolean
  nicknameDupMessage: string
  pw: string
  pw2: string
  phoneNumber: string
  introduction: string
  city: string
  town: string
  lcategory: string
  scategory: string
  gender: number
  interestList: Interest[]
  equalsOfPasswords: string
  isEqualPassword: boolean
  emailValidationCode: string
  emailValidationInput: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  validateUserEmail: () => void
  validateUserNickname: () => void
  [key: string]:
    | string
    | number
    | boolean
    | Interest[]
    | ((e: React.ChangeEvent<HTMLInputElement>) => void)
    | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void)
    | ((e: React.ChangeEvent<HTMLSelectElement>) => void)
}

export type LoginState = {
  email: string
  password: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: string | ((e: React.ChangeEvent<HTMLInputElement>) => void)
}

export type CityAndTowns = {
  [key: string]: string[]
}

export type Interests = {
  [key: string]: string[]
}

export type SocialButtonProps = {
  bColor: string
  color: string
  children: React.ReactNode
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type Interest = {
  lcategory: string
  scategory: string
}

export type ButtonProps = {
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type RadioProps = {
  name: string
  value: string
  children: React.ReactNode
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type LoginData = {
  email: string
  pw: string
}

export type SignupData = {
  id?: string
  email: string
  nickname: string
  pw: string
  pw2?: string
  phoneNum: string
  introduction: string
  city: string
  town: string
  gender: number
  interestList?: Interest[]
}

export type UpdateData = {
  email: string
  nickname: string
  phoneNum: string
  introduction: string
  city: string
  town: string
  interestDTOList: Interest[]
}

export type Leader = {
  id: number
  email?: string
  pw?: string
  nickname: string
  phoneNumber?: string
  introduction?: string
  city?: string
  town?: string
  gender?: number
  interestList?: Interest[]
  evaluation?: string
  profilePhotoDir?: string
  socialLogin?: string
  interestDTOList?: Interest[]
  ledStudyList?: Study[]
  joinedStudyList?: Study[]
}

export type UserStoreType = {
  isLoggingIn: boolean
  token: string | null
  data: UserInfoType
  loginUser: {
    id: number
    nickname: string
  }
  signup: (data: SignupData, history: H.History) => void
  login: (data: LoginData, history: H.History) => void
  logout: () => void
  edit: (data: UpdateData) => void
  signout: () => void
  getMyInfoDetails: () => void
}
