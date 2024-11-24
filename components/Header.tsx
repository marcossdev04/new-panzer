'use client'
import Image from 'next/image'
import logo from '@/assets/logotipo.svg'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { PanzerPlan, useFilter } from '@/Store/useFilter'
import { api } from '@/api/api'
import { useQuery } from 'react-query'
import { User } from '@/types/User'

export function Header() {
  const { userPlan, setUserPlan } = useFilter()
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState<string>()

  const { getFilterParams } = useFilter()
  const paramss = getFilterParams()
  const params = { params: paramss }

  // Carregar plano do localStorage ao montar o componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPlan = window.localStorage.getItem('userPlan')
      if (storedPlan) {
        setUserPlan(storedPlan as PanzerPlan)
      }
    }
  }, [setUserPlan])

  async function fetchUserData() {
    const response = await api.get('/users/me', params)
    return response.data
  }

  const { data: user } = useQuery<User>(['getUser'], fetchUserData)

  const formatPlanName = (planName: string): PanzerPlan => {
    const name = planName.toLowerCase()
    if (name.includes('pro hot')) return 'Panzer Pro Hot'
    if (name.includes('pro')) return 'Panzer Pro'
    if (name.includes('novice')) return 'Panzer Novice'
    if (name.includes('corner')) return 'Panzer Corner'
    return 'Panzer Novice'
  }

  const handlePlanChange = (planName: string) => {
    const formattedPlan = formatPlanName(planName)
    setUserPlan(formattedPlan)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('userPlan', formattedPlan)
    }
  }

  useEffect(() => {
    setPath(pathname)
  }, [pathname])

  return (
    <div className="flex items-center w-full justify-between rounded-b-[32px] border-t-0 border h-[86px] px-8 border-[#D2FD01]">
      <Link href={'/home'}>
        <Image src={logo} alt="logo" />
      </Link>
      <div className="flex gap-10 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`${path === '/home' ? 'text-[#D2FD01]' : ''} hover:text-[#D2FD01] transition-colors duration-300`}
              >
                {userPlan || 'Selecione um plano'}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col min-w-[170px] px-5">
                {user?.products.map((product, index) => (
                  <NavigationMenuLink
                    key={index}
                    onClick={() =>
                      handlePlanChange(product.resources.product_name)
                    }
                    className={`py-2 hover:text-[#D2FD01] cursor-pointer transition-colors duration-200 ${
                      userPlan ===
                      formatPlanName(product.resources.product_name)
                        ? 'text-[#D2FD01]'
                        : ''
                    }`}
                  >
                    {product.resources.product_name}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link
          href={'/plans'}
          className={`${path === '/plans' ? 'text-[#D2FD01]' : ''} hover:text-[#D2FD01] transition-colors duration-300`}
        >
          Meu Plano
        </Link>
        <Link
          href={'/suport'}
          className={`${path === '/suport' ? 'text-[#D2FD01]' : ''} hover:text-[#D2FD01] transition-colors duration-300`}
        >
          Suporte
        </Link>
        <Link
          href={'/tutorials'}
          className={`${path === '/tutorials' ? 'text-[#D2FD01]' : ''} hover:text-[#D2FD01] transition-colors duration-300`}
        >
          Tutoriais
        </Link>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Bem vindo, Marcos</NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col min-w-[170px] px-5">
              <NavigationMenuLink
                onClick={() => router.push('/profile')}
                className="py-2 hover:text-[#D2FD01] cursor-pointer transition-colors duration-200"
              >
                Perfil
              </NavigationMenuLink>
              <NavigationMenuLink className="py-2 hover:text-[#D2FD01] transition-colors duration-200">
                Logout
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
