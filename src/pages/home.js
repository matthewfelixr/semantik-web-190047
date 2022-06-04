import { useState,useEffect } from 'react';
import './home.css';
import qs from 'qs';
import axios from 'axios';


function Home() {
    var imageSize={
    width:"100px",height:"100px",borderRadius:"10px",margin:"10px"
    }
  const [value, setValue] = useState({
    codes: [],
    NamaGitar:"",
    Merk:"",
    Harga:"",
    Jenis:"",
    Senar:"",
  });

  const getAllData = async () => {
    const BASE_URL = "http://localhost:3030/gitar/query";
    

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX id: <https://guitarstore.com/> 
      PREFIX item: <https://guitarstore.com/ns/item#> 
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      SELECT ?NamaGitar ?Merk ?Harga ?Jenis ?Senar WHERE {
        ?sub item:NamaGitar ?NamaGitar .
        ?sub item:Merk ?Merk .
        ?sub item:Harga ?Harga .
        ?sub item:Jenis ?Jenis .
        ?sub item:Senar ?Senar .
      } `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    const BASE_URL = "http://localhost:3030/gitar/query";
    // const BASE_URL = " https://ac54febc2a77.ngrok.io/repo-codes/query";

    const headers = {
      Accept: "application/sparql-results+json,*/*;q=0.9",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };

    const queryData = {
      query: `PREFIX id: <https://guitarstore.com/> 
      PREFIX item: <https://guitarstore.com/ns/item#> 
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
      SELECT ?NamaGitar ?Merk ?Harga ?Jenis ?Senar WHERE {
        ?sub item:NamaGitar ?NamaGitar .
        ?sub item:Merk ?Merk .
        ?sub item:Harga ?Harga .
        ?sub item:Jenis ?Jenis .
        ?sub item:Senar ?Senar .
      FILTER(
        regex(?id, "^${value.input}", "i") ||
              regex(?NamaGitar, "^${value.input}", "i") ||
              regex(?Merk, "^${value.input}", "i") ||
              regex(?Harga, "^${value.input}", "i") ||
              regex(?Jenis, "^${value.input}", "i") ||
              regex(?Senar, "^${value.input}", "i") 
      )
      } `,
    };

    try {
      const { data } = await axios(BASE_URL, {
        method: "POST",
        headers,
        data: qs.stringify(queryData),
      });
      console.log(data);

      // Convert Data
      const formatted_data = data.results.bindings.map((code, index) =>
        formatter(code, index)
      );
      console.log(formatted_data);

      setValue({
        ...value,
        codes: formatted_data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatter = (codes, index) => {
    return {
      id: index,
      NamaGitar: codes.NamaGitar.value,
      Merk: codes.Merk.value,
      Harga: codes.Harga.value,
      Jenis: codes.Jenis.value,
      Senar: codes.Senar.value,


    };
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      input: event.target.value,
    });
  };

  const content = value.codes.map((code) => (
    <tr key={code.id}>
    <td>{code.id + 1}</td>
    <td><img src={`/${code.NamaGitar}.jpg`} style={imageSize}></img></td>
    <td>{code.NamaGitar}</td>
    <td>{code.Merk}</td>
    <td>{code.Harga}</td>
    <td>{code.Jenis}</td>
    <td>{code.Senar}</td>
  </tr>
  ));

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
     <div className='container-banner'>
       <h1 className='store-title'>GUITAR STORE</h1>
     <form
       className="search-bar"
       onSubmit={(e) => e.preventDefault()}
       >
          <div>
           <div>
            <div>
              <div>
               <input
                  type="text"
                  placeholder="search..."
                  setvalue={value.input}
                  onChange={handleChange}
                  required="required"
                  onKeyPress={(event)=>{event.key==="Enter" && getData() }}
               />
              </div>
            </div>
          <div>
          <button
          className='search-button'
            type="button"
            value="Search"
            onClick={getData}
          >
          <span>Search</span>
          </button>
          </div>
          </div>
    </div>
     </form>
     </div>
     <div className='body-2'>
        <table className='guitar-list'>
          <tr>
            <th>NO</th>
            <th>GAMBAR</th>
            <th>NAMA GITAR</th>
            <th>MERK</th>
            <th>HARGA</th>
            <th>JENIS</th>
            <th>SENAR</th>
          </tr>
        {content}
        </table>
        </div>
    </div>
  );
}

export default Home;
