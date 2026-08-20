import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PostsPage } from './pages/PostsPage'
import { TodosPage } from './pages/TodosPage'
import { UsersPage } from './pages/UsersPage'
//defines route tree
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
/*
      index: true makes Dashboard the default child route.
*/
      { index: true, element: <DashboardPage /> },
      { path: 'posts', element: <PostsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'todos', element: <TodosPage /> },
/*
      path: '*' catches unknown URLs.
*/
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  //connects router to react
  return <RouterProvider router={router} />
}

export default App
