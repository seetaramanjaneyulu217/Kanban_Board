import { Dropdown } from "antd";
import { CiSearch } from "react-icons/ci";
import { TbArrowsSort } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { HiOutlineViewBoards } from "react-icons/hi";
import { IoIosList } from "react-icons/io";
import { MdOutlineSevereCold } from "react-icons/md";
import sortItems from "../constants/sortItems";
import assignedItems from "../constants/assignedItems";
import statusItems from "../constants/statusItems";
import severityItems from "../constants/severityItems";
import TasksColumn from "../components/TasksColumn";

const KanbanBoard = () => {
  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="text-xl md:text-3xl font-semibold">Vulnerabilities</h1>
      </div>

      {/* For all the options */}
      <div className="flex justify-between">
        <div className="flex gap-x-5">
          {/* For Search box */}
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                className="pl-10 pr-4 py-1 border border-gray-300 rounded-xl outline-none"
                placeholder="Search by issue name..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <CiSearch />
              </div>
            </div>
          </div>

          {/* For all other options */}
          <div className="flex gap-x-5">
            <Dropdown menu={{ items: sortItems }}>
              <div
                className="flex items-center gap-x-2 px-4 py-1 border border-gray-300 rounded-xl outline-none cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <TbArrowsSort className="font-semibold" />
                <p className="font-semibold">Sort By</p>
              </div>
            </Dropdown>

            <Dropdown menu={{ items: assignedItems }}>
              <div
                className="flex items-center gap-x-2 px-4 py-1 border border-dashed border-gray-300 rounded-xl outline-none cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <MdOutlineAssignment className="font-semibold" />
                <p className="font-semibold">Assigned To</p>
              </div>
            </Dropdown>

            <Dropdown menu={{ items: severityItems }}>
              <div
                className="flex items-center gap-x-2 px-4 py-1 border border-dashed border-gray-300 rounded-xl outline-none cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <MdOutlineSevereCold className="font-semibold" />
                <p className="font-semibold">Severity</p>
              </div>
            </Dropdown>

            <Dropdown menu={{ items: statusItems }}>
              <div
                className="flex items-center gap-x-2 px-4 py-1 border border-dashed border-gray-300 rounded-xl outline-none cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <HiOutlineStatusOnline className="font-semibold" />
                <p className="font-semibold">Status</p>
              </div>
            </Dropdown>
          </div>
        </div>

        {/* For board and list items */}
        <div className="flex items-center">
          <div className="border border-gray-300 rounded-l-lg px-4 py-1 flex items-center gap-x-1">
            <HiOutlineViewBoards />
            <p>Board</p>
          </div>

          <div className="border border-gray-300 rounded-r-lg px-4 py-1 flex items-center gap-x-1">
            <IoIosList />
            <p>List</p>
          </div>
        </div>
      </div>

      <div>
        <TasksColumn status="Draft" statusColor="#b3b1b1" tasks={[{ name: "task", severity: 'Medium', dateAndTime: new Date() }]} />
      </div>
    </div>
  );
};

export default KanbanBoard;
