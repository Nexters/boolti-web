import { ArrowLeftIcon } from '@boolti/icon';
import { useLocation, useParams } from 'react-router-dom';
import { HREF } from '~/constants/routes';
import Styled from './SideNavigation.styles';

const SideNavigation = () => {
  const location = useLocation();
  const { showId = '' } = useParams();

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
        <Styled.ShowId>#C1DF3H</Styled.ShowId>
        <Styled.ShowTitle>
          이렇게나 이름이 긴 쇼가 있다면 어떻게 노출되나 한 번 보자 ㅋㅋ
        </Styled.ShowTitle>
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
