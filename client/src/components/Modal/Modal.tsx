import * as C from './Modal.components';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  icon?: string;
};

export function Modal({
  isOpen,
  onClose,
  title,
  text,
  icon = '✓',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <C.Overlay onClick={onClose} />
      <C.Container>
        <C.Icon>{icon}</C.Icon>
        <C.Title>{title}</C.Title>
        <C.Text>{text}</C.Text>
      </C.Container>
    </>
  );
}

