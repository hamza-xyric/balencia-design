import figma from '@figma/code-connect'
import { NotificationRow } from '@/components/screens/NotificationRow'

// Figma SET 170:48 — State[Unread,Read]->unread, Category[Sia,Reminder,CheckIn,Social]->category
// (CheckIn->'check-in'). Title/Preview/Timestamp TEXT map 1:1.
figma.connect(NotificationRow, 'BALENCIA_DS?node-id=170-48', {
  props: {
    title: figma.string('Title'),
    preview: figma.string('Preview'),
    timestamp: figma.string('Timestamp'),
    unread: figma.enum('State', { Unread: true, Read: false }),
    category: figma.enum('Category', {
      Sia: 'sia',
      Reminder: 'reminder',
      CheckIn: 'check-in',
      Social: 'social',
    }),
  },
  example: (props) => (
    <NotificationRow
      category={props.category}
      title={props.title}
      preview={props.preview}
      timestamp={props.timestamp}
      unread={props.unread}
    />
  ),
})
