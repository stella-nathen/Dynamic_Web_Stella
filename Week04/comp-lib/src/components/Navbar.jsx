import {Link} from 'react-router-dom'
import Panel from './Panel'

const Navbar = () => {
  return (
    <Panel className="sticky top-0 flex flex-col items-start gap-1">
      <Link to="/" className="text-blue-500">
        Buttons
      </Link>

      <Link to="/accordion" className="text-blue-500">
        Accordion
      </Link>

      <Link to="/dropdown" className="text-blue-500">
        Dropdown
      </Link>

      <Link to="/modal" className="text-blue-500">
        Modal
      </Link>

      <Link to="/alert" className="text-blue-500">
        Alert
      </Link>
    </Panel>
  )
}

export default Navbar