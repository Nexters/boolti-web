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

  const ogTitle = '핫한 공연 예매의 시작, 불티';
  const ogDescription = '지금 불티에서 핫한 아티스트 정보를 확인해 보세요.';
  const ogImage = 'https://profile.boolti.in/profile_og_thumbnail.png';

  return (
    <Helmet>
      <link rel="shortcut icon" href="https://profile.boolti.in/favicon.png" />

      <title>{title}</title>
      <link rel="canonical" href={profileUrl} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content="불티" />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={profileUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="600" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="profile.boolti.in" />
      <meta property="twitter:url" content={profileUrl} />
      <meta property="twitter:title" content={ogTitle} />
      <meta property="twitter:description" content={ogDescription} />
      <meta property="twitter:image" content={ogImage} />
    </Helmet>
  );
};
