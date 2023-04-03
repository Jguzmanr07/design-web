import { atom } from 'jotai'

import { DEFAULT_PROJECT } from '@/commons/const/editor'
import type { Project } from '@/types/project'

export const editorProject = atom<Project>(DEFAULT_PROJECT)
