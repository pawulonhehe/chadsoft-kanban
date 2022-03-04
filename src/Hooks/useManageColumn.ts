import axios, { Method } from 'axios';
import { useMutation } from 'react-query';
import { TaskType } from 'shared/types/Kanban';

type payloadTaskType = {
  name: string;
  description: string;
};

type payloadColumnType = {
  color: string;
  name: string;
  numberOfTasks: number;
  tasks: TaskType[] | { name: string; description: string }[];
};

type useManageTaskProps = {
  method: Method;
  payload?: payloadTaskType | payloadColumnType;
  endpoint: string;
};

export const useManageColumn = (onSuccess: () => void) => {
  const manageColumn = ({ method, payload, endpoint }: useManageTaskProps) =>
    axios.request({
      url: `https://kanban-proje-default-rtdb.firebaseio.com/${endpoint}`,
      method,
      data: payload ? JSON.stringify(payload) : null,
    });

  const { mutate, isLoading } = useMutation(manageColumn, { onSuccess });

  return { mutate, isLoading };
};
