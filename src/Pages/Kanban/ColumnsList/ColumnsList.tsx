import { Column } from 'Components';
import { ColumnType, TaskType } from 'shared/types/Kanban';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';

type ColumnsListType = {
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
  columns: ColumnType[];
};

export const ColumnsList = ({ columns, onDelete, onEdit }: ColumnsListType) => {
  const {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
  } = useColumnList();

  return (
    <div>
      {columns.map(({ name, color, id, numberOfTasks, tasks }) => (
        <Column
          tasks={tasks}
          title={name}
          color={color}
          numberOfTasks={numberOfTasks}
          id={id}
          key={id}
          onDelete={onDelete}
          onEdit={onEdit}
        >
          <button
            disabled={tasks.length >= numberOfTasks}
            type="button"
            onClick={() => showModalHandler(id)}
          >
            open
          </button>
          <TasksList
            columnId={id}
            onDelete={deleteTaskHandler}
            onEdit={editTaskHandler}
            color={color}
            tasks={tasks}
          />
        </Column>
      ))}
      {manageTaskModalInfo.isOpen && (
        <ManageTaskModal
          modalInfo={manageTaskModalInfo}
          onClose={hideModalHandler}
        />
      )}
    </div>
  );
};
