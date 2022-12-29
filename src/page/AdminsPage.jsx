
import { onSnapshot, query,collection,deleteDoc,updateDoc,doc} from 'firebase/firestore'
import {db}from '../Firebase/firebaseSdk'
import React from 'react'
import { useState,useEffect } from 'react'

const options=[
    {estado:"pagina de carga",id:"1"},
    {estado:"pagina de datos enviados",id:"2"},
    {estado:"pagina de acceso denegado",id:"3"},
]

const AdminsPage = () => {
    const [dataUser,setDataUser]=useState([])
    const [optionSelected,setOptionSelected]=useState("")
    
    const handleChange=async(e,idFirebase)=>{
        await updateDoc(doc(db,'usuarios',idFirebase),{estadoForm:e.target.value})   
    }
    
    const deleteUser = async (id) => {
        const colRef = collection(db, 'usuarios');
        await deleteDoc(doc(colRef, id));
    }
    
    useEffect(()=>{
        const q=query(collection(db,'usuarios'))
        
        const onSuscribe=onSnapshot(q,(usersActive)=>{
            let users=[];
            usersActive.forEach((doc)=>{
                users.push({...doc.data(),idFirebase:doc.id})
            })
            setDataUser(users)
        })
        
        return ()=>onSuscribe()
    },[])
    
    return (
    <div className='w-full md:w-1/2 lg:w-/5 h-4/5 mt-10 bg-slate-300 flex flex-col pt-6 items-center'>
        <h1>Informacion de usuarios</h1>
        <div className='flex flex-col w-full items-center overflow-y-scroll h-full'>
            {dataUser.map((item,i)=>{
            return<div className='bg-slate-200 border-4 border-green-500 md:w-1/2 py-2 flex flex-col px-2 my-2 relative' key={i}>
                <select name='estados' className='outline-none ' onChange={(e)=>handleChange(e,item.idFirebase)}>
                    {options.map((item2,i)=>{
                    return <option key={item2.id} value={item2.id} >
                        {item2.estado}
                    </option>
                    })}
                </select>
                
                <div className='flex flex-col'>    
                    <div className='bg-slate-300'>Nombre:</div>
                    <p>{item.user}</p>
                </div>
                
                <div className='flex flex-col mt-4'>    
                    <div className='bg-slate-300'>Password:</div>
                    <p>{item.password}</p>
                </div>
                
                <div className='flex flex-col mt-4'>    
                    <div className='bg-slate-300'>Panel mostrado al usuario:</div>
                    <p>{item.estadoForm==="1"&&"pagina de carga"}
                        {item.estadoForm==="2"&&"pagina de datos enviados"}
                        {item.estadoForm==="3"&&"pagina de acceso denegado"}
                    </p>
                </div>
                <button className='text-white bg-red-500 absolute -left-8 top-0 rounded-full px-2 py-1 text-xs ' 
                    onClick={()=>deleteUser(item.idFirebase)}
                >
                    X
                </button>
            </div>
            })}
        </div>
    </div>
  )
}

export default AdminsPage