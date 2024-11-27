'use client'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/api/QueryClient'
import { AuthContextProvider, useAuth } from '@/Store/useAuth'
import { ThemeProvider } from '@/components/theme-provider'
// eslint-disable-next-line camelcase
import { Bai_Jamjuree } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import background from '@/assets/background.png'
import { FilterProvider } from '@/Store/useFilter'
import { usePathname } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { DayPickerProvider } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { ptBR } from 'date-fns/locale/pt-BR'

const bai = Bai_Jamjuree({
  weight: '700',
  subsets: ['latin'],
})

// Criar um componente separado para lidar com o refresh token
function AuthCheck({ children }: { children: React.ReactNode }) {
  const { refreshToken } = useAuth()
  const [cookies] = useCookies([
    'token_panzer_football',
    'refresh_panzer_football',
  ])

  useEffect(() => {
    const hasRefreshToken = !!cookies.refresh_panzer_football
    if (hasRefreshToken) {
      refreshToken()
    }
  }, [cookies.refresh_panzer_football, refreshToken])

  return <>{children}</>
}

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
        className={`${bai.className} antialiased, laptop:bg-cover mobile:bg-center desktop:bg-cover tablet:bg-cover ${
          path === '/' || path === '/register' ? 'mobile:px-0' : 'mobile:px-5'
        }`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <FilterProvider>
                <DayPickerProvider
                  initialProps={{
                    mode: 'single',
                    locale: ptBR, // Usando o locale importado
                    weekStartsOn: 1,
                    showOutsideDays: true,
                  }}
                >
                  <AuthCheck>{children}</AuthCheck>
                </DayPickerProvider>
              </FilterProvider>
            </AuthContextProvider>
            <ToastContainer />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
