import axios from "axios";

export const loginMe = async (inputInfo) => {

    return await axios.post('http://localhost:3000/auth/login', inputInfo)
}

export const registerMe = async (inputInfo) => {

    return await axios.post('http://localhost:3000/auth/register', inputInfo)
}

export const getProfile = async (profileInfo) => {

    return await axios.get('http://localhost:3000/users/profile', profileInfo)
}

export const getAllProfiles = async (profilesInfo) => {

    return await axios.get('http://localhost:3000/users/patients', profilesInfo)
}

export const getAllDentists = async (allDentists) => {

    return await axios.get('http://localhost:3000/users/dentists', allDentists)
}