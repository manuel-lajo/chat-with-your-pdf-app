import { useEffect } from "react";
import { Inter } from "next/font/google";
import axios from "axios";
import Box from "@/components/Box"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    const requestAPI = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      console.log(response.data)
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
