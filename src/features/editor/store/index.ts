import { atom } from 'jotai'

import { DEFAULT_PROJECT } from '@/features/editor/const'

import type { Project, Select } from 'shared/types'

export const editorProject = atom<Project>(DEFAULT_PROJECT)

export const editorSelect = atom<Select | null>(null)

export const editorIsPreview = atom(false)

export const editorPreviewUrl = atom('/preview.html')
