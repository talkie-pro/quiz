"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Check, ChevronLeft, ArrowRight, Stethoscope, School, ShoppingCart, Users, MessageCircle, ThumbsUp, HelpCircle, AlertTriangle } from 'lucide-react'
import Logo from './assets/logo.svg'
import ProgressBar from './components/ProgressBar'

interface QuestionOption {
  text: string
  next: number | null
  icon: React.ReactNode
  benefits: string[]
}

interface Question {
  id: number
  question: string
  options: QuestionOption[]
}

interface PlanOption {
  title: string
  price: string
  benefits: string[]
  price_id: string
}

interface PlanDetails {
  [key: string]: PlanOption
}

interface ClosingQuestion {
  id: number
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    question: '__NAME__, qual desafio de comunicação mais impacta sua vida?',
    options: [
      {
        text: 'Consultas médicas e emergências são meu maior desafio',
        next: 2,
        icon: <Stethoscope className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Evite mal-entendidos em situações médicas críticas',
          'Compreenda instruções médicas com precisão',
          'Comunique seus sintomas claramente',
        ],
      },
      {
        text: 'Acompanhamento escolar dos filhos em reuniões e tarefas',
        next: 5,
        icon: <School className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Participe ativamente da educação dos seus filhos',
          'Comunique-se eficazmente com professores',
          'Ajude nas tarefas de casa com confiança',
        ],
      },
      {
        text: 'Situações do dia a dia como compras e socialização',
        next: 8,
        icon: <ShoppingCart className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Faça pedidos em restaurantes facilmente',
          'Entenda instruções de produtos claramente',
          'Interaja com confiança no dia a dia',
        ],
      },
    ],
  },
  {
    id: 2,
    question: 'Já se sentiu inseguro durante uma consulta médica?',
    options: [
      {
        text: 'Sim, sinto muita insegurança nas consultas',
        next: 3,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Reduza a ansiedade em consultas médicas',
          'Entenda completamente as orientações do médico',
          'Evite erros por mal-entendidos',
        ],
      },
      {
        text: 'Às vezes, quando não tenho alguém para me ajudar',
        next: 3,
        icon: <Users className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Ganhe independência nas consultas médicas',
          'Comunique-se diretamente com profissionais de saúde',
          'Entenda termos médicos com facilidade',
        ],
      },
      {
        text: 'Não ainda, mas temo que possa acontecer',
        next: 3,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Prepare-se para futuras emergências médicas',
          'Aumente sua confiança em situações de saúde',
          'Evite mal-entendidos antes que ocorram',
        ],
      },
    ],
  },
  {
    id: 3,
    question: '59% dos erros médicos vêm de problemas de comunicação. Isso te preocupa?',
    options: [
      {
        text: 'Sim, esse dado me deixa muito apreensivo',
        next: 4,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Evite erros de tradução fatais',
          'Comunique alergias e condições médicas com precisão',
          'Entenda dosagens de medicamentos corretamente',
        ],
      },
      {
        text: 'Não sabia disso e agora estou preocupado',
        next: 4,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Aprenda sobre erros comuns de tradução médica',
          'Proteja-se contra mal-entendidos perigosos',
          'Aumente sua consciência sobre comunicação médica',
        ],
      },
      {
        text: 'Nunca tinha pensado nesse perigo antes',
        next: 4,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Descubra a importância da precisão na comunicação médica',
          'Previna erros de tradução desconhecidos',
          'Melhore sua compreensão de termos médicos',
        ],
      },
    ],
  },
  {
    id: 4,
    question: 'Como você se sentiria tendo um tradutor confiável para situações médicas?',
    options: [
      {
        text: 'Me sentiria muito mais seguro e confiante',
        next: 11,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Aumente sua confiança em consultas médicas',
          'Reduza o estresse em situações de saúde',
          'Obtenha cuidado médico sem barreiras linguísticas',
        ],
      },
      {
        text: 'Seria útil, mas precisaria entender melhor como funciona',
        next: 11,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Aborde suas preocupações com tradução médica',
          'Personalize a tradução para suas necessidades',
          'Ganhe controle sobre sua comunicação médica',
        ],
      },
      {
        text: 'Gostaria de saber mais detalhes antes de me decidir',
        next: 11,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Verifique a precisão das traduções em tempo real',
          'Use tecnologia confiável com respaldo profissional',
          'Construa confiança com resultados consistentes',
        ],
      },
    ],
  },
  {
    id: 5,
    question: 'Como a barreira do idioma limita sua participação na escola?',
    options: [
      {
        text: 'Tenho dificuldade em auxiliar nas tarefas escolares',
        next: 6,
        icon: <School className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Auxilie nas tarefas escolares com confiança',
          'Entenda o conteúdo das lições claramente',
          'Acompanhe o progresso acadêmico de perto',
        ],
      },
      {
        text: 'A comunicação com os professores é um grande desafio',
        next: 6,
        icon: <MessageCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Comunique-se eficazmente em reuniões escolares',
          'Discuta o desempenho e necessidades dos filhos claramente',
          'Construa parcerias fortes com educadores',
        ],
      },
      {
        text: 'Me sinto limitado em eventos e reuniões escolares',
        next: 6,
        icon: <Users className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Participe plenamente de eventos e atividades escolares',
          'Envolva-se na comunidade escolar com confiança',
          'Apoie a vida escolar dos seus filhos de forma abrangente',
        ],
      },
    ],
  },
  {
    id: 6,
    question: 'Sabia que o envolvimento dos pais pode aumentar em até 30% o desempenho escolar dos filhos?',
    options: [
      {
        text: 'Não sabia, agora entendo a importância de melhorar minha comunicação',
        next: 7,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Impulsione o desempenho acadêmico dos filhos',
          'Melhore seu inglês enquanto ajuda seus filhos',
          'Crie um ambiente de aprendizado positivo em casa',
        ],
      },
      {
        text: 'Sim, e gostaria de poder contribuir mais com a educação dos meus filhos',
        next: 7,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Supere a culpa e torne-se mais ativo na educação',
          'Encontre maneiras de contribuir, mesmo com limitações de idioma',
          'Melhore gradualmente seu envolvimento escolar',
        ],
      },
      {
        text: 'Entendo a importância, mas preciso de orientação para ajudar melhor',
        next: 7,
        icon: <School className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Descubra novas formas de apoiar a educação dos filhos',
          'Aprenda técnicas para ajudar com inglês limitado',
          'Aumente seu impacto no sucesso acadêmico dos filhos',
        ],
      },
    ],
  },
  {
    id: 7,
    question: 'Como se sentiria tendo um assistente de tradução para ajudar na educação dos filhos?',
    options: [
      {
        text: 'Seria transformador poder participar ativamente da educação deles',
        next: 11,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Participe ativamente de todas as áreas da educação',
          'Ajude nas tarefas de casa com confiança',
          'Comunique-se eficazmente com professores e administradores',
        ],
      },
      {
        text: 'Seria um grande apoio, mesmo com outros desafios',
        next: 11,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Supere obstáculos específicos na educação dos filhos',
          'Receba suporte personalizado para suas necessidades',
          'Melhore gradualmente sua participação escolar',
        ],
      },
      {
        text: 'Preciso entender melhor como isso me ajudaria',
        next: 11,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Descubra o impacto da tradução no cotidiano',
          'Elimine barreiras linguísticas em todas as interações',
          'Melhore sua qualidade de vida nos EUA',
        ],
      },
    ],
  },
  {
    id: 8,
    question: 'Onde você mais deseja se expressar sem barreiras?',
    options: [
      {
        text: 'Em restaurantes, ao fazer pedidos e entender o cardápio',
        next: 9,
        icon: <ShoppingCart className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Faça pedidos com confiança em qualquer restaurante',
          'Entenda cardápios complexos facilmente',
          'Comunique preferências dietéticas com precisão',
        ],
      },
      {
        text: 'Ao ler instruções e informações em produtos e serviços',
        next: 9,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Compreenda instruções de produtos claramente',
          'Evite erros de uso por mal-entendidos',
          'Faça escolhas informadas ao comprar produtos',
        ],
      },
      {
        text: 'Na interação social com vizinhos e colegas',
        next: 9,
        icon: <Users className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Melhore suas habilidades de socialização em inglês',
          'Participe ativamente de conversas com colegas e vizinhos',
          'Construa relacionamentos mais fortes na comunidade',
        ],
      },
    ],
  },
  {
    id: 9,
    question: 'Você já passou por constrangimentos sociais por mal-entendidos linguísticos?',
    options: [
      {
        text: 'Sim, frequentemente, o que tem abalado minha confiança',
        next: 10,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Aumente sua autoconfiança em interações sociais',
          'Evite mal-entendidos embaraçosos',
          'Expresse-se claramente em diversas situações',
        ],
      },
      {
        text: 'Às vezes, mas tento manter uma atitude positiva',
        next: 10,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Elimine constrangimentos linguísticos',
          'Participe de conversas com segurança',
          'Melhore suas habilidades de comunicação em inglês',
        ],
      },
      {
        text: 'Raramente, porque evito situações de possível constrangimento',
        next: 10,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Enfrente situações sociais com confiança',
          'Expanda seu círculo social sem medo',
          'Aproveite novas oportunidades de interação',
        ],
      },
    ],
  },
  {
    id: 10,
    question: 'Como se sentiria tendo um assistente de tradução para ajudar nas interações diárias?',
    options: [
      {
        text: 'Teria muito mais independência e segurança no dia a dia',
        next: 11,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Navegue por situações cotidianas com independência',
          'Comunique-se com confiança em qualquer cenário',
          'Expanda suas experiências nos EUA',
        ],
      },
      {
        text: 'Seria útil, mas me preocupo com o uso em público',
        next: 11,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Use a tradução discretamente em público',
          'Ganhe confiança gradualmente com o uso',
          'Personalize o uso para seu conforto',
        ],
      },
      {
        text: 'Preciso entender melhor o impacto real no meu cotidiano',
        next: 11,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Descubra como a tradução pode transformar seu cotidiano',
          'Elimine barreiras linguísticas em todas as interações',
          'Melhore sua qualidade de vida nos EUA',
        ],
      },
    ],
  },
  {
    id: 11,
    question: '__NAME__, e se você pudesse se comunicar com total confiança em qualquer situação?',
    options: [
      {
        text: 'Seria uma mudança transformadora na minha vida',
        next: 12,
        icon: <ThumbsUp className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Transforme sua experiência nos EUA',
          'Supere barreiras linguísticas com facilidade',
          'Alcance seu pleno potencial pessoal e profissional',
        ],
      },
      {
        text: 'Me interessa muito, quero conhecer os detalhes do serviço',
        next: 12,
        icon: <HelpCircle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Conheça uma solução acessível e fácil de usar',
          'Veja o retorno do seu investimento em qualidade de vida',
          'Experimente antes de se comprometer',
        ],
      },
      {
        text: 'Parece promissor, gostaria de mais informações',
        next: 12,
        icon: <AlertTriangle className="w-5 h-5 text-[#6E56CF]" />,
        benefits: [
          'Obtenha todas as informações necessárias para decidir',
          'Veja casos reais de sucesso com o Talkie',
          'Entenda como o Talkie se adapta às suas necessidades',
        ],
      },
    ],
  },
]

