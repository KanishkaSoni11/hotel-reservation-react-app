import {Modal} from "react-bootstrap";
import {useState} from "react";

const FinalBillModal = () => {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
    };

    return(

        <>
            <Modal show={show} onHide={handleClose} animation={false} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Bill Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modal Body
                </Modal.Body>
            </Modal>

        </>
    )
}

export default FinalBillModal;