import Task from '../Task/Task';
import classes from './Column.module.scss';

type ColumnProps = {
  title: string;
  color: string;
  tasks: { color: string; description: string; title: string }[];
};
const Column = ({ title, color, tasks }: ColumnProps) => (
  <div className={classes.column}>
    <div
      className={classes['column__header']}
      style={{ backgroundColor: color }}
    >
      {title}
    </div>
    <div className={classes['column__content']}>
      {tasks.map(
        ({
          color: taskColor,
          description: taskDescription,
          title: taskTitle,
        }) => (
          <Task
            color={taskColor}
            title={taskTitle}
            description={taskDescription}
          />
        )
      )}
    </div>
  </div>
);

export default Column;
