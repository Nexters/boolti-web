import { Button } from '@boolti/ui';
import Styled from './AuthoritySettingDialogContent.styles';
import { useState } from 'react';
import AuthorityChipDropdown from './components/AuthorityChipDropdown';

const AuthoritySettingDialog = () => {
  const [memberId, setMemberId] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const members = [
    {
      id: 1,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAyMDExMTlfMTI0/MDAxNjA1Nzg0MDM2NjMw.KOUhEY3F3bk4jdxqFei8BDlfVz-wFdwzOOR4tzl4k0Qg.SUBKIqGISiJNvot08WEAJpAXUWnsZqhL97wWqbkJ118g.PNG.gngnt2002/K-020.png?type=w800',
      name: '강동원',
      self: true,
      type: '관리자',
    },
    {
      id: 2,
      image:
        'https://i.namu.wiki/i/gJ9E3yHA7x1q72mqv2xFo1GkIvUU5bF95Uzxlx1HzT9qUhLFlcpcmj7Xajy174jj_S-XPbZ13c2DBQ1K6RwooQ.webp',
      name: '카리나',
      self: false,
      type: '관리자',
    },
    {
      id: 3,
      image:
        'https://i.namu.wiki/i/72wQVmBqzX6o6ifnMa3NX8_RpUd5pgtgr4-NzS3JPl5_rONzaLN1i7DdvbLgQWDE4ShzXV66OIWXChK-VVEQxg.webp',
      name: '이재용',
      self: false,
      type: '관리자',
    },
    {
      id: 4,
      image:
        'https://i.namu.wiki/i/lcV9XB7SKPBcm9ymD9ybubbu9s88pt3VkeQF6XGlqTdhAyDCzS6ZJ3dg50tWT7vLF0_TNzVXiy1c_zfUNWfPFQ.webp',
      name: '트럼프',
      self: false,
      type: '관리자',
    },
  ];

  return (
    <Styled.Container>
      <Styled.Form onSubmit={onSubmit}>
        <Styled.InputWrapper text={memberId}>
          <Styled.Input
            placeholder="초대할 팀원의 식별 코드를 입력해 주세요"
            value={memberId}
            onChange={onChange}
          />
          {memberId && <AuthorityChipDropdown />}
        </Styled.InputWrapper>
        <Button disabled={!memberId} size="bold" colorTheme="netural">
          초대하기
        </Button>
      </Styled.Form>
      <Styled.MemberListWrapper>
        <Styled.MemberListTitle>팀원</Styled.MemberListTitle>
        <Styled.MemberList>
          {members.map((member) => (
            <Styled.MemberListItem key={member.id}>
              <Styled.MemberInfoWrapper>
                <Styled.MemberImage src={member.image} alt="member image" />
                <Styled.MemberName>{member.name}</Styled.MemberName>
                {member.self && <Styled.MemberSelfLabel>(나)</Styled.MemberSelfLabel>}
              </Styled.MemberInfoWrapper>
              <Styled.MemberType>{member.type}</Styled.MemberType>
            </Styled.MemberListItem>
          ))}
        </Styled.MemberList>
      </Styled.MemberListWrapper>
    </Styled.Container>
  );
};

export default AuthoritySettingDialog;
