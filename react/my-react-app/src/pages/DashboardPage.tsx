import UsersList from "../components/user/Users.tsx";
import {Counter} from "../components/counter/Counter.tsx";
import UsersListUsingRTK from "../components/user/UsersRTK.tsx";

import CreateUserForm from "../components/user/CreateUserTRK.tsx";
export type CounterState = {
  counter : {
    value : number
  };
}
export function DashboardPage() {


  return (
      <>
    <section aria-labelledby="dashboard-heading" className="dashboard">
      <div className="dashboard__heading">
        <div>
          <p className="eyebrow">Learning workspace</p>
          <h1 id="dashboard-heading">React Production Lab</h1>
          <p>We will turn JSONPlaceholder data into a realistic, tested application.</p>
        </div>
        <span className="status">Routing ready</span>
      </div>
      <div className="dashboard__grid">
        <article className="feature-card">
          <span className="feature-card__number">01</span>
          <h2>Posts</h2>
          <p>Fetching, caching, filtering, pagination, and mutations.</p>
        </article>
        <article className="feature-card">
          <span className="feature-card__number">02</span>
          <h2>Users</h2>
          <p>Typed models, nested routes, reusable components, and forms.</p>
        </article>
        <article className="feature-card">
          <span className="feature-card__number">03</span>
          <h2>Quality</h2>
          <p>Error handling, accessibility, performance, and Cypress tests.</p>
        </article>
      </div>
    </section>

        <h2> Counter Example by Redux Toolkit</h2>
<div>
<Counter/>

  <h2> Users Example by Redux Toolkit</h2>
  <section>
 <UsersList/>

  </section>

  <h2> Users Example by Redux Toolkit Query (RTK)</h2>
  <section>
    <UsersListUsingRTK/>

  </section>

  <section>
    <CreateUserForm/>
  </section>

</div>


</>
  )
}
