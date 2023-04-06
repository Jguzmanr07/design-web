import type { ELEMENT_TYPE } from '@/features/editor/const'

export interface Element {
  elementList?: Element[]
  type: ELEMENT_TYPE
}

export interface Page {
  elementList: Element[]
  uid: string
}

export interface Component {
  elementList: Element[]
  uid: string
}

export interface Project {
  componentList: Component[]
  pageList: Page[]
}
