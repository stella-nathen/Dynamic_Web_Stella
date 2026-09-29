import {useState} from 'react'
import cx from 'classnames'

const Alert = (props) => {
  const {children, success, warning, danger, dismissible} = props
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
  }

  const classNames = cx(
    'border rounded p-3 flex justify-between items-center',
    {
      'bg-green-100 border-green-500 text-green-800': success,
      'bg-yellow-100 border-yellow-500 text-yellow-800': warning,
      'bg-red-100 border-red-500 text-red-800': danger,
    }
  )

  return (
    <>
      {isVisible && (
        <div className={classNames}>
          <div>{children}</div>

          {dismissible && (
            <button onClick={handleClose}>
              ×
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Alert