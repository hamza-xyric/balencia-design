import figma from '@figma/code-connect'
import { MealCard } from '@/components/domain/MealCard'
import { meals } from '@/data/mock'

// Figma 216:55 — data-driven (meals array). Shown with the real mock meals.
figma.connect(MealCard, 'BALENCIA_DS?node-id=216-55', {
  example: () => <MealCard meals={meals} />,
})