const closingQuestions: ClosingQuestion[] = [
  {
    id: 13,
    question: 'Você está pronto para transformar sua comunicação nos EUA?',
    options: [
      'Sim, quero conhecer os planos disponíveis',
      'Ainda tenho algumas dúvidas',
      'Preciso de mais tempo para pensar'
    ]
  },
  {
    id: 14,
    question: 'Ótimo! Qual a melhor opção para você?',
    options: [
      'Sim, quero começar a usar o Talkie agora mesmo',
      'Gostaria de conhecer melhor as opções de planos',
      'Preciso avaliar melhor meu orçamento'
    ]
  }
]

const planDetails: PlanDetails = {
  monthly: {
    title: 'Plano Flexível',
    price: '$20/mês',
    benefits: [
      'Tradução precisa e confiável em tempo real',
      'Ajuda em consultas médicas, reuniões escolares e tarefas diárias',
      'Suporte na sua língua',
      'Tecnologia fácil de usar, disponível no celular',
      'Cancele quando quiser',
    ],
    price_id: 'price_1QelpxCtj12TECPElkwlyxDl',
  }
}

const totalSteps = 17

export default function Component() {
  const [step, setStep] = useState<number>(0)
  const [history, setHistory] = useState<number[]>([])
  const [name, setName] = useState<string>('')
  const [inputName, setInputName] = useState<string>('')
  const [showResult, setShowResult] = useState<boolean>(false)
  const [showAnimation, setShowAnimation] = useState<boolean>(false)
  const [percentage, setPercentage] = useState<number>(0)
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [responses, setResponses] = useState<{ [key: number]: string }>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('monthly')
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    const storedResponses = localStorage.getItem('userResponses')
    if (storedName) {
      setName(storedName)
      setStep(1)
    }
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses))
    }
  }, [])

  useEffect(() => {
    if (name) {
      localStorage.setItem('userName', name)
    }
  }, [name])

  useEffect(() => {
    localStorage.setItem('userResponses', JSON.stringify(responses))
  }, [responses])

  useEffect(() => {
    if (step > 0) {
      setSelectedOption(null)
    }
  }, [step])

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement && videoElement.src) {
      if (!videoElement.src.includes('autoplay=1')) {
        videoElement.src = `${videoElement.src}&autoplay=1`
      }
    }
  }, [selectedPlan])

  const currentQuestion = questions.find((q) => q.id === step)

  const handleNext = (nextStep: number | null, optionText: string) => {
    setResponses((prev) => ({ ...prev, [step]: optionText }))
    if (nextStep === 12) {
      setShowAnimation(true)
      animateCalculation()
    } else if (nextStep !== null) {
      setHistory([...history, step])
      setStep(nextStep)
    }
  }

  const animateCalculation = () => {
    setAnimationStep(0)
    const interval = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev < 2) {
          return prev + 1
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setShowAnimation(false)
            setShowResult(true)
            calculatePercentage()
            setStep(12)
          }, 1000)
          return prev
        }
      })
    }, 1500)
  }

  const handleBack = () => {
    if (history.length > 0) {
      const previousSteps = [...history]
      const prevStep = previousSteps.pop()!
      setHistory(previousSteps)
      setStep(prevStep)
      setResponses((prev) => {
        const { [prevStep]: _, ...rest } = prev
        return rest
      })
    } else if (step === 1) {
      setName('')
      setInputName('')
      setStep(0)
      setResponses({})
      setSelectedOption(null)
    }
    setSelectedOption(null)
  }

  const handleStart = () => {
    setName(inputName)
    setStep(1)
  }

  const calculatePercentage = () => {
    const basePercentage = 90
    const variation = Math.random() * 9
    const finalPercentage = basePercentage + variation
    setPercentage(parseFloat(finalPercentage.toFixed(1)))
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const renderProgressBar = () => {
    return (
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-10">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-4">
          <button
            onClick={handleBack}
            className="flex items-center text-[#6E56CF] focus:outline-none hover:text-[#5B46B3] transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Voltar</span>
          </button>
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#6E56CF] h-3 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-base text-[#6C6F7F]">
            Etapa {currentStep}/{totalSteps}
          </span>
        </div>
      </div>
    )
  }

  const renderNameInput = () => (
    <motion.div
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-lg px-4 mb-[10px]"
    >
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
      <h1 className="text-xl font-semibold text-[#2D2B42] text-left mb-2">
        Em 3 minutos, descubra como transformar sua comunicação nos EUA.
      </h1>
      <h2 className="text-xl text-[#6C6F7F] text-left mb-6">
        Antes de começarmos, como podemos te chamar?
      </h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputName.trim()) {
              handleStart();
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-xl text-lg h-[45px] focus:outline-none focus:border-[#6E56CF] transition-colors duration-200"
          placeholder="Digite aqui seu primeiro nome"
          autoFocus
          autoComplete="off"
          inputMode="text"
        />
        <div className="flex justify-end pb-[10px]">
          <button
            onClick={handleStart}
            disabled={!inputName.trim()}
            className={`flex items-center justify-center bg-[#6E56CF] text-white rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-200 h-[45px] ${
              !inputName.trim() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )

  const renderQuestion = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestion?.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md mx-auto mt-[50px]"
      >
        <h2 className="text-xl font-semibold text-[#2D2B42] mb-6 text-left">
          {currentQuestion?.question.replace('__NAME__', name)}
        </h2>
        <div className="space-y-4">
          {currentQuestion?.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.2, 
                delay: index * 0.05
              }}
              className="w-full"
            >
              <button
                onClick={() => handleNext(option.next, option.text)}
                className="w-full relative overflow-hidden bg-white border-2 border-gray-100 rounded-2xl transition-transform duration-200 ease-out active:scale-95"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-200" />
                <div className="relative flex items-center gap-4 p-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F8F5FF] flex items-center justify-center transition-colors duration-200">
                    {option.icon}
                  </div>
                  <span className="text-lg text-[#2D2B42] text-left">{option.text}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )

  const renderAnimation = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#F8F9FC] flex items-center justify-center z-50"
    >
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.div className="w-16 h-16 border-4 border-[#6E56CF] border-t-transparent rounded-full mb-4 animate-spin" />
        <motion.h2
          className="text-2xl font-bold text-[#2D2B42] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {animationStep === 0 && 'Analisando respostas'}
          {animationStep === 1 && 'Entendendo seu perfil'}
          {animationStep === 2 && 'Preparando melhor recomendação'}
        </motion.h2>
        <motion.p
          className="text-[#6C6F7F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Por favor, aguarde um momento...
        </motion.p>
      </motion.div>
    </motion.div>
  )

  const generateSummary = () => {
    let summary: string[] = []
    
    // Get all responses and their corresponding benefits
    Object.entries(responses).forEach(([stepStr, responseText]) => {
      const step = parseInt(stepStr)
      const question = questions.find(q => q.id === step)
      if (question) {
        const selectedOption = question.options.find(o => o.text === responseText)
        if (selectedOption?.benefits) {
          summary = [...summary, ...selectedOption.benefits]
        }
      }
    })

    // Remove duplicates and limit to most relevant benefits
    summary = Array.from(new Set(summary))
    return summary.slice(0, 5) // Return top 5 most relevant benefits
  }

  const renderResult = () => (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md mx-auto mt-[50px]"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        className="text-xl font-semibold text-[#2D2B42] mb-8 text-left"
      >
        {name}, o Talkie pode aumentar sua confiança em até {percentage}% nestas situações cruciais:
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="mb-8 text-left"
      >
        <ul className="list-disc pl-5 space-y-2">
          {generateSummary().map((item, index) => (
            <li key={index} className="text-lg text-[#6C6F7F]">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
        className="flex justify-end"
      >
        <button
          onClick={() => setStep(15)}
          className="inline-block bg-[#6E56CF] hover:bg-[#5B46B3] text-white rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-200 flex items-center justify-center"
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5 inline-block" />
        </button>
      </motion.div>
    </motion.div>
  )

  const renderClosingQuestion = (questionId: number) => {
    if (questionId === 15) {
      const firstResponse = responses[1]
      const firstQuestion = questions.find(q => q.id === 1)
      const selectedOption = firstQuestion?.options.find(o => o.text === firstResponse)
      const specificBenefits = selectedOption?.benefits || []

      return (
        <motion.div 
          className="min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="max-w-lg mx-auto px-2 min-h-screen"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={120}
                height={40}
                className="w-[120px] h-auto"
                priority
              />
            </motion.div>

            <motion.div 
              className="text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-[#6C6F7F] text-lg">
                Transforme sua comunicação nos EUA com tradução em tempo real
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6E56CF] via-[#9B7EFF] to-[#6E56CF]" />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2D2B42]">Plano Mensal</h3>
                    <p className="text-[#6C6F7F] mt-1">Flexibilidade para você</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#6E56CF]">$20</div>
                    <div className="text-[#6C6F7F] text-sm">por mês</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {specificBenefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F0EDFF] flex items-center justify-center mt-1">
                        <Check className="w-3 h-3 text-[#6E56CF]" />
                      </div>
                      <p className="text-[#2D2B42] leading-tight">{benefit}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="space-y-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <div className="flex items-center gap-2 text-sm text-[#6C6F7F]">
                    <Check className="w-4 h-4 text-[#6E56CF]" />
                    <span>Cancele quando quiser</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="px-8 pb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
              >
                <button
                  onClick={() => window.location.href = 'https://buy.stripe.com/14k2aA4Aybzw5ZS8x4'}
                  className="w-full bg-gradient-to-r from-[#6E56CF] to-[#9B7EFF] hover:from-[#5B46B3] hover:to-[#8B6EFF] text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Assinar Agora
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              <div className="flex items-center justify-center gap-2 text-[#6C6F7F] text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Pagamento 100% seguro via Stripe</span>
              </div>
              <p className="text-xs text-[#6C6F7F]">
                Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )
    }

    const closingQuestion = closingQuestions.find(q => q.id === questionId)
    if (!closingQuestion) return null

    return (
      <motion.div
        key={questionId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-lg mx-auto mt-[50px]"
      >
        <h2 className="text-xl font-semibold text-[#2D2B42] mb-6 text-left">
          {closingQuestion.question}
        </h2>
        <div className="space-y-4">
          {closingQuestion.options.map((option: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <button
                onClick={() => handleClosingOption(questionId, option)}
                className="w-full bg-white border-2 border-gray-100 rounded-2xl p-4 hover:border-[#6E56CF] active:scale-[0.98] transition-all duration-200"
              >
                <span className="text-lg text-[#2D2B42] text-left">{option}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  const handleClosingOption = (questionId: number, option: string) => {
    setSelectedOption(option)

    switch (questionId) {
      case 13:
        setStep(14)
        break
      case 14:
        if (
          option === 'Sim, quero começar a usar o Talkie agora mesmo' ||
          option === 'Gostaria de conhecer melhor as opções de planos'
        ) {
          setStep(15)
        }
        break
      case 15:
        setSelectedPlan('monthly')
        setStep(16)
        break
    }
  }

  const handleCheckout = () => {
    window.location.href = 'https://buy.stripe.com/14k2aA4Aybzw5ZS8x4'
  }

  const renderPlanDetails = () => {
    if (!selectedPlan || !planDetails[selectedPlan]) return null

    const plan = planDetails[selectedPlan]
    const firstResponse = responses[1]
    const firstQuestion = questions.find(q => q.id === 1)
    const selectedOption = firstQuestion?.options.find(o => o.text === firstResponse)

    const commonBenefits = [
      'Tradução precisa e confiável em tempo real',
      'Suporte nativo em sua língua'
    ]

    const specificBenefits = selectedOption?.benefits.slice(0, 3) || []

    return (
      <motion.div
        key="plan-details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto mt-[50px]"
      >
        <div className="flex justify-center mb-6">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={50}
            className="w-[150px] h-auto"
            priority
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-[#2D2B42] mb-4">{plan.title}</h2>
            <p className="text-4xl font-bold text-[#6E56CF] mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-8">
              {[...commonBenefits, ...specificBenefits].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-[#6E56CF] mr-2 flex-shrink-0 mt-1" />
                  <span className="text-[#6C6F7F]">{benefit}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#6E56CF] hover:bg-[#5B46B3] text-white rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-200"
            >
              Assinar Agora
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  const renderConfirmation = () => (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mt-[50px] text-center"
    >
      <h2 className="text-3xl font-bold text-[#2D2B42] mb-6">Parabéns!</h2>
      <p className="text-xl text-[#6C6F7F] mb-8">
        Você agora tem acesso ao Talkie! Faça login e comece a transformar sua comunicação.
      </p>
      <button
        onClick={() => (window.location.href = 'https://example.com/download-app')}
        className="bg-[#6E56CF] hover:bg-[#5B46B3] text-white rounded-xl px-6 py-3 text-lg font-semibold transition-all duration-200"
      >
        Fazer Login
      </button>
    </motion.div>
  )

  // Função para mapear o step atual para um número sequencial
  const getProgressStep = (currentStep: number) => {
    // Identifica qual rota baseado na primeira resposta (step 1)
    const firstResponse = responses[1];
    let totalStepsInRoute = 4; // Padrão

    if (firstResponse) {
      if (firstResponse.includes('Consultas médicas')) {
        // Rota médica: 1 -> 2 -> 3 -> 4 -> 11 -> 12
        totalStepsInRoute = 6;
        if (currentStep === 11) return 5;
        if (currentStep === 12) return 6;
        return currentStep;
      } else if (firstResponse.includes('Acompanhamento escolar')) {
        // Rota escolar: 1 -> 5 -> 6 -> 7 -> 11 -> 12
        totalStepsInRoute = 6;
        if (currentStep === 5) return 2;
        if (currentStep === 6) return 3;
        if (currentStep === 7) return 4;
        if (currentStep === 11) return 5;
        if (currentStep === 12) return 6;
        return currentStep;
      } else if (firstResponse.includes('Situações do dia')) {
        // Rota dia a dia: 1 -> 8 -> 9 -> 10 -> 11 -> 12
        totalStepsInRoute = 6;
        if (currentStep === 8) return 2;
        if (currentStep === 9) return 3;
        if (currentStep === 10) return 4;
        if (currentStep === 11) return 5;
        if (currentStep === 12) return 6;
        return currentStep;
      }
    }

    // Antes da primeira escolha, mostra apenas o passo 1
    return currentStep <= 1 ? currentStep : 1;
  };

  const getTotalSteps = () => {
    // Todas as rotas têm 6 passos no total
    return 6;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F8F9FC] to-white text-[#2D2B42] font-inter">
      {step > 0 && step <= 12 && (
        <ProgressBar 
          currentStep={getProgressStep(step)} 
          totalSteps={6} 
          onBack={handleBack}
        />
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {step === 0 && renderNameInput()}
        {step > 0 && step < 12 && renderQuestion()}
        {showAnimation && renderAnimation()}
        {step === 12 && renderResult()}
        {step === 15 && renderClosingQuestion(step)}
        {step === 16 && renderPlanDetails()}
        {step === 17 && renderConfirmation()}
      </div>
      <footer className="py-4 bg-transparent text-center text-[#6C6F7F] text-sm">
        Feito com <span className="text-red-500">❤️</span> em Boston
      </footer>
    </div>
  )
}