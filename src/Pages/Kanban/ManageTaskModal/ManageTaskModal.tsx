import { Modal } from 'Components';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
import { TaskModalInfoType } from 'shared/types/Kanban';
import { useManageTaskModal } from 'Pages/Kanban/helpers/useManageTaskModal';
import classes from './ManageTaskModal.module.scss';

type ManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const ManageTaskModal = ({
  onClose,
  modalInfo,
}: ManageTaskModalProps) => {
  const {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isLoading,
    error,
    name,
    description,
  } = useManageTaskModal({ onClose, modalInfo });

  return (
    <Modal onClose={onClose}>
      <form
        data-testid="manage-task-modal"
        onSubmit={manageTaskHandler}
        className={classes['manage-task-modal']}
      >
        <CloseIcon
          data-testid="close-manage-task-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['manage-task-modal__exit-button']}
        />
        <h1 className={classes['manage-task-modal__title']}>
          {modalInfo.title} task
        </h1>
        <TextField
          value={name}
          onChange={changeNameHandler}
          margin="normal"
          label="Task name"
          color="secondary"
          focused
        />
        <div style={{ width: '80%' }}>
          <TextField
            value={description}
            onChange={changeDescriptionHandler}
            margin="normal"
            label="Description"
            color="info"
            multiline
            fullWidth
            rows={8}
            focused
          />
        </div>
        <Button
          disabled={error || isLoading}
          type="submit"
          variant="contained"
          color="success"
        >
          {modalInfo.title}
        </Button>
      </form>
    </Modal>
  );
};
