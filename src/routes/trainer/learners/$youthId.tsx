import { createFileRoute } from '@tanstack/react-router'
import { TrainerLearnerPage } from '@/features/trainer/pages/TrainerLearnerPage'

export const Route = createFileRoute('/trainer/learners/$youthId')({
  component: function LearnerRoute() {
    const { youthId } = Route.useParams()
    return <TrainerLearnerPage key={youthId} youthId={youthId} />
  },
})
