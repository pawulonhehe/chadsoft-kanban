import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { TaskModalInfoType } from 'shared/types/Kanban';
import { useManageColumn } from 'Hooks/useManageColumn';

type UseManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const useManageTaskModal = ({
  onClose,
  modalInfo,
}: UseManageTaskModalProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
  });
  const { name, description } = inputValues;

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));

  const changeDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      description: event.target.value,
    }));

  const onSuccess = () => {
    queryClient.invalidateQueries('columns');
    useCustomToast(`Task ${name} successfully ${modalInfo.title}ed`);

    onClose();
  };
  useEffect(() => {
    modalInfo.title === 'edit' &&
      setInputValues({
        name: modalInfo.name,
        description: modalInfo.description,
      });
  }, []);

  useEffect(() => {
    const isValuesValid = name.trim().length && description.trim().length;

    setError(!isValuesValid);
    if (modalInfo.title === 'edit') {
      const haveValuesChange =
        name !== modalInfo.name || description !== modalInfo.description;

      setError(!isValuesValid || !haveValuesChange);
    }
  }, [name, description]);

  const { mutate, isLoading } = useManageColumn(onSuccess);

  const manageTaskHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutate({
          method: 'POST',
          payload: {
            name,
            description,
          },
          endpoint: `columns/${modalInfo.columnId}/tasks.json`,
        })
      : mutate({
          method: 'PUT',
          payload: {
            name,
            description,
          },
          endpoint: `columns/${modalInfo.columnId}/tasks/${modalInfo.taskId}.json`,
        });
  };

  return {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isLoading,
    error,
    name,
    description,
  };
};
