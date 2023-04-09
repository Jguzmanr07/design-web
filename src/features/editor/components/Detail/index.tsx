import { useAtom, useAtomValue } from 'jotai'
import { omit } from 'lodash-es'
import { useEffect, useMemo } from 'react'

import { editorProject, editorSelect } from '@/features/editor/store'
import { getElement } from '@/features/editor/utils'

import { styles } from './index.styles'
import { KeyType } from './KeyType'

import type { FC } from 'react'

export const Detail: FC = () => {
  const project = useAtomValue(editorProject)
  const [select, setSelect] = useAtom(editorSelect)

  const selectElement = useMemo(
    () =>
      select != null
        ? getElement(
            structuredClone(project),
            select.targetType,
            select.indexList
          )
        : null,
    [project, select]
  )

  useEffect(() => {
    if (selectElement?.uid !== select?.uid) {
      setSelect(null)
    }
  }, [select?.uid, selectElement?.uid, setSelect])

  if (selectElement == null) {
    return null
  }

  const omitSelectElement = omit(selectElement, ['elementList', 'uid', 'type'])

  return (
    <div css={styles.container}>
      {(
        Object.keys(omitSelectElement) as Array<keyof typeof omitSelectElement>
      ).map((key) => (
        <KeyType
          elementKey={key}
          key={key}
          type={selectElement.type}
          {...omitSelectElement}
        />
      ))}
    </div>
  )
}
