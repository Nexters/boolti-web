import { Helmet } from 'react-helmet-async';

interface Props {
  nickname: string;
  introduction: string;
  imgPath: string;
  userCode: string;
}

export const Meta = ({ nickname, introduction, imgPath, userCode }: Props) => {
  const title = `#{${nickname}}`;
  const description = introduction || '핫한 공연 예매의 시작, 불티';
  const profileUrl = `https://profile.boolti.in/${userCode}`;
  const ogImage =
    userCode && userCode.length > 0
      ? `https://api.boolti.in/web/papi/v2/users/${userCode}/profile-image`
      : imgPath;

  return (
    <Helmet>
      <link rel="shortcut icon" href="https://profile.boolti.in/favicon.png" />

      <title>{title}</title>
      <link rel="canonical" href={profileUrl} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="불티" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={profileUrl} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
        </>
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="profile.boolti.in" />
      <meta property="twitter:url" content={profileUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}
    </Helmet>
  );
};
