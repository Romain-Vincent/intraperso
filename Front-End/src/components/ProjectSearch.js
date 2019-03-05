import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, withRouter} from 'react-router-dom';

class ProjectSearch extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        let initialProjects = [];
        fetch('http://192.168.1.33:8080/getprojects/')
            .then(response => {
                return response.json();
            }).then(data => {
            initialProjects = data.results.map((projects) => {
                return projects
            });
            console.log(initialProjects);
            this.setState({
                projects: initialProjects,
            });
        });
    }

    render() {
        return (
            <Projects state={this.state}/>
        );
    }
    
}

export default ProjectSearch;
