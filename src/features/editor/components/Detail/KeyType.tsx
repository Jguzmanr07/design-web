import { useAtomValue, useSetAtom } from 'jotai'

import { ELEMENT_KEY_TYPE, ELEMENT_DETAIL } from '@/features/editor/const'
import { editorProject, editorSelect } from '@/features/editor/store'
import { getElement } from '@/features/editor/utils'

import { TextArea } from './TextArea'

import type { ChangeEvent, FC, ReactNode } from 'react'
import type { ELEMENT_TYPE, TARGET_TYPE } from 'shared/const'

export type KeyTypeProps = {
  elementKey: string
  type: TARGET_TYPE | ELEMENT_TYPE
} & Record<string, unknown>

export const KeyType: FC<KeyTypeProps> = ({ elementKey, type, ...props }) => {
  const setProject = useSetAtom(editorProject)
  const select = useAtomValue(editorSelect)
  let content: ReactNode = null

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setProject((prevProject) => {
      if (select == null) {
        return prevProject
      }
      const cloneProject = structuredClone(prevProject)
      const element = getElement(
        cloneProject,
        select.targetType,
        select.indexList
      )
      if (element != null) {
        Object.assign(element, {
          ...element,
          [elementKey]: event.target.value,
        })
      }
      return cloneProject
    })
  }

  switch (ELEMENT_DETAIL[type]?.[elementKey]) {
    case ELEMENT_KEY_TYPE.TEXTAREA:
      content = (
        <TextArea value={''} {...props} onChange={handleTextAreaChange} />
      )
      break
    default:
      content = null
      break
  }

  return (
    <div>
      <div>{elementKey}</div>
      <div>{content}</div>
    </div>
  )
}
