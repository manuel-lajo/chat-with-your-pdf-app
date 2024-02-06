import { Inter } from 'next/font/google'

import PdfChat from '@/components/PdfChat'

const inter = Inter({ subsets: ['latin'] })

export default function MainPage() {
  return (
    <main className={`xl:h-screen px-6 xl:px-20 pt-4 xl:pt-10 pb-6 xl:pb-16 ${inter.className}`}>
      <div className="text-xl lg:text-2xl font-bold pb-1 xlpb-4">
        <span>Chat with your PDF</span>
      </div>
      <div className="flex xl:h-full flex-col items-center justify-between">
        <PdfChat />
      </div>
    </main>
  )
}
