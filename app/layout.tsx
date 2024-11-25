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
import { FilterProvider } from '@/Store/useFilter'
import { usePathname } from 'next/navigation'

const bai = Bai_Jamjuree({
  weight: '700',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(${background.src})`,
        }}
        className={`${bai.className} antialiased,  laptop:bg-cover mobile:bg-center desktop:bg-cover tablet:bg-cover ${path === '/' ? 'mobile:px-0' : path === '/register' ? 'mobile:px-0' : 'mobile:px-5'}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <FilterProvider>{children}</FilterProvider>
            </AuthContextProvider>
            <ToastContainer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
