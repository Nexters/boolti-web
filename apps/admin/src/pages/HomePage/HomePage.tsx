import { useToast, useDialog, useConfirm } from '@boolti/ui';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import { PATH } from '../../constants/routes';
import Styled from './HomePage.styles';

const HomePage = () => {
  const toast = useToast();

  const dialog1 = useDialog();
  const dialog2 = useDialog();
  const dialog3 = useDialog();

  const confirm = useConfirm();

  return (
    <Layout
      header={
        <Header
          left={<Styled.Logo>Boolti Logo</Styled.Logo>}
          right={<Styled.LogoutLink to={PATH.LOGIN}>로그아웃</Styled.LogoutLink>}
        />
      }
    >
      <h2>HomePage</h2>
      <div>
        <button
          onClick={() => {
            toast.success('성공했을 때 메세지입니다.');
          }}
        >
          성공 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.warning('경고 메세지입니다.');
          }}
        >
          경고 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.error('에러 메세지입니다.');
          }}
        >
          에러 토스트 띄우기
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            toast.info('정보제공 메세지입니다.');
          }}
        >
          정보 제공 토스트 띄우기
        </button>
      </div>
      <button
        onClick={() => {
          dialog1.open({
            title: '다이얼로그 1 ',
            content: (
              <button
                onClick={() => {
                  dialog3.open({
                    title: '다이얼로그 안의 다이얼로그',
                    content: (
                      <p>
                        다이얼로그 내용
                        <br />
                        다이얼로그 ID : {dialog3.id}
                      </p>
                    ),
                    onClose: () => {
                      console.log('다이얼로그 안의 다이얼로그 닫힘');
                    },
                  });
                }}
              >
                다이얼로그 안의 다이얼로그 열기
                <br />
                다이얼로그 ID : {dialog1.id}
              </button>
            ),
            onClose: () => {
              console.log('다이얼로그 1 닫힘');
            },
          });
        }}
      >
        Open Dialog 1
      </button>

      <button
        onClick={() => {
          dialog2.open({
            title: '다이얼로그 2',
            content: (
              <p>
                다이얼로그 내용
                <br />
                다이얼로그 ID : {dialog2.id}
              </p>
            ),
            onClose: () => {
              console.log('다이얼로그 2 닫힘');
            },
          });
        }}
      >
        Open Dialog 2
      </button>

      <button
        onClick={async () => {
          const result = await confirm(
            <>
              지금 로그아웃하면 작성 중인 내용이 사라져요.
              <br />
              로그아웃 할까요?
            </>,
            {
              cancel: '취소하기',
              confirm: '로그아웃',
            },
          );

          if (result) {
            alert('로그아웃');
          } else {
            alert('로그아웃 취소');
          }
        }}
      >
        Open confirm
      </button>
    </Layout>
  );
};

export default HomePage;
