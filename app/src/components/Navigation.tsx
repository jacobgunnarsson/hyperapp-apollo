import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'

export const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
    </ul>
  </nav>
)
