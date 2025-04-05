import axios from "axios";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
    });

    const [errors, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword: "",
        back: ''
    });

    const navigate = useNavigate();

  

    const handleEnteredData = (e) => {
        const { name, value } = e.target;
    

        if (errors.back) {
            setError((prevErrors) => ({ ...prevErrors, back: '' }));
        }
    
        setUserData((prev) => ({ ...prev, [name]: value }));
    
        let errorMessage = '';
        if (value.length === 0) {
            errorMessage = `${name} Is Required`;
        } else if (name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            errorMessage = 'Email Not Valid';
        } else if (name === "phone" && !/^(?:\+20|0)?(10|11|12|15)[0-9]{8}$/i.test(value)) {
            errorMessage = 'Phone Must Be Egyptian And Must Be 11 Digit';
        } else if (name === "password" && !/^[A-Za-z0-9]{3,}.*[.$_@#]{1,}/.test(value)) {
            errorMessage = 'Password Must Start with 3 or more character and at least one special character';
        } else if (name === "confirmPassword" && value !== userData.password) {
            errorMessage = 'Not Matched With Password';
        }
    
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

        if (userData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
            newErrors.email = 'Email not valid';
            formHasError = true;
        }

        if (userData.phone && !/^(?:\+20|0)?(10|11|12|15)[0-9]{8}$/.test(userData.phone)) {
            newErrors.phone = 'Phone must be Egyptian and must be 11 digits';
            formHasError = true;
        }

        if (userData.password && !/^(?=.*[.$_@#])[A-Za-z0-9.$_@#]{6,}$/.test(userData.password)) {
            newErrors.password = 'Password must be at least 6 characters and contain one special character (@, #, $, _, .)';
            formHasError = true;
        }

        if (userData.confirmPassword && userData.confirmPassword !== userData.password) {
            newErrors.confirmPassword = 'Not matched with password';
            formHasError = true;
        }

        setError({ ...errors, ...newErrors });

        if (formHasError) return;

        const payload = {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password,
            mobile_phone: `+2${userData.phone}`
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/register/', payload);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError((prev) => ({ ...prev, back: error.response.data.error }));
            } else {
                setError((prev) => ({ ...prev, back: 'Something went wrong. Please try again later.' }));
            }
        }
    };

    return (
        <div className="parent" style={{ height: '800px' }}>
            <Container style={{ height: '100%' }}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1 className="p-3">Register Now</h1>
                    <form className="col-4" onSubmit={handleSubmit} method="POST">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                value={userData.firstName}
                                onChange={handleEnteredData}
                                name="firstName"
                            />
                            {errors.firstName && <small className="form-text text-danger fw-bold text-capitalize">{errors.firstName}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                value={userData.lastName}
                                onChange={handleEnteredData}
                                name="lastName"
                            />
                            {errors.lastName && <small className="form-text text-danger fw-bold text-capitalize">{errors.lastName}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={userData.email}
                                onChange={handleEnteredData}
                                name="email"
                            />
                            {errors.email && <small className="form-text text-danger fw-bold text-capitalize">{errors.email}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={userData.phone}
                                onChange={handleEnteredData}
                                name="phone"
                            />
                            {errors.phone && <small className="form-text text-danger fw-bold text-capitalize">{errors.phone}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={userData.password}
                                onChange={handleEnteredData}
                                name="password"
                            />
                            {errors.password && <small className="form-text text-danger fw-bold text-capitalize">{errors.password}</small>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                value={userData.confirmPassword}
                                onChange={handleEnteredData}
                                name="confirmPassword"
                            />
                            {errors.confirmPassword && <small className="form-text text-danger fw-bold text-capitalize">{errors.confirmPassword}</small>}
                        </div>

                        {errors.back && (
                            <div className="alert alert-danger text-center fw-bold">
                                {errors.back}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default Register;