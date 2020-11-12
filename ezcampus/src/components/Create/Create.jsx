import React, { Component } from 'react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import Button from 'react-bootstrap/Button';
import './CreatePost.css';
import uuid from 'react-uuid';
import store from '../../store/Store'


export default class Create extends Component {
    constructor(props) {
        super(props)
        this.uuid = uuid();
        const postTime = new Date();
        const postDate = postTime.toLocaleString('en-GB', { timeZone: 'PST' })
        // date-time and username info to pass to backend
        this.state = {"postDate": postDate, userName: "guest"};
    }

    // updating the username when "Send" button is onClick
    updateUserName = () => {
        const {userName} = store.getState();
        this.setState({userName}, () => {console.log(this.state)});
    }

    render() {
        return (
            <div>
                <br/>
                <h2>Create Post</h2>
                <br/>
                <br/>

                <form>
                    <div className="form-group">
                        <label><strong>SUBJECT</strong></label>
                        <input type="email" className="form-control" id="postSubject"
                               placeholder="your subject goes here..."/>
                    </div>
                    <div className="form-group">
                        <label><strong>CATEGORY</strong></label>
                        <select className="form-control" id="postCategory">
                            <option>Second Hand</option>
                            <option>Ride Sharing</option>
                            <option>Cutie Catty</option>
                            {/*<option>4</option>*/}
                            {/*<option>5</option>*/}
                        </select>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>*/}
                    {/*    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                    {/*</div>*/}
                </form>
                <p><strong>DETAILS</strong></p>
                <FroalaEditorComponent tag={'textarea'} config={{
                    placeholderText: 'Write the details here!',
                    charCounterCount: true
                }}/>
                <br/>
                <div>
                    <Button type="button" id="creat-post-cancel"
                            className="btn btn-secondary float-right btn-lg ml-3">
                        <strong>Cancel</strong>
                    </Button>
                    <Button type="button" id="creat-post-send"
                            className="btn btn-success float-right btn-lg" onClick={this.updateUserName}>
                        <strong>Send</strong>
                    </Button>
                </div>
            </div>
        )
    }
}
