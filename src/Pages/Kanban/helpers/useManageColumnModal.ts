import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { ColorResult } from 'react-color';
import { useQueryClient } from 'react-query';
import { ColumnModalInfoType } from 'shared/types/Kanban';

type useManageColumnModalProps = {
  onClose: () => void;
  modalInfo: ColumnModalInfoType;
};

export const useManageColumnModal = ({
  onClose,
  modalInfo,
}: useManageColumnModalProps) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [color, setColor] = useState('#2e7d32');
  const [inputValues, setInputValues] = useState({
    name: '',
    numberOfTasks: '5',
  });
  const { name, numberOfTasks } = inputValues;

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));

  const changeNumberOfTasksHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevValues) => ({
      ...prevValues,
      numberOfTasks: event.target.value,
    }));

  const changeColorHandler = (pickedColor: ColorResult) =>
    setColor(pickedColor.hex);

  const onSuccess = () => {
    queryClient.invalidateQueries('columns');
    useCustomToast(`Column ${name} successfully ${modalInfo.title}ed`);
    onClose();
  };

  useEffect(() => {
    if (modalInfo.title === 'edit') {
      setInputValues({
        name: modalInfo.name,
        numberOfTasks: `${modalInfo.numberOfTasks}`,
      });
      setColor(modalInfo.color);
    }
  }, []);

  useEffect(() => {
    const isValuesValid =
      name.trim().length && Boolean(numberOfTasks) && +numberOfTasks > 0;
    if (modalInfo.title === 'edit' && modalInfo.tasks.length > +numberOfTasks) {
      setError({
        errorMessage: `Maximum number of tasks can't be smaller than ${modalInfo.tasks.length} `,
        isError: true,
      });
    } else {
      setError({
        errorMessage: '',
        isError: false || !isValuesValid,
      });
    }
    if (modalInfo.title === 'edit') {
      const haveValueChanged =
        name !== modalInfo.name ||
        +numberOfTasks !== modalInfo.numberOfTasks ||
        color !== modalInfo.color;

      setError((prevError) => ({
        ...prevError,
        isError: !isValuesValid || !haveValueChanged,
      }));
    }
  }, [name, numberOfTasks, color]);

  const { mutate, isLoading } = useManageColumn(onSuccess);

  const manageColumnHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutate({
          method: 'POST',
          payload: {
            color,
            name,
            numberOfTasks: +numberOfTasks,
            tasks: [],
          },
          endpoint: 'columns.json',
        })
      : mutate({
          method: 'PATCH',
          payload: {
            color,
            name,
            numberOfTasks: +numberOfTasks,
            tasks: [],
          },
          endpoint: `columns/${modalInfo.id}.json`,
        });
  };

  return {
    manageColumnHandler,
    changeColorHandler,
    changeNumberOfTasksHandler,
    changeNameHandler,
    isLoading,
    error,
    color,
    name,
    numberOfTasks,
  };
};
