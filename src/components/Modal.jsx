import ReactDOM from 'react-dom'


export default function Modal({ title, content, show, onClose = () => { }, onConfirm, confirmText }) {


    return (
        show && ReactDOM.createPortal(
            <div className="modal-container">
                <div className="custom-modal">
                    <h2>{title}</h2>
                    <h4>{content}</h4>
                    <button onClick={onClose} >Annulla</button>
                    <button onClick={onConfirm} >Conferma</button>
                </div>
            </div>,
            document.body
        )
    )
}