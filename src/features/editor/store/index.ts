import { atom } from 'jotai'

import { DEFAULT_PROJECT } from '@/features/editor/const'
import type { Project } from '@/features/editor/types'

export const editorProject = atom<Project>(DEFAULT_PROJECT)
