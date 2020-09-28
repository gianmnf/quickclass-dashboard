/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import app from "../../firebase";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const TurmaForm = (props) => {
    const initialFieldValues = {
        nome: '',
        curso: '',
        listaAlunos: [],
        listaProfessores: []
    }

    const animatedComponents = makeAnimated();

    var [values, setValues] = useState(initialFieldValues)
    var [cursos, setCursos] = useState({})
    var [alunos, setAlunos] = useState({})
    var [professores, setProfessores] = useState({})

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
        async function getAlunos() {
            app.firestore()
            .collection('usuarios')
            .doc('tipo')
            .collection('alunos')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        value: documentSnapshot.data().email,
                        label: documentSnapshot.data().nome + ' - ' + documentSnapshot.data().email,
                        key: documentSnapshot.id,
                    });
                });

                setAlunos(results);
            });
        }
        async function getProfessores() {
            app.firestore()
            .collection('usuarios')
            .doc('tipo')
            .collection('professores')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        value: documentSnapshot.data().email,
                        label: documentSnapshot.data().nome + ' - ' + documentSnapshot.data().email,
                        key: documentSnapshot.id,
                    });
                });

                setProfessores(results);
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
        getAlunos()
        getProfessores()
    }, [props.currentId, props.turmaObjects])

    const handleInputChange = e =>{
        var { name, value }= e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleAlunosChange = e => {
        var selectedAlunos = [];
        if(e === null) {
            selectedAlunos = [];
        } else {
            e.forEach(val => {
                selectedAlunos.push(val.value);
            });
            setValues({
                ...values,
                listaAlunos: selectedAlunos
            }) 
        }        
    }

    const handleProfessoresChange = e => {
        var selectedProfessores = [];
        if(e === null) {
            selectedProfessores = [];
        } else {
            e.forEach(val => {
                selectedProfessores.push(val.value);
            });
            setValues({
                ...values,
                listaProfessores: selectedProfessores
            })
        }
    }
    
    const handleFormSubmit = e =>{
        e.preventDefault();
        props.checkExistence(values);
    }

    return (
        <>
                <form autoComplete="off" onSubmit={handleFormSubmit}>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-quote-right"></i>
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
                                    <i className="fas fa-book"></i>
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
                            <Select
                                isMulti
                                isSearchable
                                name="listaAlunos"
                                options={alunos}
                                components={animatedComponents}
                                onChange={handleAlunosChange}
                                className="col-md-12 mb-3"
                                placeholder="Selecione os alunos..."
                                styles={{paddingTop: 5}}
                            />
                            <Select
                                isMulti
                                isSearchable
                                name="listaProfessores"
                                options={professores}
                                components={animatedComponents}
                                onChange={handleProfessoresChange}
                                className="col-md-12 mb-3"
                                placeholder="Selecione os professores..."
                            />       
                    </div>
                    <div className="form-group">
                        <input type="submit" value={props.currentId === '' ? "Inserir":"Editar"} className="btn btn-primary btn-block"/>
                    </div>
                </form>
        </>
    )
}

export default TurmaForm;
