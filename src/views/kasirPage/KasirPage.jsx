
import React from "react";
import { connect } from 'react-redux';

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
  ModalFooter,
  Spinner
} from "reactstrap";


// core components
import { saveAs } from 'file-saver';
import { authHeader ,getAPI} from '_helpers';
// reactstrap components
import { kasirActions } from '_actions/index';
import FromHeader from "components/Headers/FromHeader.js";

import jsPdf from 'jspdf'
import html2canvas from 'html2canvas'

class KasirPage extends React.Component {
  state = {
    background: '#fff',

  };

  constructor(props) {
    super(props);
    this.pdfRef = React.createRef();
    this.state = {
      searchText: ''
    };

    this.handleButtonAction = this.handleButtonAction.bind(this);
    this.handleButtonDetail = this.handleButtonDetail.bind(this);
    this.handlePage = this.handlePage.bind(this);
  
  }
  componentDidMount() {
    this.props.getOrders(1);
  }
  handlePage = (event) => {
    const page = event.currentTarget.value;

    this.props.getOrders(page);

  };
  componentDidUpdate(prevProprs, prevState, snapshot) {
    const { loadingAction } = this.props.orders
    if (loadingAction == false) {
      setTimeout(() => {
        this.props.getOrders(1);
      }, 1000)
    }
  }

  // jsfPdfGenerator(event){
  //   const input = window.document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/jpg');
  //       const pdf = new jsPdf();
  //       pdf.addImage(imgData, 'JPEG', 0, 0);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("report.pdf");
  //     })
  //   ;
  // }

  handleButtonDetail(event) {
    event.preventDefault();
    const index = event.currentTarget.getAttribute('value');
    const { items } = this.props.orders;
    const { docs } = items;
    const dataItem = docs[index];
    this.props.detailOrder(dataItem._id);

  }

  handleButtonAction(event) {
    event.preventDefault();
    const index = event.currentTarget.getAttribute('value');
    const { items } = this.props.orders;
    const { docs } = items;
    const dataItem = docs[index];

    switch (event.currentTarget.name) {
      case 'accept':
        // console.log("action Accept!")
        this.props.acceptOrder(dataItem._id);
        break;
      case 'ongoing':
        // console.log("action ongoing!");
        this.props.ongoingOrder(dataItem._id);
        break;
      case 'finish':
        // console.log("action finish!");
        this.props.finishOrder(dataItem._id);
        break;
      case 'deny':
        // console.log("action deny!")
        this.props.denyOrder(dataItem._id);
        break;
      case 'cancel':
        // console.log("action cancel!")
        this.props.cancelOrder(dataItem._id);
        break;

      default:
        break;
    }

  }

  handleSearch = event => {
    const { searchText } = this.state;
    this.props.detailOrder(searchText);
    event.preventDefault();
  }
  handleChangeSearch = event => {
    const { name, value } = event.target;
    // console.log(`${name} : ${value}`)
    this.setState({
      [name]: value
    });
  }

  createSelectionPage = () => {
    let selectionPage = []
    // Outer loop to create parent
    for (let i = 0; i < this.props.orders.items.totalPages; i++) {
      //Create the parent and add the children
      selectionPage.push(<option key={i} value={(i + 1)} >{(i + 1)}</option>)
    }
    return selectionPage
  }

