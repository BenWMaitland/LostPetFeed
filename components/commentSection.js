import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { FormHelperText, TextField } from '@material-ui/core';
import moment from 'moment';
import Session from './sessionService';
import Api from '../pages/api';
import ConfirmationModal from './confirmationModal';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        width: "100%",
    },
    textfield: {
        width: "100%",
        margin: "5px",
    },
    error: {
        marginLeft: "5px",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    commentContainer: {
        width: "100%",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "rgb(0,0,0,0.1)",
    },
    editButton: {
        color: "blue",
        cursor: "pointer",
        marginRight: 20,
    },
    dateRow: {
        display: "flex",
        justifyContent: "space-between",
    },
    editComment: {
        width: "100%",
    },
    deleteButton: {
        color: "red",
        cursor: "pointer",
        marginRight: 20,
    },
    modalStyle: {
        borderRadius: 10,
        width: "600px",
        height: "300px",
        backgroundColor: "blue",
    },
}));

const dummyComments = [
    {
        id: "1",
        firstName: "Bob",
        lastName: "Mortimer",
        comment: "I think I saw this dog near Maven Rd two days ago. I think I saw this dog near Maven Rd two days ago. I think I saw this dog near Maven Rd two days ago. I think I saw this dog near Maven Rd two days ago. I think I saw this dog near Maven Rd two days ago. I think I saw this dog near Maven Rd two days ago. ",
        time: new Date(),
    },
    {
        id: "2",
        firstName: "Bob",
        lastName: "Mortimer",
        comment: "I think I saw this dog near Maven Rd two days ago.",
        time: new Date(),
    },
    {
        id: "3",
        firstName: "Bob",
        lastName: "Mortimer",
        comment: "I think I saw this dog near Maven Rd two days ago.",
        time: new Date(),
        userId: "1",
    },
    {
        id: "4",
        firstName: "Bob",
        lastName: "Mortimer",
        comment: "I think I saw this dog near Maven Rd two days ago. Different.",
        time: new Date(),
        userId: "1",
    },
];

const CommentSection = ({selectedPostId, postId}) => {
    const classes = useStyles();
    const router = useRouter();

    const [commentList, setCommentList] = useState([])
    const [comment, setComment] = useState("");
    const [invalidComment, setInvalidComment] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editEnabledId, setEditEnabledId] = useState("");
    const [editCommentContent, setEditCommentContent] = useState("");
    const [deleteCommentId, setDeleteCommentId] = useState("");

    useEffect(() => {
        if (selectedPostId === postId) {
            setIsExpanded(true);
        }
    }, [selectedPostId])

    useEffect(() => {
        if (isExpanded) {
            console.log("Should fetch for postId: ", postId);
            fetchComments();
        }
    }, [isExpanded])

    const handleSubmit = () => {
        const body = {
            petId: postId,
            username: Session.getUser()?.username,
            content: comment,
        }
        Api().post(`http://lb-reunitepetapi-1680165263.us-east-1.elb.amazonaws.com/api/Comments/`, body)
        .then((response) => {
            console.log("response.data: ", response.data)
            setComment("");
            fetchComments();
        }).catch((e) => {
            console.log("e: ", e);
        })
    }

    const saveEdit = () => {
        const body = {
            content: editCommentContent
        }
        Api().put(`http://lb-reunitepetapi-1680165263.us-east-1.elb.amazonaws.com/api/Comments/${editEnabledId}`, body)
        .then((response) => {
            console.log("response.data: ", response.data)
            setEditEnabledId("");
            setEditCommentContent("");
            fetchComments();
        }).catch((e) => {
            console.log("e: ", e);
        })
    }

    const fetchComments = () => {
        Api().get(`http://lb-reunitepetapi-1680165263.us-east-1.elb.amazonaws.com/api/Comments/`, { params: { petId: postId } })
        .then((response) => {
            console.log("response.data: ", response.data)
            setCommentList(response.data);
        }).catch((e) => {
            console.log("e: ", e);
            fetchComments();
        })
    }
    
    const deleteComment = (id) => {
        Api().delete(`http://lb-reunitepetapi-1680165263.us-east-1.elb.amazonaws.com/api/Comments/${id}`)
        .then((response) => {
          console.log("response.data: ", response.data);
          setDeleteCommentId("");
          fetchComments();
        }).catch((e) => {
          console.log("e: ", e);
        })
    }

    return (
        <div className={classes.container}>
            {commentList.map((commentItem, index) => (
                <div className={classes.commentContainer} key={commentItem.commentId}>
                    <div className={classes.dateRow}>
                        {moment(new Date(commentItem.commentDate)).format("MMMM Do, YYYY - h:mm A")}
                        {Session.getUser()?.username &&
                            <span>
                            {/* delete button */}
                            {commentItem.username === Session.getUser()?.username &&
                            <span className={classes.deleteButton} onClick={() => (setDeleteCommentId(commentItem.commentId))}>
                                Delete
                            </span>}
                            {/* edit button */}
                            {commentItem.username === Session.getUser()?.username && editEnabledId !== commentItem.commentId &&
                            <span className={classes.editButton} onClick={() => (setEditEnabledId(commentItem.commentId), setEditCommentContent(commentItem.content))}>
                                Edit
                            </span>}
                            {/* cancel button */}
                            {commentItem.username === Session.getUser()?.username && editEnabledId === commentItem.commentId &&
                            <span className={classes.editButton} onClick={() => (setEditEnabledId(""), setEditCommentContent(""))}>
                                Cancel
                            </span>}
                        </span>}
                        
                    </div>
                    <hr style={{width: "98%"}}/>
                    <span className={classes.name}>
                        {/* {commentItem.firstName}{" "}{commentItem.lastName}:{" "} */}
                        {commentItem.username}:{" "}
                    </span>
                    {editEnabledId === commentItem.commentId ?
                        <TextField
                            type="text"
                            value={editCommentContent}
                            className={classes.editComment}
                            onChange={(event) => setEditCommentContent(event.target.value)}
                            onKeyPress={(e) => {if (e.key === "Enter") { saveEdit() }}}
                        />
                        : commentItem.content
                    }
                </div>
                ))
            }
            <TextField
                label="Leave a Comment"
                type="text"
                variant="outlined"
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                error={invalidComment}
                onFocus={() => setInvalidComment(false)}
                size="small"
                className={classes.textfield}
                style={{marginTop: "25px"}}
                onKeyPress={(e) => {if (e.key === "Enter") { handleSubmit() }}}
                disabled={!Session.getUser()}
                style={Session.getUser() ? {} : {backgroundColor: "lightgrey"}}
            />
                {invalidComment && (
                    <FormHelperText className={classes.error} error>Please enter a commenet</FormHelperText>
                )}
            <ConfirmationModal 
                onConfirm={() => { deleteComment(deleteCommentId) }}
                onCancel={() => { setDeleteCommentId("") }}
                isVisible={deleteCommentId}
                header={"Delete Comment?"}
                description={"Are you sure you want to delete this comment?"}
            />
        </div>
    );
};

export default CommentSection;
