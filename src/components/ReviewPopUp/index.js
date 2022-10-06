import React from "react";
import { Formik, Form, Field } from "formik";
import {api} from "../../api/api";
import style from "./style.module.css"

export function ReviewPopUp(props) {


    async function onSubmit(valueReview, actions) {
        return console.log(valueReview)
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
                        userEvaluation:0,
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
                    <button type="submit">botão</button>
                    </Form>
                )}
        />
            </div>




            <h1> Popeiezinho </h1>
        </div>
    
    </>) : <></>

}





