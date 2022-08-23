import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head,useForm,usePage } from '@inertiajs/inertia-react';
import Input from "@/Components/Input"
import Label from '@/Components/Label';
import ImageDefault from "../../assets/images/image_default.png"

export default function Dashboard(props) {

    const {pets} = usePage().props
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nameImage: '',
        birth_date: '',
    });
    
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };
                                
    const refContainer = React.useRef(); //reference for image
    
    const changeFile = (file)=>{
        setData({
            ...data,["nameImage"]:file
          })
      }

    const [image,setImage] = React.useState(null)

    const fileUploadInputChange =(e)=>{
        const file = e.target.files[0]
        changeFile(file)
        const filereader = new FileReader()
        filereader.onload = (e)=>{ // here base 64
           setImage(e.target.result)
        }
        filereader.readAsDataURL(file)
    }
    
    const fileUploadAction  =()=> {
        refContainer.current.click()
    }

    const onSave = (e)=>{
        e.preventDefault();
        post(route("pets.store"));
        reset();
        setImage(null)
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col W-64 m-4">
                            <form onSubmit={onSave}>
                            <Label forInput="Nombre" value="Nombre" />
                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                max={32}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                           <Label forInput="Fecha Nacimiento" value="Fecha Nacimiento" />
                             <Input
                                type="date"
                                name="birth_date"
                                value={data.birth_date}
                                className="mt-1 block w-full"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />
                             <button
                             type="submit"
                             className="bg-blue-500 my-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >Guardar</button>
                            </form>
                            </div>
                            <div className="flex flex-col W-64 items-center text-center">
                               <div className="grid grid-cols-2 gap-4">
                                <div>
                                <img src={image == null ? ImageDefault : image} className="w-32 h-32 rounded-full justify-center"/>
                                <button 
                                 onClick={()=>fileUploadAction()}
                                 type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >Subir Imagen</button>
                                <input type="file"  ref={refContainer}    onChange={fileUploadInputChange} className="hidden"/>
                                </div>
                               <div  className="text-left my-2 items-center justify-center mt-4 w-32">
                               <p>Name: </p>
                               <p>{data.name}</p>
                                <p>Birth Date:</p>
                                <p> {data.birth_date}</p>
                               </div>
                               </div>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <table  class="min-w-full">
                        <thead  class="border-b">
                            <tr>
                            <th  scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left" >Name</th>
                            <th  scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">BirthDate</th>
                            <th  scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">image</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                props.pets.map((item,index)=>{
                                   return(
                                    <tr className="border-b" key={index}>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.name}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{item.birth_date}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"><img 
                                    className="w-32 h-32 rounded-full"
                                    src={item.imageUrl}/></td>
                                </tr>
                                   )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </Authenticated>
    );
}
