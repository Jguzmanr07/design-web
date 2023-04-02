import type { FC } from 'react'
import { Link } from 'react-router-dom'

export const Home: FC = () => {
  return (
    <>
      <h1>Hello World!!</h1>
      <Link to="/editor">Editor</Link>
    </>
  )
}
