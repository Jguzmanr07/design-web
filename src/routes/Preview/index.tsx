import { useAtom } from 'jotai'
import { useCallback, useEffect } from 'react'

import { IFRAME_EVENT } from '@/commons/const/editor'
import { previewProject } from '@/store/preview'

import type { FC } from 'react'

export const Preview: FC = () => {
  const [project, setProject] = useAtom(previewProject)

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      console.log(event.data)
      switch (event.data.type) {
        case IFRAME_EVENT.INIT:
        case IFRAME_EVENT.CHANGE:
          setProject(event.data.project)
          break
      }
    },
    [setProject]
  )

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    window.parent.postMessage({
      type: IFRAME_EVENT.READY,
    })
  }, [handleMessage])

  return (
    <div>
      <h1>Preview</h1>
      {project.elements.map((element, index) => (
        <h2 key={`${element.type}-${index}`}>{element.type}</h2>
      ))}
    </div>
  )
}
