import React from 'react';
import '../styles/home.css';

class Home extends React.Component {
    render() {
        return (
            <section className="h-100">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100">
                            <div className="card-wrapper">
                                <div className="brand animated flipInX">
                                    <img src="../styles/img/Epitech.png" alt="logo" />
                                </div>
                                <div className="card fat animated fadeIn">
                                    <div className="card-body">
                                        <form onSubmit={event => this.handleSubmit(event)} className="my-login-validation" noValidate>
                                            <div className="form-group">
                                                <label htmlFor="email"> <i className="fas fa-envelope"></i> Email </label>
                                                <input id="email" type="email" className="form-control" name="email" required autoFocus autoComplete="off" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password"> <i className="fas fa-lock"></i> Password
                                                    <a href="forgot.html" className="float-right">
                                                        Forgot Password ?
                                                    </a>
                                                </label>
                                                <input id="password" type="password" className="form-control" name="password" required data-eye />
                                                <div className="invalid-feedback">
                                                    {this.state.error ? this.state.error.message : null}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="custom-checkbox custom-control">
                                                    <input type="checkbox" name="remember" id="remember" className="custom-control-input" />
                                                    <label htmlFor="remember" className="custom-control-label">Remember me</label>
                                                </div>
                                            </div>

                                            <div className="form-group m-0">
                                                <button type="submit" className="btn btn-primary btn-block" id="btn-submit">
                                                    Login
                                                </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Don't have an account ? <a href="register">Create one</a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
}

export default Home;
