import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [errors, setError] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

  

    const hadleEnteredData = (e) => {
        const { name, value } = e.target;
    
        if (errors.back) {
            setError((prevErrors) => ({ ...prevErrors, back: '' }));
        }
    
        setUserData((prev) => ({ ...prev, [name]: value }));
    
        let errorMessage = '';
        if (value.length === 0) {
            errorMessage = `${name} Is Required`;
        } 
        // else if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        //     errorMessage = 'Email Not Valid';
        // }
        // else if (name === "password" && !/^[A-Za-z0-9]{3,}.*[.$_@#]{1,}/.test(value)) {
        //     errorMessage = 'Password Must Start with 3 or more character and at least one special character';
        // } 
    
        setError((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formHasError = false;
        const newErrors = {};

        Object.entries(userData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = `${key} is required`;
                formHasError = true;
            }
        });

        // if (userData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
        //     newErrors.email = 'Email not valid';
        //     formHasError = true;
        // }


        // if (userData.password && !/^(?=.*[.$_@#])[A-Za-z0-9.$_@#]{6,}$/.test(userData.password)) {
        //     newErrors.password = 'Password must be at least 6 characters and contain one special character (@, #, $, _, .)';
        //     formHasError = true;
        // }

        setError({ ...errors, ...newErrors });

        if (formHasError) return;

        const payload = {
            email: userData.email,
            password: userData.password,
        };

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login/', payload);
            localStorage.setItem("logged", "true"); 
            localStorage.setItem("userId", res.data.loguser);
            localStorage.setItem("user_email", res.data.user.email);
            navigate('/home');
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError((prev) => ({ ...prev, back: error.response.data.error }));
            } else {
                setError((prev) => ({ ...prev, back: 'Something went wrong. Please try again later.' }));
            }
        }

    };


    return (
        <>
            <div className="parent" style={{ height: '800px' }}>
                <Container style={{ height: '100%' }}>
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                        <h1 className="p-3">Login Now</h1>
                        <form className="col-4" >
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input
                                    type="text"
                                    className={`form-control ${(errors.email) ? 'is-invalid' : ''} `}
                                    value={userData.email}
                                    onChange={hadleEnteredData}
                                    name="email"
                                />
                                {(errors?.email) ?
                                    <small id="fileHelpId" class="form-text text-danger fw-bolder text-capitalize">{errors.email}</small>
                                    : ''
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${(errors.password) ? 'is-invalid' : ''} `}
                                    value={userData.password}
                                    onChange={hadleEnteredData}
                                    name="password"
                                />
                                {(errors?.password) ?
                                    <small id="fileHelpId" class="form-text text-danger fw-bolder text-capitalize">{errors.password}</small>
                                    : ''
                                }
                            </div>
                            {errors.back && (
                                <div className="alert alert-danger text-center fw-bold">
                                    {errors.back}
                                </div>
                            )}
                            <button type="submit" onClick={handleSubmit} className="btn btn-primary w-100">Submit</button>
                        </form>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Login;