import React, {useEffect, useState} from "react";
import "../styles/design.css";
import validate from "../validateForm/validateForm1";
import validateTwo from "../validateForm/validateForm2";
import Axios from "axios";


const Body = () => {

    const [values, setValues ] = useState({
        entree : "",
        motif : "",
        dateEntre : null
    });

    const [ valuesTwo, setValueTwo ] = useState({
        depense : "",
        motifDepense : "",
        dateDepense : null
    })

    // fonction pour la premiere formulaire
    const [errors, setErrors] = useState({});

    const [dataList, setDataList ] = useState([]);

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values));

         if (Object.keys(errors).length === 0 ) {
           
            Axios.post("http://localhost:3001/api/insert", {
                entre : values.entree,
                motif : values.motif,
                date : values.dateEntre
            }).then( () => {
                Axios.get("http://localhost:3001/api/request").then( (response) => {
                    setDataList(response.data);
                    console.log( response.data);
                })
            })
        } else {
            alert('no');
        } 
    }

    //recuperation des de la base de donnée depuis le serveur
    useEffect( () => {
        Axios.get("http://localhost:3001/api/request").then( (response) => {
            setDataList(response.data);
            console.log( response.data);
        })
    }, [] );



    //fonction pour la deuxième formulaire

    const [errorss, setErrorss] = useState({});

    const handleChangeForm2 = e => {
        setValueTwo({
            ...valuesTwo,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmitForm2 = e => {
        e.preventDefault();
        
        setErrorss (validateTwo( valuesTwo ) );

        if (Object.keys(errorss).length === 0 ) {
            Axios.post( "http://localhost:3001/api/insertDepense", {
                depense : valuesTwo.depense,
                motifDepense :valuesTwo.motifDepense,
                dateDepense : valuesTwo.dateDepense
            }).then ( () => {
                Axios.get("http://localhost:3001/api/request").then( (response) => {
                    setDataList(response.data);
                    console.log( response.data);
                });
            });
        }
        setValueTwo("");
    }

    return(
        <div className = "body">
        <div className = "body-child1">
            <div className = "child1">
                <div className = "h_title">Comptabiliser vos entrés d'argent</div>
                <div>
                    <form>
                        <div>
                            <label for="">Somme acquise*</label>
                             <input type="text" name="entree" id="entree"
                             value = {values.entree} 
                             onChange = {handleChange} />
                        </div>
                        <span id = "error">{errors.entree}</span> 

                        <div>
                            <label for="">Motif d'aquisition*</label>
                            <textarea name="motif" id="motif" rows="3" cols="25"
                            value = {values.motif}
                            onChange = {handleChange} ></textarea>
                        </div>
                        <span id = "error-motif">{errors.motif}</span>

                        <div>
                            <label for="date">Date d'aquisition*</label>
                            <input type="date" name = "date" id = "date" 
                             value = {values.dateEntre}
                             onChange = {handleChange} />
                        </div>
                        <span id="error-date">{errors.dateEntre}</span> 

                        <div className = "button-div">
                            <button onClick = {handleSubmit}>Enrégistré</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className = "child2">
                <div className = "h_title">Comptabiliser vos dépenses</div>
                <div>
                    <form>
                        <div>
                            <label for="">Somme dépensé*</label>
                             <input type="text" name="depense" id="depense" 
                             value = {valuesTwo.depense} 
                             onChange = {handleChangeForm2} />
                        </div>
                        <span id = "error"> {errorss.depense} </span>

                        <div>
                            <label for="">Motif du dépense*</label>
                            <textarea name="motifDepense" id="motifDepense" rows="3" cols="25"
                            value = {valuesTwo.motifDepense}
                            onChange = {handleChangeForm2}></textarea>
                        </div>
                        <span id = "error-motif"> {errorss.motifDepense} </span>
                        
                        <div>
                            <label for="date">Date du dépense*</label>
                            <input type="date" name = "dateDepense" id = "date" 
                            value = {valuesTwo.dateDepense}
                            onChange = {handleChangeForm2} />
                        </div>
                        <span id="error-date"> {errorss.dateDepense} </span>

                        <div className = "button-div">
                            <button onClick = {handleSubmitForm2}>Enrégistré</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className = "body-child2">
            <div className = "child">
                <h2>Total Comptabilisé ( entré / dépense / Reste )</h2>
            </div>
            <div className = "child2">
                {dataList.map( (data) => {
                    return(
                        <div>
                            <p>Total entrée : <span> {data.somme} </span> </p>
                            <p>Total dépensée : <span> {data.somme2} </span> </p>
                            <p>Réserve : <span> {data.somme - data.somme2} </span></p>
                        </div>          
                     );
                })
                }
            </div>
        </div>
    </div>
    
    );
}

export default Body;