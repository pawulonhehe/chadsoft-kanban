import { Column } from 'Components';
import { ColumnType, TaskType } from 'shared/types/Kanban';
import { TasksList } from 'Pages/Kanban/TasksList/TasksList';
import { ManageTaskModal } from 'Pages/Kanban/ManageTaskModal/ManageTaskModal';
import { useColumnList } from 'Pages/Kanban/helpers/useColumnList';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CircularProgress } from '@mui/material';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useMoveTask } from 'Pages/Kanban/helpers/useMoveTask';
import AddIcon from '@mui/icons-material/Add';
import classes from './ColumnList.module.scss';

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

  const { moveTask, sourceColumnId, destinationColumnId } = useMoveTask();

  const handleMoveTask = (result: DropResult) => {
    const { source, destination } = result;
    if (source.droppableId === destination?.droppableId || !destination) {
      return;
    }

    const destinationColumn = columns.find(
      ({ id }) => id === destination?.droppableId
    );
    if (destinationColumn?.numberOfTasks === destinationColumn?.tasks.length) {
      useCustomToast({ text: 'Something went wrong', type: 'error' });
      return;
    }

    const task = columns.find(({ id }) => id === source.droppableId)?.tasks[
      source.index
    ];
    if (task && destination) {
      moveTask({
        task,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleMoveTask}>
      {columns.map(({ name, color, id, numberOfTasks, tasks }) => (
        <Droppable key={id} droppableId={id}>
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              <Column
                tasks={tasks}
                title={name}
                color={color}
                numberOfTasks={numberOfTasks}
                id={id}
                onDelete={onDelete}
                onEdit={onEdit}
              >
                {id === destinationColumnId || id === sourceColumnId ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: `${217.6 * tasks.length + 48.4}px`,
                    }}
                  >
                    <CircularProgress color="success" />
                  </div>
                ) : (
                  <>
                    <button
                      className={classes['column-list__add-task-button']}
                      style={
                        tasks.length >= numberOfTasks
                          ? { visibility: 'hidden' }
                          : {}
                      }
                      disabled={tasks.length >= numberOfTasks}
                      type="button"
                      onClick={() => showModalHandler(id)}
                      data-testid={`${name}-column-add-task`}
                    >
                      <AddIcon />
                      Add Task
                    </button>
                    <TasksList
                      columnId={id}
                      onDelete={deleteTaskHandler}
                      onEdit={editTaskHandler}
                      color={color}
                      tasks={tasks}
                    />
                    {droppableProvided.placeholder}
                  </>
                )}
              </Column>
            </div>
          )}
        </Droppable>
      ))}
      {manageTaskModalInfo.isOpen && (
        <ManageTaskModal
          modalInfo={manageTaskModalInfo}
          onClose={hideModalHandler}
        />
      )}
    </DragDropContext>
  );
};
