import type { Role } from '@shared/types'
import {
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Compass,
  FileCheck2,
  FolderOpen,
  GraduationCap,
  HandHeart,
  Handshake,
  LayoutDashboard,
  type LucideIcon,
  Map as MapIcon,
  MessagesSquare,
  Network,
  Route,
  School,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wrench,
} from 'lucide-react'

export interface NavItem {
  /** i18n key under common:nav.<role>. */
  key: string
  to: string
  icon: LucideIcon
  /** Exact match only (role home). */
  exact?: boolean
}

export const NAV: Record<Role, NavItem[]> = {
  youth: [
    { key: 'dashboard', to: '/youth', icon: LayoutDashboard, exact: true },
    { key: 'discovery', to: '/youth/discovery', icon: Compass },
    { key: 'path', to: '/youth/path', icon: Route },
    { key: 'programmes', to: '/youth/programmes', icon: School },
    { key: 'library', to: '/youth/library', icon: BookOpen },
    { key: 'cohort', to: '/youth/cohort', icon: CalendarCheck },
    { key: 'coaches', to: '/youth/coaches', icon: Bot },
    { key: 'mentors', to: '/youth/mentors', icon: HandHeart },
    { key: 'toolkit', to: '/youth/toolkit', icon: Wrench },
    { key: 'opportunities', to: '/youth/opportunities', icon: Briefcase },
    { key: 'community', to: '/youth/community', icon: MessagesSquare },
    { key: 'progress', to: '/youth/progress', icon: Award },
  ],
  trainer: [
    { key: 'dashboard', to: '/trainer', icon: LayoutDashboard, exact: true },
    { key: 'applications', to: '/trainer/applications', icon: UserCheck },
    { key: 'cohorts', to: '/trainer/cohorts', icon: Users },
    { key: 'sessions', to: '/trainer/sessions', icon: CalendarCheck },
    { key: 'resources', to: '/trainer/resources', icon: FolderOpen },
    { key: 'assessments', to: '/trainer/assessments', icon: ClipboardCheck },
    { key: 'results', to: '/trainer/results', icon: FileCheck2 },
  ],
  employer: [
    { key: 'dashboard', to: '/employer', icon: LayoutDashboard, exact: true },
    { key: 'profile', to: '/employer/profile', icon: Building2 },
    { key: 'opportunities', to: '/employer/opportunities', icon: Briefcase },
    { key: 'candidates', to: '/employer/candidates', icon: Search },
    { key: 'applications', to: '/employer/applications', icon: UserCheck },
    { key: 'placements', to: '/employer/placements', icon: Handshake },
  ],
  centre: [
    { key: 'overview', to: '/centre', icon: LayoutDashboard, exact: true },
    { key: 'courses', to: '/centre/courses', icon: BookOpen },
    { key: 'participants', to: '/centre/participants', icon: Users },
    { key: 'trainers', to: '/centre/trainers', icon: GraduationCap },
    { key: 'sessions', to: '/centre/sessions', icon: CalendarCheck },
    { key: 'results', to: '/centre/results', icon: FileCheck2 },
    { key: 'reports', to: '/centre/reports', icon: BarChart3 },
  ],
  partner: [
    { key: 'overview', to: '/partner', icon: LayoutDashboard, exact: true },
    { key: 'centres', to: '/partner/centres', icon: Building2 },
    { key: 'programmes', to: '/partner/programmes', icon: Route },
    { key: 'participants', to: '/partner/participants', icon: Users },
    { key: 'outcomes', to: '/partner/outcomes', icon: TrendingUp },
    { key: 'reports', to: '/partner/reports', icon: BarChart3 },
  ],
  unicef: [
    { key: 'overview', to: '/unicef', icon: MapIcon, exact: true },
    { key: 'partners', to: '/unicef/partners', icon: Network },
    { key: 'programmes', to: '/unicef/programmes', icon: Route },
    { key: 'inclusion', to: '/unicef/inclusion', icon: HandHeart },
    { key: 'outcomes', to: '/unicef/outcomes', icon: TrendingUp },
    { key: 'labour', to: '/unicef/labour', icon: Sparkles },
    { key: 'followup', to: '/unicef/followup', icon: ShieldCheck },
    { key: 'admin', to: '/unicef/admin', icon: Settings },
  ],
  viewer: [{ key: 'overview', to: '/viewer', icon: BarChart3, exact: true }],
}
