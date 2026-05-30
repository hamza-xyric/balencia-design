import figma from '@figma/code-connect'
import { CreditCard } from 'lucide-react'
import { TransactionRow } from '@/components/domain/TransactionRow'

// Figma SET 194:10 — Direction[Income,Expense]->isIncome (Income->true). `icon` is required.
figma.connect(TransactionRow, 'BALENCIA_DS?node-id=194-10', {
  props: {
    isIncome: figma.enum('Direction', { Income: true, Expense: false }),
  },
  example: (props) => (
    <TransactionRow
      merchant="Whole Foods"
      date="Today"
      amount={42.5}
      isIncome={props.isIncome}
      icon={<CreditCard size={18} />}
    />
  ),
})
