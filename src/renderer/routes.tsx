import { Route } from 'react-router-dom'
import { Router } from '../lib/electron-router.dom'
import { Layout } from './src/components/layout'
import { About, Create, Detail, Home } from './src/pages'

export function AppRoutes(): JSX.Element {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/customer/:id" element={<Detail />} />
        </Route>
      }
    />
  )
}
