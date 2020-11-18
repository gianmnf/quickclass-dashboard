/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

const AlunoForm = (props) => {
    const initialFieldValues = {
        nome: '',
        email: ''
    }

    var [values, setValues] = useState(initialFieldValues)

    useEffect(()=>{
        if(props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.turmaObjects[props.currentId]
            })
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
console.log(e);
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
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Inserir":"Editar"} className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default AlunoForm;
