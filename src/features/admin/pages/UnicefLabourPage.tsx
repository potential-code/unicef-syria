import { BookOpen, FlaskConical, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BarChart, ChartCard, LineChart } from '@/components/charts'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LABOUR_LABEL,
  MONTHLY_TRENDS,
  OCCUPATION_DEMAND,
  REVIEWED_CANDIDATES,
  SKILL_DEMAND,
  SKILL_GAPS,
  VACANCY_RECORDS,
} from '@/data/labour'
import { formatDate } from '@/i18n'
import { useAllYouth } from '@/store/actions/youth'
import { CourseSummaryDialog } from '../components/CourseSummaryDialog'
import { EmployerFeedbackPanel } from '../components/EmployerFeedbackPanel'
import { InsightCard } from '../components/InsightCard'
import { ReadinessDialog } from '../components/ReadinessDialog'
import { SkillDemandList } from '../components/SkillDemandList'
import { useLabels } from '../lib/useLabels'

/** Labour-market insights, labelled as illustrative sample insights (brief §20). */
export function UnicefLabourPage() {
  const { t } = useTranslation('admin')
  const { l, n, value, lang } = useLabels()
  const youth = Object.values(useAllYouth())
  const c14 = youth.filter((y) => y.progress.C14).length
  const comm = SKILL_DEMAND[0]
  const sheets = SKILL_DEMAND[1]
  const month = (m: string) => formatDate(`${m}-01T12:00:00+03:00`, lang, { month: 'short' })
  const btn = 'rounded-full bg-white text-navy hover:bg-sky-100'
  return (
    <div className="space-y-6">
      <PageHeader title={t('labour.title')} description={t('labour.body')} />
      <p className="-mt-2 inline-flex items-center gap-2 rounded-full bg-yellow px-3 py-1 text-xs font-semibold text-ink shadow-xs">
        <FlaskConical className="size-3.5" aria-hidden />
        {l(LABOUR_LABEL)}
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
        <InsightCard
          label={t('labour.insight1')}
          sentence={t('labour.sentence1', {
            skill: l(comm?.skill),
            vac: comm?.vacancies,
            total: VACANCY_RECORDS,
            ready: comm?.candidatesReady,
            cand: REVIEWED_CANDIDATES,
          })}
        >
          <CourseSummaryDialog
            courseId="C03"
            trigger={
              <Button variant="secondary" size="sm" className={btn}>
                <BookOpen className="size-4" aria-hidden />
                {t('labour.openC03')}
              </Button>
            }
          />
          <ReadinessDialog
            trigger={
              <Button variant="secondary" size="sm" className={btn}>
                <Users className="size-4" aria-hidden />
                {t('labour.viewReadiness')}
              </Button>
            }
          />
        </InsightCard>
        <InsightCard
          label={t('labour.insight2')}
          sentence={t('labour.sentence2', {
            vac: sheets?.vacancies,
            total: VACANCY_RECORDS,
            ready: sheets?.candidatesReady,
            cand: REVIEWED_CANDIDATES,
          })}
          footer={t('labour.c14Live', { count: c14 })}
        >
          <CourseSummaryDialog
            courseId="C14"
            trigger={
              <Button variant="secondary" size="sm" className={btn}>
                <BookOpen className="size-4" aria-hidden />
                {t('labour.openC14')}
              </Button>
            }
          />
        </InsightCard>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
        <ChartCard
          title={t('labour.occupations')}
          subtitle={t('labour.occupationsSub', { total: VACANCY_RECORDS })}
          table={{
            columns: [t('labour.occupation'), t('labour.vacancies')],
            rows: OCCUPATION_DEMAND.map((o) => [l(o.occupation), o.vacancies]),
          }}
        >
          <BarChart
            data={OCCUPATION_DEMAND.map((o) => ({
              key: o.occupation.en,
              label: l(o.occupation),
              value: o.vacancies,
            }))}
            seriesLabel={t('labour.vacancies')}
            format={n}
          />
        </ChartCard>
        <SkillDemandList />
      </div>
      <section className="card overflow-hidden" aria-labelledby="gaps-title">
        <div className="px-5 pt-4 pb-3">
          <h2 id="gaps-title" className="text-base font-semibold">
            {t('labour.gapsTitle')}
          </h2>
          <p className="mt-0.5 text-xs text-ink-soft">{t('labour.gapsSub')}</p>
        </div>
        <Table className="min-w-[32rem] sm:min-w-0 [&_th]:whitespace-normal">
          <TableHeader>
            <TableRow>
              {['sector', 'location', 'gap', 'severity'].map((c) => (
                <TableHead key={c} scope="col">
                  {t(`labour.col.${c}`)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {SKILL_GAPS.map((g) => (
              <TableRow key={`${g.sector.en}-${g.governorate}`}>
                <TableCell>{l(g.sector)}</TableCell>
                <TableCell>{value('governorate', g.governorate)}</TableCell>
                <TableCell className="font-medium">{l(g.gap)}</TableCell>
                <TableCell>
                  <StatusBadge
                    tone={
                      g.severity === 'high'
                        ? 'danger'
                        : g.severity === 'medium'
                          ? 'notice'
                          : 'neutral'
                    }
                  >
                    {t(`severity.${g.severity}`)}
                  </StatusBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
        <ChartCard
          title={t('labour.vacanciesTrend')}
          subtitle={t('labour.trendSub')}
          table={{
            columns: [t('labour.month'), t('labour.vacancies')],
            rows: MONTHLY_TRENDS.map((m) => [month(m.month), m.vacancies]),
          }}
        >
          <LineChart
            data={MONTHLY_TRENDS.map((m) => ({
              x: m.month,
              label: month(m.month),
              value: m.vacancies,
            }))}
            seriesLabel={t('labour.vacancies')}
          />
        </ChartCard>
        <ChartCard
          title={t('labour.placementsTrend')}
          subtitle={t('labour.placementsSub')}
          table={{
            columns: [t('labour.month'), t('labour.placements')],
            rows: MONTHLY_TRENDS.map((m) => [month(m.month), m.placements]),
          }}
        >
          <LineChart
            data={MONTHLY_TRENDS.map((m) => ({
              x: m.month,
              label: month(m.month),
              value: m.placements,
            }))}
            seriesLabel={t('labour.placements')}
            color="var(--unicef-navy)"
          />
        </ChartCard>
      </div>
      <EmployerFeedbackPanel />
    </div>
  )
}
