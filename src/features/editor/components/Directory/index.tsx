import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { editorProject } from '@/features/editor/store'
import { addComponent, addPage } from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'

import { Component } from './Component'
import { styles } from './index.styles'
import { Page } from './Page'

import type { FC } from 'react'

export const Directory: FC = () => {
  const [project, setProject] = useAtom(editorProject)

  const handleAddPage = useCallback(() => {
    setProject((prevProject) => addPage(prevProject))
  }, [setProject])

  const handleAddComponent = useCallback(() => {
    setProject((prevProject) => addComponent(prevProject))
  }, [setProject])

  const contextMenu = useContextMenu({
    menus: [
      {
        callback: handleAddPage,
        text: 'Add Page',
      },
      {
        callback: handleAddComponent,
        text: 'Add Component',
      },
    ],
  })

  return (
    <div {...contextMenu} css={styles.container}>
      <h2>Directory</h2>
      <h3>Page</h3>
      {project.pageList.map((page, index) => (
        <Page index={index} key={page.uid} page={page} />
      ))}
      <h3>Component</h3>
      {project.componentList.map((component, index) => (
        <Component component={component} index={index} key={component.uid} />
      ))}
    </div>
  )
}
