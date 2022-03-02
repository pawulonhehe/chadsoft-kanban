import Task from './Components/Task/Task';

export const App = () => {
  return (
    <div>
      <Task
        color="#3498db"
        description="ale super task ja cie"
        title="NowyTask"
      />
      <Task
        color="#9b59b6"
        description="w porzondku w porzondku"
        title="NowyTask"
      />
    </div>
  );
};
