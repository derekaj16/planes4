import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [planes, setPlanes] = useState([]);

  async function getPlanes() {
    try {
      const response = await axios.get('http://127.0.0.1:8080');
      return response.data; // Assuming the data is in response.data
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error so it can be caught in the useEffect
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planesData = await getPlanes();
        setPlanes(planesData.planes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(planes);
  }, [planes])

  return (
    <div className="App">
      <nav className="navbar bg-white text-center">
        <div className="container-fluid p-3 justify-content-center">
          <span className="mb-0 h1 text-center">Aviation Central</span>
        </div>
      </nav>
      <div className='container mt-5'>
        <div className="container text-center">
          <div className="row row-cols-3 justify-content-center">
          {planes.length > 0 ? (
            planes.map((plane, index) => (
              <div key={index} className="col mb-5">
                <div className='m-3 p-3 bg-light rounded shadow-lg justify-content-left'>
                  <img className='rounded img-fluid mb-2' src={plane.image} />
                  <div className='d-flex justify-content-start flex-column'>
                  <h4 className='text-start'>{plane.name}</h4>
                  <p className='text-start mb-1'><b>Price:</b> ${plane.price}</p>
                  <p className='text-start'><b>Description:</b> {plane.notes}</p>
                  <button className='btn btn-primary justify-content-start'>Purchase</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="spinner-border text-info" role="status">
              <span className="sr-only"></span>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
