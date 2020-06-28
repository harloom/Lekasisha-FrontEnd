
import React from "react";
import { connect } from 'react-redux';
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
import { SketchPicker } from 'react-color';
// reactstrap components
import { authHeader ,getAPI} from '_helpers';
import moment from 'moment';
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

import { DateRange } from 'react-date-range';
// core components
import FromHeader from "components/Headers/FromHeader.js";

import { laporanActions } from '_actions/index';

class ExportPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateRange :{
        startDate: new Date(),
        endDate: null,
        key: 'selection'
      },
      jumlah : 0,
      exportOrderRequest : false,
      onSubmit : false,
      onSubmitOrder : false,
    };

   
  }
  componentDidMount() {
    // this.props.getbanners();
  }

  componentDidUpdate(prevProprs, prevState, snapshot) {
    const { banners } = this.props;

  }



 
  handleChange = (event) => {
    const { name, value } = event.target;
    // const { user } = this.state;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // // const { user } = this.state;
    this.setState({
      onSubmit:true
    });
    
    this.props.exportUser(1,this.state.jumlah);
  }

  handleSubmitExportOrder= (event)=>{
    event.preventDefault();
    this.setState({
      onSubmitOrder : true,
    });
    const {startDate,endDate} = this.state.dateRange;
  

    const start = moment(startDate).format('YYYY-MM-DD');
    const end = moment(endDate).format('YYYY-MM-DD');
    this.props.exportOrder(start,end);

  }

  handleSelect = (ranges)=>{
 
    this.setState({dateRange:ranges.selection});
  }

  render() {
    const { laporan } = this.props;
    const {exportUserRequest,msg,exportUserFailur,exportOrderFailur,exportOrderRequest} = laporan;
    const {dateRange ,jumlah , onSubmit ,
      onSubmitOrder} = this.state;
    return (
      <>
<FromHeader />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          <Row>
            <div className="col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Export Data Order</h3>
                </CardHeader>
                <CardBody>
                <DateRange
                editableDateInputs={true}
                onChange={this.handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[dateRange]}
              />
              <div className="text-center">
              <h5 >Pilih Tangal Jarak</h5>
              <Button disabled={onSubmitOrder &&exportOrderRequest } color="primary"
                        onClick={this.handleSubmitExportOrder}
                      >
                        <i className="fa fa-print mx-1" />
                      Export Excel
                </Button>
                {
                          exportOrderRequest &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
              </div>
              {
                        exportOrderFailur &&onSubmitOrder &&
                        <div className="alert alert-danger mt-2" role="alert">
                          {msg}
                </div>
                      }
                </CardBody>
              </Card>
            </div>
            
            {/* table */}
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Data User</h3>
                </CardHeader>
                <CardBody>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Jumlah maksimal" type="number" name="jumlah"
                        value={jumlah}
                          onChange={this.handleChange} />
                      </InputGroup>
                    
                    </FormGroup>

                    <div className="text-center">
                      <FormGroup>
                        <Button className="mt-4" color="primary" disabled={onSubmit&&exportUserRequest} type="submit">
                          Export User
                  </Button>
                        {
                          exportUserRequest &&
                          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                      </FormGroup>
                    </div>

                  </Form>
                  {
                        exportUserFailur &&onSubmit &&
                        <div className="alert alert-danger" role="alert">
                          {msg}
                </div>
                      }
                </CardBody>
                </Card>
            </div>



           
          </Row>
        </Container>
      </>
    );
  }
}
function mapState(state) {
  const { laporan } = state;
  // console.log(state)
  return { laporan };
}
const actionCreators = {
  exportOrder : laporanActions.exportOrder,
  exportUser : laporanActions.exportUser
}

const connectedExportPage = connect(mapState, actionCreators)(ExportPage);
export { connectedExportPage as ExportPage };
