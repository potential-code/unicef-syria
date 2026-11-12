import type { QuizQuestion } from '@shared/types'
import { Link } from '@tanstack/react-router'
import { CircleCheck, LifeBuoy, RotateCcw, SearchX, WandSparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyState } from '@/components/shared/EmptyState'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { COURSE_BY_ID } from '@/data/courses'
import { needsTrainerSupport, QUIZ_ATTEMPTS, QUIZ_PASS, quizPassed } from '@/domain/completion'
import { arrangeOptions, scoreQuiz } from '@/domain/quiz'
import { useLocalized } from '@/i18n'
import { cn } from '@/lib/utils'
import { completeCourseShortcut, isCohortCourse, submitQuiz } from '@/store/actions/learning'
import { useMyYouth } from '@/store/hooks'
import { CompletionPanel } from '../components/CompletionPanel'
import { PracticalPanel } from '../components/PracticalPanel'
import { QuizFeedback } from '../components/QuizFeedback'
import { QuizForm } from '../components/QuizForm'
import { CAREER_LINKS } from '../config'
import { isCourseId } from '../lib'

/** Final quiz (5 questions, 80% pass, two attempts), practical task and completion. */
export function QuizPage({ courseId }: { courseId: string }) {
  const { t } = useTranslation('learn')
  const { l } = useLocalized()
  const youth = useMyYouth()
  const valid = isCourseId(courseId)
  const course = valid ? COURSE_BY_ID[courseId] : null
  const questions = useMemo<QuizQuestion[]>(
    () => (course ? course.quiz.map((q, i) => arrangeOptions(q, i)) : []),
    [course],
  )
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null))
  const [result, setResult] = useState<{ score: number; wrong: QuizQuestion[] } | null>(null)

  if (!valid || !course) {
    return (
      <>
        <PageHeader
          title={t('course.notFound')}
          crumbs={[{ label: t('library.title'), to: '/youth/library' }, { label: courseId }]}
        />
        <EmptyState icon={SearchX} title={t('course.notFound')} body={t('course.notFoundBody')} />
      </>
    )
  }

  const p = youth.progress[course.id]
  const passed = quizPassed(p)
  const support = needsTrainerSupport(p)
  const attempts = p?.quizAttempts.length ?? 0
  const reviewed = isCohortCourse(youth, course.id)
  const unitsLeft = !p || p.units.some((u) => u !== 'done')

  const submit = () => {
    const correct = questions.map((q, i) => answers[i] === q.correct)
    const score = scoreQuiz(correct)
    submitQuiz(youth.id, course.id, score)
    setResult({ score, wrong: questions.filter((_, i) => !correct[i]) })
    if (score >= QUIZ_PASS) toast.success(t('quiz.passedToast', { score }))
  }
  const retry = () => {
    setAnswers(questions.map(() => null))
    setResult(null)
  }
  const shortcut = () => {
    completeCourseShortcut(youth.id, course.id)
    toast.success(t('quiz.shortcutDone'))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title={t('quiz.title')}
        description={l(course.title)}
        crumbs={[
          { label: t('library.title'), to: '/youth/library' },
          { label: l(course.title), to: `/youth/library/${course.id}` },
          { label: t('quiz.title') },
        ]}
      />

      {p?.completedAt ? (
        <CompletionPanel courseId={course.id} progress={p} />
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-cyan/50 bg-white p-3">
          <span className="text-xs font-bold uppercase tracking-wide text-ink-soft">
            {t('presenter')}
          </span>
          <Button variant="secondary" size="sm" className="rounded-full" onClick={shortcut}>
            <WandSparkles className="size-4" aria-hidden />
            {t('quiz.shortcut')}
          </Button>
        </div>
      )}

      <p className="rounded-2xl bg-sky-100 p-4 text-sm text-navy">
        {t('quiz.rules', { n: course.quiz.length, pass: QUIZ_PASS, attempts: QUIZ_ATTEMPTS })}
      </p>
      {unitsLeft && !passed && (
        <p className="rounded-2xl bg-notice-soft p-4 text-sm text-notice">{t('quiz.unitsLeft')}</p>
      )}

      {result && (
        <section
          className={cn(
            'rounded-3xl p-5 sm:p-6',
            result.score >= QUIZ_PASS ? 'bg-success-soft' : 'bg-notice-soft',
          )}
          aria-live="polite"
        >
          <p className="text-sm font-bold uppercase tracking-wide">{t('quiz.yourScore')}</p>
          <p className="text-5xl font-extrabold tabular-nums">{result.score}%</p>
          <p className="mt-1 font-semibold">
            {result.score >= QUIZ_PASS ? t('quiz.passed') : t('quiz.notYet', { pass: QUIZ_PASS })}
          </p>
          <QuizFeedback courseId={course.id} wrong={result.wrong} />
          {result.score < QUIZ_PASS && !support && (
            <Button className="mt-4 rounded-full" onClick={retry}>
              <RotateCcw className="size-4" aria-hidden />
              {t('quiz.retry', { left: QUIZ_ATTEMPTS - attempts })}
            </Button>
          )}
        </section>
      )}

      {support && (
        <section className="rounded-3xl bg-navy p-5 text-white on-dark sm:p-6">
          <h2 className="flex items-center gap-2 text-xl text-white">
            <LifeBuoy className="size-5 text-yellow" aria-hidden />
            {t('quiz.supportTitle')}
          </h2>
          <p className="mt-2 text-white/90">{t('quiz.supportBody', { best: p?.quizBest ?? 0 })}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild className="rounded-full bg-white text-navy hover:bg-sky-100">
              <Link to={reviewed ? CAREER_LINKS.cohort : CAREER_LINKS.mentors}>
                {reviewed ? t('quiz.contactTrainer') : t('quiz.askMentor')}
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/youth/learn/$courseId/$unit" params={{ courseId: course.id, unit: '1' }}>
                {t('quiz.reviewUnits')}
              </Link>
            </Button>
          </div>
        </section>
      )}

      {!passed && !support && !result && (
        <QuizForm
          questions={questions}
          answers={answers}
          attempt={attempts + 1}
          onAnswer={(q, o) => setAnswers((a) => a.map((x, i) => (i === q ? o : x)))}
          onSubmit={submit}
        />
      )}

      {passed && (
        <>
          {!result && (
            <p className="flex items-center gap-2 rounded-2xl bg-success-soft p-4 font-semibold text-success">
              <CircleCheck className="size-5" aria-hidden />
              {t('quiz.passedBest', { score: p?.quizBest ?? 0 })}
            </p>
          )}
          <PracticalPanel youthId={youth.id} course={course} progress={p} reviewed={reviewed} />
        </>
      )}
    </div>
  )
}
