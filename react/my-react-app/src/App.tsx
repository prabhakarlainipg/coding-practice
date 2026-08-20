import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { queryClient } from './app/queryClient'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PostDetailPage } from './pages/PostDetailPage'
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
/*
:postId is a dynamic route segment.
*/
      { path: 'posts/:postId', element: <PostDetailPage /> },
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App
