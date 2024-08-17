import { Modal } from 'react-responsive-modal';

export default function CustomModal({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      showCloseIcon={false}
      styles={{
        modal: {
          backgroundColor: '#19181b',
          borderRadius: '8px',
        },
      }}
      center
    >
      {children}
    </Modal>
  );
}
