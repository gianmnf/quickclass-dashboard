/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import TurmaForm from './TurmaForm';
import app from "../../firebase";
import * as alerts from '../Functions/Alerts';
import Navbar from '../Navbar/index';

const Turmas = () => {

    var [turmaObjects, setTurmaObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(()=>{          
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

                setTurmaObjects(results);
            });
    },[])

    const checkExistence = obj=>{
        try {
            app.firestore().collection('turmas')
            .where('nome', '==', obj.nome)
            .get()
            .then(querySnapshot => {
                const result = [];

                querySnapshot.forEach((documentSnapshot) => {
                    result.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

               if(result.length === 0) {
                    addOrEdit(obj);
                } else {
                    alerts.erro(`Já existe uma turma com este nome!`);
                    setCurrentId('');
                }
            });
        } catch(err) {
            alerts.erro(`${err}`);
        }
    }

    const addOrEdit = obj=>{
        if (currentId === '')
        try {
                app.firestore().collection('turmas').add(obj)
                .then(() => {
                    setCurrentId('');
                    alerts.sucesso(`Turma ${obj.nome} adicionada com sucesso!`);
            });
        }
        catch(err) {
            alerts.erro(`${err}`);
        }
        else
        try {
            app.firestore().collection('turmas').doc(turmaObjects[currentId].key).update({
                nome: obj.nome,
                curso: obj.curso
            })
                .then(() => {
                    setCurrentId('');
                    alerts.sucesso(`Turma ${obj.nome} atualizada com sucesso!`);
                });
        }
        catch(err) {
            alerts.erro(`${err}`);
        }        
    }

    const onDelete = key=>{
            try {
                  alerts.remover('esta turma')  
                  .then((willDelete) => {
                    if (willDelete) {
                        app.firestore().collection('turmas').doc(turmaObjects[key].key).delete()
                        .then(() => {
                            setCurrentId('');
                            alerts.sucesso("Turma removida com sucesso!");
                        });
                    } else {
                      alerts.padrao("Operação Cancelada.");
                    }
                  });
               }
            catch(err) {
                   alerts.erro(`${err}`);
            }
    }

    return (
        <>
            <Navbar />
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Cadastro de Turmas</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <TurmaForm {...({ addOrEdit, currentId, turmaObjects, checkExistence })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Turma</th>
                                <th>Curso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(turmaObjects).map(id => {
                                    return <tr key={id}>
                                        <td style={{color: 'white'}}>{turmaObjects[id].nome}</td>
                                        <td style={{color: 'white'}}>{turmaObjects[id].curso}</td>
                                        <td>
                                            <button className="btn text-primary" onClick={() => setCurrentId(id)}>
                                                <i className="fas fa-pencil-alt"></i>
                                                <span> Editar</span>
                                            </button>
                                            <button className="btn text-danger" onClick={() => onDelete(id)}>
                                                <i className="fas fa-trash-alt"></i>
                                                <span> Remover</span>
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Turmas;
