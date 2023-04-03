import type { Project } from '@/types/project'

export enum IFRAME_EVENT {
  READY = 'ready',
  INIT = 'init',
  CHANGE = 'change',
}

export const DEFAULT_PROJECT: Project = {
  elements: [],
}
