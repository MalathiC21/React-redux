// // import React from 'react';
// // import { useSelector , useDispatch} from 'react-redux';
// // import { addPost, removePost, getAllPosts, getStatus } from '../store/postSlice';
// // import { useEffect } from 'react';
// // import { fetchPosts } from '../store/postSlice';
// // import Addpost from './addpost';
// // import Postedby from './postedby';


// // const PostItems = () => {
// //     const posts = useSelector(getAllPosts);
// //     const postStatus = useSelector(getStatus);
// //     const dispatch = useDispatch();
    
// //      useEffect (()=>{
// //           if(postStatus === "idle") {
// //             dispatch(fetchPosts());
// //           }
// //      },[postStatus, dispatch])

// //     const onAddPost = () => {
// //         dispatch(addPost({id:"3", title:"Post 3", body:"Dummy content"}))
// //     }

// //     const onRemovePost = (id) =>{
// //         dispatch(removePost(id));
// //     }



// //     console.log(posts);
// //     console.log(postStatus);
    
// //     let postResponse = null;
// //     if(postStatus === "loading"){
// //         postResponse = <p style={{textAlign:"center"}}>Loading...</p>
// //     }
// //     else if(postStatus === "succeed"){
// //          postResponse = posts.map((item,inx) => (
// //         <div className='post-bx' key={item.id}>
// //             <h3>{item.title}</h3>
// //             <p>{item.body}</p>
// //             <Postedby/>
// //             {/* <button onClick = {() => onRemovePost(item.id)}>Delete post</button> */}
// //         </div>
// //     )).reverse();
// //     }
// //     else{
// //         postResponse = <p style={{textAlign:"center"}}>Something went wrong...</p>
// //     }


// //     return (
// //         <div className='post-container'>
// //             <Addpost/>
// //             {/* <button type="button" onClick={onAddPost}>Add post</button> */}
// //             {postResponse}
// //         </div>
// //     );
// // };

// // export default PostItems;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addPost, removePost, getAllPosts, getStatus, fetchPosts } from '../store/postSlice';
// import { fetchUserData, getAllUsers, getUserStatus } from '../store/userSlice';
// import Addpost from './addpost';
// import Postedby from './postedby';

// const PostItems = () => {
//     const posts = useSelector(getAllPosts);
//     const postStatus = useSelector(getStatus);
//     const users = useSelector(getAllUsers);
//     const userStatus = useSelector(getUserStatus);
//     const dispatch = useDispatch();
    
//     useEffect(() => {
//         if (postStatus === "idle") {
//             dispatch(fetchPosts());
//         }
//         if (userStatus === "idle") {
//             dispatch(fetchUserData());
//         }
//     }, [postStatus, userStatus, dispatch]);

//     // const onAddPost = () => {
//     //     dispatch(addPost({ id: "3", title: "Post 3", body: "Dummy content", userId: 1 }))
//     // };

//     // const onRemovePost = (id) => {
//     //     dispatch(removePost(id));
//     // };

//     console.log(posts);
//     console.log(postStatus);
//     console.log(users);
//     console.log(userStatus);

//     let postResponse = null;
//     if (postStatus === "loading" || userStatus === "loading") {
//         postResponse = <p style={{ textAlign: "center" }}>Loading...</p>;
//     } else if (postStatus === "succeed" && userStatus === "succeed") {
//         postResponse = posts.map((item, inx) => (
//             <div className='post-bx' key={item.id}>
//                 <h3>{item.title}</h3>
//                 <p>{item.body}</p>
//                 <Postedby userId={item.userId} users={users} />
//                 {/* <button onClick={() => onRemovePost(item.id)}>Delete post</button> */}
//             </div>
//         )).reverse();
//     } else {
//         postResponse = <p style={{ textAlign: "center" }}>Something went wrong...</p>;
//     }

//     return (
//         <div className='post-container'>
//             {/* <Addpost /> */}
//             {/* <button type="button" onClick={onAddPost}>Add post</button> */}
//             {postResponse}
//         </div>
//     );
// };

