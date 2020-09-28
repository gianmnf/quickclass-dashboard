/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import app from "../../firebase";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const ProfessorForm = (props) => {
    const initialFieldValues = {
        nome: '',
        email: '',
        listaDisciplinas: []
    }

    const animatedComponents = makeAnimated();

    var [values, setValues] = useState(initialFieldValues)
    var [disciplinas, setDisciplinas] = useState({})

    useEffect(()=>{
        async function getDisciplinas() {
            app.firestore()
            .collection('disciplinas')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        value: documentSnapshot.data().nome,
                        label: documentSnapshot.data().nome,
                        key: documentSnapshot.id,
                    });
                });

                setDisciplinas(results);
            });
        }
        if(props.currentId === '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.professorObjects[props.currentId]
            })

        getDisciplinas()
    }, [props.currentId, props.professorObjects])

    const handleInputChange = e =>{
        var { name, value }= e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleDisciplinasChange = e => {
        var selectedDisciplinas = [];
        if(e === null) {
            selectedDisciplinas = [];
        } else {
            e.forEach(val => {
                selectedDisciplinas.push(val.value);
            });
            setValues({
                ...values,
                listaDisciplinas: selectedDisciplinas
            })
        }
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
                    <input type="email" className="form-control" placeholder="emaildoprofessor@unipam.edu.br" name="email" 
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </div>
                    <Select
                        isMulti
                        isSearchable
                        name="listaDisciplinas"
                        options={disciplinas}
                        components={animatedComponents}
                        onChange={handleDisciplinasChange}
                        className="col-md-12 mb-3"
                        placeholder="Selecione as disciplinas..."
                    />             
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId === '' ? "Inserir":"Editar"} className="btn btn-primary btn-block"/>
            </div>
        </form>
    )
}

export default ProfessorForm;
