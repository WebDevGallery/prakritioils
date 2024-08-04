import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
    const [allUsers, setallUsers] = useState([])
    const [updateUserRole, setupdateUserRole] = useState(false)
    const [updateUserDetails, setupdateUserDetails] = useState({
        email: "",
        name:"",
        role:"",
        _idd:"",
    })

    const fetchAllUsers = async(req,res)=>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method:SummaryApi.allUser.method,
            credentials:'include'
        })
        const dataResponse = await fetchData.json()
        if(dataResponse.success){
            setallUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
        console.log("allusers",dataResponse)
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div>
        <table className='w-full user-table'>
            <thead >
                <tr className='bg-black'>
                <th>
                    SL no.
                </th>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers.map((el,index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('ll')}</td>
                                <td className='flex-col'><button onClick={()=>{
                                    setupdateUserDetails(el)
                                    setupdateUserRole(true)
                                }} >Edit <FaEdit /></button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            {
                updateUserRole && (
                    <ChangeUserRole onClose={()=>setupdateUserRole(false)} name={updateUserDetails.name} email={updateUserDetails.email} role={updateUserDetails.role} userId={updateUserDetails._id} callFunc={fetchAllUsers}/>
                )
            }
    </div>
  )
}

export default AllUser