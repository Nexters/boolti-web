import './index.css';
import 'the-new-css-reset/css/reset.css';
import { TextButton, BooltiUIProvider, Footer } from '@boolti/ui';
import {
  AppleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  EditIcon,
  GithubIcon,
  InstagramIcon,
  KakaotalkIcon,
  PlusIcon,
  SearchIcon,
  TicketIcon,
  UpDownIcon,
  UsersIcon,
  WalletIcon,
} from '@boolti/icon';

const App = () => {
  return (
    <BooltiUIProvider>
      <h1>
        Preview
        <div style={{ marginBottom: 20 }}>
          <TextButton>TEXT BUTTON</TextButton>
          <TextButton icon={<AppleIcon size={20} />}>TEXT BUTTON</TextButton>
          <TextButton disabled>TEXT BUTTON</TextButton>
          <TextButton icon={<AppleIcon size={20} />} disabled>
            TEXT BUTTON
          </TextButton>
        </div>
        <div style={{ color: 'blue' }}>
          <AppleIcon size={20} /> <AppleIcon size={24} />
          <GithubIcon size={20} /> <GithubIcon size={24} />
          <InstagramIcon size={20} /> <InstagramIcon size={24} />
          <KakaotalkIcon size={20} /> <KakaotalkIcon size={24} />
          <TicketIcon size={20} /> <TicketIcon size={24} />
          <WalletIcon size={20} /> <WalletIcon size={24} />
          <UsersIcon size={20} /> <UsersIcon size={24} />
          <EditIcon size={20} /> <EditIcon size={24} />
          <CalendarIcon size={20} /> <CalendarIcon size={24} />
          <ClockIcon size={20} /> <ClockIcon size={24} />
          <SearchIcon size={20} /> <SearchIcon size={24} />
          <UpDownIcon size={20} /> <UpDownIcon size={24} />
          <ChevronRightIcon size={20} /> <ChevronRightIcon size={24} />
          <ChevronLeftIcon size={20} /> <ChevronLeftIcon size={24} />
          <ArrowLeftIcon size={20} /> <ArrowLeftIcon size={24} />
          <ArrowRightIcon size={20} /> <ArrowRightIcon size={24} />
          <PlusIcon size={20} /> <PlusIcon size={24} />
          <CloseIcon size={20} /> <CloseIcon size={24} />
        </div>
      </h1>
      <Footer />
    </BooltiUIProvider>
  );
};

export default App;
