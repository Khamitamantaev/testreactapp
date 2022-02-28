import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './Modal'
import { DesktopModalContainer, Header } from './Modal.styles'
interface BaseModalWrapperProps {
   isModalVisible: boolean
   onBackDropClick: () => void
}


const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ onBackDropClick, isModalVisible}) => {
    if(!isModalVisible) {
        return null
    }
    
    return (
        <Modal onBackDropClick={onBackDropClick}>
            <DesktopModalContainer>
                <Header>Modal Info</Header>
            </DesktopModalContainer>

        </Modal>
    )
}

export default BaseModalWrapper