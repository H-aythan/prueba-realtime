import {useState} from 'react'
import { onSnapshot, query,orderBy,collection,addDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebaseSdk'
import { useEffect } from 'react'
import logoVerificado from '../assets/verificado.png'
import logoDenegado from '../assets/logoX.png'

const initialState={
    user:"",
    password:"",
}

const Form = () => {
    const [dataUser, setDataUser] = useState(initialState)
    const [showForm,setShowForm]=useState(false)
    const [estadoForm,setEstadoForm]=useState("")
   
    const handleChange=(e)=>{
      setDataUser({...dataUser,[e.target.name]:e.target.value})
    }
   
    const actionButton=async(e)=>{
        if(dataUser.password==""||dataUser.user==""){
            alert("Los campos son obligatorios")
            return
        }
        e.preventDefault()

        const id=dataUser.user+Math.floor(Math.random()*10000);
        sessionStorage.setItem("id",id)
        setShowForm(false)
        setDataUser({...dataUser,estadoForm:"1"})
        await addDoc(collection(db,"usuarios"),{...dataUser,estadoForm:"1",id:id})
    }
    
    useEffect(()=>{
        const q=query(collection(db,'usuarios'))
        
        const onSuscribe=onSnapshot(q,(usersActive)=>{
            let existsUser=sessionStorage.getItem("id")
            
            existsUser?usersActive.forEach((doc)=>{
                if(doc.data().id==sessionStorage.getItem("id")){
                    setDataUser({...dataUser,estadoForm:doc.data().estadoForm})
                    setShowForm(false)
                }

                
            })
            :setShowForm(true)
        })
        
        return ()=>onSuscribe()
    },[])
    
    return (
        <div className='w-full md:w-1/2 lgd:w-1/3 h-96 mt-40 bg-slate-300 flex justify-center items-center'>
        {showForm&&<div className='flex flex-col justify-center items-center'>
        <span>Nombre</span>
        <input className='w-40' 
            onChange={handleChange}
            type="text"
            name="user" 
            value={dataUser.user}
            />
        <span className='mt-5'>Contraseña</span>
        <input className='w-40' 
            onChange={handleChange}
            type="text" 
            name="password" 
            value={dataUser.password}
            />
        <button className='bg-blue-500 px-4 py-2 mt-5 text-white hover:bg-blue-300' onClick={actionButton}>Enviar</button>
        </div>}
        {dataUser.estadoForm==="1"&&<div className='flex items-center flex-col '>
            <svg className='animate-spin ml-2 w-32 h-32 border-4 border-l-blue-400 rounded-full ' ></svg>
            <span className='mt-4'>Esto puede tardar unos minutos</span>
        </div>}
        {dataUser.estadoForm==="2"&&<div className='flex items-center flex-col px-4 text-center'>
            <img className='w-40 mb-10' src={logoVerificado}/>
            <span>sus datos han sido enviados correctamente</span>
        </div>}
        {dataUser.estadoForm==="3"&&<div className='flex items-center flex-col px-4 text-center'>
            <img className='w-40 mb-10' src={logoDenegado}/>
            <span>Acceso denegado</span>
        </div>}
    </div>
  )
}

export default Form