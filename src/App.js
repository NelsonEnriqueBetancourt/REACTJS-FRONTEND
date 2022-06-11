import React, { Component } from 'react';
import './App.css';
import { PersonaService } from './Service/personaService';
import {DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Panel} from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';




import 'primereact/resources/themes/nova-accent/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component{
  constructor(){
    super();
    this.state = {  
      visible: false,
      persona : {
        id: null,
        name: null,
        lastName: null,
        email: null,
        telefono: null,
        fechaNacimiento: null,
        direccion: null,
        origen: null
      },
      selectPersona:{

      }
    };
    this.items=[
      {
        label: 'NEW', 
        icon : 'pi pi-fw pi-user-plus',
        command: () =>{this.showSaveDialog()}
      },
      {
        label: 'UPDATE', 
        icon : 'pi pi-fw pi-user-edit',
        command: () =>{this.showEditDialogo()}
      },
      {
        label: 'DELETE', 
        icon : 'pi pi-fw pi-user-minus',
        command: () =>{this.Delete()}
      },

      {
        label: 'SEARCH',
        icon: 'pi pi-fw pi-users'
      }
      
    ];
    this.personaService = new PersonaService();
    this.Save =this.Save.bind(this);
    this.Delete = this.Delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.Save}/>
      </div>
    );
  }

  componentDidMount(){
    this.personaService.getList().then(data => this.setState({personas: data}))
  
  }

  Save() {
    this.personaService.savePeople(this.state.persona).then(_data => {
      this.setState({
        visible: false,
        persona : {
          id: null,
          name: null,
          lastName: null,
          email: null,
          telefono: null,
          fechaNacimiento: null,
          direccion: null,
          origen: null
        }
      });
      this.toast.show({severity: 'success', summary: 'Mensaje', detail: 'Se Guardo El Registro Con Exito'});
      this.personaService.getList().then(data => this.setState({personas: data}));
    }) 
  }

  Delete(){
    if(window.confirm("Desea Eliminar El Registro Del Contacto")){
      this.personaService.DeletePeople(this.state.selectPersona.id).then(data => {
        this.toast.show({severity: 'success', summary: 'Mensaje', detail: 'Se Elimino El Registro Con Exito'})
        this.personaService.getList().then(data => this.setState({personas: data}));
      });
    }

  }

  render(){
    return(
      <div style={{width: '80%', marginTop:'40 px', margin: '0 auto', }}> 
        <br></br>
        <h1>GESTÍON EMPLEADOS CRM</h1>
        <br></br>
        <Panel  header="LISTA DE CONTACTOS CRM">
          <DataTable value={this.state.personas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectPersona} onSelectionChange={e => this.setState({selectPersona: e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Nombre"></Column>
              <Column field="lastName" header="Apellido"></Column>
              <Column field="email" header="E-mail"></Column>
              <Column field="telefono" header="Telefono"></Column>
              <Column field="fechaNacimiento" header="Fecha Nacimiento"></Column>
              <Column field="direccion" header="Direccion"></Column>
              <Column field="origen" header="Pais"></Column>
         </DataTable>
        </Panel>
        <Menubar model={this.items} />
        <Dialog header="NUEVO CONTACTO" visible={this.state.visible} style={{ width:'400px'}} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
          <br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.name} style={{width: '100%'}} type="text" id="name" onChange={(e) => {  
                  let val = e.target.value;
                  this.setState(prevState => {
                    let persona = Object.assign({}, prevState.persona);
                      persona.name = val


                      return {persona};
                    })}
                }/>
              <label htmlFor="name">Nombre</label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.lastName} style={{width: '100%'}} type="text" id="lastName" onChange={(e) => { 
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.lastName = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="lastName">Apellido</label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.email} style={{width: '100%'}}  type="email" id="email" onChange={(e) => { 
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.email = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="email">E-mail</label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.telefono} style={{width: '100%'}} type="number" id="telefono" onChange={(e) => { 
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.telefono = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="telefono">Nº Celular</label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.fechaNacimiento} style={{width: '100%'}} type="date" id="fechaNacimiento" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.fechaNacimiento = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="fechaNacimiento"></label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.direccion} style={{width: '100%'}} id="direccion" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.direccion = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="direccion">Direccion</label>
            </span>
            <br></br><br></br>
            <span className="p-float-label">
              <InputText value={this.state.persona.origen} style={{width: '100%'}} type="text" id="origen" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                      let persona = Object.assign({}, prevState.persona);
                      persona.origen = val


                      return {persona};
                  })}
                }>
              </InputText>
            <label htmlFor="origen">Pais</label>
            </span>
        </Dialog>
        <Toast ref={Toast}></Toast>
      </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible: true,
      persona: {
        id: null,
        name: null,
        lastName: null,
        email: null,
        telefono: null,
        fechaNacimiento: null,
        direccion: null,
        origen: null
      }
    })
  }

  showEditDialogo(){
    this.setState({
      visible : true,
      persona: {
        id: this.state.selectPersona.id,
        name: this.state.selectPersona.name,
        lastName: this.state.selectPersona.lastName,
        email: this.state.selectPersona.email,
        telefono: this.state.selectPersona.telefono,
        fechaNacimiento: this.state.selectPersona.fechaNacimiento,
        direccion: this.state.selectPersona.direccion,
        origen: this.state.selectPersona.origen
      }
    })
  }



}


