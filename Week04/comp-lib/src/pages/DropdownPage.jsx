import {useState} from 'react'
import Dropdown from '../components/Dropdown'

const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

const DropdownPage = () => {
  const [value, setValue] = useState(null)

  const handleChange = (option) => {
    setValue(option)
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">Dropdown Page</h1>

      <p className="mb-2">
        Selected value: {value?.label ?? 'None'}
      </p>

      <Dropdown
        options={OPTIONS}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default DropdownPage
