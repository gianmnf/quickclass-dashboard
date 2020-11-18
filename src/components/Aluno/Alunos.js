/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import AlunoForm from './AlunoForm';
import app from "../../firebase";
import * as alerts from '../Functions/Alerts';
import Navbar from '../Navbar/index';

const Alunos = () => {

    var [alunoObjects, setAlunoObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(()=>{          
          app.firestore()
            .collection('usuarios')
            .doc('tipo')
            .collection('alunos')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setAlunoObjects(results);
            });
    },[])

    const checkExistence = obj=>{
        try {
            app.firestore().collection('usuarios').doc('tipo').collection('alunos')
            .where('email', '==', obj.email)
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
                    alerts.erro('Já existe um(a) aluno(a) com este nome!');
                    setCurrentId('');
                }
            });
        } catch(err) {
            alerts.erro(`${err}`);   
        }
    }

    const addOrEdit = obj=>{
	console.log(currentId);
        if (currentId === '')
        try {
            if(obj.email.endsWith('@unipam.edu.br'))
            {
                app.firestore().collection('usuarios').doc('tipo').collection('alunos').add(obj)
                .then(() => {
                    setCurrentId('');
                    alerts.sucesso(`Aluno(a) ${obj.nome} adicionado(a) com sucesso!`);
                });
            } else if(!obj.email.endsWith('@unipam.edu.br') || obj.email !== '') {
                setCurrentId('');
                alerts.erro("Apenas emails com o domínio unipam.edu.br são permitidos!");
            }
        }
        catch(err) {
            alerts.erro(`${err}`);
        }
        else
        try {
            if(obj.email.endsWith('@unipam.edu.br'))
            {
            app.firestore().collection('usuarios').doc('tipo').collection('alunos').doc(alunoObjects[currentId].key).update({
                nome: obj.nome,
                email: obj.email,
                turma: obj.turma
            })
                .then(() => {
                    setCurrentId('');
                    alerts.sucesso(`Aluno(a) ${obj.nome} atualizado(a) com sucesso!`);
                });
            } else if(!obj.email.endsWith('@unipam.edu.br') || obj.email !== '') {
                setCurrentId('');
                alerts.erro("Apenas emails com o domínio unipam.edu.br são permitidos!");
            }
        }
        catch(err) {
            alerts.erro(`${err}`);
        }        
    }

    const onDelete = key=>{
            try {
                alerts.remover('este/esta aluno(a)')
                  .then((willDelete) => {
                    if (willDelete) {
                        app.firestore().collection('usuarios').doc('tipo').collection('alunos').doc(alunoObjects[key].key).delete()
                        .then(() => {
                            setCurrentId('');
                            alerts.sucesso("Aluno(a) removido(a) com sucesso!");
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
                    <h1 className="display-4 text-center">Cadastro de Alunos</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <AlunoForm {...({ addOrEdit, currentId, alunoObjects, checkExistence })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Turma</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(alunoObjects).map(id => {
                                    return <tr key={id}>
                                        <td style={{color: 'white'}}>{alunoObjects[id].nome}</td>
                                        <td style={{color: 'white'}}>{alunoObjects[id].email}</td>
                                        <td style={{color: 'white'}}>{alunoObjects[id].turma}</td>
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

export default Alunos;
