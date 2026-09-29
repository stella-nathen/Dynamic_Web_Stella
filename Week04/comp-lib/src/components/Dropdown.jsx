/*
  I used useEffect with [] because these document listeners only
  need to be added once when the Dropdown mounts.

  The cleanup removes the click and keydown listeners so they do
  not pile up after the component unmounts.
*/

import {useState, useEffect, useRef} from 'react'
import {GoChevronDown} from 'react-icons/go'
import Panel from './Panel'

const Dropdown = (props) => {
  const {options, onChange, value} = props
  const [isOpen, setIsOpen] = useState(false)

  const divEl = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!divEl.current) return

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setIsOpen(false)
    onChange(option)
  }

  const renderedOptions = options.map((option) => (
    <div
      key={option.value}
      onClick={() => handleOptionClick(option)}
      className="hover:bg-sky-100 rounded cursor-pointer p-1"
    >
      {option.label}
    </div>
  ))

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        {value ? value.label : 'Select...'}
        <GoChevronDown />
      </Panel>

      {isOpen && (
        <Panel className="absolute top-full">
          {renderedOptions}
        </Panel>
      )}
    </div>
  )
}

export default Dropdown
