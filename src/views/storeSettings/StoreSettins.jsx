
import React from "react";
import { authHeader ,getAPI} from '_helpers';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Label,
  FormText,
  Modal,
  UncontrolledTooltip,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";


// core components
import FromHeader from "components/Headers/FromHeader.js";


class StoreSettins extends React.Component {
  state = {
    background: '#fff',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      storeName: '',
      addresss: '',
      numberPhone: '',
      isSuccess: false,
      onRequest : false
    };


    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount(){
    this.getInformation()
  }


  getInformation(){
    let url = new URL(`${getAPI()}/store/information`);
    const requestOptions ={
    method : 'GET',
    headers:{ ...authHeader()}
    }
  return fetch(url,requestOptions)
  .then(this.handleResponse)
  .then(data =>{
    this.setState({...data})
    return data;
  });
  }

  handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user');
                window.location.href="/auth"
            }
  
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
  
        return data;
    });
  }

   updateStoreInformation(object){
   
    const requestOptions ={ 
      method: 'PUT',
          headers:{ ...authHeader(), 'Content-Type': 'application/json' },
          body: JSON.stringify(object)
    }
    return fetch(`${getAPI()}/store/edit`,requestOptions)
    .then(this.handleResponse)
    .then(data=>{
      this.setState({
        isSuccess:true,
        onRequest :false
      })
 
      return data
    })
  }


  handleChange = event => {
    const { name, value } = event.target;
    // const { user } = this.state;
    this.setState({
      [name]: value
    });
  }


  handleOptionChange = changeEvent => {
    const value  = changeEvent.target.value;
    if(value=="true"){
      this.setState({
        isOpen: true
      });
    }else{
      this.setState({
        isOpen: false
      });
    }
 
  };
  

  handleSubmit(e) {
    e.preventDefault();
  
    this.setState({ submitted: true ,onRequest:true,isSuccess:false});
    this.updateStoreInformation(this.state)
  }

  handleConfirm() {
    this.setState({
      modalIsOpen: false
    });
    // this.props.deleteCategory(this.state.objectIDdelete);
  }



  render() {

    const {
      submitted, modalIsOpen,
      isOpen, storeName, addresss,numberPhone ,isSuccess,onRequest
    } = this.state;

    // console.log(this.state)
    return (
      <>
        <FromHeader />
        {/* Page content */}
        <Container className=" mt--7" fluid>

          <Row>
            <div className="col-12">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Store Settings</h3>
                </CardHeader>
                <CardBody>
                  <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-tag" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" name="storeName"
                          onChange={this.handleChange}
                          value={storeName} />
                      </InputGroup>
                      {/* <FormFeedback invalid={"true"}>Masukan Nama Dengan Benar</FormFeedback> */}
                      {/* {submitted && !name &&
                            <FormFeedback invalid={(submitted && !name ? "true":"false")}>Masukan Nama Dengan Benar</FormFeedback>
                        } */}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-align-center" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="No Telp 082307xxxx" type="text" name="numberPhone"
                           value={numberPhone}
                          onChange={this.handleChange} />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-align-center" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Alamat" type="text" name="addresss"
                           value={addresss}
                          onChange={this.handleChange} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                      <legend>Toko Buka?</legend>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1"
                          value="true" checked={isOpen==true}
                          onChange={this.handleOptionChange}/>{' '}
                        Buka
                      </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="radio" name="radio1" 
                          value='false'
                          checked={isOpen==false}
                          onChange={this.handleOptionChange} />{' '}
                            Tutup
                        </Label>
                      </FormGroup>

                    </FormGroup>
             
                    {
                            isSuccess &&
                            <div className="alert alert-success" role="alert">
                              "Berhasil Di Ubah"
                      </div>
                    }

                    <div className="text-center">
                      <FormGroup>
                        <Button className="mt-4" color="primary" type="submit">
                          Simpan
                  </Button>
                        {
                          onRequest &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                      </FormGroup>
                    </div>

                  </Form>
                </CardBody>
              </Card>
            </div>

            {/* table */}


          </Row>
        </Container>
      </>
    );
  }

}

export default StoreSettins;
