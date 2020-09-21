/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import app from "../../firebase";

const AlunoForm = (props) => {
    const initialFieldValues = {
        nome: '',
        email: '',
        turma: ''
    }

    var [values, setValues] = useState(initialFieldValues)
    var [turmas, setTurmas] = useState({})

    useEffect(()=>{
        async function getTurmas() {
            app.firestore()
            .collection('turmas')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setTurmas(results);
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

        getTurmas()
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
                        <i className="fas fa-user"></i>
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
                    <input type="email" className="form-control" placeholder="emaildoaluno@unipam.edu.br" name="email" 
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-12">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-users"></i>
                                </div>
                            </div>
                            <select className="custom-select" name="turma" 
                            value={values.turma}
                            onChange={handleInputChange}>
                            <option defaultValue>Selecione a turma...</option>
                                {
                                Object.keys(turmas).map(id => {
                                            return  <option key={id} value={turmas[id].nome}>{turmas[id].nome}</option>
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

export default AlunoForm;
