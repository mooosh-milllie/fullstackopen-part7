import { LinkOutlined, ThumbUp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { handleBloglikes, setBlogInfo } from '../reducers/blogInfoReducer';
import { setUser } from '../reducers/userReducer';
import blogService from '../services/blogs';
import Nav from './Nav';

const Container = styled.div`
  width: 70%;
  margin: auto;
  background-color: #fff;
`;
const MainWrapper = styled.div`
  margin-left: 20px;
`;
const CommentsContainer = styled.div``;
const HeadingContainer = styled.div`
  width: 60%;
  margin: 0 auto;
`;
const Heading = styled.h1`
  margin-top: 20px;
`;
const BlogDetailsContainer = styled.div`
  display: flex;
  color: black;
  flex-direction: column;
  width: 25%;
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
const LinkSpan = styled.span`
  margin-left: 5px;
`;

const LikesContainer = styled.div`
  margin-left: 5px;
`;
const Likes = styled.span`
  display: block;
`;
const LikeButton = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;
  margin-left: 5px;
  cursor: pointer;
`;
const Addedby = styled.small`
  margin-top: 10px;
  margin-left: 5px;
`;
const AddedbyName = styled.span`
  font-style: italic;
  font-size: 1.2em;
`;
const CommentHeading = styled.h2``;
const CommentInputForm = styled.form``;
const InputContainer = styled.div``;
const CommentInput = styled.input``;
const CommentButton = styled.button``;
const BlogListWrapper = styled.ul`
  margin-left: 0;
  padding: 0;
`;
const BlogList = styled.li`
  list-style-type: square;
  color: gray;
`;
const UserBlog = () => {
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const id = useParams().id;

  const blog = useSelector((state) => state.bloginfo);


  useEffect(() => {
    const now = new Date().getTime();
    const loggedInUser = window.localStorage.getItem('userLogBlogList');
    if (loggedInUser) {
      const storedUser = JSON.parse(loggedInUser);
      if (now-storedUser.now > 1*60*60*1000) {
        window.localStorage.removeItem('userLogBlogList');
        dispatch(setUser(null));
      } else {
        dispatch(setUser(storedUser));
        blogService.getSingleBlog(id).then(blog => {
          dispatch(setBlogInfo(blog));
        }).catch(error => {
          console.log(error.message);
        });
        blogService.setToken(storedUser.token);
        blogService.getBlogComments(id).then(response => {
          setComments(response);
        });
      }
    }
  },[]);

  const handleComment = async(event) => {
    event.preventDefault();
    const comment = event.target.comment.value;

    const addedBlog = await blogService.addBlogComments(id, comment);
    setComments(comments.concat({ comment: addedBlog.comment, id: addedBlog.id }));

    setTimeout(() => {
      event.target.comment.value = '';
    }, 3000);
  };

  return (
    <Container>
      <Nav/>
      <MainWrapper>
        <HeadingContainer>
          <Heading>{blog.title}</Heading>
        </HeadingContainer>

        <CommentsContainer>

          <CommentHeading>Comments</CommentHeading>

          <CommentInputForm onSubmit={handleComment}>
            <InputContainer>
              <CommentInput type="text" name='comment'/>
              <CommentButton>send</CommentButton>
            </InputContainer>
          </CommentInputForm>

          <BlogListWrapper>
            {comments.map((comment) => {
              return <BlogList key={comment.id}>{comment.comment}</BlogList>;
            })}
          </BlogListWrapper>
        </CommentsContainer>

        <BlogDetailsContainer>
          <Link>
            <LinkOutlined/>
            <LinkSpan>{blog.url}</LinkSpan>
          </Link>
          <LikesContainer>
            <Likes>{blog.likes} Likes</Likes>
            Like Post <LikeButton onClick={() => dispatch(handleBloglikes(blog.id, blog))}>
              <ThumbUp style={{ fontSize: '20px' }} color='primary'/>
            </LikeButton>
          </LikesContainer>
          <Addedby>Added by <AddedbyName>{blog.author}</AddedbyName></Addedby>
        </BlogDetailsContainer>
      </MainWrapper>
    </Container>
  );
};

export default UserBlog;