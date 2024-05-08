import {
    //   createBrowserRouter,
    //   RouterProvider,
    //   Route,
      Link,
    //   BrowserRouter,
    //   Routes,
    } from "react-router-dom";

export default function Table({users, params}) {
  return (
    <table>
        <thead>
            <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
        {/* map the input caused array */}
        {users.map(user=>(
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                    {/* Link is like a href but Link make it one page app */}
                    <Link to='/user/1298371982'>
                    {user.name}
                    </Link>
                </td>
                <td>{user.age}</td>
            </tr>
        ))}
        </tbody>
    </table>
  )
}
