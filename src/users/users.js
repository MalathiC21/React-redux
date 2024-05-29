import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, getUserStatus } from '../store/userSlice';
import { useEffect } from 'react';
import { fetchUserData } from '../store/userSlice';
import { addUser } from '../store/userSlice';
import axios from "axios";

const Users = () => {
    const users = useSelector(getAllUsers);
    const userStatus = useSelector(getUserStatus);
    const dispatch = useDispatch();
    // console.log(users);
    useEffect(()=>{
        if(userStatus === "idle"){
            dispatch(fetchUserData());
        }
      
    },[userStatus,dispatch])

    const onAddUser = async () => {
        try{
            const response = await axios.post("https://jsonplaceholder.typicode.com/users",{id:11, name:"Malathi", email:"malathi@gmail.com", phone:"423123"} );
            dispatch(addUser(response.data))
        }
        catch(err){

        }
        
    }

    return (
        <div>
            {/* <button type="button" onClick = {onAddUser}>Add new user</button> */}
        </div>
    );
};

export default Users;