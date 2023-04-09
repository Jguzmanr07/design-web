import type { ELEMENT_TYPE, TARGET_TYPE } from './const'

export type Element = {
  elementList?: Element[]
  type: ELEMENT_TYPE
  uid: string
} & Record<string, unknown>

export interface Page {
  elementList: Element[]
  type: TARGET_TYPE.PAGE
  uid: string
}

export interface Component {
  elementList: Element[]
  type: TARGET_TYPE.COMPONENT
  uid: string
}

export interface Project {
  componentList: Component[]
  pageList: Page[]
}

export interface Select {
  indexList: number[]
  targetType: TARGET_TYPE
  uid: string
}
