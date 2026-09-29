import {useState} from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'

const ModalPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpen = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const actionBar = (
    <Button danger outline onClick={handleClose}>
      Close Modal
    </Button>
  )

  return (
    <div>
      <h1 className="text-3xl mb-4">Modal Page</h1>

      <Button success rounded onClick={handleOpen}>
        Open Modal
      </Button>

      {modalOpen && (
        <Modal
          title="Hello!"
          onClose={handleClose}
          actionBar={actionBar}
        >
          <p>This is content inside the modal.</p>
        </Modal>
      )}
    </div>
  )
}

export default ModalPage
