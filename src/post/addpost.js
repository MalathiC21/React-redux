import React from 'react';
import {useDispatch} from "react-redux";
import {addNewPost} from "../store/postSlice";
import {useState} from "react";

const Addpost = () => {
    const dispatch = useDispatch();
    const [stateRep, setStateRepo] = useState("idle");
    const onAddPost = async () => {
        try{
            setStateRepo("loading");
            dispatch(addNewPost({id:101, userId:10, title:"New post", body:"Dummy content"}))
            .unwrap();
        }
        catch(err){
            console.log("Unable to create post:", err)
        }
        finally{
            setStateRepo("idle");
        }
    }
    return (
        <div>
            <button onClick= {onAddPost}>Add post</button>
        </div>
    );
};

export default Addpost;