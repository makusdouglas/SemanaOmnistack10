import React, {useEffect, useState} from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

//Componente: Bloco isolado de HTML, CSS ou JS, o qual não interfere no restante da aplicação.
//Propriedade: Informações que um componente PAI passa para o componente FILHO
//Estado: Informaçoes mantidas pelo componente


//PAREI EM 01:08:00 min do video #3 construindo interface web



function App() {
  
  const [devs, setDevs] = useState([]);

  

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    loadDevs();

  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs',data);
    console.log({dados: data})
    
  
    setDevs([...devs, response.data]);
  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
        
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
           <DevItem key={dev._id} dev={dev}></DevItem> 
          ))}
          

          
        </ul>
      </main>

    </div>
  );
}

export default App;
