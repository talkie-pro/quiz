"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Logo from '../assets/logo.svg'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Verifica se veio do pagamento
    const paymentIntent = searchParams.get('payment_intent')
    if (paymentIntent) {
      setShowSuccess(true)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de login
    window.location.href = 'https://app.talkie.com/dashboard'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FC] px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={50}
            className="w-[150px] h-auto"
            priority
          />
        </div>

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <p className="text-green-800 text-center">
              Pagamento confirmado com sucesso! Faça login para acessar sua conta.
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-[#2D2B42] mb-6">
            Bem-vindo ao Talkie
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2D2B42] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#6E56CF] transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2D2B42] mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:border-[#6E56CF] transition-colors duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6E56CF] hover:bg-[#5B46B3] text-white rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-200"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-sm text-[#6C6F7F] text-center">
            Esqueceu sua senha? <a href="#" className="text-[#6E56CF] hover:underline">Recuperar acesso</a>
          </p>
        </div>
      </div>
    </div>
  )
} 