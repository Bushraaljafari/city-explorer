import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

//import form from 'react-bootstrap';
//import button from 'react-bootstrap';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      requestDataCity:'',
      respondDataCity:[],
      showRespond:false,
    }
  }

  updateRequestDataCity=(e)=>{
    this.setState({requestDataCity:e.target.value,})
  }
  respondButton=async (e)=>{
  e.preventDefault();
  let request=`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_App_Location_IQ_TOKEN}&q=${this.state.requestDataCity}&format=json`;
  console.log(request);
  let respond= await axios.get(request);
  this.setState({respondDataCity:respond.data[0],
    showRespond:true });
}

 





  render(){
    return(

      <form>
  
    <label>City Explorer :  </label>
    
    <input type="text" placeholder="search here..." onChange={this.updateRequestDataCity}  />
    
  
  {/*<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows={3} />
    </Form.Group>*/}
    <button onClick={this.respondButton} type='submit'> Explore!</button>
    <div>
    <p>name :{this.state.respondDataCity.display_name}</p>
    <p> Lattitude :{this.state.respondDataCity.lat}</p>
    <p>Longitude :{this.state.respondDataCity.lon}</p>

    </div>
   
</form>
    )
  }
}


export default App;
