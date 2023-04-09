import { TARGET_TYPE } from 'shared/const'

import { generateUuid } from '@/utils/uuid'

import type { Component, Element, Page, Project } from 'shared/types'

export const addPage = (project: Project): Project => {
  const cloneProject = structuredClone(project)
  cloneProject.pageList.push({
    elementList: [],
    type: TARGET_TYPE.PAGE,
    uid: generateUuid(),
  })
  return cloneProject
}

export const addComponent = (project: Project): Project => {
  const cloneProject = structuredClone(project)
  cloneProject.componentList.push({
    elementList: [],
    type: TARGET_TYPE.COMPONENT,
    uid: generateUuid(),
  })
  return cloneProject
}

const getParent = (
  target: Page[] | Component[],
  indexList: number[]
): Page[] | Component[] | Page | Component | Element | null => {
  let current: Page[] | Component[] | Page | Component | Element | null = null
  indexList.forEach((index) => {
    current =
      (current as Page | Component | Element)?.elementList?.[index] ??
      target?.[index] ??
      null
  })
  if (indexList.length === 0) {
    current = target
  }
  return current
}

export const getElement = (
  project: Project,
  targetType: TARGET_TYPE,
  indexList: number[]
): Page | Component | Element | null => {
  const target = project[`${targetType}List`]
  const parentIndexList = indexList.slice(0, indexList.length - 1)
  const lastIndex = indexList.slice(-1)[0]
  const parent = getParent(target, parentIndexList)
  if (Array.isArray(parent)) {
    return parent?.[lastIndex]
  } else if (parent != null) {
    return parent.elementList?.[lastIndex] ?? null
  }
  return null
}

export const unshiftElement = (
  project: Project,
  targetType: TARGET_TYPE,
  indexList: number[],
  args: Element
): Project => {
  const cloneProject = structuredClone(project)
  const element = getElement(cloneProject, targetType, indexList)
  if (element != null) {
    element.elementList?.unshift(args)
  }
  return cloneProject
}

export const pushElement = (
  project: Project,
  targetType: TARGET_TYPE,
  indexList: number[],
  args: Element
): Project => {
  const cloneProject = structuredClone(project)
  const element = getElement(cloneProject, targetType, indexList)
  if (element != null) {
    element.elementList?.push(args)
  }
  return cloneProject
}

export const deleteElement = (
  project: Project,
  targetType: TARGET_TYPE,
  indexList: number[]
): Project => {
  const cloneProject = structuredClone(project)
  const target = cloneProject[`${targetType}List`]
  const parentIndexList = indexList.slice(0, indexList.length - 1)
  const lastIndex = indexList.slice(-1)[0]
  const parent = getParent(target, parentIndexList)
  if (Array.isArray(parent)) {
    parent.splice(lastIndex, 1)
  } else if (parent != null) {
    parent.elementList?.splice(lastIndex, 1)
  }
  return cloneProject
}
