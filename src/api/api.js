import axios from 'axios';

export const GetOne = async (id) => {
    await axios.get(`http://localhost:9000/forecast/${id}`).then((res) => {
      return res.data.payload
    });
}
