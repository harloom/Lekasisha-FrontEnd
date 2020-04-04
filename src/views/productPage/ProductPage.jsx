/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { connect } from 'react-redux';
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Row,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  CardBody,
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
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { productActions,categoryActions  } from '_actions/index';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          dataFrom: { 
            name: '',
            id_category:'',
            price: '',
            description: '',
            photos:null
          },
        
            submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
}

handleChange(event) {
  const { name, value } = event.target;
  // const { user } = this.state;
  this.setState({
    dataFrom:{
      [name]: value
    }     
  });
}
handleChangeImage(event){
  this.setState({
    dataFrom:{
      photos:event.target.files[0]
    }
  });
}

handleSubmit(event) {
  event.preventDefault();
  console.log("from Submit");
  this.setState({ submitted: true });
  const {dataFrom} = this.state;
  const formData = new FormData();
  formData.append('photos',dataFrom.photos);
  formData.append('name',dataFrom.name);
  formData.append('description',dataFrom.description);
  formData.append('price',dataFrom.price);
  if (dataFrom.name && dataFrom.description && dataFrom.price && dataFrom.photos) {
      this.props.submitProduct(formData);
  }
}
handleDelete(event){
  event.preventDefault();
  this.props.deleteProducts()
}

  componentDidMount(){
    this.props.getCategorys();
    this.props.getProducts();
    
}

  handleGetProduct = (event) => {
    // console.log(event.target.value); 
    const id = event.target.value 
    this.props.getProducts(id,1);
    // this.setState({ value: event.target.value });
  };

  render() {
    const {products,categorys} = this.props;
    // console.log(this.props);
    const {items}  = products;
    console.log("Render Again");
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Tambahkan Paket</h3>
                </CardHeader>
                <CardBody>
                  <Form role="form"  onSubmit={this.handleSubmit}>
                  <FormGroup>
                <Label for="categorysSelect">Pilih Category</Label>
                <Input onChange={this.handleChange} type="select" name="id_category" id="categorysSelect">
                  {
                    categorys.items&&categorys.items.map((item,index)=>
                      <option key={item._id} value={item._id} >{item.name}</option>
                    )
                  }
                
           </Input>
              </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-tag" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" name="name"
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
                    <Input placeholder="Deskripsi" type="text" name="description"
                    onChange={this.handleChange}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-ui-04" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Price" type="number" name="price"
                    onChange={this.handleChange}/>
                  </InputGroup>
                </FormGroup>
                
                <div class="custom-file ">
                <FormGroup>
                <Label for="uploadIcon">Photos</Label>
                <Input type="file"  name="photos" id="uploadIcon"
                 onChange={this.handleChangeImage} />
                <FormText color="muted">
                  Upload Photo
                </FormText>
              </FormGroup>
                </div>
                <FormGroup>
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="submit">
                    Tambahkan Paket
                  </Button>
                </div>
                </FormGroup>
              </Form>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 mt-4">
            <Card>
            <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Urutan Menurut paket</h3>
                </CardHeader>
                <CardBody>
                  <Form role="form">
                  <FormGroup>
                <Label for="categorysSelect">Pilih Category</Label>
                <Input onChange={this.handleGetProduct} type="select" name="select" id="categorysSelect">
                  <option  key='' value=''>Silhakan Pilih</option>
                  {
                    categorys.items&&categorys.items.map((item,index)=>
                      <option key={item._id} value={item._id} >{item.name}</option>
                    )
                  }
                  </Input>
                  </FormGroup>
                  </Form>
                  </CardBody>
              </Card>
              </div>   
            <div className="col mt-4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Paket Tabel</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Deskripsi</th>
                      <th scope="col">Gambar</th>
                      <th scope="col">Harga</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {       
                      items&&
                      items.docs.map((item,index)=>
                          <tr  key={index}>
                          <th scope="row">
                          
                              <Media>
                                <span className="mb-0 text-sm">
                                  {index+1}
                                </span>
                              </Media>
                            
                          </th>
                          <td>{item.name}</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {item.description}
                            </Badge>
                          </td>
                          <td>
                          <div className="avatar-group">
                            {
                              item.imagePath.map((value,index)=>
                                <a
                                key={index}
                                className="avatar avatar-sm"
                                href="#pablo"
                                id={value._id}
                                onClick={e => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={require("assets/img/theme/team-1-800x800.jpg")}
                                />
                              </a>
  
                              )
                            }

                              {
                                item.imagePath.map((value,index)=>
                              <UncontrolledTooltip             
                                delay={0}
                                target={value._id}
                              >
                                {index+1}
                              </UncontrolledTooltip>
                              )
                              }

                        </div>
                          </td>
                          <td>
                            {item.updatedAt}
                          </td>
                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Action
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={this.handleDelete}
                                >
                                  Hapus
                                </DropdownItem>
                    
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                        
                      )
                    
                    }
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
                  
          </Row>

        </Container>
      </>
    );
  }
}
function mapState(state) {
  const { categorys,products, authentication } = state;
  const { user } = authentication
  // console.log(state);
  return { products,categorys,user };
}
const actionCreators = {
  getProducts: productActions.getAll,
  deleteProducts: productActions._delete,
  getCategorys : categoryActions.getAll,
  submitProduct : productActions.createproduct

}

const connectedCategoryPage = connect(mapState, actionCreators)(ProductPage);
export default connectedCategoryPage;
