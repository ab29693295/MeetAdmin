import React, { Component } from "react";
import * as echarts from "echarts";
import { debounce } from "@/utils";

class BarChart extends Component {
    static defaultProps = {
        width: "100%",
        height: "300px",
        styles: {},
        className: "",
    };
    state = {
        chart: null,
    };

    componentDidMount() {
        this.setState({ chart: echarts.init(this.el) }, () => {
            this.state.chart.showLoading();
        });
        window.addEventListener("resize", () => this.resize());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarCollapsed !== this.props.sidebarCollapsed) {
            this.resize();
        }
        if (nextProps.chartData !== this.props.chartData) {
            debounce(this.initChart.bind(this), 300)();
        }
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

    setOptions({ xAxis,series,title,legend}) {
        const animationDuration = 3000;
        this.state.chart.setOption({
            title,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend,
            grid: {
                left: 10,
                right: 50,
                bottom: 10,
                top: 100,
                containLabel: true,
            },
            xAxis,
            yAxis: [

                {

                    type:'value',
                    minInterval: 1,
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series
        });
    }

    initChart() {
        if (!this.el) return;
        this.state.chart.hideLoading();
        this.setOptions(this.props.chartData);
    }

    render() {
        const { className, height, width, styles } = this.props;
        return (
            <div
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

export default BarChart
