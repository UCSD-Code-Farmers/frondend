import React, { Component } from 'react'
import {useHistory} from 'react-router-dom'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorInput from 'react-froala-wysiwyg'
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import FroalaEditorView from 'react-froala-wysiwyg'
import Button from 'react-bootstrap/Button';
import './CreatePost.css';
import uuid from 'react-uuid';
import store from '../../store/Store'
import axios from 'axios'

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.history = props.history

        this.state = {creatorEmail: '', creatorName: '', description: '', title: '', postType: 'Free and for Sale'};
    }


    updateTitle = (e) => {
        this.setState({title: e.target.value})
    }

    updateType = (e) => {
        this.setState({postType: e.target.value})
    }

     
    updateEditerComponentText = (e) => {
        this.setState({description: e})
    }

    submitPost = () => {

        //check if the title or description is left empty
        const {isLoggedIn} = store.getState()
        if (isLoggedIn == false) {
            alert('Please signup/login first')
            return
        }

        if (this.state.title == '') {
            alert('Please enter a valid title')
            return
        }

        if (this.state.description == '') {
            alert('Description cannot be empty')
            return
        }


        const {userName, email} = store.getState()


        //some other info is required for making a post
        const otherInfo = {
            date: new Date().toLocaleString('en-GB', { timeZone: 'PST' }),
            views: 0,
            likes: 0,
            postId: uuid()
        }

        
        //since setState is aysnc, the aixos API call need to be placed in its callback function
        
        this.setState({creatorName: userName, creatorEmail:email}, () => {
            axios.post('http://server.metaraw.world:3000/posts/create_a_post', {
                ...this.state,
                ...otherInfo
            })
            .then(res => {
                if (res.data.statusCode == 200) {
                    console.log('post has been created')
                    this.history.push('/posts')
                }
            })
        })
    
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
                        <label><strong>Title</strong></label>
                        <input type="text" className="form-control"
                               placeholder="Please enter the title of this post"
                               onChange={this.updateTitle}/>
                    </div>
                    <div className="form-group">
                        <label><strong>Category</strong></label>
                        <select className="form-control" id="postCategory" onChange={this.updateType}>
                            <option>Free and for Sale</option>
                            <option>Ride Sharing</option>
                            <option>Cutie Pets</option>
                            <option>Housing</option>
                            <option>Entertainment</option>
                            <option>Others</option>
                        </select>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>*/}
                    {/*    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                    {/*</div>*/}
                </form>
                <div className='create-post-text-area'>
                <p><strong>Description</strong></p>
                <FroalaEditorComponent tag={'textarea'} config={{
                    placeholderText: 'Write the details here!',
                    charCounterCount: true
                }} onModelChange={this.updateEditerComponentText}/>
                </div>
                <br/>
                <div>
                    <Button type="button" id="creat-post-cancel"
                            className="btn btn-secondary float-right btn-lg ml-3">
                        <strong>Cancel</strong>
                    </Button>
                    <Button type="button" id="creat-post-send"
                            className="btn btn-success float-right btn-lg"
                            onClick={this.submitPost}>
                        <strong>Send</strong>
                    </Button>
                </div>
            </div>
        )
    }
}
