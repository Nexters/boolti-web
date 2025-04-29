import Styled from './ShowPreview.styles';

interface Props {
  showCastTeams: Array<{
    name: string;
    members?: {
      roleName: string;
      userNickname: string;
      userImgPath: string;
    }[];
  }>;
}

const ShowCastInfo = ({ showCastTeams }: Props) => {
  return (
    <Styled.CastInfo>
      {showCastTeams.length > 0 ? (
        showCastTeams.map((team, teamIndex) => (
          <Styled.ShowInfoGroup key={teamIndex}>
            <Styled.ShowInfoTitleContainer>
              <Styled.ShowInfoTitle>{team.name}</Styled.ShowInfoTitle>
            </Styled.ShowInfoTitleContainer>
            {team.members && team.members.length > 0 && (
              <Styled.ShowCastList>
                {team.members.map((member, memberIndex) => (
                  <Styled.ShowCastListItem key={memberIndex}>
                    <Styled.UserImage
                      style={
                        {
                          '--imgPath': `url(${member.userImgPath})`,
                        } as React.CSSProperties
                      }
                    />
                    <Styled.UserInfoWrap>
                      <Styled.UserNickname>{member.userNickname}</Styled.UserNickname>
                      <Styled.UserRoleName>{member.roleName}</Styled.UserRoleName>
                    </Styled.UserInfoWrap>
                  </Styled.ShowCastListItem>
                ))}
              </Styled.ShowCastList>
            )}
          </Styled.ShowInfoGroup>
        ))
      ) : (
        <Styled.EmptryCastTeam>
          <Styled.EmptyCastTeamTitle>COMING SOON</Styled.EmptyCastTeamTitle>
          <Styled.EmptyCastTeamDescription>조금만 기다려주세요!</Styled.EmptyCastTeamDescription>
        </Styled.EmptryCastTeam>
      )}
    </Styled.CastInfo>
  );
};

export default ShowCastInfo;
