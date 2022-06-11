import axios from 'axios';

export class PersonaService{

    baseUrl = "http://localhost:8080/api/rest/";

    getList(){
        return axios.get(this.baseUrl+'List').then(res => res.data);
    }

    savePeople(persona){
        return axios.post(this.baseUrl+'Save',persona).then(res => res.data);
    }

    DeletePeople(id){
        return axios.delete(this.baseUrl+'Delete/'+id).then(res => res.data);
    }
}