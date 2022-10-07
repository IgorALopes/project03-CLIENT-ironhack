import React from "react";
import { Formik, Form, Field } from "formik";
import {api} from "../../api/api";
import style from "./style.module.css"
import { useNavigate } from "react-router-dom";

export function ReviewPopUp(props) {

    const navigate = useNavigate();
    //console.log(props.id)

    async function onSubmit(valueReview, actions) {
            const reviewStr=valueReview.userEvaluation;
            const reviewValues={rates:{},userEvaluation:"",}
            for (let objetos in valueReview){
                valueReview[objetos]=Number(valueReview[objetos]);
            }
            Object.assign(reviewValues.rates,valueReview);
            reviewValues.userEvaluation=reviewStr;
            delete reviewValues.rates.userEvaluation;
            console.log(reviewValues)

        try {
            const response = await api.post(`/review/${props.id}`, { ...reviewValues});
            navigate(0);
            props.setTrigging(false);
        } catch (error) {
            console.log(error);
        }
        return console.log("oi")


    }
    
    return props.trigger? (<>
        <div className={style.main}>
            <div>
                <Formik 
                    onSubmit={onSubmit}
                    initialValues={{
                        graphics:1, 
                        soundEffects:1,
                        playability:1,
                        fun:1,
                        replayability:1,
                        userEvaluation:"",
                        }}         
                render={({valueReview})=> (
                    <Form>

                    <div className={style.radios}>
                        <div>
                            <div>Graphics</div>      
                                <Field name="graphics" type="radio" value="1"/>
                                <Field name="graphics" type="radio" value="2"/>
                                <Field name="graphics" type="radio" value="3"/>
                                <Field name="graphics" type="radio" value="4"/>
                                <Field name="graphics" type="radio" value="5"/>
                        </div>
                        <div>
                            <div>Sound Effects</div>      
                                <Field name="soundEffects" type="radio" value="1"/>
                                <Field name="soundEffects" type="radio" value="2"/>
                                <Field name="soundEffects" type="radio" value="3"/>
                                <Field name="soundEffects" type="radio" value="4"/>
                                <Field name="soundEffects" type="radio" value="5"/>
                        </div>
                        <div>
                            <div>Gameplay</div>      
                                <Field name="playability" type="radio" value="1"/>
                                <Field name="playability" type="radio" value="2"/>
                                <Field name="playability" type="radio" value="3"/>
                                <Field name="playability" type="radio" value="4"/>
                                <Field name="playability" type="radio" value="5"/>
                        </div>
                        <div>
                            <div>Fun</div>      
                                <Field name="fun" type="radio" value="1"/>
                                <Field name="fun" type="radio" value="2"/>
                                <Field name="fun" type="radio" value="3"/>
                                <Field name="fun" type="radio" value="4"/>
                                <Field name="fun" type="radio" value="5"/>
                        </div>
                        <div>
                            <div>Replayability</div>      
                                <Field name="replayability" type="radio" value="1"/>
                                <Field name="replayability" type="radio" value="2"/>
                                <Field name="replayability" type="radio" value="3"/>
                                <Field name="replayability" type="radio" value="4"/>
                                <Field name="replayability" type="radio" value="5"/>
                        </div>
                    </div>
                    <div>
                        <Field name="userEvaluation" type="string" placeholder="review" />
                    </div>
                    <button type="submit">botão</button>
                    </Form>
                )}
        />
            </div>




            
        </div>
    
    </>) : <></>

}





