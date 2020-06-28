
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import FromHeader from "components/Headers/FromHeader";

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <>
        <FromHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-12">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col-12">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Selamat Datang</h2>

                    </div>
                  
                  </Row>
                </CardHeader>
          
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className ="col-12 mt-4">
            <Card className="shadow">
            <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col-12 "  style={{minHeight: 300}}>
                 

                    </div>
                  
                  </Row>
                </CardHeader>
            </Card>
            </Col>
          </Row>

       </Container>
      </>
    );
  }
}

export default Index;
