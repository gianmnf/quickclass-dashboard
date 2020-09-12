/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import ProfessorForm from './ProfessorForm';
import firebaseDb from "../../firebase";
import swal from 'sweetalert';

const Professores = () => {

    var [professorObjects, setProfessorObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(()=>{          
          firebaseDb
            .collection('professores')
            .onSnapshot((querySnapshot) => {
                const results = [];

                querySnapshot.forEach((documentSnapshot) => {
                    results.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setProfessorObjects(results);
            });
    },[])

    const addOrEdit = obj=>{
        if (currentId === '')
        try {
            if(obj.email.endsWith('@unipam.edu.br'))
            {
            firebaseDb.collection('professores').add(obj)
            .then(() => {
                setCurrentId('');
                swal("Sucesso", `Professor(a) ${obj.nome} adicionado(a) com sucesso!`, "success");
            });
            } else {
                setCurrentId('');
                swal("Erro", `Apenas emails com o domínio unipam.edu.br são permitidos!`, "error");
            }
        }
        catch(err) {
            console.log(err);
        }
        else
        try {
            if(obj.email.endsWith('@unipam.edu.br'))
            {
            firebaseDb.collection('professores').doc(professorObjects[currentId].key).update({
                nome: obj.nome,
                email: obj.email
            })
                .then(() => {
                    setCurrentId('');
                    swal("Sucesso", `Professor(a) ${obj.nome} atualizado(a) com sucesso!`, "success");
                });
            } else {
                setCurrentId('');
                swal("Erro", `Apenas emails com o domínio unipam.edu.br são permitidos!`, "error");
            }
        }
        catch(err) {
            console.log(err);
        }        
    }

    const onDelete = key=>{
            try {
                swal({
                    title: "Tem certeza de que deseja remover este/esta professor(a)?",
                    text: "Esta é uma operação irreversível!",
                    icon: "warning",
                    buttons: ["Não", "Sim"],
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        firebaseDb.collection('professores').doc(professorObjects[key].key).delete()
                        .then(() => {
                            setCurrentId('');
                            swal("Professor(a) removido com sucesso!", {
                                icon: "success",
                              });
                        });
                    } else {
                      swal("Operação Cancelada.");
                    }
                  });
               }
            catch(err) {
                   console.log(err);
            }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Cadastro de Professores</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ProfessorForm {...({ addOrEdit, currentId, professorObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(professorObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{professorObjects[id].nome}</td>
                                        <td>{professorObjects[id].email}</td>
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

export default Professores;
