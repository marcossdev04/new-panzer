'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { FaFutbol } from 'react-icons/fa'
import { z } from 'zod'
import { Button } from './ui/button'
import { useState } from 'react'
import { Input } from './ui/input'
import { api } from '@/api/api'
import { User } from '@/types/User'
import { useQuery } from 'react-query'
import { queryClient } from '@/api/QueryClient'
import { toast } from 'react-toastify'

const UpdateUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email('Por favor, insira um e-mail válido'),
    phone_number: z.string(),
    cpf: z.string(),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'], // path do erro
  })
type UpdateUserFormData = z.infer<typeof UpdateUserSchema>

export function UpdateUser() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function fetchUserData() {
    const response = await api.get('/users/me')
    return response.data
  }
  const { data: user } = useQuery<User>(['getUserProfile'], fetchUserData, {
    onSuccess: (data) => {
      // Opção 2: Usar reset para atualizar os valores
      reset({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        cpf: data.cpf,
        password: '', // Manter senha vazia
      })
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors }, // adicionar errors
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      cpf: user?.cpf || '',
      password: '',
      confirmPassword: '',
    },
  })
  console.log(user?.id)
  async function onSubmit(data: UpdateUserFormData) {
    try {
      setLoading(true)
      await api.put(`/users/${user?.id}/`, {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
        phone: data.phone_number,
      })
      setLoading(false)
      await queryClient.refetchQueries(['getUserProfile'])
      toast.success('Usuário editado com sucesso!', {
        position: 'bottom-right',
        theme: 'dark',
        closeOnClick: true,
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false)
      console.log(err)
      toast.error(
        err.response.data.non_field_errors[0] ===
          'CPF is invalid. Please, try again.'
          ? 'Digite um cpf válido'
          : 'Erro ao editar o cliente',
        {
          position: 'bottom-right',
          theme: 'dark',
          closeOnClick: true,
        },
      )
    }
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
        <div className="flex mobile:col-span-2 flex-col relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Insira a nova senha"
            className={errors.password ? 'border-red-500' : ''}
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
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex mobile:col-span-2 flex-col relative">
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirme a nova senha"
            className={errors.confirmPassword ? 'border-red-500' : ''}
            {...register('confirmPassword')}
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
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
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
