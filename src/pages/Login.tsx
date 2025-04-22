import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAuthenticated, login, register } from '../utils/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  function handleLogin() {
    const ok = login(email, password)
    if (ok) {
      navigate('/dashboard')
    } else {
      alert('Login inválido. Tente novamente.')
    }
  }

  function handleRegister() {
    register(email, password)
    alert('Usuário cadastrado com sucesso! Faça o login.')
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        className="w-full border p-2 mb-2"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-4"
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 mr-2 rounded"
        onClick={handleLogin}
      >
        Entrar
      </button>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded"
        onClick={handleRegister}
      >
        Cadastrar
      </button>
    </div>
  )
}
