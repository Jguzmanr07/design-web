import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { useContextMenu } from '@/hooks/useContextMenu'
import { editorProject } from '@/store/editor'

import type { FC } from 'react'

export const Directory: FC = () => {
  const [project, setProject] = useAtom(editorProject)

  const handleAddText = useCallback(() => {
    setProject((prevProject) => ({
      ...prevProject,
      elements: [
        ...prevProject.elements,
        {
          type: 'text',
        },
      ],
    }))
  }, [setProject])

  const contextMenu = useContextMenu({
    menus: [
      {
        text: 'Add Text',
        callback: handleAddText,
      },
    ],
  })

  return (
    <div {...contextMenu}>
      <h2>Directory</h2>
      {project.elements.map((element, index) => (
        <h3 key={`${element.type}-${index}`}>{element.type}</h3>
      ))}
    </div>
  )
}
