import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IUser } from "../request/Type"
import axios from "axios"

export const AddUser = () => {

    const {register, handleSubmit, formState: { errors } } = useForm<IUser>()
    const navigate = useNavigate()

    const onSubmit = async (data: IUser) => {
        await axios.post('http://localhost:3012/users', data)
        navigate("/")
    }
    

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <p>Name is required</p>}
      </div>

      <div>
        <label>Surname</label>
        <input {...register("surname", { required: true })} />
        {errors.surname && <p>Surname is required</p>}
      </div>

      <div>
        <label>Age</label>
        <input type="number" {...register("age", { required: true, min: 1 })} />
        {errors.age && <p>Age is required</p>}
      </div>

      <div>
        <label>Salary</label>
        <input type="number" {...register("salary", { required: true })} />
        {errors.salary && <p>Salary is required</p>}
      </div>

      <button type="submit">Add User</button>
    </form>
    </div>
}