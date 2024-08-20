import { ArrowLeftIcon } from '@boolti/icon';
import Styled from './SideNavigation.styles';

const SideNavigation = () => {
  const navigationItems = [
    {
      title: '공연 정보 관리',
      children: [
        { label: '공연 정보', link: '/' },
        { label: '티켓 관리', link: '/' },
      ],
    },
    {
      title: '방문자 관리',
      children: [
        { label: '결제 관리', link: '/' },
        { label: '입장 관리', link: '/' },
      ],
    },
    {
      title: '정산 관리',
      children: [{ label: '정산 내역서', link: '/' }],
    },
  ];

  return (
    <Styled.Container>
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