// export default PostItems;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, removePost, getAllPosts, getStatus, fetchPosts, incrementLike, incrementDislike } from '../store/postSlice';
import { fetchUserData, getAllUsers, getUserStatus } from '../store/userSlice';
import Addpost from './addpost';
import Postedby from './postedby';


const PostItems = () => {
   
    const [inputState, setInputState] = useState({
        id:"",
        title:"",
        body:"",
        name:""
    })
    const posts = useSelector(getAllPosts);
    const postStatus = useSelector(getStatus);
    const users = useSelector(getAllUsers);
    const userStatus = useSelector(getUserStatus);
    const dispatch = useDispatch();

    console.log(posts);
    console.log(users);
    
    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
        if (userStatus === "idle") {
            dispatch(fetchUserData());
        }
    }, [postStatus, userStatus, dispatch]);

    

    const onChangeInput = (e) => {
        let name=e.target.name;
        let val = e.target.value;
        setInputState(prevInput => ({...prevInput, [name]:val}));
     };

    const onLogin = (e) => {
        e.preventDefault();
        dispatch(addPost(inputState));
        setInputState({ id: '', title: '', body: '', name:'' }); 
    };

    const onLike = (id) => {
        dispatch(incrementLike(id));
       
    };

    const onDislike = (id) => {
        dispatch(incrementDislike(id));
    };

    let postResponse = null;
    if (postStatus === "loading" )
         {
        postResponse = <p style={{ textAlign: "center" }}>Loading...</p>;
         } 
    else if (postStatus === "succeed" ) 
        {
        postResponse = posts.map((item, inx) => (
            <div className='post-bx' key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p>{item.name}</p>
                
                <Postedby userId={item.userId} userDetails={users}/>
                
                <div className='icon'>
                    <i className="bi bi-hand-thumbs-up-fill thumbsup" onClick={() => onLike(item.id)}></i>
                    <span>{item.likeCount} Likes</span>  

                      <i className="bi bi-hand-thumbs-down-fill thumbsdown" onClick={() => onDislike(item.id)}></i>
                    <span>{item.dislikeCount} Dislikes</span> 
                </div>
            </div>
        )).reverse();
        } 
    else {
        postResponse = <p style={{ textAlign: "center" }}>Something went wrong...</p>;
         }

    return (
        <div>
            {/* <Addpost /> */}
            <form onSubmit={onLogin}>
                <label htmlFor="id">Id :</label>
                <input type="text" name="id" placeholder="Id" className='id' value={inputState.id} onChange={onChangeInput} />
                <br/>

                <label>Title :</label>
                <input type="text" name="title" placeholder="Title"className='title' value={inputState.title} onChange={onChangeInput} />
                <br/>

                <label>Description :</label>
                <input name="body" placeholder="Description" className='description' value={inputState.body} onChange={onChangeInput}/>
                <br/>

                <label>Authors:</label>
                <select name="name" className='authors' value={inputState.name} onChange={onChangeInput}>
                    <option>Choose author</option>
                    <option name=" Clementina DuBuque"> Clementina DuBuque</option>
                    <option name=" Glenna Reichert"> Glenna Reichert</option>
                    <option name=" Nicholas Runolfsdottir V"> Nicholas Runolfsdottir V</option>
                    <option name="  Kurtis Weissnat"> Kurtis Weissnat</option>
                    <option name=" Mrs. Dennis Schulist"> Mrs. Dennis Schulist</option>
                    <option name=" Chelsey Dietrich"> Chelsey Dietrich</option>
                    <option name=" Patricia Lebsack"> Patricia Lebsack</option>
                    <option name=" Ervin Howell"> Ervin Howell</option>
                    <option name=" Leanne Graham"> Leanne Graham</option>
                    <option name=" Clementine Bauch"> Clementine Bauch</option>
                </select>
                <br/>

                <button type="submit" className='add-btn' >Add post</button>
            </form>
        
            {postResponse}
        </div>
    );
};

export default PostItems;
