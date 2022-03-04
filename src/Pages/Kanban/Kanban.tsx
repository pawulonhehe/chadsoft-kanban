import { ColumnsList } from 'Pages/Kanban/ColumnsList/ColumnsList';
import { useKanban } from './helpers/useKanban';
import { ManageColumnModal } from './ManageColumnModal/ManageColumnModal';
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
      <button onClick={showModalHandler} type="button">
        open modal
      </button>
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
    </div>
  );
};

export default Kanban;
