import { Helmet } from 'react-helmet-async';

interface Props {
  nickname: string;
  introduction: string;
  imgPath: string;
}

export const Meta = ({ nickname, introduction, imgPath }: Props) => {
  return (
    <Helmet>
      <title>{nickname} - 불티 프로필</title>
      <meta
        name="description"
        content={introduction || `${nickname}의 불티 프로필 페이지입니다.`}
      />
      <meta property="og:title" content={`${nickname} - 불티 프로필`} />
      <meta
        property="og:description"
        content={introduction || `${nickname}의 불티 프로필 페이지입니다.`}
      />
      {imgPath && <meta property="og:image" content={imgPath} />}
    </Helmet>
  );
};
