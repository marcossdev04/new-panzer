'use client'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/api/QueryClient'
import { AuthContextProvider } from '@/Store/useAuth'
import { ThemeProvider } from '@/components/theme-provider'
// eslint-disable-next-line camelcase
import { Bai_Jamjuree } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import background from '@/assets/background.png'

const bai = Bai_Jamjuree({
  weight: '700',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(${background.src})`,
        }}
        className={`${bai.className} antialiased, bg-cover`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>{children}</AuthContextProvider>
            <ToastContainer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
