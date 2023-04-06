import { cloneDeep } from 'lodash'

import type { TARGET_TYPE } from '@/features/editor/const'
import type { Component, Element, Page, Project } from '@/features/editor/types'
import { generateUuid } from '@/utils/uuid'

export const addPage = (project: Project): Project => {
  return {
    ...project,
    pageList: [
      ...project.pageList,
      {
        elementList: [],
        uid: generateUuid(),
      },
    ],
  }
}

export const addComponent = (project: Project): Project => {
  return {
    ...project,
    componentList: [
      ...project.componentList,
      {
        elementList: [],
        uid: generateUuid(),
      },
    ],
  }
}

const getParent = (
  target: Page[] | Component[],
  indexList: number[]
): Page | Component | Element | null => {
  let current: Page | Component | Element | null = null
  indexList.forEach((index) => {
    current = current?.elementList?.[index] ?? target?.[index]
  })
  return current
}

export const addElement = (
  project: Project,
  targetType: TARGET_TYPE,
  indexList: number[],
  args: Element
): Project => {
  const cloneProject = cloneDeep(project)
  const cloneTarget = cloneProject[`${targetType}List`]
  const parent = getParent(cloneTarget, indexList)
  if (parent != null) {
    parent.elementList?.push(args)
  }
  return cloneProject
}
