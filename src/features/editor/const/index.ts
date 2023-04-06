import type { Element, Project } from '@/features/editor/types'
import type { ContextMenu } from '@/types/contextMenu'

export enum ELEMENT_TYPE {
  TEXT = 'text',
}

export const DEFAULT_ELEMENT: Record<ELEMENT_TYPE, Omit<Element, 'type'>> = {
  text: {},
}

export enum TARGET_TYPE {
  COMPONENT = 'component',
  PAGE = 'page',
}

export const TARGET_CONTEXT_MENU: Record<
  ELEMENT_TYPE,
  ContextMenu<Omit<Element, 'type'>>
> = {
  text: {
    args: DEFAULT_ELEMENT.text,
    text: 'Add Text',
  },
}

export const DEFAULT_PROJECT: Project = {
  componentList: [],
  pageList: [],
}
