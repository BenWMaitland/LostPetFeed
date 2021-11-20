import React, { useContext, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { FormHelperText, TextField } from '@material-ui/core';
import moment from 'moment';
import DeleteWarning from './deleteWarning';

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

const CommentSection = ({selectedPostId, postId, setDeleteCommentId}) => {
    const classes = useStyles();
    const router = useRouter();

    const [comment, setComment] = useState("");
    const [invalidComment, setInvalidComment] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editEnabledId, setEditEnabledId] = useState("");
    const [editCommentContent, setEditCommentContent] = useState("");

    useEffect(() => {
        if (selectedPostId === postId) {
            setIsExpanded(true);
        }
    }, [selectedPostId])

    useEffect(() => {
        if (isExpanded) {
            console.log("Should fetch for postId: ", postId);
        }
    }, [isExpanded])

    const handleSubmit = () => {
        console.log("submitted comment");
        setComment("");
    }

    const saveEdit = () => {
        // submit API put
        setEditEnabledId("");
    }

    return (
        <div className={classes.container}>
            {dummyComments.map((commentItem, index) => (
                <div className={classes.commentContainer} key={commentItem.id}>
                    <div className={classes.dateRow}>
                        {moment(commentItem.time).format("h:mm A dddd MMMM Do, YYYY")}
                        <span>
                            {/* delete button */}
                            {commentItem.userId === "1" && 
                            <span className={classes.deleteButton} onClick={() => (setDeleteCommentId(commentItem.id))}>
                                Delete
                            </span>}
                            {/* edit button */}
                            {commentItem.userId === "1" && editEnabledId !== commentItem.id &&
                            <span className={classes.editButton} onClick={() => (setEditEnabledId(commentItem.id), setEditCommentContent(commentItem.comment))}>
                                Edit
                            </span>}
                            {/* cancel button */}
                            {commentItem.userId === "1" && editEnabledId === commentItem.id &&
                            <span className={classes.editButton} onClick={() => (setEditEnabledId(""), setEditCommentContent(""))}>
                                Cancel
                            </span>}
                        </span>
                        
                    </div>
                    <hr style={{width: "98%"}}/>
                    <span className={classes.name}>
                        {commentItem.firstName}{" "}{commentItem.lastName}:{" "}
                    </span>
                    {editEnabledId === commentItem.id ?
                        <TextField
                            type="text"
                            value={editCommentContent}
                            className={classes.editComment}
                            onChange={(event) => setEditCommentContent(event.target.value)}
                            onKeyPress={(e) => {if (e.key === "Enter") { saveEdit() }}}
                        />
                        : commentItem.comment
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
            />
                {invalidComment && (
                    <FormHelperText className={classes.error} error>Please enter a commenet</FormHelperText>
                )}
        </div>
    );
};

export default CommentSection;
