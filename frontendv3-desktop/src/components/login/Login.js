import React, {useState} from "react";
import {toast} from "react-toastify";
import api from "../../api/axiosConfig"
import {notify} from "../helper"
const Login = (props) => {
    //gets value from set method and applies value to variable
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dbURL, setDBURL] = useState("");

    //checks that the username, password, and dbURL is not empty when the submit button is pressed
    const validate=()=>{
        //checks if username, password, and dbURL have been entered. Returns pop-up notification if empty or null
        let result = true;
        if (username==="" || username===null){
            result=false;
            notify("Please enter a username", "warning");
        }
        if (password==="" || password===null) {
            result = false;
            notify("Please enter a password", "warning");
        }
        if (dbURL==="" || dbURL===null) {
            result = false;
            notify("Please enter the Database URL", "warning");
        }
        return result
    }

    //sends the log in information to the api to test the connection,
    // and takes user to the query page if the login is correct
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(validate()){
            try{
                const response = await api.post("/api/v3/login", {username:username, password:password, databaseURL:dbURL})
                notify("Log in to database successful!", "success")
                props.onPageSwitch(); //does not need argument passed in due to ternary statement, see App.js
            }catch (error){
                notify("Incorrect Username/Password/URL", "warning")
            }
        }
    }

    return (
        <div className="login-form-container">
            <h2> Login </h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input value={username} onChange={e=>setUsername(e.target.value)} type="username" placeholder='username' id="username" name="username"/>
                <label htmlFor="password">password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder='**********' id="password" name="password"/>
                <label htmlFor="dbURL">Database URL</label>
                <input value={dbURL} type="dbURL" onChange={e=>setDBURL(e.target.value)} placeholder='jdbc:oracle:thin:@<dbhost>:<dbport>:<sid>' id="dbURL" name="dbURL"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
