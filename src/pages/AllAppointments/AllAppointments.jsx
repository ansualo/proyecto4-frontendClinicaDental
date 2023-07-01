import React, { useEffect, useState } from "react";
import './AllAppointments.css'
import { deleteAppointment, getAllAppointments } from "../../services/apiCalls";
import { Col, Row, Container } from "react-bootstrap";
import { FunctionButton } from "../../common/FunctionButton/FunctionButton";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { editingAppointment, saveId } from "../appointmentSlice";
import { useNavigate } from "react-router-dom";


export const AllAppointments = () => {

    const [allAppointments, setAllAppointments] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const datos = useSelector(userData);
    const token = datos?.credentials?.token?.data?.token;
    const role = datos?.data?.roleId;

    const fetchAllAppointments = () => {
        getAllAppointments(token)
            .then((res) => {
                setAllAppointments(res.data)
            })
    }

    const handleDelete = async (appointmentId) => {
        await deleteAppointment(token, appointmentId)
        fetchAllAppointments()
    }

    useEffect(() => {
        if (allAppointments.length === 0) {
            fetchAllAppointments()
        }
    }, [])

    const isEditing = (appointmentId) => {
        dispatch(saveId({ id: appointmentId }))
        dispatch(editingAppointment(true))
        navigate('/modificarcita')
    }

    return (
        <div className="allAppointmentsDesign">
            <Container className="allAppointmentsContainer">
                {allAppointments.length > 0
                    ? (
                        allAppointments.map((appointment) => {
                            return (
                                <div key={appointment.id}>
                                    <div className="eachAllAppointment">
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Id</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{(appointment.id)}</div>
                                            </Col>
                                        </Row>
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Fecha</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{new Date(appointment.date).toLocaleString()}</div>
                                            </Col>
                                        </Row>
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Paciente</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{`${appointment.patient.name} ${appointment.patient.surname}`}</div>
                                            </Col>
                                        </Row>
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Tratamiento</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{appointment.Treatment.name}</div>
                                            </Col>
                                        </Row>
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Doctor</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{`${appointment.doctor.name} ${appointment.doctor.surname}`}</div>
                                            </Col>
                                        </Row>
                                        <Row className="appointmentRow">
                                            <Col sm={10} md={5}>
                                                <div className="appointmentLabel">Precio</div>
                                            </Col>
                                            <Col sm={10} md={7}>
                                                <div className="appointmentInfo">{`${appointment.price} €`}</div>
                                            </Col>
                                        </Row>
                                        {role === 3
                                            ? (
                                                <Row className="buttonsRow">
                                                    <Col md={6} className="buttonsCol">
                                                        <FunctionButton name="Modificar" action={() => {isEditing(appointment.id)}}></FunctionButton>
                                                    </Col>
                                                    <Col md={6} className="buttonsCol">
                                                        <FunctionButton name="Cancelar" action={() => { handleDelete(appointment.id) }}></FunctionButton>
                                                    </Col>
                                                </Row>
                                            )
                                            : (<></>)
                                        }
                                    </div>
                                </div>

                            )
                        })
                    )
                    : (
                        <div>CARGANDO...</div>
                    )
                }
            </Container>

        </div>
    )


}