import React from 'react';
import s from '../styles/styles.module.scss';
import { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, onClose } = this.props;

    return (
      <div className={s.overlay} onClick={onClose}>
        <div className={s.modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
