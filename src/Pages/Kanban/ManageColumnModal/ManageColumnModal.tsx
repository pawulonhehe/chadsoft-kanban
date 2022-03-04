import CloseIcon from '@mui/icons-material/Close';
import { Modal } from 'Components';
import { Button, TextField } from '@mui/material';
import { CirclePicker } from 'react-color';
import { ColumnModalInfoType } from 'shared/types/Kanban';
import { useManageColumnModal } from 'Pages/Kanban/helpers/useManageColumnModal';
import classes from './ManageColumnModal.module.scss';

type ManageColumnModalProps = {
  onClose: () => void;
  modalInfo: ColumnModalInfoType;
};

export const ManageColumnModal = ({
  onClose,
  modalInfo,
}: ManageColumnModalProps) => {
  const {
    manageColumnHandler,
    changeColorHandler,
    changeNumberOfTasksHandler,
    changeNameHandler,
    isLoading,
    error,
    color,
    name,
    numberOfTasks,
  } = useManageColumnModal({ modalInfo, onClose });

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={manageColumnHandler}
        className={classes['manage-columns-modal']}
      >
        <CloseIcon
          onClick={onClose}
          color="warning"
          className={classes['manage-columns-modal__exit-button']}
        />
        <h1 className={classes['manage-columns-modal__title']}>
          {modalInfo.title} column
        </h1>
        <TextField
          margin="normal"
          label="columns Name"
          color="secondary"
          focused
          value={name}
          onChange={changeNameHandler}
        />
        <TextField
          margin="normal"
          label="Maximum number of tasks"
          color="info"
          focused
          value={numberOfTasks}
          onChange={changeNumberOfTasksHandler}
        />
        <p style={{ color }}>Choose main color for columns</p>
        <div style={{ margin: '1rem' }}>
          <CirclePicker onChangeComplete={changeColorHandler} color={color} />
        </div>
        <Button
          type="submit"
          disabled={error.isError || !name.length || isLoading}
          variant="contained"
          color="success"
        >
          {modalInfo.title}
        </Button>
        {error.errorMessage && (
          <p style={{ color: 'red' }}>{error.errorMessage}</p>
        )}
      </form>
    </Modal>
  );
};
