import { useState } from 'react';
import { useDropdown, useToast } from '@boolti/ui';
import { useAddHost } from '@boolti/api';
import { CheckIcon, ChevronDownIcon } from '@boolti/icon';
import { UserAdd } from '@boolti/icon/src/components/UserAdd';
import { HostType, HostTypeInfo } from '@boolti/api/src/types/host';
import { CustomError } from '@boolti/api/src/types/error';
import Styled from './HostInputForm.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
interface HostInputFormProps {
  showId: number;
}

const dropdownItems: HostTypeInfo[] = [
  {
    type: HostType.MANAGER,
    label: '관리자',
  },
  {
    type: HostType.SUPPORTER,
    label: '도우미',
  },
];

const HostInputForm = ({ showId }: HostInputFormProps) => {
  const [memberId, setMemberId] = useState<string>('');

  const [hostItem, setHostItem] = useState<HostTypeInfo>(dropdownItems[0]);
  const { toggleDropdown, isOpen } = useDropdown();
  const toast = useToast();

  const { mutateAsync, isLoading } = useAddHost(showId);

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        body: {
          userCode: memberId,
          type: hostItem.type,
        },
      });
      toast.success('초대를 완료했습니다.');
      setMemberId('');
    } catch (err: unknown) {
      const error = err as CustomError;
      if (error.type === 'USER_ALREADY_IN_SHOW_GROUP') {
        toast.error('이미 초대된 회원입니다.');
      } else {
        toast.error(
          '불티에 회원으로 등록된 식별 코드로만 초대가 가능합니다. 식별 코드를 확인 후 다시 시도해 주세요.',
        );
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const onSelect = (type: HostType) => {
    const selectedItem = dropdownItems.find((item) => item.type === type);
    setHostItem(selectedItem as HostTypeInfo);
    toggleDropdown();
  };

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.InputWrapper text={memberId}>
        <Styled.HashTag>#</Styled.HashTag>
        <Styled.Input
          placeholder="그룹원의 식별 코드를 입력해 주세요"
          value={memberId}
          onChange={onChange}
        />
        {memberId && (
          <Styled.Dropdown>
            <Styled.Chip onClick={toggleDropdown}>
              {hostItem.label} <ChevronDownIcon />
            </Styled.Chip>
            {isOpen && (
              <Styled.DropdownList>
                {dropdownItems.map((item) => (
                  <Styled.DropdownListItem key={item.type} onClick={() => onSelect(item.type)}>
                    {item.label}
                    {item.type === hostItem.type && <CheckIcon />}
                  </Styled.DropdownListItem>
                ))}
              </Styled.DropdownList>
            )}
          </Styled.Dropdown>
        )}
      </Styled.InputWrapper>
      <Styled.InviteButton disabled={!memberId || isLoading} size="bold" colorTheme="netural">
        {isMobile ? <UserAdd /> : '초대하기'}
      </Styled.InviteButton>
    </Styled.Form>
  );
};

export default HostInputForm;
