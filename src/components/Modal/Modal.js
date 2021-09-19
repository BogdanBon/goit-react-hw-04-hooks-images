import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export default function Modal({ modalImg, showModal }) {
  useEffect(() => {
    // ---------- close Modal window with ESC key ----------

    const onEscKey = e => {
      if (e.code === 'Escape') {
        showModal(false);
      }
    };

    // ---------- adding ESC key listener ----------

    window.addEventListener('keydown', onEscKey);

    // ---------- removing ESC key listener ----------

    return () => {
      window.removeEventListener('keydown', onEscKey);
    };
  }, [showModal]);

  // ---------- close Modal window with Backdrop click ----------

  const onBackDropClick = e => {
    if (e.target === e.currentTarget) {
      showModal(false);
    }
  };

  // ---------- render ----------

  return (
    <div className={s.Overlay} onClick={onBackDropClick}>
      <div className={s.Modal}>
        <img src={modalImg} alt={modalImg} />
      </div>
    </div>
  );
}

// ---------- propTypes options ----------

Modal.propTypes = {
  modalImg: PropTypes.string,
  showModal: PropTypes.func,
};

// class Modal extends Component {
//   // ---------- close Modal window with ESC key ----------
//   onEscKey = (e) => {
//     if (e.code === "Escape") {
//       this.props.showModal(false);
//     }
//   };
//   // ---------- close Modal window with Backdrop click ----------
//   onBackDropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.showModal(false);
//     }
//   };
//   // ---------- adding ESC key listener ----------
//   componentDidMount() {
//     window.addEventListener("keydown", this.onEscKey);
//   }
//   // ---------- removing ESC key listener ----------
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.onEscKey);
//   }
//   // ---------- render ----------
//   render() {
//     return (
//       <div className={s.Overlay} onClick={this.onBackDropClick}>
//         <div className={s.Modal}>
//           <img src={this.props.modalImg} alt={this.props.modalImg} />
//         </div>
//       </div>
//     );
//   }
// }
// // ---------- propTypes options ----------
// Modal.propTypes = {
//   modalImg: PropTypes.string.isRequired,
//   showLoader: PropTypes.bool.isRequired,
//   showModal: PropTypes.func.isRequired,
// };

// export default Modal;
