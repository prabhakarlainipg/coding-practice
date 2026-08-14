//import PropsComponent from "./components/Props.tsx";
//import {Counter} from "./components/State.tsx";
//import {UnControlledComp} from "./components/UnControlledComp.tsx";
//import {ClassCompCounter} from "./components/ReactCalssComp.tsx";
//import { ErrorBoundary } from "react-error-boundary";

//import {ReducerCounter} from "./components/ReducerCounter.tsx";
//import {ErrorComp} from "./components/ErrorComp.tsx";

//import {Modal} from "./components/Modal.tsx";

//import Employees from "./components/Employees.tsx";
//import EmployeesList from "./components/EmployeesLIst.tsx";
import InfiniteScroll from "./components/InfiniteScrollUsingINtersectionObserver.tsx";

function App() {
  return (
      <div>
          <h1>My App</h1>
          {/*
       <PropsComponent/>
*/}
          {/*
         <Counter/>
*/}
          {/*  <UnControlledComp/>*/}
          {/*
      <ClassCompCounter/>
*/}
          {/*<ReducerCounter/>
          <ErrorBoundary fallback={<div>Something went wrong!!</div>}>
              <ErrorComp/>
          </ErrorBoundary>*/}

          <div>
{/*
              <h1>Dashboard</h1>
*/}
{/*
              <Modal>
                  <h2>Confirm Delete</h2>
                  <button>Delete</button>
              </Modal>*/}

{/*
<EmployeesList/>
*/}
              <InfiniteScroll/>

          </div>

      </div>
  );
}

export default App;