/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/api/api'
import { useRouter } from 'next/navigation'
import { CookiesProvider, useCookies } from 'react-cookie'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { queryClient } from '@/api/QueryClient'

interface SignInCredentials {
  email: string
  password: string
}
interface RegisterCredentials {
  name: string
  phone_number: string
  cpf: string
  email: string
  password: string
}

interface AuthContextProps {
  handleSignIn: (credentials: SignInCredentials) => void
  handleRegister: (credentials: RegisterCredentials) => void
  handleSignOut: () => void
  isLoading: boolean
  errorSignIn: string | null
  handleClearErrorSignIn: () => void
  isAuthenticated: boolean
  refreshToken: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

interface AuthContextProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { push } = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies([
    'token_panzer_football',
    'refresh_panzer_football',
  ])

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!cookies.token_panzer_football,
  )

  useEffect(() => {
    const handleCookieChange = () => {
      if (!cookies.token_panzer_football) {
        setIsAuthenticated(false)
        api.defaults.headers.Authorization = ''
      } else {
        setIsAuthenticated(true)
        api.defaults.headers.Authorization = `Bearer ${cookies.token_panzer_football}`
      }
    }
    handleCookieChange()

    const interval = setInterval(handleCookieChange, 3000)

    return () => clearInterval(interval)
  }, [cookies, push])

  async function handleRegister({
    cpf,
    email,
    name,
    password,
    // eslint-disable-next-line camelcase
    phone_number,
  }: RegisterCredentials) {
    setIsLoading(true)
    const formattedData = {
      name,
      cpf,
      email,
      password,
      // eslint-disable-next-line camelcase
      phone_number,
    }
    try {
      await api.post('/users/', formattedData).then(async () => {
        const data = { email, password }
        await handleSignIn(data)
      })
      await queryClient.refetchQueries(['getUsers'])

      setIsLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      console.log(err)
      setIsLoading(false)
      toast.error('Não foi possível fazer a criação da conta.', {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })
    }
  }

  async function handleSignIn({ email, password }: SignInCredentials) {
    setIsLoading(true)
    try {
      const response = await api.post('/token/', {
        email,
        password,
      })
      console.log(response.data)
      const accessToken = response.data.access
      const refreshToken = response.data.refresh
      setCookie('token_panzer_football', accessToken, { maxAge: 60 * 60 })
      setCookie('refresh_panzer_football', refreshToken, {
        maxAge: 60 * 60 * 24,
      })

      api.defaults.headers.Authorization = `Bearer ${accessToken}`
      setIsAuthenticated(true)
      push('/home')
    } catch (err: any) {
      console.log(err)
      let errorMessage = 'Erro desconhecido'

      if (err.response) {
        const { status, data } = err.response

        switch (status) {
          case 403:
            errorMessage = 'Usuário já está conectado'
            break
          case 404:
            errorMessage = 'Email ou senha incorreta'
            break
          case 400:
            if (data.error === 'Wrong password') {
              errorMessage = 'Email ou senha incorreta'
            }
            break
          case 401:
            errorMessage = 'Email ou senha incorreta'
            break
          default:
            console.error('Erro detalhado:', err.response)
        }
      }

      toast.error(errorMessage, {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignOut() {
    removeCookie('token_panzer_football')
    removeCookie('refresh_panzer_football')
    api.defaults.headers.Authorization = ''
    setIsAuthenticated(false)
    push('/')
  }

  async function refreshToken() {
    try {
      const refreshToken = cookies.refresh_panzer_football
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await api.post('/auth/refresh/', {
        refresh: refreshToken,
      })
      const newAccessToken = response.data.access
      setCookie('token_panzer_football', newAccessToken, {
        maxAge: 60 * 60 * 8,
      })
      api.defaults.headers.Authorization = `Bearer ${newAccessToken}`
      setIsAuthenticated(true)
    } catch (err: any) {
      console.error('Failed to refresh token:', err)
      handleSignOut()
    }
  }

  function handleClearErrorSignIn() {
    setError('')
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleRegister,
        handleSignOut,
        isLoading,
        errorSignIn: error ? String(error) : null,
        handleClearErrorSignIn,
        isAuthenticated,
        refreshToken,
      }}
    >
      <CookiesProvider>{children}</CookiesProvider>
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)

  return context
}
