import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import {
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi';

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

// const ModalDimLayer = styled.div``;

const ModalWrapper = styled.div`
  background-color: var(--color-gray-100);
  display: flex;
  flex-direction: column;
  min-width: 30rem;
  min-height: 30rem;
`;

const ModalHeader = styled.div`
  display: flex;
  background-color: green;
`;

const ModalTitleWrapper = styled.h3`
  flex-grow: 1;
`;

const ModalButtonWrapper = styled.div``;

const ModalContent = styled.div`
  padding: 1rem;
  background-color: yellow;
`;

const BasicModal = props => {
  const { title, children, closeModal } = props;
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
        <ModalWrapper>
          <ModalHeader>
            <ModalTitleWrapper>{title}</ModalTitleWrapper>
            <ModalButtonWrapper>
              {folded ? (
                <HiOutlineChevronDown onCLick={toggleModal} />
              ) : (
                <HiOutlineChevronUp onCLick={toggleModal} />
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
      </ModalContainer>,
      ref.current
    );
  }
  return null;
};

export default BasicModal;
