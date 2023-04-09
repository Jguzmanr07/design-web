import { ELEMENT_TYPE, TARGET_TYPE } from 'shared/const'

import type { Element, Project } from 'shared/types'

const DEFAULT_ELEMENT: Record<ELEMENT_TYPE, Element> = {
  [ELEMENT_TYPE.TEXT]: {
    type: ELEMENT_TYPE.TEXT,
    uid: '',
    value: 'ここにテキストを入力してください',
  },
  [ELEMENT_TYPE.GROUP]: {
    elementList: [],
    type: ELEMENT_TYPE.GROUP,
    uid: '',
  },
}

export enum ELEMENT_KEY_TYPE {
  TEXTAREA = 'textarea',
}

export const ELEMENT_CONTEXT_MENU: Record<
  'UNSHIFT' | 'PUSH' | 'DELETE',
  {
    LIST: Element[]
    TEXT: string
  }
> = {
  DELETE: {
    LIST: [],
    TEXT: '削除',
  },
  PUSH: {
    LIST: [
      DEFAULT_ELEMENT[ELEMENT_TYPE.TEXT],
      DEFAULT_ELEMENT[ELEMENT_TYPE.GROUP],
    ],
    TEXT: '末尾に追加',
  },
  UNSHIFT: {
    LIST: [
      DEFAULT_ELEMENT[ELEMENT_TYPE.TEXT],
      DEFAULT_ELEMENT[ELEMENT_TYPE.GROUP],
    ],
    TEXT: '先頭に追加',
  },
}

export const ELEMENT_DETAIL: Record<
  TARGET_TYPE | ELEMENT_TYPE,
  Record<string, ELEMENT_KEY_TYPE>
> = {
  [TARGET_TYPE.PAGE]: {},
  [TARGET_TYPE.COMPONENT]: {},
  [ELEMENT_TYPE.TEXT]: {
    value: ELEMENT_KEY_TYPE.TEXTAREA,
  },
  [ELEMENT_TYPE.GROUP]: {},
}

export const DEFAULT_PROJECT: Project = {
  componentList: [],
  pageList: [],
}
