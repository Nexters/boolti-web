import { useState } from 'react';
import { Button, useDropdown, useToast } from '@boolti/ui';
import { useAddHost } from '@boolti/api';
import { CheckIcon } from '@boolti/icon';
import { UserAdd } from '@boolti/icon/src/components/UserAdd';
import { HostType, HostTypeInfo } from '@boolti/api/src/types/host';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memberId, setMemberId] = useState<string>('');

  const [hostItem, setHostItem] = useState<HostTypeInfo>(dropdownItems[0]);
  const { toggleDropdown, isOpen } = useDropdown();
  const toast = useToast();

  const addHostMutation = useAddHost(showId);

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addHostMutation.mutateAsync({
        body: {
          userCode: memberId,
          type: hostItem.type,
        },
      });
      toast.success('초대를 완료했습니다.');
      setMemberId('');
    } catch (error) {
      toast.error(
        '불티에 회원으로 등록된 식별 코드로만 초대가 가능합니다. 식별 코드를 확인 후 다시 시도해 주세요.',
      );
    } finally {
      setIsLoading(false);
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
        <Styled.Input
          placeholder="초대할 팀원의 식별 코드를 입력해 주세요"
          value={memberId}
          onChange={onChange}
        />
        {memberId && (
          <Styled.Dropdown>
            <Styled.Chip onClick={toggleDropdown}>
              {hostItem.label} <CheckIcon />
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
      <Button disabled={!memberId || isLoading} size="bold" colorTheme="netural">
        {isMobile ? <UserAdd /> : '초대하기'}
      </Button>
    </Styled.Form>
  );
};

export default HostInputForm;
