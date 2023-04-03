import { Link } from 'react-router-dom'

import type { FC } from 'react'

export const Home: FC = () => {
  return (
    <>
      <h1>Hello World!!</h1>
      <Link to="/editor">Editor</Link>
    </>
  )
}
