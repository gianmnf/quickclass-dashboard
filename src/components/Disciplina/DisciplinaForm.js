/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

const DisciplinaForm = (props) => {
    const initialFieldValues = {
        nome: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(()=>{
        if(props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.disciplinaObjects[props.currentId]
            })
    }, [props.currentId, props.disciplinaObjects])

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
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Inserir":"Editar"} className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default DisciplinaForm;
