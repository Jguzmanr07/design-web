import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'

import { IFRAME_EVENT } from '@/commons/const/editor'
import { editorProject } from '@/store/editor'

import styles from './styles/content.module.css'

import type { FC } from 'react'

export const Content: FC = () => {
  const project = useAtomValue(editorProject)
  const iframe = useRef<HTMLIFrameElement>(null)

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (iframe.current == null) {
        return
      }
      console.log(event.data)
      switch (event.data.type) {
        case IFRAME_EVENT.READY:
          iframe.current.contentWindow?.postMessage({
            type: IFRAME_EVENT.INIT,
            project,
          })
          break
      }
    },
    [project]
  )

  useEffect(() => {
    window.addEventListener('message', handleMessage)
  }, [handleMessage])

  useEffect(() => {
    if (iframe.current == null) {
      return
    }
    iframe.current.contentWindow?.postMessage({
      type: IFRAME_EVENT.CHANGE,
      project,
    })
  }, [project])

  return (
    <iframe className={styles.container} ref={iframe} src="/preview.html" />
  )
}
