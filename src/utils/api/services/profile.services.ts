import type { TUser } from "@/types/User"
import { client } from "../axiosClient"

export const profileServices = {
  getMe: () =>{
    return client.get<TUser>('/api/v1/users/me/')
  },

  updateMe: (data:Partial<TUser>)=>{
    return client.patch<TUser>('/api/v1/users/me/', data)
  }
  
}