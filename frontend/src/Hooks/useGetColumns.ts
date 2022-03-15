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
    axios.get('http://localhost:3001/api/columns').then((resp) => {
      const columns = resp.data;

      return columns.map(
        (column: {
          [x: string]: any;
          name: any;
          numberOfTasks: any;
          color: any;
          tasks: any[];
        }) => ({
          id: column['_id'],
          color: column.color,
          name: column.name,
          numberOfTasks: column.numberOfTasks,
          tasks: column.tasks.map((task) => ({
            id: task['_id'],
            name: task.name,
            description: task.description,
            column: task.column,
          })),
        })
      );
    });

  const { data, isLoading } = useQuery('columns', getColumns);

  return data
    ? {data, isLoading}
    : { data: [], isLoading: false };
};
