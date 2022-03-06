import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { useKanban } from 'Pages/Kanban/helpers/useKanban';
import { ManageColumnModal } from 'Pages/Kanban/ManageColumnModal/ManageColumnModal';
import classes from './Kanban.module.scss';

const Kanban = () => {
  const {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    data,
    manageColumnModalInfo,
  } = useKanban();

  return (
    <div className={classes.kanban}>
      <ColumnsList
        columns={data}
        onDelete={deleteColumnHandler}
        onEdit={editColumnHandler}
      />
      {manageColumnModalInfo.isOpen && (
        <ManageColumnModal
          modalInfo={manageColumnModalInfo}
          onClose={hideModalHandler}
        />
      )}
      <button
        className={classes.addcolumnbutton}
        onClick={showModalHandler}
        type="button"
      >
        Add Column
      </button>
    </div>
  );
};

export default Kanban;
