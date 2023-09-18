import {useState} from 'react'
import Form from './components/Form'
import Card from './components/Card'

function App() {
  let [formdata, setFormdata] = useState('');
  return (
    <div className="App">
      <Form sendData={data=>{setFormdata(data)}}/>
      <Card {...formdata}/>
    </div>
  );
}

export default App;
