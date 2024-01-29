import { Badge, Button, TextButton, ThemeProvider, Icon } from '@boolti/ui';
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
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="small" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="primary">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="primary" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<AppleIcon size={20} />} size="bold" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="medium" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="regular" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="small" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="primary" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<AppleIcon size={20} />} size="bold" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="medium" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="regular" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="small" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="netural" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="small" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="netural">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="netural" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button icon={<AppleIcon size={20} />} size="bold" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="medium" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="regular" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<AppleIcon size={20} />} size="x-small" colorTheme="line" disabled>
            BUTTON
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            width: 1200,
            justifyContent: 'space-between',
            marginBottom: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button size="bold" colorTheme="line">
            BUTTON
          </Button>
          <Button size="medium" colorTheme="line">
            BUTTON
          </Button>
          <Button size="regular" colorTheme="line">
            BUTTON
          </Button>
          <Button size="small" colorTheme="line">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="line">
            BUTTON
          </Button>
          <Button size="x-small" colorTheme="line" disabled>
            BUTTON
          </Button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <TextButton>TEXT BUTTON</TextButton>
          <TextButton icon={<AppleIcon size={20} />}>TEXT BUTTON</TextButton>
          <TextButton disabled>TEXT BUTTON</TextButton>
          <TextButton icon={<AppleIcon size={20} />} disabled>
            TEXT BUTTON
          </TextButton>
        </div>
        <div style={{ display: 'flex', width: 600, justifyContent: 'space-between' }}>
          <Badge colorTheme="purple">티켓 판매 오픈 D-n</Badge>
          <Badge colorTheme="blue">티켓 판매 중</Badge>
          <Badge colorTheme="green">티켓 판매 종료</Badge>
          <Badge colorTheme="red">공연 당일</Badge>
          <Badge colorTheme="grey">공연 종료</Badge>
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
    </BooltiUIProvider>
  );
};

export default App;
