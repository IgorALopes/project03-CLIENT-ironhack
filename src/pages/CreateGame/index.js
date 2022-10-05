import { useEffect, useState, useContext } from "react";
import {Formik, Field, Form} from "formik";
import {api} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";


export function CreateGame () {

    const navigate=useNavigate();

    const { loggedInUser } = useContext(AuthContext);

    const [files, setFiles] = useState ("");
    const [files2, setFiles2] = useState ("");
    const [screenshotsUp, setScreen] = useState([]);
    const [screenshotsShow, setSShow] = useState([]);

    function handleImage(e) {
        setFiles(e.target.files[0]);
        console.log("mamamamama")
    }

    function handleImage2(e) {
        console.log(e.target.files);
        setFiles2(e.target.files[0]);
        console.log(files2)
        }

    async function handleUpload() {
        
        try {
        
            const uploadData = new FormData();
            uploadData.append("pictures", files);
            const response = await api.post("/uploadImage/uploadImage", uploadData);
            return response.data.url;
        
        } catch (error) {
        console.log(error);
        }
    }

    async function handleUpload2(e) {
        e.preventDefault();
        try {
        
            const uploadData = new FormData();
            uploadData.append("pictures", files2);
            const response = await api.post("/uploadImage/uploadImage", uploadData);
            screenshotsUp.push(response.data.url);
            setSShow([...screenshotsUp])
            console.log(screenshotsUp);
            return response.data.url;
        
        } catch (error) {
        console.log(error);
        }
    }

    async function onSubmit (valuesGame, actions) {

        console.log(valuesGame, loggedInUser, loggedInUser.user._id)
        const imgLogoURL= await handleUpload();
        console.log(imgLogoURL);
        valuesGame.gameLogo=String(imgLogoURL);
        valuesGame.screenshots=[...screenshotsUp]
        console.log("hauhauhauhauauhuahuhauhauhua", valuesGame.screenshots)

        try {
            await api.post("/game/new-game", { ...valuesGame, screenShots:[...screenshotsUp]});
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
                
        return console.log("asgyagsyagsyaysgyagygsy")

    }
    
    async function onSubmit2 (e) {
        e.preventDefault();
        return console.log("pdospdospdopsodpspdosdpsop")

    }
    return ( <>
    <div>
        <h1>Create Game</h1>
        <div className="main">
        <Formik 
            onSubmit={onSubmit}
                initialValues={{
                title:"",
                type: "",
                esrb:"",
                linkDeploy:"",
                linkRepo:"",
                description:"",
                gameLogo:"",
                screenshots:[],
            }}         
    render={({valuesGame})=> (<Form>
            <div className="formFields">
                {/* <label>Title</label>  */}
                <Field name="title" type="text" placeholder="title"/>
    
                {/* <label>Genre</label>  */}
                <Field name="type" type="text" placeholder="genre"/>

                    <div>
                        <span>ESRB</span>
                        <div>
                        <Field name="esrb" type="radio" value="Everyone"/>
                        <label>Everyone</label>
                        
                        <Field name="esrb" type="radio" value="Everyone 10+"/>
                        <label>Everyone 10+</label>
                        
                        <Field name="esrb" type="radio" value="Teen 13+"/>
                        <label>Teen 13+</label>
                        
                        <Field name="esrb" type="radio" value="Mature 17+"/>
                        <label>Mature 17+</label>
                        
                        <Field name="esrb" type="radio" value="Adults Only 18+"/>
                        <label>Adults Only 18+</label>
                        </div>
                    </div>

                <label>Deploy´s Link</label>
                <Field name="linkDeploy" type="string" placeholder="deploys url"/>

                <label>Repository Link</label>
                <Field name="linkRepo" type="string" placeholder="repositorys url"/>

                <label>Description</label>
                <Field name="description" type="string" placeholder="description"/>
                <div>
                <form>
                    <label htmlFor="gameLogo">Logo:</label>
                    <input type="file" id="gameLogo" onChange={handleImage} />
                </form>
                </div>
            </div>
            <div>
                <form>
                    <label htmlFor="screenshots">Screenshot:</label>
                    <input type="file" id="screenshots" onChange={handleImage2} />
                    <button type="button" onClick={handleUpload2}>Adicionar</button>
                </form>
            </div>
            <div>
                <label>All Images</label>
                {screenshotsShow.map((current) => {
                            return (<>
                                    <div>
                                        <p>{current}</p>
                                        <img src={current} width="80px"></img>
                                    </div>
                                    </>);
                                    })}
            </div>
            <button type="submit">botão</button>
        </Form>
)}
/>
            
            
        </div>
</div>
    </>) 

    
}
