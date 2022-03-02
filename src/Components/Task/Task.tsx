import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import classes from './Task.module.scss';

type TaskProps = { title: string; description: string; color: string };

const Task = ({ title, description, color }: TaskProps) => (
  <div className={classes.task}>
    <div className={classes['task__header']} style={{ backgroundColor: color }}>
      {title}
      <div className={classes['task__icons']}>
        <EditIcon fontSize="small" />
        <DeleteIcon fontSize="small" />
      </div>
    </div>
    <div className={classes['task__content']}>{description}</div>
  </div>
);

export default Task;
