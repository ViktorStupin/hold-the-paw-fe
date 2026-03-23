import type { TUserRequest } from "@/schemas/user/user.request.shema"
import { client } from "../axiosClient"
import type { TUser } from "@/schemas/user/user.form.schema"

export const profileServices = {
  getMe: () =>{
    return client.get<TUser>('/api/v1/users/me/')
  },

  updateMe: (data:Partial<TUserRequest>)=>{
    return client.patch<TUser>('/api/v1/users/me/', data)
  }
  
}