import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import style from "./style.module.css";
import toast from "react-hot-toast";

export function ReviewsShow () {
    const [userBefore, setBefore] = useState({});
    const [reviewsShow, setRevShow] = useState ([]);

    useEffect(()=>{
        async function userBefore2(){
            try {
                const response = await api.get(`/user/profile`);
                setBefore(response.data);
                console.log(response.data);
                console.log(userBefore);           
                } catch (err) {
                console.log(err);
            }
        }
        userBefore2();
    },[])

    useEffect(()=>{
        setRevShow(userBefore.reviews)
        console.log(reviewsShow)
    },[userBefore])

    return (<>
            <h1>reviews</h1>
            <div>
            {reviewsShow ? reviewsShow.map((current) => {
                    return (
                        <>
                        <div>
                            <label>Current: {current}</label>
                        </div>
                        </>
                    );
                    })
                : <></>}
        </div>

    
</>)
}