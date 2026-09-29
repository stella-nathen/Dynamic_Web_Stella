import Alert from '../components/Alert'

const AlertPage = () => {
  return (
    <div>
      <h1 className="text-3xl mb-4">Alert Page</h1>

      <div className="flex flex-col gap-4">
        <Alert success>
          Your changes were saved successfully.
        </Alert>

        <Alert warning dismissible>
          Check your information before continuing.
        </Alert>

        <Alert danger dismissible>
          Something went wrong.
        </Alert>
      </div>
    </div>
  )
}

export default AlertPage