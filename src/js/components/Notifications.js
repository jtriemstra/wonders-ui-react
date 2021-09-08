import React, { Component } from "react";
import Utility from "../Utility";

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications:[],
            id:-1
        };
        this.getList = this.getList.bind(this);
    }

    componentDidMount() {
        console.log("notifications mounted");
        setTimeout(this.getList, 2000);
    }

    getList() {
        console.log("notifications getList()");
        fetch(Utility.apiServer() + "/notifications?lastId=" + this.state.id) 
        .then(res => res.json())
        .then((result) => {
            if (result && result.length > 0){
                let localNotifications = this.state.notifications;
                for (var i=0; i<result.length; i++){
                    localNotifications.push(result[i].message);
                    localNotifications.push(<br></br>);
                }

                this.setState({notifications:localNotifications, id:result[result.length-1].identifier});
            }
            setTimeout(this.getList, 2000);
        });
    }

    render() {
        let notifications = [];
        
        return (
            <div className="notification-list">
                <div className="notification-list-inner">
                    {this.state.notifications}
                </div>
            </div>
        );
    }
}

export default Notifications;