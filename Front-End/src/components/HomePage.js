import React from 'react';
import '../styles/homepage.css';
import '@babel/polyfill';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            res: 1,
            msg: "",
            error: ""
        };
    }

    /* Calls the testuser which checks the existence of the credentials within the database */
    async fetchUsers() {
        var url = "http://192.168.1.33:8080/testuser/" + this.state.login + "/" + this.state.password;

        const response = await fetch(url);
        const json = await response.json();

        this.setState({
            res: json.Res,
            msg: json.Msg
        });

        if (this.state.res === -1) {
            alert('Error in the credentials: ' + this.state.msg);
        } else {
            this.props.history.push("/list");
        }
    }

    componentDidMount() {
    }

    /* Handles the submitted form calling the function fetchUsers which checks if the credentials exist in the Database */ 
    handleSubmit(event) {
        event.preventDefault();
        this.fetchUsers();
    }

    /* Modifies the login and password in real time */
    handleChange(event) {
        if (event.target.name === 'login') {
            this.setState({ login: event.target.value });
        } else {
            this.setState({ password: event.target.value });
        }
    }


    render() {
        return (
            <div className="login">
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
                                                <input id="login" type="email" className="form-control" name="login" required autoFocus autoComplete="off"
                                                    onChange={this.handleChange.bind(this)} value={this.state.login} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password"> <i className="fas fa-lock"></i> Password
                                                    <a href="forgot.html" className="float-right">
                                                        Forgot Password ?
                                                    </a>
                                                </label>
                                                <input id="password" type="password" className="form-control" name="password" required data-eye
                                                    onChange={this.handleChange.bind(this)} value={this.state.password} />
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
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HomePage;
