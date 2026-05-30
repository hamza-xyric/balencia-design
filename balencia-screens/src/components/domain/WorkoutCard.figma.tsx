import figma from '@figma/code-connect'
import { WorkoutCard } from '@/components/domain/WorkoutCard'

// Figma 213:47 — no variant axes; required workout data shown representatively.
figma.connect(WorkoutCard, 'BALENCIA_DS?node-id=213-47', {
  example: () => (
    <WorkoutCard
      name="Upper Body Strength"
      type="Strength"
      duration="45 min"
      exercises={['Bench Press', 'Rows', 'Overhead Press']}
      overflowCount={4}
    />
  ),
})
