import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Profile = ({ modalProfile, setModalProfile }) => {
    const emptyProfile = {
        name: localStorage.getItem("name"),
        token: localStorage.getItem("token"),
        image: localStorage.getItem("image")
    }

    const [profile, setProfile] = useState(emptyProfile);
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleSubmit = () => {
        const { image } = profile;
        localStorage.setItem("image", image);
        history.push("/dashboard");
    };

    return (
        <>
        <Modal isOpen={modalProfile} centered>
            <ModalHeader>
            <div>
                <h3>Perfil de Usuario</h3>
            </div>
            </ModalHeader>

            <ModalBody>
                <FormGroup>
                    <label>Foto de Perfil:</label>
                </FormGroup>

                <FormGroup>
                    <img
                        className="img-lg rounded-circle"
                        src={localStorage.getItem("image") ? localStorage.getItem("image") : require('../../assets/images/faces/face0.jpg')}
                        alt="profile"
                    />
                </FormGroup>
                
                <FormGroup>
                    <input
                        className="form-control"
                        name="image"
                        type="text"
                        onChange={handleChange}
                        value={profile && profile.image}
                    />
                </FormGroup>
            </ModalBody>

            <ModalFooter>
            <Button color="primary" onClick={() => {handleSubmit(); setModalProfile()}}>
                Aceptar
            </Button>
            <Button color="danger" onClick={() => setModalProfile()}>
                Cancelar
            </Button>
            </ModalFooter>
        </Modal>
        </>
    );
};

export default Profile;