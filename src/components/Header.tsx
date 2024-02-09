import Image from "next/image"
import Logo from "@/assets/logo-top.png"
import { Container } from "./Container"

export default function Header (){
  return(
<header className="bg-white">
      <Container className="py-2">
        <Image src={Logo} alt="Logo" />
        <h2 className="text-3xl ml-4">Lista de Países</h2>
      </Container>
    </header>
  )
}