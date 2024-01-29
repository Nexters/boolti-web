import { Apple } from './Apple';
import { ArrowLeft } from './ArrowLeft';
import { ArrowRight } from './ArrowRIght';
import { Calendar } from './Calendar';
import { ChevronLeft } from './ChevronLeft';
import { ChevronRight } from './ChevronRight';
import { Clock } from './Clock';
import { Close } from './Close';
import { Edit } from './Edit';
import { Github } from './Github';
import { Instagram } from './Instagram';
import { Kakaotalk } from './Kakaotalk';
import { Plus } from './Plus';
import { Search } from './Search';
import { Ticket } from './Ticket';
import { UpDown } from './UpDown';
import { Users } from './Users';
import { Wallet } from './Wallet';

type IconType =
  | 'apple'
  | 'github'
  | 'instagram'
  | 'kakaotalk'
  | 'ticket'
  | 'wallet'
  | 'users'
  | 'edit'
  | 'calendar'
  | 'clock'
  | 'search'
  | 'up-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-left'
  | 'arrow-right'
  | 'plus'
  | 'close';

interface Props {
  type: IconType;
  size: 20 | 24;
}

const iconMap: Record<IconType, ({ size }: Pick<Props, 'size'>) => JSX.Element> = {
  apple: Apple,
  github: Github,
  instagram: Instagram,
  kakaotalk: Kakaotalk,
  ticket: Ticket,
  wallet: Wallet,
  users: Users,
  edit: Edit,
  calendar: Calendar,
  clock: Clock,
  search: Search,
  'up-down': UpDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  plus: Plus,
  close: Close,
} as const;

const Icon = ({ type, size }: Props) => {
  return iconMap[type]({ size });
};

export default Icon;
export {
  Apple,
  Github,
  Instagram,
  Kakaotalk,
  Ticket,
  Wallet,
  Users,
  Edit,
  Calendar,
  Clock,
  Search,
  UpDown,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Plus,
  Close,
};
