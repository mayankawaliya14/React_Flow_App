import { Provider } from 'react-redux';
import { store } from './store/store';
import Graph from './GraphContainer/Graph';
import UndoRedoControls from './GraphContainer/UndoRedoControls';

const App = () => {
  return (
    <Provider store={store}>
      <div className="relative">
        <div className="absolute top-4 z-10 bg-white p-4 rounded-lg shadow-lg ">
          <UndoRedoControls />
        </div>
        <Graph />
      </div>
    </Provider>
  );
};

export default App;