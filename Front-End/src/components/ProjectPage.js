import React from 'react';
import '../styles/page.css';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            description: [],
            mail: [],
            name: [],
            p_name: "",
        };
        this.getNames = this.getNames.bind(this);
        this.getPictures = this.getPictures.bind(this);
        this.getMails = this.getMails.bind(this);
        this.getDetails = this.getDetails.bind(this);
    }

    /* Extracts the Descriptions of the current project from the Database */
    fetchDetails() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
        let url = 'http://192.168.1.33:8080/getprojectdetails/';

        fetch(url + params.sort)
            .then(results => {
                var json = results.json();
                return json;  
            })

            .then(data => {
                this.setState({ description: data });
            })
    }

    /* Extracts the Names of each student that are assigned to the current project */
    fetchNames() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);

        let url = 'http://192.168.1.33:8080/getprojectstudents/';
        fetch(url + params.sort + "/names")
            .then(results => {
                var json = results.json();
                return json;
            })

            .then(data => {
                this.setState({ name: data });
            })
    }

    /* Extracts the Mails of each student that are assigned to the current project */
    fetchMails() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);

        let url = 'http://192.168.1.33:8080/getprojectstudents/';
        fetch(url + params.sort + "/emails")
            .then(results => {
                var json = results.json();
                return json;
            })

            .then(data => {
                this.setState({ mail: data });
            })
    }

    componentDidMount() {
        this.fetchDetails();
        this.fetchNames();
        this.fetchMails();
    }

    /* Builds the Table with the Names of each students in the current project */
    getNames = () => {
        let lines = [];
        let nbr = this.state.name.length;

        if (nbr) {
            for (let i = 0; i < nbr; i++)
                lines.push(<td align="center" key={this.state.name[i].U_Name} >{this.state.name[i].U_Name}</td>);
        }
        return lines;
    }

    /* Builds the Table with the Mails of each students in the current project */
    getMails = () => {
        let lines = [];
        let nbr = this.state.mail.length;

        if (nbr) {
            for (let i = 0; i < nbr; i++)
                lines.push(<td align="center" key={this.state.mail[i].U_Email} >{this.state.mail[i].U_Email}</td>);
        }
        return lines;
    }

    /* Builds the Table with the Pictures of each students in the current project */
    getPictures = () => {
        let lines = [];
        let nbr = this.state.name.length;

        if (nbr){
            for (let i = 0; i < nbr; i++)
                lines.push(<td align="center" key={this.state.name[i].U_Name}><img src="avatar_male.png" alt="avatar" height="170" width="150" /></td>);
        }
        return (lines);
    }

    /* Fills the Description for the Div */
    getDetails = () => {
        let lines = [];
        let nbr = this.state.description.length;
        if (nbr){
            for (let i = 0; i < nbr; i++)
                lines.push(<div key={this.state.description[i].P_Description}>{this.state.description[i].P_Description}</div>);
        }
        return (lines);
    }


    render() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
        return (
            <div className="global">
            <div className="nav">
                <ul>
                    <li><Link to={{pathname: "/page", search: "?sort=" + params.sort}}>Détails</Link></li>
                    <li><Link to={{pathname: "/notes", search: "?sort=" + params.sort}} >Notes</Link></li>
                    <li><Link to={{pathname: "/queries", search: "?sort=" + params.sort}}>Demandes</Link></li>
                </ul>
            </div>
            <a href="/list"><div className="arrow"></div></a>
            
                <div className="groupname">
                    <div className="text"><h1>{params.sort}</h1></div>
                </div>
                <table border="0" className="groupmember">
                    <tbody>
                        <tr>
                            {this.getNames()}
                        </tr>
                        <tr>
                            {this.getPictures()}
                        </tr>
                        <tr>
                            {this.getMails()}
                        </tr>
                    </tbody>
                </table>
                <div className="description">
                    {this.getDetails()}
                </div>
            </div>
        )
    };
}

export default ProjectPage;