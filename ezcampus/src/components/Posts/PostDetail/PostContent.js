import { Avatar, Col, Row,  Card } from "antd";
import React from "react";
import BigProfile from "../icons/BigProfile.png"
import styled from "styled-components";
import store from '../../../store/Store'
import Comment from "./Comment/Comment";
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import { LikeOutlined} from "@ant-design/icons";

const editIcon = <FontAwesomeIcon icon={faEdit}/>;

class PostContent extends React.Component {

    constructor(props) {
      super(props)
      this.postId = props.history.location.pathname.slice(7)
      this.history = props.history
      this.state = {
        data: {
          creatorName: '', 
          creatorEmail: '', 
          title: '', 
          description: '', 
          views: 0, 
          likes: 0, 
          date: '', 
          postId: '', 
          postType: '',
        },
        liked: false,
        likeNumber: 0,
      }
    }
    handleClick = async () =>{
      const {email} = store.getState()
      axios.post(' http://server.metaraw.world:3000/posts/like/like', 
      {'email': email, 'postId': this.postId})
      .then(res => {
        if (res.data.statusCode === 200) {
            console.log('Already Liked')
        }
      });
      this.setState({
        liked:true,
        likeNumber: this.state.likeNumber + 1
      })
    }
    getLikes = async () =>{
      axios.get("http://server.metaraw.world:3000/posts/like/number", {params: {postId:this.postId}})
      .then(res => {
          if (res.data.statusCode === 200) {
              this.setState({
                  likeNumber: res.data.likeNumber
              }, () => {
                  console.log(this.state.likeNumber)
              })
          }
      })

    }
    checkLike = async () =>{
      const {email} = store.getState()
      axios.get("http://server.metaraw.world:3000/posts/like/check", {params: {postId:this.postId, email: email}})
      .then(res => {
          if (res.data.statusCode === 200) {
              this.setState({
                  liked: res.data.exist
              }, () => {
                console.log(this.postId)
                console.log(res.data.exist)
                  // console.log(this.state.liked)
              })
          }
      })
    }

    componentDidMount() {
      this.checkLike()
      this.getLikes()
      let interval = setInterval(() => {
        const {isLoading} = store.getState()
        if (!isLoading) {
            clearInterval(interval)
            const {isLoggedIn} = store.getState()
            if (!isLoggedIn) {
                const action = {type: 'setShowPromptLogIn'}
                store.dispatch(action)
                this.history.replace('/posts')
            } else {
              axios.get('http://server.metaraw.world:3000/posts/get_a_post_detail', {params: {postId:this.postId}})
              .then(res => {
                  const post = res.data.data
                  this.setState({data: post})
              })
              .catch(err => {
                console.log(err)
              })
            }
        } 
    }, 5)


      store.subscribe(() => {
        let interval = setInterval(() => {
          const {isLoading} = store.getState()
          if (!isLoading) {
              clearInterval(interval)
              const {isLoggedIn} = store.getState()
              if (!isLoggedIn) 
                this.history.push('/posts')
          }
        }, 5)
    
      })
    
    }


    render() {
      const { email } = store.getState();
      return (
        <div>
          <Card style={{width:"100%"}}>
              <Row align="middle">
                <Link to={`/profile/${this.state.data.creatorEmail}`}>
                  <Col flex="0 1" style={{ margin: "5px" }}>
                    <Avatar size={50} src={BigProfile} alt="" />
                  </Col>
                 </Link>
                 <Link to={`/profile/${this.state.data.creatorEmail}`}>
                  <Col flex="2 1" style={{ margin: "5px" }}>
                    <span style={styles.nameText}>
                      {this.state.data.creatorName}
                    </span>
                  </Col>
                 </Link>
                 {email === this.state.data.creatorEmail ? 
                  <Col>
                    <Link to={{
                      pathname:'/posts/edit',
                      state: {data: this.state.data}
                    }}>
                    {editIcon}
                    </Link>
                 </Col>
                :null}
                <Col flex="1 1" style={{ textAlign: "right", margin: "5px" }}>
                  <span>Likes: {this.state.likeNumber}</span>
                  <span style={styles.timeText}>{this.state.data.date}</span>
                </Col>
              </Row>
              <Col span={24}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  fontFamily: "BasicSans",
                  paddingTop: "25px",
                }}
              >
                <div style={styles.postTitle}> {this.state.data.title} </div>

                <style type="text/css"></style>
              </div>
            </Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <div class="postText">
                  <PostText>{ReactHtmlParser(this.state.data.description)}</PostText>
                </div>
                <style type="text/css"></style>
              </div>
              {this.state.liked === false?
              <Button onClick={this.handleClick}>
                      Like this Post
                    <LikeOutlined/>
              </Button> :  
              <Button disabled style={styles.liked}>
                     Liked
                <LikeOutlined/>
              </Button>
              }
              
          </Card>
            <Comment history={this.props.history}/>
        </div>
      );
    }
  }
  
  const styles = {
    nameText: {
      fontFamily: "BasicSans",
      fontWeight: "bold",
      fontSize: 20,
      color: "#545871",
      verticalAlign: "middle",
      textAlign: "center",
      display: "inline-block",
    },
    timeText: {
      fontFamily: "BasicSans",
      fontWeight: "300",
      fontSize: "12",
      color: "#808295",
    },
    postTitle: {
      fontFamily: "BasicSans",
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "left",
      color: "#545871",
    },
    liked:{
     backgroundColor: "#d3d3d3"
    }
   
  };

  const PostText = styled.div`
  font-family: BasicSans;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #545871;
  display: inline-block;
  margin-top: 20px;
  word-break: break-word;
`;
  
  export default PostContent;
  