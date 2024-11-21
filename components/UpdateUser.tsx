'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FaFutbol } from 'react-icons/fa'
import { z } from 'zod'
import { Button } from './ui/button'
import { useState } from 'react'
import { Input } from './ui/input'

const UpdateUserSchema = z.object({
  name: z.string(),
  email: z.string().email('Por favor, insira um e-mail válido'),
  phone_number: z.string(),
  cpf: z.string(),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})
type UpdateUserFormData = z.infer<typeof UpdateUserSchema>

export function UpdateUser() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(UpdateUserSchema),
  })
  const onSubmit = (data: UpdateUserFormData) => {
    setLoading(true)
    console.log(data)
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 py-8 grid grid-cols-2 items-end gap-3 w-full"
      >
        <div className="flex items-center">
          <Input
            id="name"
            type="text"
            placeholder="Nome completo"
            {...register('name')}
          />
        </div>
        <div className="flex items-center">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
        </div>
        <div className="flex items-center">
          <Input
            id="phone"
            type="tel"
            placeholder="Telefone"
            {...register('phone_number')}
          />
        </div>
        <div className="flex items-center">
          <Input id="cpf" type="text" placeholder="Cpf" {...register('cpf')} />
        </div>
        <div className="flex flex-col relative items-center">
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
        <div className="flex flex-col relative items-center">
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
          className="w-full text-lg col-span-2 bg-[#D2FD01] py-6 hover:bg-[#D2FD01] hover:bg-opacity-80"
        >
          {loading ? (
            <div className="flex  items-center gap-2">
              Carregando... <FaFutbol className="animate-spin" />
            </div>
          ) : (
            'Atualizar Perfil'
          )}
        </Button>
      </form>
    </div>
  )
}
