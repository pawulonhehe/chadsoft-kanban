import { ReactNode } from 'react';
import { TaskType } from 'shared/types/Kanban';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Column.module.scss';

type ColumnProps = {
  title: string;
  color: string;
  numberOfTasks: number;
  onDelete: (id: string) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    color: string;
    tasks: TaskType[];
  }) => void;
  id: string;
  tasks: TaskType[];
  children: ReactNode;
};

export const Column = ({
  title,
  color,
  numberOfTasks,
  onDelete,
  onEdit,
  id,
  tasks,
  children,
}: ColumnProps) => {
  const deleteColumnHandler = () => onDelete(id);

  const editColumnHandler = () =>
    onEdit({
      id,
      name: title,
      numberOfTasks,
      color,
      tasks,
    });

  return (
    <div className={classes.column}>
      <div
        className={classes['column__header']}
        style={{ backgroundColor: color }}
      >
        <div className={classes['column__info']}>
          <div style={{ cursor: 'pointer' }}>{title}</div>

          <div>
            {tasks.length}/{numberOfTasks}
          </div>
        </div>
        <div className={classes['column__icons']}>
          <EditIcon
            style={{ cursor: 'pointer' }}
            onClick={editColumnHandler}
            fontSize="small"
          />
          <DeleteIcon
            style={{ cursor: 'pointer' }}
            onClick={deleteColumnHandler}
            fontSize="small"
          />
        </div>
      </div>
      <div className={classes['column__content']}>{children}</div>
    </div>
  );
};
