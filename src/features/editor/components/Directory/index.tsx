import { useAtom } from 'jotai'

import { editorProject } from '@/features/editor/store'
import { addComponent, addPage } from '@/features/editor/utils'
import { useContextMenu } from '@/hooks/useContextMenu'

import { Component } from './Component'
import { styles } from './index.styles'
import { Page } from './Page'

import type { FC } from 'react'

export const Directory: FC = () => {
  const [project, setProject] = useAtom(editorProject)

  const handleAddPage = (): void => {
    setProject((prevProject) => addPage(prevProject))
  }

  const handleAddComponent = (): void => {
    setProject((prevProject) => addComponent(prevProject))
  }

  const contextMenu = useContextMenu({
    menuList: [
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
      <h2>Page</h2>
      {project.pageList.map((page, index) => (
        <Page index={index} key={page.uid} page={page} />
      ))}
      <h2>Component</h2>
      {project.componentList.map((component, index) => (
        <Component component={component} index={index} key={component.uid} />
      ))}
    </div>
  )
}
