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

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [path, setPath] = useState<string>()
  useEffect(() => {
    setPath(pathname)
  }, [pathname])
  console.log(path)
  return (
    <div className="flex items-center w-full justify-between rounded-b-[32px] border-t-0 border h-[86px] px-8 border-[#D2FD01]">
      <Link href={'/home'}>
        <Image src={logo} alt="logo" />
      </Link>
      <div className="flex gap-10">
        <Link
          href={'/home'}
          className={`${path === '/home' ? 'text-[#D2FD01]' : ''} hover:text-[#D2FD01] transition-colors duration-300`}
        >
          Panzer Pro Hot
        </Link>
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
          Turoriais
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
