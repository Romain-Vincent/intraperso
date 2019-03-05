import React, { Component } from 'react';
import '../styles/create.css';

class ProjectCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            /* used to read data from MySQL */
            res: -1,
            message: "",
            /* 
               flags indicating where we are regarding 
               the interaction with the server 
            */
            read: false,
            called: false,
            clicked: false,
            /* fields from the form */
            project: "",
            email: "",
            users: "",
            description: "",
        };

        this.doClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /* Submits the Form for the creation of a project */
    async handleSubmit(event) {

        var url = "http://192.168.1.33:8080/newproject/"
            + this.state.project + '/'
            + this.state.email + '/'
            + this.state.users + '/'
            + this.state.description;

        event.preventDefault();
        const response = await fetch(url);
        const json = await response.json();

        this.setState({
            res: json.Res,
            msg: json.Msg
        });

        if (this.state.res === -1) {
            alert('Error in the form: ' + this.state.msg);
        } else {
            alert('You have submitted the creation of a project successfully');
        }
    }

    /* Verifies if every part of the form is correct (for example : if the project name is not already taken in the database) */
    isValidProject() {
        var url;
        url = 'http://192.168.1.33:8080/newproject/'
            + this.state.project + '/'
            + this.state.email + '/'
            + this.state.users + '/'
            + this.state.description;

        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({
                    res: data.Res,
                    message: data.Msg,
                    read: true
                });
            });
    }

    componentDidMount() {

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    /* Checks if every field is correctly filled */
    doValidate() {
        var noerror = true;

        if (this.state.clicked === false)
            return true;
        if (this.state.project === "") {
            alert("The project name is mandatory");
            noerror = false;;
        } else if (this.state.email === "") {
            alert("The email of the leader is mandatory");
            noerror = false;
        } else if (this.state.users === "") {
            this.state.users = " ";
        } else if (this.state.description === "") {
            alert("The desctiption is mandatory");
            noerror = false;
        }

        if (noerror === true) {
            if (this.state.called === false) {
                this.setState({ called: true });
                this.isValidProject();
            } else {
                if (this.state.read === true) {
                    if (this.state.res === -1) {
                        alert("Error: " + this.state.message);
                        noerror = false;
                    } else {
                        alert(this.state.message);
                        noerror = true;
                    }
                }
            }
        }
        return noerror;
    }

    /* Modifies the state of the form */
    checkForm() {
        if (this.state.clicked) {
            if (this.doValidate() === false) {
                this.setState({ clicked: false, read: false, called: false });
            }
        }
    }

    onClick(e) {
        e.preventDefault();

        this.setState({ clicked: true });
        this.checkForm();
    }

    render() {
        console.log("render");
        return (
            <div className="createform">
                <a href="/list"><div className="arrow"></div></a>
                <div className="title"><h1>Create your Project</h1></div>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <div className="container">
                        <table border='0'>
                            <tbody>
                                <tr>
                                    <td align='right'> Nom du projet: </td>
                                    <td> <input type="project" name="project" size="50"
                                        onChange={(event) => this.onChange(event)}
                                        value={this.state.project} />
                                    </td>
                                </tr>

                                <tr>
                                    <td align='right'> Email du chef de groupe: </td>
                                    <td> <input type="email" name="email" size="50"
                                        onChange={(event) => this.onChange(event)}
                                        value={this.state.email} />
                                    </td>
                                </tr>

                                <tr>
                                    <td align='right'> Autres Membres (séparés par des ";"): </td>
                                    <td> <input type="users" name="users" size="50"
                                        onChange={(event) => this.onChange(event)}
                                        value={this.state.users} />
                                    </td>
                                </tr>

                                <tr>
                                    <td align='right'> Description </td>
                                    <td> <textarea name="description" cols="80" rows="5"
                                        onChange={(event) => this.onChange(event)}
                                        value={this.state.description} />
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="2" align='center'>
                                        <button type="submit" name="button"
                                            onClick={(event) => this.onClick(event)}
                                            value={this.state.description}>
                                            Create Project
	                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {this.checkForm()}
                </form>
            </div>
        );
    }
}

export default ProjectCreate;