//import PropsComponent from "./components/Props.tsx";
import {Counter} from "./components/State.tsx";
import {UnControlledComp} from "./components/UnControlledComp.tsx";

function App() {
  return (
      <div>
        <h1>My App</h1>
{/*
       <PropsComponent/>
*/}
          <Counter/>
          <UnControlledComp/>
      </div>
  );
}

export default App;