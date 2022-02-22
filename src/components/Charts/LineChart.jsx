import React, {Component} from "react";
import * as echarts from 'echarts'
import { debounce } from "@/utils";
class LineChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart:null
        }
    }
    static defaultProps = {
        width:'100%',
        height: "350px",
        styles: {},
        className: "",
    };
    componentDidMount() {
        debounce(this.initChart.bind(this), 300)();
        window.addEventListener("resize", () => this.resize());
    }
    componentWillUnmount() {
        this.dispose();
    }
    resize() {
        const chart = this.state.chart;
        if (chart) {
            debounce(chart.resize.bind(this), 300)();
        }
    }
    dispose() {
        if (!this.state.chart) {
            return;
        }
        window.removeEventListener("resize", () => this.resize()); // 移除窗口，变化时重置图表
        this.setState({ chart: null });
    }

    setOptions({ xAxisData,series,title,legend } = {}) {
        this.state.chart.setOption({
            title,
            backgroundColor: "#fff",
            legend,
            xAxis: {
                data:xAxisData ,
                boundaryGap: false,
                axisTick: {
                    show: false,
                },
            },
            grid: {
                left: 10,
                right: 50,
                bottom: 10,
                top: 100,
                containLabel: true,
            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                padding: [5, 10],
            },
            yAxis: {
                axisTick: {
                    show: false,
                },
            },
            series:series
        });
    }

    initChart() {
        if (!this.el) return;
        this.setState({ chart: echarts.init(this.el) }, () => {
            this.setOptions(this.props.chartData);
        });
    }

    render() {
        const { className, height, width,styles } = this.props;
        return (
            <div
                id='main'
                className={className}
                ref={(el) => (this.el = el)}
                style={{
                    ...styles,
                    height,
                    width,
                }}
            />
        );
    }
}

export default LineChart
