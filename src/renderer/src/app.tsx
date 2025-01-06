import { QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from '../routes'
import { queryClient } from './lib/react-query'

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  )
}

export default App
