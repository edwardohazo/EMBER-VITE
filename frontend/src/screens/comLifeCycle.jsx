// CLC
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox.jsx';
import MessageBox from '../components/MessageBox.jsx';
import { Story } from '../comLifeCycleStore.jsx';

export default function OrderHistoryScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Story);
  const { loading, error } = state;
  return (
    <div>
      <h1>CHANGE STATE</h1>
      <Button
        onClick={() => {
          ctxDispatch({
            loading: true,
            error: '',
          });
        }}
      >
        LOADING
      </Button>
      <Button
        onClick={() => {
          ctxDispatch({
            loading: false,
            error: '',
          });
        }}
      >
        NOT LOADING
      </Button>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>Ready!</div>
      )}
    </div>
  );
}

// // CLC
// import { useReducer } from 'react';

// const ACTIONS = {
//   INCREMENT: 'increment',
//   DECREMENT: 'decrement',
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.INCREMENT: {
//       return { count: state.count + 1 };
//     }
//     case ACTIONS.DECREMENT: {
//       return { count: state.count - 1 };
//     }
//     default:
//       return state;
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, {
//     count: 0,
//   });

//   function increment() {
//     dispatch({ type: ACTIONS.INCREMENT });
//   }

//   function decrement() {
//     dispatch({ type: ACTIONS.DECREMENT });
//   }

//   return (
//     <>
//       <button onClick={decrement}>-</button>
//       <span>{state.count}</span>
//       <button onClick={increment}>+</button>
//     </>
//   );
// }

// export default App;
