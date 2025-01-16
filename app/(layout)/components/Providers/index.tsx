'use client'

import { store } from '@/store'
import { MantineProvider } from '@mantine/core'
import { Provider as JotaiProvider } from 'jotai'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider store={store}>
      <MantineProvider>{children}</MantineProvider>
    </JotaiProvider>
  )
}
