import { Badge, Button, TextButton, ThemeProvider, Icon } from '@boolti/ui';
import {
  Apple,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Close,
  Edit,
  Github,
  Instagram,
  Kakaotalk,
  Plus,
  Search,
  Ticket,
  UpDown,
  Users,
  Wallet,
} from '@boolti/ui/src/components/Icon';

const App = () => {
  return (
    <ThemeProvider>
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
          <Button icon={<Icon size={20} type="apple" />} size="bold" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="medium" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="regular" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="small" colorTheme="primary">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="x-small" colorTheme="primary">
            BUTTON
          </Button>
          <Button
            icon={<Icon size={20} type="apple" />}
            size="x-small"
            colorTheme="primary"
            disabled
          >
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
          <Button icon={<Icon size={20} type="apple" />} size="bold" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="medium" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="regular" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="small" colorTheme="netural">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="x-small" colorTheme="netural">
            BUTTON
          </Button>
          <Button
            icon={<Icon size={20} type="apple" />}
            size="x-small"
            colorTheme="netural"
            disabled
          >
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
          <Button icon={<Icon size={20} type="apple" />} size="bold" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="medium" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="regular" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="x-small" colorTheme="line">
            BUTTON
          </Button>
          <Button icon={<Icon size={20} type="apple" />} size="x-small" colorTheme="line" disabled>
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
          <TextButton icon={<Icon size={20} type="apple" />}>TEXT BUTTON</TextButton>
          <TextButton disabled>TEXT BUTTON</TextButton>
          <TextButton icon={<Icon size={20} type="apple" />} disabled>
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
          <Apple size={20} /> <Apple size={24} />
          <Github size={20} /> <Github size={24} />
          <Instagram size={20} /> <Instagram size={24} />
          <Kakaotalk size={20} /> <Kakaotalk size={24} />
          <Ticket size={20} /> <Ticket size={24} />
          <Wallet size={20} /> <Wallet size={24} />
          <Users size={20} /> <Users size={24} />
          <Edit size={20} /> <Edit size={24} />
          <Calendar size={20} /> <Calendar size={24} />
          <Clock size={20} /> <Clock size={24} />
          <Search size={20} /> <Search size={24} />
          <UpDown size={20} /> <UpDown size={24} />
          <ChevronRight size={20} /> <ChevronRight size={24} />
          <ChevronLeft size={20} /> <ChevronLeft size={24} />
          <ArrowLeft size={20} /> <ArrowLeft size={24} />
          <ArrowRight size={20} /> <ArrowRight size={24} />
          <Plus size={20} /> <Plus size={24} />
          <Close size={20} /> <Close size={24} />
        </div>
      </h1>
    </ThemeProvider>
  );
};

export default App;
