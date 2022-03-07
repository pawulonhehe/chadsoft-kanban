/* eslint-disable security/detect-object-injection */
import axios from 'axios';
import { ColumnType } from 'shared/types/Kanban';
import { useQuery } from 'react-query';

type useGetColumnsType = {
  data: ColumnType[];
  isLoading: boolean;
};

export const useGetColumns = (): useGetColumnsType => {
  const getColumns = (): Promise<ColumnType[]> =>
    axios
      .get('https://kanban-proje-default-rtdb.firebaseio.com/columns.json')
      .then((resp) => {
        const column = resp.data;
        return column
          ? Object.keys(column).map((id) => ({
              id,
              ...column[id],
              tasks: column[id].tasks
                ? Object.keys(column[id].tasks).map((taskId) => ({
                    ...column[id].tasks[taskId],
                    id: taskId,
                  }))
                : [],
            }))
          : [];
      });

  const { data, isLoading } = useQuery('columns', getColumns);

  return data ? { data, isLoading } : { data: [], isLoading: false };
};
