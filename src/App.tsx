// import Task from './Components/Task/Task';
import Column from './Components/Column/Column';
import Header from './Components/Header/Header';

export const App = () => {
  const tasks = [
    {
      title: 'cos',
      description: 'xd',
      color: '#9b59b6',
    },
    {
      title: 'cos',
      description: 'xd',
      color: '#9b59b6',
    },
    {
      title: 'cos',
      description: 'xd',
      color: '#9b59b6',
    },
    {
      title: 'cos',
      description: 'xd',
      color: '#9b59b6',
    },
  ];
  return (
    <div style={{ height: '100%' }}>
      <Header/>
      <Column color="#9b59b6" title="TO DO" tasks={tasks} />
    </div>
  );
};
