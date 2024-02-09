"use client"
import Link from "next/link"
import { Container } from "@/components/Container"

export default function Error(){
  return (
    <Container>
      <Link href="/">Voltar</Link>
      <h1 className="text-3xl font-bold">Erro</h1>
    </Container>
  )
}