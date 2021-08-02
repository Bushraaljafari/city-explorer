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
      error:false,
    }
  }

  updateRequestDataCity=(e)=>{
    this.setState({requestDataCity:e.target.value,})
  }
  respondButton=async (e)=>{
  e.preventDefault();
  let request=`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_App_Location_IQ_TOKEN}&q=${this.state.requestDataCity}&format=json`;
  console.log(request);
  try {let respond= await axios.get(request);
  this.setState({respondDataCity:respond.data[0],
    showRespond:true })}

//
  
catch{
    this.setState({
      error:true,
      showRespond: false,
  })
}




  }


  render(){
    return(
<div>
      <form>
  
    <label>City Explorer :  </label>
    
    <input type="text" placeholder="search here..." onChange={this.updateRequestDataCity}  />
    
    <p>{this.state.respondDataCity.display_name}</p>
  {this.state.showRespond&&<p>Lattitude : {this.state.respondDataCity.lat} /Longitude :{this.state.respondDataCity.lon} </p>}
  {/*<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows={3} />
    </Form.Group>*/}
    
    <button onClick={this.respondButton} type='submit'> Explore!</button>
    </form>
   
    {this.state.showRespond&& <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_App_Location_IQ_TOKEN}&center=${this.state.respondDataCity.lat},${this.state.respondDataCity.lon}`} alt='Map'/>}
    <div>{this.state.error &&<p>{this.state.showRespond}please write a correct city name</p>}</div>
   </div>
    




    )
  }
}


export default App;
