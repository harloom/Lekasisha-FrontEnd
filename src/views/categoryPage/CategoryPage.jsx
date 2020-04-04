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
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SketchPicker } from 'react-color';
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

import { categoryActions } from '_actions/index';

class Category extends React.Component {
  state = {
    background: '#fff',
  };

  constructor(props) {
    super(props);
  
    this.state = {
      name: '',
      backgroundColor: '',
      description: '',
      image: null,
      submitted: false,
      allValid: false,
      modalIsOpen:false,
      objectIDdelete:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteAfterConfirm = this.handleDeleteAfterConfirm.bind(this);
  }
  componentDidMount() {
    this.props.getCategorys();
  }

  componentDidUpdate(prevProprs, prevState, snapshot) {
    const { categorys } = this.props;
    const { onRequest, onSuccess } = categorys
    if (onSuccess) {
      setTimeout(() => {
        this.props.getCategorys();
      }, 3000);

    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    // const { user } = this.state;
    this.setState({
      [name]: value
    });
  }
  handleChangeImage(event) {
    this.setState({
      image: event.target.files[0]

    });
  }


  handleSubmit(e) {
    e.preventDefault();
    console.log("Button Submit");
    this.setState({ submitted: true });
    const { name, description, backgroundColor } = this.state;
    const formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('backgroundColor', this.state.backgroundColor);
    if (name && description && backgroundColor) {
      this.setState({ allValid: true });
      this.props.submitCategory(formData);
    } else {
      this.setState({ allValid: false });
    }
  }

  handleDelete(event) {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('value');
    this.setState({
      objectIDdelete:id,
      modalIsOpen :true
    });
    
  }

  handleDeleteAfterConfirm(){
    this.setState({
      modalIsOpen :false
    });
    this.props.deleteCategory(this.state.objectIDdelete);
  }

  handleChangeComplete = (color) => {
    this.setState({ backgroundColor: color.hex });
  };
  render() {
    const { categorys } = this.props;
    const { name, backgroundColor, description, image, submitted, allValid,modalIsOpen } = this.state;
    const { onRequest, onSuccess } = categorys
    // console.log(this.props);

    const { items } = categorys;

    return (
      <>
        <FromHeader />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}

          {
            (submitted && !allValid) &&
            <div className="alert alert-danger" role="alert">
              "Tolong periska kembali form"
                 </div>


          }
          {
            onSuccess &&
            <div className="alert alert-success" role="alert">
              "Berhasil Ditambahkan"
                </div>
          }


          }

          <Row>
            <div className="col-12">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Tambahkan Category</h3>
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
                        <Input placeholder="Name" type="text" name="name"
                          onChange={this.handleChange} />
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
                        <Input placeholder="Deskripsi" type="text" name="description"
                          onChange={this.handleChange} />
                      </InputGroup>
                    </FormGroup>
                    <div className="mt-4 mb-4">
                      <SketchPicker
                        color={this.state.backgroundColor}
                        onChangeComplete={this.handleChangeComplete} />
                    </div>

                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-ui-04" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Color" type="text" name="backgroundColor"
                          value={this.state.backgroundColor}
                          onChange={this.handleChange} />
                      </InputGroup>
                    </FormGroup>

                    {/* <div class="custom-file"> */}
                    <FormGroup>
                      <Label for="uploadIcon">File</Label>
                      <Input type="file" name="image" id="uploadIcon"
                        onChange={this.handleChangeImage} />
                      <FormText color="muted">
                        Upload Icon
                </FormText>
                    </FormGroup>
                    {/* </div> */}
                    <div className="text-center">
                      <FormGroup>
                        <Button className="mt-4" color="primary" type="submit">
                          Tambahkan Category
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

            <div className="col mt-4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Category Tabel</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama</th>
                      <th scope="col">Deskripsi</th>
                      <th scope="col">Warna</th>
                      <th scope="col">Tanggal</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items &&
                      items.map((item, index) =>
                        <tr key={index}>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={require("assets/img/theme/bootstrap.jpg")}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {index + 1}
                                </span>
                              </Media>
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
                            {item.backgroundColor}
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
                                  value={item._id}
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
  


               <Modal  isOpen={modalIsOpen} fade={true}>
                <ModalHeader>
                    Ingin Menghapus?
                </ModalHeader>
                <ModalBody>
                  <p>Data tidak dapat di kembalikan!</p>
                </ModalBody>
                <ModalFooter>
                <Button onClick={()=> this.setState({modalIsOpen:false})}>
                Close
                  </Button>
                  <Button color="info" onClick={this.handleDeleteAfterConfirm}>
                        Save Change
                  </Button>
                </ModalFooter>
               
              </Modal>

      
          </Row>
        </Container>
      </>
    );
  }
}
function mapState(state) {
  const { categorys, authentication } = state;
  const { user } = authentication
  // console.log(state);
  return { categorys, user };
}
const actionCreators = {
  getCategorys: categoryActions.getAll,
  deleteCategory: categoryActions.deleteById,
  submitCategory: categoryActions.createCategory
}

const connectedCategoryPage = connect(mapState, actionCreators)(Category);
export { connectedCategoryPage as Category };
