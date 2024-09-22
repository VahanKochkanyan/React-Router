import { useNavigate, useParams } from "react-router-dom"
import { Input } from "../request/Type";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

export const User = () => {
  
    const { id } = useParams() 
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Input>();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUser = async () => {
          const response = await axios.get(`http://localhost:3012/users/${id}`);
          const user = response.data;
          setValue("name", user.name);
          setValue("surname", user.surname);
          setValue("age", user.age);
          setValue("salary", user.salary);
        };
        fetchUser();
      }, [id, setValue]);
    
      const onSubmit = async (data: Input) => {
        await axios.put(`http://localhost:3012/users/${id}`, data);
        navigate("/");
      };


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

      <button type="submit">Save Changes</button>
    </form>
    </div>
}