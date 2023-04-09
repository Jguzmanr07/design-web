import { WebContainer } from '@webcontainer/api'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'

import { StatusBar } from '@/features/editor/components/StatusBar'
import { ToolBar } from '@/features/editor/components/ToolBar'
import { editorIsPreview, editorPreviewUrl } from '@/features/editor/store'
import { files } from '@/templates/react'

import { styles } from './editor.styles'

import type { FC } from 'react'

export const Editor: FC = () => {
  const [isPreview, setIsPreview] = useAtom(editorIsPreview)
  const isPreviewRef = useRef(isPreview)
  const setPreviewUrl = useSetAtom(editorPreviewUrl)
  const isFirst = useRef(true)

  useEffect(() => {
    isPreviewRef.current = isPreview
  }, [isPreview])

  useEffect(() => {
    if (!isFirst.current || isPreviewRef.current) {
      return
    }
    isFirst.current = false
    void (async () => {
      const webcontainerInstance = await WebContainer.boot()
      await webcontainerInstance.mount(files)

      const yarnInstallProcess = await webcontainerInstance.spawn('yarn', [
        'install',
      ])
      void yarnInstallProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data)
          },
        })
      )
      if ((await yarnInstallProcess.exit) !== 0) {
        throw new Error('Install failed')
      }

      const yarnBuildProcess = await webcontainerInstance.spawn('yarn', [
        'build',
      ])
      void yarnBuildProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data)
          },
        })
      )
      if ((await yarnBuildProcess.exit) !== 0) {
        throw new Error('Build failed')
      }

      await webcontainerInstance.spawn('yarn', ['preview'])
      webcontainerInstance.on('server-ready', (_, url) => {
        setIsPreview(true)
        setPreviewUrl(url)
      })
    })()
  }, [setIsPreview, setPreviewUrl])

  return (
    <div css={styles.container}>
      <div>
        <ToolBar />
      </div>
      <main>
        <Outlet />
      </main>
      <div>
        <StatusBar />
      </div>
    </div>
  )
}
