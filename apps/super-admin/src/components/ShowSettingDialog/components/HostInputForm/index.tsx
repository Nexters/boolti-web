import { useState } from 'react';
import { useToast, useDropdown } from '@boolti/ui';
import { useSuperAdminAddHost } from '@boolti/api';
import { HostType } from '@boolti/api/src/types/host';
import { CustomError } from '@boolti/api/src/types/error';
import { CheckIcon, ChevronDownIcon } from '@boolti/icon';
import Styled from './HostInputForm.styles';

interface HostInputFormProps {
  showId: number;
}

const roleOptions = [
  { type: HostType.MANAGER, label: '관리자' },
  { type: HostType.SUPPORTER, label: '도우미' },
] as const;

const HostInputForm = ({ showId }: HostInputFormProps) => {
  const [memberId, setMemberId] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<HostType>(HostType.MANAGER);
  const toast = useToast();
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown();

  const { mutateAsync, isLoading } = useSuperAdminAddHost(showId);

  const selectedRoleLabel = roleOptions.find((r) => r.type === selectedRole)?.label ?? '관리자';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        body: {
          userCode: memberId,
          type: selectedRole,
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
          '불티에 회원으로 등록된 ID로만 초대가 가능합니다.\nID를 확인 후 다시 시도해 주세요.',
        );
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.InputWrapper text={memberId}>
        <Styled.Input
          placeholder="그룹원의 ID를 입력해 주세요"
          value={memberId}
          onChange={onChange}
        />
        <Styled.RoleDivider />
        {memberId.length > 0 && (
          <Styled.RoleDropdown ref={dropdownRef}>
            <Styled.RoleButton type="button" onClick={toggleDropdown}>
              <span>{selectedRoleLabel}</span>
              <ChevronDownIcon />
            </Styled.RoleButton>
            {isOpen && (
              <Styled.RoleDropdownList>
                {roleOptions.map((option) => (
                  <Styled.RoleDropdownItem
                    key={option.type}
                    onClick={() => {
                      setSelectedRole(option.type);
                      toggleDropdown();
                    }}
                  >
                    {option.label}
                    {selectedRole === option.type && <CheckIcon />}
                  </Styled.RoleDropdownItem>
                ))}
              </Styled.RoleDropdownList>
            )}
          </Styled.RoleDropdown>
        )}
      </Styled.InputWrapper>
      <Styled.InviteButton disabled={!memberId || isLoading} size="bold" colorTheme="netural">
        초대하기
      </Styled.InviteButton>
    </Styled.Form>
  );
};

export default HostInputForm;
