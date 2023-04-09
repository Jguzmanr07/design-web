import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { IFRAME_EVENT, TARGET_TYPE } from 'shared/const'

import { editorProject } from '@/features/editor/store'

import { styles } from './content.styles'
import { Iframe } from './Iframe'

import type { FC } from 'react'

export const Content: FC = () => {
  const project = useAtomValue(editorProject)
  const [readyPageList, setReadyPageList] = useState<string[]>([])
  const [readyComponentList, setReadyComponentList] = useState<string[]>([])

  const handleMessage = useCallback((event: MessageEvent) => {
    console.log(event.data)
    const { event: iframeEvent, target, type } = event.data
    switch (iframeEvent) {
      case IFRAME_EVENT.READY:
        if (typeof target !== 'string' || target === '') {
          break
        }
        if (type === TARGET_TYPE.PAGE) {
          setReadyPageList((prevReadyPageList) => [
            ...prevReadyPageList,
            target,
          ])
        } else if (type === TARGET_TYPE.COMPONENT) {
          setReadyComponentList((prevReadyComponentList) => [
            ...prevReadyComponentList,
            target,
          ])
        }
        break
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage])

  return (
    <div css={styles.container}>
      {project.componentList.map((component) => (
        <Iframe
          key={component.uid}
          onReadyEnd={() => {
            setReadyComponentList((prevReadyComponentList) =>
              prevReadyComponentList.filter((uid) => uid !== component.uid)
            )
          }}
          ready={readyComponentList.includes(component.uid)}
          target={component}
          type={TARGET_TYPE.COMPONENT}
        />
      ))}
      {project.pageList.map((page) => (
        <Iframe
          key={page.uid}
          onReadyEnd={() => {
            setReadyPageList((prevReadyPageList) =>
              prevReadyPageList.filter((uid) => uid !== page.uid)
            )
          }}
          ready={readyPageList.includes(page.uid)}
          target={page}
          type={TARGET_TYPE.PAGE}
        />
      ))}
    </div>
  )
}
