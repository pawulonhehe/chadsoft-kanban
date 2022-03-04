import { Task } from 'Components';
import { TaskType } from 'shared/types/Kanban';

type TaskListProps = {
  tasks: TaskType[];
  color: string;
  onDelete: (columnId: string, taskId: string) => void;
  onEdit: ({
    columnId,
    name,
    description,
    taskId,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
  }) => void;
  columnId: string;
};

export const TasksList = ({
  tasks,
  columnId,
  color,
  onDelete,
  onEdit,
}: TaskListProps) => (
  <div>
    {tasks?.map(({ id, name, description }) => (
      <Task
        onEdit={onEdit}
        columnId={columnId}
        onDelete={onDelete}
        title={name}
        description={description}
        key={id}
        id={id}
        color={color}
      />
    ))}
  </div>
);
