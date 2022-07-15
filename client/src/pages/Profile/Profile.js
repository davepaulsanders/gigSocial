import React, { useState } from 'react'
import { useQuery } from "@apollo/client"
import { GET_CLIENT } from "../../utils/queries"

export const Profile = () => {
    const {loading, data} = useQuery(GET_CLIENT)
    const [genius, setGenius] = useState("")

    const fetchTokenForUser = async (code) => {
        const id = await data?.getClient.id
        const secret = await data?.getClient.secret
        const body = `client_secret=${secret}&grant_type=authorization_code&code=${code}&client_id=${id}&redirect_uri=http://localhost:3000/profile&response_type=code`
        if (!id || !secret) {
          return
        }
        const token = await fetch("https://api.genius.com/oauth/token/", {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body
         })
         const tokenResponse = await token.json()
         localStorage.setItem('genius_token', tokenResponse.access_token)
         setGenius(tokenResponse.access_token)
         return
      }

      if (!genius) {
    const code = window.location.href.split("=")[1].split("&")[0]
    fetchTokenForUser(code)
      }

    return (
        <div>
            <p>{genius}</p>
        </div>
    )
}
