import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@/hooks/use-page-title'
import { CentresSection } from '../components/home/CentresSection'
import { EventsSection } from '../components/home/EventsSection'
import { FeaturedCourses } from '../components/home/FeaturedCourses'
import { FinalCta } from '../components/home/FinalCta'
import { Hero } from '../components/home/Hero'
import { JourneyPath } from '../components/home/JourneyPath'
import { PartnerBand } from '../components/home/PartnerBand'
import { RoutesShowcase } from '../components/home/RoutesShowcase'
import { RegisterPrompt } from '../components/RegisterPrompt'
import { useGate } from '../hooks/use-gate'

/** P01 public homepage: the showpiece, with heavy scroll motion (homepage only). */
export function HomePage() {
  const { t } = useTranslation('public')
  usePageTitle(t('home.title'))
  const gate = useGate()
  return (
    <>
      <Hero />
      <RoutesShowcase />
      <JourneyPath />
      <FeaturedCourses />
      <CentresSection />
      <EventsSection gate={gate} />
      <PartnerBand />
      <FinalCta />
      <RegisterPrompt prompt={gate.prompt} onClose={gate.close} />
    </>
  )
}
