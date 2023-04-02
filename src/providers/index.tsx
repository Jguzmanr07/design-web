import { ContextMenuProvider } from './ContextMenuProvider'

import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren

export const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <ContextMenuProvider>{children}</ContextMenuProvider>
    </>
  )
}