  createAndDownloadPdf = (id) => {
    //  const localHost = 'http://localhost:3000';
    //  let url = new URL(`${localHost}/transaction/order/print/5e90ff10914653022ccacc11`);
    let url = new URL(`${getAPI()}/transaction/order/print/${id}`);
    const requestOptions = {
      method: 'POST',
      headers: { ...authHeader() }
    }
    return fetch(url, requestOptions)
      .then(this.handleResponse)
      .then(data => {
        const idFIle = data.file
        
        let urlDownload = new URL(`${getAPI()}/transaction/order/getPDF/${idFIle}`);
        //let urlDownload = new URL(`${localHost}/transaction/order/getPDF/${idFIle}`);
       
        const requestOptions = {
          method: 'GET',
          headers: { ...authHeader() },
        }
        return fetch(urlDownload, requestOptions)
        .then(response => response.blob())
          .then((res) => {
            const pdfBlob = new Blob([res], { type: 'application/pdf' });
           console.log(res)
            saveAs(pdfBlob, `${idFIle}.pdf`);
          })
      });


  }
  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          localStorage.removeItem('user');
          window.location.href = "/auth"
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }
  render() {
    const { orders, } = this.props;
    const { items, orderDetail, loadingDetail } = orders;
    // console.log(orderDetail);



    return (
      <>
        <FromHeader />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {loadingDetail &&
            <div className="col mt-4">
              <Card className="shadow">
                <div className="text-center py-2">
                  <Spinner type="grow" color="primary" />
                  <Spinner type="grow" color="danger" />
                  <Spinner type="grow" color="warning" />
                </div>
              </Card>
            </div>
          }
          <Row >
            {/* detail */}
            {
              orderDetail &&

              <div className="col" id="divToPrint">
                <Card className="shadow" >
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Order Detail</h3>

                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="col-12">
                        <h5>No Order : {orderDetail._id}</h5>
                      </div>
                      <div className="col-4">
                        <h5>Nama Pemesan :</h5>
                      </div>
                      <div className="col-8">
                        <h5>{orderDetail.user_detail.id_user.nameUser}</h5>
                      </div>
                      <div className="col-4">
                        <h5>Nomer Pemesan :</h5>
                      </div>
                      <div className="col-8">
                        <h5>{orderDetail.user_detail.id_user.numberPhone}</h5>
                      </div>
                      <div className="col-12">
                        <h4>Detail Acara</h4>
                      </div>
                      <div className="col-4">
                        <h5>Nama Acara : </h5>
                      </div>
                      <div className="col-8">
                        <h5>{orderDetail.event_detail.name_event}</h5>
                      </div>
                      <div className="col-4">
                        <h5>Alamat Acara : </h5>
                      </div>
                      <div className="col-8">
                        <h5>{orderDetail.event_detail.address_event}</h5>
                      </div>
                      <div className="col-4">
                        <h5>Tanggal Acara : </h5>
                      </div>
                      <div className="col-8">
                        <h5>{orderDetail.event_detail.date_event}</h5>

                      </div>
                      <div className="col-12">
                        <hr></hr>
                        <h4>Detail Produk</h4>
                      </div>


                    </Row>


                    {
                      orderDetail.item_details.map((product, index) =>
                        <Row key={index}>
                          <div className="col">
                            <p><small>{product.name} {`(Rp. ${product.price} )`}</small></p>
                          </div>
                          <div className="col">
                            <small>
                              {product.quantity}
                            </small>

                          </div>
                          <div className="col">
                            <small>
                              {(product.quantity * product.price)}
                            </small>

                          </div>
                        </Row>
                      )}

                    <div className="col-12"><hr /></div>
                    <div className="col"><h5>Total: </h5></div>
                    <div className="col"><h4>Rp. {orderDetail.gross_amount}</h4></div>
                    <div className="col-12">
                      <button className="btn btn-primary btn-sm btn-icon btn-round" value={orderDetail._id}
                        onClick={(event)=>{
                          event.preventDefault()
                          this.createAndDownloadPdf(orderDetail._id)
                        }}
                      >
                        <i className="fa fa-print mx-1" />
                      Cetak
                      </button>
                    </div>

                  </CardBody>
                </Card>
              </div>

            }

            {/* table */}
            <div className="col-12 mt-4">
              <Card>
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Cari #ID</h3>
                </CardHeader>
                <CardBody>
                  <Form role="form" onSubmit={this.handleSearch}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="" type="text" name="searchText"
                          value={this.state.searchText}
                          onChange={this.handleChangeSearch} />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <FormGroup>
                        <Button color="primary" type="submit">
                          Cari
                  </Button>
                        {/* {
                          onRequest &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
            <div className="col mt-4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Order Tabel</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Pemesan</th>
                      <th scope="col">Pembayaran</th>
                      <th scope="col">Status Transaksi</th>
                      <th scope="col">Status Pembayaran</th>
                      <th scope="col">Tanggal Acara</th>
                      <th scope="col">Admin Action</th>
                      <th scope="col" />
                      <th scope="col" />
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items &&
                      items.docs?.map((item, index) =>
                        <tr key={index}>
                          <th scope="row">
                            <Media className="align-items-center">

                              <Media>
                                <span className="mb-0 text-sm">
                                  {index + 1}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{item.user_detail.id_user.nameUser}</td>
                          <td>{item.payment_type}</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {item.status_transaction}
                            </Badge>
                          </td>
                          <td>
                            {item.isPay ? "OK" : "Belum"

                            }
                          </td>
                          <td>
                            {item.event_detail.date_event}
                          </td>
                          <td>
                            {item.admin_actions}
                          </td>
                          <td>
                            <button className="btn btn-primary btn-sm btn-icon btn-round" value={index}
                              onClick={this.handleButtonDetail}
                            >
                              <i className="fa fa-eye" />
                            </button>

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
                                <i className="fa fa-check" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>

                                <DropdownItem
                                  href="#pablo"
                                  value={index}
                                  name="accept"
                                  onClick={this.handleButtonAction}
                                >
                                  Accept
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  value={index}
                                  name="ongoing"
                                  onClick={this.handleButtonAction}
                                >
                                  Ongoing
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  value={index}
                                  name="finish"
                                  onClick={this.handleButtonAction}
                                >
                                  Finish
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
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
                                <i className="fa fa-times" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  value={index}
                                  name="deny"
                                  onClick={this.handleButtonAction}
                                >
                                  Tolak
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  value={index}
                                  name="cancel"
                                  onClick={this.handleButtonAction}

                                >
                                  Batalkan
                                </DropdownItem>

                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>



                        </tr>


                      )

                    }
                    <tr>
                      <th scope="row">
                      </th>
                    </tr>

                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <div className="col-3">

                    <Input onChange={this.handlePage} type="select" name="select" id="pageSelect">
                      <option key='' value=''>Page</option>
                      {
                        items &&
                        this.createSelectionPage()

                      }
                    </Input>

                  </div>
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
  const { orders, authentication } = state;
  const { user } = authentication
  // console.log(state);
  return { orders, user };
}
const actionCreators = {
  getOrders: kasirActions.getOrders,
  detailOrder: kasirActions.detailOrder,
  acceptOrder: kasirActions.acceptOrder,
  ongoingOrder: kasirActions.ongoingOrder,
  denyOrder: kasirActions.denyOrder,
  cancelOrder: kasirActions.cancelOrder,
  finishOrder: kasirActions.finishOrder

}

const connectedKasirPage = connect(mapState, actionCreators)(KasirPage);
export { connectedKasirPage as KasirPage };
