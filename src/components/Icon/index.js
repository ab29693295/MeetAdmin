/* 用于菜单的自定义图标 */
import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_3191065_d94ayw9kenu.js",
});

export default class Icon extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <IconFont type={this.props.type} />;
  }
}
