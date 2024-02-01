import { useEffect } from "react";
import { Inter } from "next/font/google";
import Box from "@/components/Box"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await response.json()
      console.log(data)
    }

    requestAPI()
  }, [])

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>

      <div className="flex place-items-center">
        <Box text="Place your content here"></Box>
      </div>

    </main>
  );
}
