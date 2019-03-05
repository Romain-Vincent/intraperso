import React from 'react';
import '../styles/page.css';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const options = [
    { value: 'ajouter', label: 'Ajouter' },
    { value: 'supprimer', label: 'Supprimer' }
]
class ProjectPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query_type: "",
            mail: "",
            res: "",
            msg: "",
            selectedOption: null,
        }
    }

    /* Checks if Users are allowed to be added, deleted to a project through 2 different procedures : adduser and dropuser */
    async fetchUsers() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);

        if (this.state.selectedOption.value === "ajouter") {
            var url = "http://192.168.1.33:8080/adduser/" + params.sort + "/" + this.state.mail;

            const response = await fetch(url);
            const json = await response.json();

            this.setState({
                res: json.Res,
                msg: json.Msg
            });

            if (this.state.res === -1) {
                alert('Error in the credentials: ' + this.state.msg);
            } else {
                alert("Etudiant Ajouté");
            }
        }

        else if (this.state.selectedOption.value === "supprimer") {
            var url = "http://192.168.1.33:8080/dropuser/" + params.sort + "/" + this.state.mail;

            const response = await fetch(url);
            const json = await response.json();

            this.setState({
                res: json.Res,
                msg: json.Msg
            });

            if (this.state.res === -1) {
                alert('Error in the credentials: ' + this.state.msg);
            } else {
                alert("Etudiant Supprimé");
            }
        }
    }

    componentDidMount() {

    }

    /* Calls fetchUsers upon form submition */
    handleSubmit(event) {
        event.preventDefault();
        this.fetchUsers();
    }

    /* Modifies the value of the SelectedOption in real time */
    optionChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    /* Modifies the value of the mail in real time */
    handleChange(event) {
        this.setState({ mail: event.target.value });
    }

    render() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
        return (
            <div className="global">
                <center><h1>Queries</h1></center>
                <div className="nav">
                    <ul>
                        <li><Link to={{ pathname: "/page", search: "?sort=" + params.sort }}>Détails</Link></li>
                        <li><Link to={{ pathname: "/notes", search: "?sort=" + params.sort }} >Notes</Link></li>
                        <li><Link to={{ pathname: "/queries", search: "?sort=" + params.sort }}>Demandes</Link></li>
                    </ul>
                </div>
                <a href="/list"><div className="arrow"></div></a>

                <div className="groupname">
                    <div className="text"><h1>{params.sort}</h1></div>
                </div>
                <form onSubmit={event => this.handleSubmit(event)} noValidate>
                    <Select className="query"
                        value={this.state.selectedOption}
                        onChange={this.optionChange}
                        options={options}
                    />
                    <input className="member_mail" type="email" name="mail " placeholder="membre a ajouter/supprimer" required autoFocus autoComplete="off"
                        onChange={this.handleChange.bind(this)} value={this.state.mail}></input>
                    <button type="submit" className="submit" id="submit" align="center">Valider</button>
                </form>
            </div>
        )
    };
}

export default ProjectPage;