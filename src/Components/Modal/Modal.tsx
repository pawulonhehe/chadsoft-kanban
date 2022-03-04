import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }: { children: ReactNode }) => (
  <div className={classes.modal}>
    <div>{children}</div>
  </div>
);

const portalElement = document.getElementById('overlays');

export const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) => (
  <>
    {portalElement &&
      ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
    {portalElement &&
      ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
  </>
);
