import { useState } from "react";
import {
    Button,
    Card,
    CardImg,
    CardText,
    Form,
} from "react-bootstrap";
import icon from "../assets/icon.png";
import google from "../assets/google25x25.png";

export function Login() {

    const [form1, setForm] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = () => {
        console.log(form1);
    };
    return (
        <>
            <style type="text/css">
                {`
        `}
            </style>
            <div
                className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <Card className="w-100 border-0 justify-content-center align-items-center">
                    <CardImg className="w-25" variant="top" src={icon} alt='woasis' />
                    <CardText>
                        <h4 className="text-h4 mb-1">Welcome to <span className="text-success fw-bold">Woasis</span></h4>
                    </CardText>
                    <CardText>
                        <h4 className="text-h4 mb-1">Log in with your <span className="text-primary">Google Account</span> to continue</h4>
                    </CardText>
                    <CardText>
                        <Form>
                            <Button className="d-flex justify-content-start align-items-center p-2 px-5" variant="primary" onClick={handleSubmit}>
                                <div className="me-3">
                                    <img className='img-fluid' src={google} alt="google-icon"></img>
                                </div>
                                <div className="">
                                    Login
                                </div>
                            </Button>
                        </Form>
                    </CardText>
                </Card>
            </div>
        </>
    );
}