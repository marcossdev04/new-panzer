'use client'
import jogador from '@/assets/jogador.png'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FaFutbol } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useAuth } from '@/Store/useAuth'
import Link from 'next/link'
import Image from 'next/image'
import logotipo from '@/assets/logotipo.svg'

const loginSchema = z.object({
  email: z.string().email('Por favor, insira um e-mail válido'),
  password: z.string().min(9, 'A senha deve ter pelo menos 9 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { handleSignIn, isLoading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Estado para alternar entre exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: LoginFormData) => {
    handleSignIn(data)
  }

  return (
    <div className="flex max-w-[1100px] mobile:max-w-[350px] gap-28 mobile:gap-0 mx-auto">
      <div className="flex flex-col mobile:z-20 items-center">
        <div>
          <Image
            src={logotipo}
            width={250}
            alt="logotipo"
            className="desktop:hidden laptop:hidden tablet:hidden"
          />
          <Image
            src={logotipo}
            width={350}
            alt="logotipo"
            className="mobile:hidden"
          />
        </div>
        <div className="bg-[#1E1E27] bg-opacity-50 px-14 mobile:px-5 py-6 rounded-xl w-full">
          <div className="text-[1.7rem] mb-4">Entrar</div>
          <div className="text-[14px]">Faça login para acessar sua conta</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 py-8 w-[310px]"
          >
            {/* Campo de E-mail */}
            <div className="flex flex-col">
              <Input
                id="email"
                type="email"
                placeholder="Insira seu e-mail"
                {...register('email')}
              />
            </div>

            {/* Campo de Senha com opção de mostrar/ocultar */}
            <div className="flex flex-col relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Insira sua senha"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-white"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={16} />
                ) : (
                  <AiFillEye size={16} />
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-lg bg-[#D2FD01] py-6 hover:bg-[#D2FD01] hover:bg-opacity-80"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Carregando... <FaFutbol className="animate-spin" />
                </div>
              ) : (
                <div className="w-full text-lg">Login</div>
              )}
            </Button>
          </form>
          <div className="flex justify-center mt-2 mb-1">
            Não tem conta?{' '}
            <Link href={'/register'} className="text-[#D2FD01] pl-2">
              Cadastre-se
            </Link>
          </div>
          <Link className="text-[#D2FD01] flex justify-center" href={'/'}>
            Esqueceu sua senha?
          </Link>
        </div>
      </div>
      <Image
        className="-mt-40 -z-10 mobile:absolute mobile:z-0 mobile:-bottom-4 mobile:left-2"
        src={jogador}
        width={500}
        height={700}
        alt="jogador"
      />
    </div>
  )
}
