import React, {Component} from 'react';
import ShotChart from "./ShotChart";
import CounterSlider from "./CounterSlider";
import _ from 'lodash';
import { Radio,Row,Col,Switch } from 'antd';

class DataViewContainer extends Component {

    state = {
        minCount: 2,
        chartType: 'hexbin',
        displayTooltip: true,
    };

    onCountSliderChange = (data) => {
        this.setState({
            minCount: data
        });
    }

    onChangeCharType = (e) => {
        this.setState( {
            chartType:e.target.value
        })
    }

    onTooltipChange = (displayTooltip) => {
        console.log(displayTooltip);
        this.setState({ displayTooltip });
    }


    render() {
        return (
            <div className="data-view">
                <ShotChart playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    chartType={this.state.chartType}
                    displayTooltip={this.state.displayTooltip}/>

                <div className="filter">

                    {
                        this.state.chartType === 'hexbin'
                        ? <CounterSlider value={this.state.minCount}
                                        onCountSliderChange={ _.debounce(this.onCountSliderChange,500)}/>
                                        : null
                    }
                    <br/>

                    <Row>
                        <Col span={9}>
                            <Radio.Group onChange={this.onChangeCharType} value={this.state.chartType}>
                                <Radio value="hexbin">hexbin</Radio>
                                <Radio value="scatter">scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={4}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                onChange={this.onTooltipChange}
                                defaultChecked />
                        </Col>

                    </Row>
                </div>
            </div>
        );
    }
}


export default DataViewContainer;