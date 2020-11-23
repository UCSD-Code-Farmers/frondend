import React, {Component} from 'react';
import './Section.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBalanceScaleLeft} from "@fortawesome/free-solid-svg-icons";
import {faCar} from "@fortawesome/free-solid-svg-icons";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import {faHouseUser} from "@fortawesome/free-solid-svg-icons";
import {faAnchor} from "@fortawesome/free-solid-svg-icons";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons";
import store from '../../store/Store'

const FreeForSale = <FontAwesomeIcon icon={faBalanceScaleLeft}/>;
const RideSharing = <FontAwesomeIcon icon={faCar}/>;
const CuttiePets = <FontAwesomeIcon icon={faPaw}/>;
const Housing = <FontAwesomeIcon icon={faHouseUser}/>;
const Entertainment = <FontAwesomeIcon icon={faAnchor}/>;
const Others = <FontAwesomeIcon icon={faAlignCenter}/>;

class Section extends Component {
    constructor(props) {
        super(props)
        this.history = props.history
    }


    handleClick = (postType) => {
        const action = {type: 'setSelectedPostType', data: {postType}}
        store.dispatch(action)
        this.history.push('/posts')
    }
    render() {
        return (
            <div className={"body-section-li"}>
                <div className={"services-li"}>
                    <h1 className={"h1-li"}>Pick your Favorite Section</h1>
                    <div className={"cen-li"}>
                        {/*FreeForSale*/}
                        <div className={"service-li"} onClick={() => {this.handleClick('Free or For Sale')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{FreeForSale}</i>
                            <h2 className={"service-li-h2"}>Free or For Sale</h2>
                            <p className={"service-li-p"}></p>
                        </div>
                        
                        {/*Ride Sharing*/}
                        <div className={"service-li"} onClick={() => {this.handleClick('Ride Sharing')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{RideSharing}</i>
                            <h2 className={"service-li-h2"}>Ride Sharing</h2>
                            <p className={"service-li-p"}></p>
                        </div>


                        {/*CuttiePets*/}
                        <div className={"service-li"} onClick={() => {this.handleClick('Cutie Pets')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{CuttiePets}</i>
                            <h2 className={"service-li-h2"}>Cutie Pets</h2>
                            <p className={"service-li-p"}></p>
                        </div>

                        {/*Housing*/}
                        <div className={"service-li"} onClick={() => {this.handleClick('Housing')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Housing}</i>
                            <h2 className={"service-li-h2"}>Housing</h2>
                            <p className={"service-li-p"}></p>
                        </div>


                        {/*Entertainment*/}

                        <div className={"service-li"} onClick={() => {this.handleClick('Entertainment')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Entertainment}</i>
                            <h2 className={"service-li-h2"}>Entertainment</h2>
                            <p className={"service-li-p"}></p>
                        </div>

                        {/*Others*/}
                        <div className={"service-li"} onClick={() => {this.handleClick('Others')}}>
                            <i style={{color: '#3498bd', fontSize: '50px', marginBottom: ' 50px'}}>{Others}</i>
                            <h2 className={"service-li-h2"}>Others</h2>
                            <p className={"service-li-p"}></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;