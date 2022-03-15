import { useManageColumn } from 'Hooks/useManageColumn';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { TaskType } from 'shared/types/Kanban';

type UseMoveTaskType = {
  task: TaskType;
  sourceColumnId: string;
  destinationColumnId: string;
};
export const useMoveTask = () => {
  const [moveTaskInfo, setMoveTaskInfo] = useState({
    sourceColumnId: '',
    destinationColumnId: '',
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useManageColumn(() => null);

  const moveTask = ({
    task,
    sourceColumnId,
    destinationColumnId,
  }: UseMoveTaskType) => {
    setMoveTaskInfo({
      sourceColumnId,
      destinationColumnId,
    });
    mutateAsync({
      method: 'DELETE',
      endpoint: `tasks/${task.id}`,
    }).then(() =>
      mutateAsync({
        method: 'POST',
        payload: {
          name: task.name,
          description: task.description,
          column: destinationColumnId,
        },
        // Ewentualnie /tasks
        endpoint: `tasks`,
      }).then(() => {
        queryClient.invalidateQueries('columns').then(() => {
          useCustomToast({ text: 'Task successfully moved', type: 'success' });
          setMoveTaskInfo({
            sourceColumnId: '',
            destinationColumnId: '',
          });
        });
      })
    );
  };

  return {
    moveTask,
    sourceColumnId: moveTaskInfo.sourceColumnId,
    destinationColumnId: moveTaskInfo.destinationColumnId,
  };
};
