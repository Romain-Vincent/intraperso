import React from 'react';
import '../styles/page.css';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import ToolTip from 'react-portal-tooltip';


class ProjectPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isTooltipActive: false,
            current: null,
            description: "Test", 
            rows: [],
            read: false,
            };
        } 
    
        componentDidMount() {
        }
        
        /* Gets the Deliveries for the current project */
        componentWillMount() {
        var url;
        var url_get = this.props.location.search;
        var params = queryString.parse(url_get);
        
        url = 'http://192.168.1.33:8080/getstatuspoints/' + params.sort;
        fetch(url)
            .then(results => {
                return results.json();
            })
            .then(data => {
                this.setState({rows: data[0], read: true});
            });
    
        }
    
        /* Makes the description of each Delivery visible */
        showTooltip(e) {
        
        const desc = this.state.rows[e.target.id].text;
        this.setState({current: e.target,
                   description: desc, 
                   isTooltipActive: true});
        }
    
        /* Hides the description of each Delivery */
        hideTooltip() {
        this.setState({isTooltipActive: false});
        }
    
        displayLines() {
        let lines = [];
        
        if(this.state.read === true) {
            for(var i = 0; i < this.state.rows.length; i++) {
            
            lines.push(<div className="soutenance"><label id={i} key={i}  
                   onMouseEnter={this.showTooltip.bind(this)}
                   onMouseLeave={this.hideTooltip.bind(this)}>{this.state.rows[i].date}
                   </label>
                   </div>);
            }
    
            return lines;
        }
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
                <div className="notes">
                {this.displayLines()}
                    <ToolTip active={this.state.isTooltipActive} position="bottom" arrow="left" parent={this.state.current}>
                        <div>
                            <p className="desc">{this.state.description}</p>
                        </div>
                    </ToolTip>
                </div>
            </div>
        )
    };
}

export default ProjectPage;