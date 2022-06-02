import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import {
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi';
import Draggable from 'react-draggable';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
`;

// const ModalDimLayer = styled.div``;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  min-width: 300px;
  width: 600px;
  height: auto;
  max-width: 100%;
  max-height: inherit;
  right: calc(50% - 300px);
  top: 0;
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  box-shadow: var(--shadow-md);
  pointer-events: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  padding: 0.2rem 0.5rem;
  background-color: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-300);
`;

const ModalTitleWrapper = styled.h4`
  flex-grow: 1;
  margin-left: 0.5rem;
  cursor: move;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  & svg {
    width: 20px;
    height: 30px;
  }
`;

const ModalContent = styled.div`
  padding: 0.5rem;
  background-color: var(--color-white);
  /* overflow-y: auto; */
`;

const BasicModal = props => {
  const { width, height, title, children, closeModal } = props;
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState(false);
  const [folded, setFolded] = useState(false);

  const toggleModal = () => {
    setFolded(!folded);
  };

  useEffect(() => {
    setDisplayed(true);
    const dom = document.getElementById('modal-root');
    ref.current = dom;
  }, []);

  if (ref.current && displayed) {
    return createPortal(
      <ModalContainer>
        <Draggable>
          <ModalWrapper style={{ width: { width }, height: { height } }}>
            <ModalHeader>
              <ModalTitleWrapper>{title}</ModalTitleWrapper>
              <ModalButtonWrapper>
                {folded ? (
                  <HiOutlineChevronDown onClick={toggleModal} />
                ) : (
                  <HiOutlineChevronUp onClick={toggleModal} />
                )}
                <HiOutlineX onClick={closeModal} />
              </ModalButtonWrapper>
            </ModalHeader>
            {folded ? (
              <></>
            ) : (
              <>
                <ModalContent>{children}</ModalContent>
              </>
            )}
          </ModalWrapper>
        </Draggable>
      </ModalContainer>,
      ref.current
    );
  }
  return null;
};

export default BasicModal;
