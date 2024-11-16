import { useChangeCastTeamOrder } from "@boolti/api";
import { useCallback, useEffect, useState } from "react";
import { TempShowCastInfoFormInput } from "~/components/ShowCastInfoFormDialogContent";

interface UseCastTeamListOrderParams {
  showId?: number;
  castTeamList?: TempShowCastInfoFormInput[];
  onChange?: () => void;
}

const useCastTeamListOrder = (params?: UseCastTeamListOrderParams) => {
  const showId = params?.showId;
  const castTeamList = params?.castTeamList;
  const onChange = params?.onChange;

  const [castTeamListDraft, setCastTeamListDraft] = useState<TempShowCastInfoFormInput[]>([]);

  const changeCastTeamOrder = useChangeCastTeamOrder();

  const changeCastTeamIndex = useCallback((draggedItemId: number, targetIndex: number) => {
    setCastTeamListDraft((prevDraft) => {
      if (!prevDraft) return prevDraft;

      const draggedItemIndex = prevDraft.findIndex(({ id }) => id === draggedItemId);
      if (draggedItemIndex === -1 || targetIndex < 0 || targetIndex >= prevDraft.length) {
        return prevDraft;
      }

      const nextDraft = [...prevDraft];
      const [draggedItem] = nextDraft.splice(draggedItemIndex, 1);
      nextDraft.splice(targetIndex, 0, draggedItem);

      return nextDraft;
    })
  }, [])

  const castTeamDropHoverHandler = useCallback((draggedItemId: number, hoverIndex: number) => {
    changeCastTeamIndex(draggedItemId, hoverIndex);
  }, [changeCastTeamIndex]);

  const castTeamDropHandler = useCallback(async () => {
    if (!castTeamListDraft) return;

    if (showId !== undefined) {
      await changeCastTeamOrder.mutateAsync({
        showId,
        body: {
          castTeamIds: castTeamListDraft.map(({ id }) => id),
        },
      });
    }

    onChange?.();
  }, [castTeamListDraft, changeCastTeamOrder, onChange, showId])

  useEffect(() => {
    if (!castTeamList) return;

    setCastTeamListDraft(castTeamList);
  }, [castTeamList])

  return {
    castTeamListDraft,
    setCastTeamListDraft,
    castTeamDropHoverHandler,
    castTeamDropHandler,
  }
}

export default useCastTeamListOrder
