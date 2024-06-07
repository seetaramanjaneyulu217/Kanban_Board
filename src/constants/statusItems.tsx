import type { MenuProps } from "antd";

const statusItems: MenuProps["items"] = [
  {
    key: "1",
    label: <button>Draft</button>,
  },
  {
    key: "2",
    label: <button>Unsolved</button>,
  },
  {
    key: "3",
    label: <button>Under Review</button>,
  },
  {
    key: "4",
    label: <button>Solved</button>,
  },
];


export default statusItems