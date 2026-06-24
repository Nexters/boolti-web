import { NavermapsProvider } from 'react-naver-maps';

interface Props {
  ncpKeyId: string;
  children: React.ReactNode;
}

// useNaverGeocode를 쓰기 위한 컨텍스트. geocoder submodule을 로드한다.
const NaverGeocodeProvider = ({ ncpKeyId, children }: Props) => (
  <NavermapsProvider ncpKeyId={ncpKeyId} submodules={['geocoder']}>
    {children}
  </NavermapsProvider>
);

export default NaverGeocodeProvider;
