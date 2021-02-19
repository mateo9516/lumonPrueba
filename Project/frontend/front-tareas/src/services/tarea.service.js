import axios from 'axios';

class TareaDataService{
    getAll(){
        return axios.get(`http://localhost:8080/tareas`);
    }

    get(id){
        return axios.get(`http://localhost:8080/tareas/${id}`);
    }

    create(data){
        return axios.post(`http://localhost:8080/tareas`,data);
    }

    update(id,data){
        return axios.put(`http://localhost:8080/tareas/${id}`, data);
    }

    delete(id){
        return axios.delete(`http://localhost:8080/tareas/${id}`);
    }

}

export default new TareaDataService();