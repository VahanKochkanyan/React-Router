import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import  axios from "axios"
import { IUser } from "../request/Type"
import '../App.css'


export const UserList = () => {

    const [users, setUsers] = useState<IUser[]>([])

        useEffect(() => {
            const getUsers = async () => {
                const res = await axios.get("http://localhost:3012/users")
                setUsers(res.data)
            }
            getUsers()

        },[])


    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:3012/users/${id}`)
        setUsers(users.filter(user => user.id != id))
    }


    return <div>
        <h2>UserList</h2>
        {/* <a href="/add">Add User</a> */}
        {/* <Link to="/add">Add</Link> */}

        {
            users.map(user =>
                <div key={user.id}>
                    <p>{user.name} {user.surname}</p>
                    <Link to={ "/user/" + user.id }>details</Link>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>

                </div>
            )
        }
    </div>
}