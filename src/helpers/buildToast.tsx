import { Toast } from 'react-bootstrap';

export const buildToast = (
  uuidKey: string,
  message: string,
  onClose: (key: string) => void,
  variant: string | undefined = "danger"
) => {
  return {
    key: uuidKey,
    toast: <Toast
      bg={variant}
      key={uuidKey}
      onClose={() => onClose(uuidKey)}
      delay={3000}
      autohide
    >
      <Toast.Header>
        Error
      </Toast.Header>
      <Toast.Body>{`${message}`}</Toast.Body>
    </Toast>
  };
};
