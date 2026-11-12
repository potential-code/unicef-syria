import { createFileRoute } from '@tanstack/react-router'
import { CertificatePage } from '@/features/learn/pages/CertificatePage'

export const Route = createFileRoute('/youth/certificate/$courseId')({
  component: CertificateRoute,
})

function CertificateRoute() {
  const { courseId } = Route.useParams()
  return <CertificatePage key={courseId} courseId={courseId} />
}
