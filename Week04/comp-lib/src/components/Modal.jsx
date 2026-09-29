/*
  I use [] for the scroll effect because it only needs to run when
  the Modal mounts and clean up when it unmounts.

  I use [onClose] for the Escape key effect because the effect uses
  the onClose function passed in through props.

  The cleanup removes the keydown listener from document so the
  listener does not pile up when the Modal closes and reopens.
*/

import {useEffect} from 'react'
import {createPortal} from 'react-dom'

const Modal = (props) => {
  const {title, children, onClose, actionBar} = props

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-50"
      ></div>

      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {title && <h2 className="text-2xl">{title}</h2>}

          {children}

          <div className="flex justify-end">
            {actionBar}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
