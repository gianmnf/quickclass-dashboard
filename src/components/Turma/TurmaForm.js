/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import app from "../../firebase";

const TurmaForm = (props) => {
    const initialFieldValues = {
        nome: '',
        curso: ''
    }

    var [values, setValues] = useState(initialFieldValues)
    var [cursos, setCursos] = useState({})

    useEffect(()=>{
        async function getCursos() {
            app.firestore()
            .collection('cursos')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setCursos(results);
            });
        }
        if(props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.turmaObjects[props.currentId]
            })
        
        getCursos()
    }, [props.currentId, props.turmaObjects])

    const handleInputChange = e =>{
        var { name, value }= e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e =>{
        e.preventDefault();
        props.checkExistence(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-book"></i>
                    </div>
                </div>
                <input type="text" className="form-control" placeholder="Nome" name="nome" 
                    value={values.nome}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>
                    <select className="custom-select" name="curso" 
                    value={values.curso}
                    onChange={handleInputChange}>
                        <option defaultValue>Selecione o Curso...</option>
                        {
                          Object.keys(cursos).map(id => {
                                    return  <option key={id} value={cursos[id].nome}>{cursos[id].nome}</option>
                                })  
                        }
                    </select>
                </div>                
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Inserir":"Editar"} className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default TurmaForm;
