import { v4 } from 'uuid'

export const generateUuid = (): string => {
  return v4()
}
