import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';

function Register (){
    const [data, setData] = useState([]);
    const [estado, setEstado] = useState({"id":"-"});
    const [municipio, setMunicipio] = useState({"id":"-"});
    const [colonia, setColonia] = useState({"id":"-"});

    const handleInput = event => {
      let pattern = /^[0-9]{5}/;
      let result = pattern.test(event.target.value);

      console.log({"regex":result, "message":"handleinput"});
      
      if(event.target.value.length == 5 && result){
        getCP(event.target.value);
        console.log({"data":data, "message":"getCP handleinput"});
        for(let i=0; i<data.length; i++){
          console.log(data[i].colonia);
        }

      }else{
        swal("Opps!", "Código postal incorrecto", "error");
      }
    }

    const getCP = async (zipcode) =>{
      try {
        console.log({"zip":zipcode, "message":"GETCP"})
          let formData = new FormData();
          formData.append("cp", zipcode);
          const url = "http://api.masksoftco.mx/direcciones/codigo-postal";

          await axios({
              url,
              method: 'post',
              dataType: 'json',
              ContentType: 'application/json',
              data: formData
          })
          .then(response =>{
            let objectRes = response.data;
            const aux_dict = {}
            setData(response.data);
            setEstado({"estado":response.data[0].estado});
            setMunicipio({"municipio":response.data[0].municipio});
            for(let i=0; i<objectRes.length; i++){
              aux_dict[i] = objectRes[i].colonia;
            }
            setColonia(aux_dict);
          }).catch(error => {
            swal("Opps!", "Código postal incorrecto", "error");
          })
          


         // return (res.data ? res.data : false);
          
      } catch (error) {
          console.log(error);
      }
  }

    const colours= {
      "#ff0000": "Red",
      "#00ff00": "Green",
      "#0000ff": "Blue"
    }

    let coloursList = Object.keys(colours).map((k) => {
      return (
        <option key={k} value={k}>{colours[k]}</option>
      )
    }, this);

    let estadoList = Object.keys(estado).map((k) => {
      return (
        <option key={k} value={k}>{estado[k]}</option>
      )
    }, this);

    let municipioList = Object.keys(municipio).map((k) => {
      return (
        <option key={k} value={k}>{municipio[k]}</option>
      )
    }, this);

    let coloniaList = Object.keys(colonia).map((k) => {
      return (
        <option key={k} value={k}>{colonia[k]}</option>
      )
    }, this);

    return(
        <div>
          <form className="demoForm">
            <div className="form-group enlinea">
              <label htmlFor="cp">Código Postal: </label>
              <input type="text" className="form-control" name="cp" id="cp" onBlur={handleInput}/>
            </div>
            <div className="form-group enlinea">
              <label htmlFor="state">Estado: </label>
              <select className="anchoselect">
              {estadoList}
              </select>
            </div>
            <div className="form-group enlinea">
              <label htmlFor="alcaldia">Municipio/Alcaldia: </label>
              <select className="anchoselect">
              {municipioList}
              </select>
            </div>
            <div className="form-group enlinea">
              <label htmlFor="colonia">Colonia: </label>
              <select className="anchoselect">
              {coloniaList}
              </select>
            </div>
          </form>
        </div>
    );

}
export default Register;