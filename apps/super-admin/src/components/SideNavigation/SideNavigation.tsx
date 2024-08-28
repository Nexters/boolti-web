import { ArrowLeftIcon } from '@boolti/icon';
import { useLocation, useParams } from 'react-router-dom';
import { HREF } from '~/constants/routes';
import Styled from './SideNavigation.styles';
import { useAdminShowInfo } from '@boolti/api';
import StatusBadge from '../StatusBadge/StatusBadge';

const SideNavigation = () => {
  const location = useLocation();
  const params = useParams<{ showId: string }>();
  const showId = Number(params.showId);
  const { data: showInfo } = useAdminShowInfo(showId);
  const { id = 0, showName = '', superAdminShowStatus = 'SALES_BEFORE' } = showInfo ?? {};

  const navigationItems = [
    {
      title: '공연 정보 관리',
      children: [
        { label: '공연 정보', link: HREF.INFO(showId) },
        { label: '티켓 관리', link: HREF.TICKET(showId) },
      ],
    },
    {
      title: '방문자 관리',
      children: [
        { label: '결제 관리', link: HREF.PAYMENT(showId) },
        { label: '입장 관리', link: HREF.ENTRANCE(showId) },
      ],
    },
    {
      title: '정산 관리',
      children: [{ label: '정산 내역서', link: HREF.SETTLEMENT(showId) }],
    },
  ];

  return (
    <Styled.Container path={location.pathname}>
      <Styled.Header>
        <Styled.ShowId>{id}</Styled.ShowId>
        <Styled.ShowTitle style={{ marginBottom: 7 }}>{showName}</Styled.ShowTitle>
        <StatusBadge status={superAdminShowStatus} />
      </Styled.Header>
      <Styled.Navigation>
        {navigationItems.map((item) => (
          <Styled.MenuWrapper key={item.title}>
            <Styled.MenuTitle>{item.title}</Styled.MenuTitle>
            <Styled.MenuItemList>
              {item.children.map((child) => (
                <Styled.MenuItem key={child.label}>
                  <Styled.MenuLink to={child.link}>{child.label}</Styled.MenuLink>
                </Styled.MenuItem>
              ))}
            </Styled.MenuItemList>
          </Styled.MenuWrapper>
        ))}
      </Styled.Navigation>

      <Styled.Footer>
        <Styled.HomeButton to="/">
          <ArrowLeftIcon /> <span style={{ paddingLeft: '8px' }}>슈퍼 어드민 홈</span>
        </Styled.HomeButton>
      </Styled.Footer>
    </Styled.Container>
  );
};

export default SideNavigation;
