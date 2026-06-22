import { BankOutlined, LinkOutlined, ScheduleOutlined } from '@ant-design/icons';
import { ArrowLeftIcon } from '@boolti/icon';
import { useSuperAdminConcertHallDetail } from '@boolti/api';
import { useParams } from 'react-router-dom';

import { HREF, PATH } from '~/constants/routes';
import Styled from './ConcertHallNavigation.styles';

const ConcertHallNavigation = () => {
  const params = useParams<{ hallId: string }>();
  const hallId = Number(params.hallId);
  const { data: concertHall } = useSuperAdminConcertHallDetail(hallId);

  const navigationItems = [
    { label: '공연장 정보', icon: <BankOutlined />, link: HREF.CONCERT_HALL_INFO(hallId) },
    { label: '대관 정보', icon: <ScheduleOutlined />, link: HREF.CONCERT_HALL_RENTAL(hallId) },
    { label: '데이터 연결', icon: <LinkOutlined />, link: HREF.CONCERT_HALL_DATA(hallId) },
  ];

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HallName>{concertHall?.name ?? ''}</Styled.HallName>
      </Styled.Header>
      <Styled.Navigation>
        <Styled.MenuItemList>
          {navigationItems.map((item) => (
            <Styled.MenuItem key={item.label}>
              <Styled.MenuLink to={item.link}>
                {item.icon}
                {item.label}
              </Styled.MenuLink>
            </Styled.MenuItem>
          ))}
        </Styled.MenuItemList>
      </Styled.Navigation>

      <Styled.Footer>
        <Styled.HomeButton to={PATH.INDEX}>
          <ArrowLeftIcon /> <span style={{ paddingLeft: '8px' }}>슈퍼 어드민 홈</span>
        </Styled.HomeButton>
      </Styled.Footer>
    </Styled.Container>
  );
};

export default ConcertHallNavigation;
