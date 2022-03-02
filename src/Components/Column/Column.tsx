import classes from './Column.module.scss';

type ColumnProps = { title: string; description: string; color: string };
const Column = ({ title, description, color }: ColumnProps) => (
  <div className={classes.column}>
    <div
      className={classes['column__header']}
      style={{ backgroundColor: color }}
    >
      {title}
    </div>
    <div className={classes['column__content']}>{description}</div>
  </div>
);

export default Column;
