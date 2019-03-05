import React from 'react';
import '../styles/list.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            read: false,
        };
    }
    
    /* Extracts the list of projects from the server */
    fetchData() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);

        if (params.sort === undefined) {
            var url = 'http://192.168.1.33:8080/getprojects';
        }
        else {
            var url= "http://192.168.1.33:8080/getprojects/" + params.sort;
        }
        fetch(url)
            .then(results => {
                var json = results.json();
                return json;
            })

            .then(data => {
                this.setState({ rows: data, read: true });
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    /* Fills the HTML table containing each prioject */
    includeProjects = () => {
        let lines = [];
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
	
        if(this.state.read === true) {
            for(var i = 0; i < this.state.rows.length; i++) {
                if(this.state.rows[i].P_Validated === 1)
                    lines.push(<tr><Link to={{pathname: "/page", search: "?sort=" + this.state.rows[i].P_Name}} className="link"><td width="1000px" bgcolor="#80ffaa" align="center" id={i} key={i}>{this.state.rows[i].P_Name}</td></Link></tr>);
                else
                    lines.push(<tr><Link to={{pathname: "/page", search: "?sort=" + this.state.rows[i].P_Name}} className="link"><td width="1000px" align="center" id={i} key={i}>{this.state.rows[i].P_Name}</td></Link></tr>);    
            }
        }
        return(lines);
    }

    render() {
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
        return (
            <div className="project">
                <a href="/list" className="link"><div className="logo"></div></a>
                <div className="create">
                    <a href="/create" className="link">Créer un Projet</a>
                </div>

                <div className="letters">
                    <div className="letterfilter">
                        <a href="/list?sort=A" className="link">A </a> /
                        <a href="/list?sort=B" className="link"> B </a> / 
                        <a href="/list?sort=C" className="link"> C </a> / 
                        <a href="/list?sort=D" className="link"> D </a> / 
                        <a href="/list?sort=E" className="link"> E </a> / 
                        <a href="/list?sort=F" className="link"> F </a> / 
                        <a href="/list?sort=G" className="link"> G </a> / 
                        <a href="/list?sort=H" className="link"> H </a> / 
                        <a href="/list?sort=I" className="link"> I </a> / 
                        <a href="/list?sort=J" className="link"> J </a> / 
                        <a href="/list?sort=K" className="link"> K </a> / 
                        <a href="/list?sort=L" className="link"> L </a> / 
                        <a href="/list?sort=M" className="link"> M </a> / 
                        <a href="/list?sort=N" className="link"> N </a> / 
                        <a href="/list?sort=O" className="link"> O </a> / 
                        <a href="/list?sort=P" className="link"> P </a> / 
                        <a href="/list?sort=Q" className="link"> Q </a> / 
                        <a href="/list?sort=R" className="link"> R </a> / 
                        <a href="/list?sort=S" className="link"> S </a> / 
                        <a href="/list?sort=T" className="link"> T </a> / 
                        <a href="/list?sort=U" className="link"> U </a> / 
                        <a href="/list?sort=V" className="link"> V </a> / 
                        <a href="/list?sort=W" className="link"> W </a> / 
                        <a href="/list?sort=X" className="link"> X </a> / 
                        <a href="/list?sort=Y" className="link"> Y </a> / 
                        <a href="/list?sort=Z" className="link"> Z </a>
                    </div>
                    <div className="letterall">
                        <a href="/list" className="link">Tous</a>
                    </div>
                </div>

                <div className="list">
                <table>
                    <tbody>
                        {this.includeProjects()}
                    </tbody>
                </table>
                </div>
            </div>
        );
    };
}
export default ProjectList;
