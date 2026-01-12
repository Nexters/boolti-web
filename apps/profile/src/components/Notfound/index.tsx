import { Confirm } from '@boolti/ui';
import Layout from '~/components/Layout';
import { EXTERNAL_DOMAIN } from '~/constants/external';

import Styled from './Notfound.styles';

const NotFound = () => {
  return (
    <Layout>
      <Styled.Header />
      <Styled.CoverSection>
        <Styled.CoverImage
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgQChENDRAPDQ8QDQ0NEBANDQ8NDQ8PFBEWFhUdExMZHCggGBolGxUTITEhJSkrLi42Fx85ODMsNygtLisBCgoKDg0OFxAQFS4dICU3NSsrLS0rMC0rLSstKzctLSs1Ky03KystNS0rKy0tLS0rKysrKzc3LS03KysrKysrN//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEBAQADAQAAAAAAAAAAAAAAAQUCBAYD/8QAMRABAAIAAwYCCQUBAQAAAAAAAAECAwQRBRIhMUFRMnEiYXKRkqGxweEzQlKB0SMU/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAHhEBAQEBAAIDAQEAAAAAAAAAAAECEQMxIUFREhP/2gAMAwEAAhEDEQA/APVgr6L5qCoKKIIoAAAAAAAAAAAAAIKAgoCCgIKAgoCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAKogCiKAAIAAAAAAAAAAAACAqiAKIAogAqAgAKAAKigACAAAAA5Uw72nSsTPlGr71yGYnpEecwlsiyWusO1Oz8x2ifK0PhiYOLXxVmP64e87DlcAFQABABQAAAAAAAQAFAAFRQABAACIno0crs+OeJ8P8Arns7KxEb9uc8vVDustb+o1zj7qVrERpEREdo4KDNqAA6eZyFLcaejPb9s/4y71tE6TGkw9A62dy0XrrHijl6/U0zv9Z6x+McBqxQAUAAAAAAAEABQABUUAAQfbJ4W/ixHTnPlD4tDZFeNreUOdXkdZna0QGD0AAAAAAMjaWFu4uscrcf76uq1Nq1/wCcT2t9YZbfN7GG5yoA6cgAAAAAAAAAAACooAAg09k+C3tR9GY72yr6XmveNfc536d49tMBg3AAAAAAdXaf6M+1VkNLa1/RrX17zNbY9MN+0AduQAAAAAAAQAFAAFRQABBywsSa3i0c4nVxBW/h3rasWjlMauTHyWamk6TxrPylr1tExrE6xPWGGs8b511QHLoAAJmIjWeEDLz+c3vQp4es9/wsnXOtcdfNY2/iTbpyjyfIG7BAFAAAAAAAAQAFAAFRQABAAB9cDMYlJ9GeHWJ5S+Qi9auFtHCnxa1n3w7FcfBnlavvhhI5uI7nkrfnGwo52r8UPhi5/AjlO9Pq/wBY6p/nC+SuxmM5iX4eGvaPu64O5OOLegCogAoAAAAAAAIACgACooAAgPtl8tiXnhwjrM8mngZPCpx03p7z9nN1I7zm1mYWUxrcq6R3nhDt4ezP5W+GPu0Bnd1pMR1a7Py8dJnzmXOMnl/4R833HPa6/mfj4/8Ajy/8I+bhbIZeekx5TLsh2n8z8Z99mR+23xQ6uLk8evONY714todTdc3EeeG1j5TCvzjSe8cJ/LMzOVxKc+Ne8fdpNSs9YsdcB05AAAAAAABAAUAAVFAdvJZOb+lbhX52/Djkctv21nwxz9c9mxEQz3rnxHeM9+aViIjSOER0gBk2AAAAAAAACYjTSeIAy89kt306eHrHb8Oi9GyNoZXdner4Z+Utca+qy1n7jpgNGYAAAAAIACgADlSk2tFY5zOji0NlYWtpvPThHmlvIsna7+Dh1rSKx0+cuYPO9AAAAAAAAAAAACuOJStqzWeUxo5Ajz+PhTS81np84cGntbC9GLx04T5dGY3zexhqcoA6QAAAEABQABt5Gm7g19cb3vYkRxehrGkRHaIhn5Gnj9qAyagAAAAAAAAAAAKAI4Y9N7DtXvE+9596N5/MV0xLR2tP1aeNn5HABqzAAABAAUABywvHX2o+r0Dz+F46+1X6vQMvI18f2AM2gAAAAAAAAAAACgCDCzv69/a+zdYee/Xv5/Z34/bjfp8AGzIAAAB//9k="
          alt="기본 프로필"
        />
        <Styled.CoverOverlay>
          <Styled.ProfileInfo>
            <Styled.Nickname>-</Styled.Nickname>
            <Styled.UserName>-</Styled.UserName>
          </Styled.ProfileInfo>
        </Styled.CoverOverlay>
      </Styled.CoverSection>

      <Confirm
        confirmText="불티 홈 바로 가기"
        onConfirm={() => {
          window.location.href = EXTERNAL_DOMAIN.SHOW_MANAGER;
        }}
      >
        존재하지 않는 프로필입니다.
      </Confirm>
    </Layout>
  );
};

export default NotFound;
