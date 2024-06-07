import type { MenuProps } from "antd";

const severityItems: MenuProps["items"] = [
  {
    key: "1",
    label: <button>Low</button>,
  },
  {
    key: "2",
    label: <button>Medium</button>,
  },
  {
    key: "3",
    label: <button>High</button>,
  },
  {
    key: "4",
    label: <button>Critical</button>,
  },
];


export default severityItems