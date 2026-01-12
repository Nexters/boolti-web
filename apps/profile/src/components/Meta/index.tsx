import { Helmet } from 'react-helmet-async';

interface Props {
  nickname: string;
  introduction: string;
  userCode: string;
}

export const Meta = ({ nickname, introduction, userCode }: Props) => {
  const title = `#{${nickname}}`;
  const description = introduction || '핫한 공연 예매의 시작, 불티';
  const profileUrl = `https://profile.boolti.in/${userCode}`;

  return (
    <Helmet>
      <link rel="shortcut icon" href="https://profile.boolti.in/favicon.png" />

      <title>{title}</title>
      <link rel="canonical" href={profileUrl} />
      <meta name="description" content={description} />
    </Helmet>
  );
};
