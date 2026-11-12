import { useTranslation } from 'react-i18next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { POINTS } from '@/domain/points'
import { POINT_RULES } from '../config'

/** Points rules from the brief (§14 Y12). */
export function PointsRules() {
  const { t } = useTranslation('learn')
  return (
    <div className="overflow-x-auto rounded-3xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('progress.ruleAction')}</TableHead>
            <TableHead className="text-end">{t('progress.rulePoints')}</TableHead>
            <TableHead>{t('progress.ruleCondition')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {POINT_RULES.map((k) => (
            <TableRow key={k}>
              <TableCell className="font-semibold">{t(`progress.rules.${k}.action`)}</TableCell>
              <TableCell className="text-end font-bold tabular-nums">
                {POINTS[k] > 0 ? `+${POINTS[k]}` : POINTS[k]}
              </TableCell>
              <TableCell className="text-sm text-ink-soft">
                {t(`progress.rules.${k}.condition`)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
