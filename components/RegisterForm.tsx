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
import Image from 'next/image'
import logotipo from '@/assets/logotipo.svg'

const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email('Por favor, insira um e-mail válido'),
  phone_number: z.string(),
  cpf: z.string(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type RegisterFormData = z.infer<typeof RegisterSchema>

export const RegisterForm = () => {
  const { handleRegister, isLoading } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  })

  // Estado para alternar entre exibir ou ocultar a senha
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: RegisterFormData) => {
    handleRegister(data)
  }

  return (
    <div className="flex max-w-[1100px] gap-28 mx-auto">
      <div className="flex flex-col items-center  ">
        <div>
          <Image src={logotipo} width={350} alt="logotipo" />
        </div>
        <div className="bg-[#1E1E27] bg-opacity-50 px-14 py-6 rounded-xl w-full">
          <div className="text-[1.7rem] mb-4">Entrar</div>
          <div className="text-[14px]">Faça login para acessar sua conta</div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 py-8 w-[310px]"
          >
            <div className="flex">
              <Input
                id="name"
                type="text"
                placeholder="Nome completo"
                {...register('name')}
              />
            </div>
            <div className="flex">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register('email')}
              />
            </div>
            <div className="flex">
              <Input
                id="phone"
                type="tel"
                placeholder="Telefone"
                {...register('phone_number')}
              />
            </div>
            <div className="flex">
              <Input
                id="cpf"
                type="text"
                placeholder="Cpf"
                {...register('cpf')}
              />
            </div>
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
                <div className="flex  items-center gap-2">
                  Carregando... <FaFutbol className="animate-spin" />
                </div>
              ) : (
                'Cadastrar minha conta'
              )}
            </Button>
          </form>
        </div>
      </div>
      <Image
        className="-mt-40 -z-10"
        src={jogador}
        width={500}
        height={700}
        alt="jogador"
      />
    </div>
  )
}
