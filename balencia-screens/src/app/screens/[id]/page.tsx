import { notFound } from 'next/navigation'
import { HifiPrototypeScreen } from '@/components/hifi/HifiPrototype'
import { getScreenById, screens } from '@/data/screens'

export function generateStaticParams() {
  return screens.map(screen => ({ id: screen.id }))
}

export default async function ScreenPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const screen = getScreenById(id)

  if (!screen) notFound()

  return <HifiPrototypeScreen screen={screen} />
}
