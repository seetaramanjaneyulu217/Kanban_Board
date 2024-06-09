import { Dropdown } from "antd";
import { CiSearch } from "react-icons/ci";
import { TbArrowsSort } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { HiOutlineViewBoards } from "react-icons/hi";
import { IoIosList } from "react-icons/io";
import { MdOutlineSevereCold } from "react-icons/md";
import sortItems from "../constants/sortItems";
import AssignedItems from "../constants/assignedItems";
import statusItems from "../constants/statusItems";
import severityItems from "../constants/severityItems";
import TasksColumn from "../components/TasksColumn";
import { useDispatch, useSelector } from "react-redux";
import { makeUserLogIn } from "../store/Slices/usersSlice";
import { useNavigate } from "react-router-dom";
import { populateAssigneeOption } from "../store/Slices/operationsSlice";

const KanbanBoard = () => {

  let tasks = useSelector((state: any) => state.tasks.tasks)
  const userLoggedIn = useSelector((state: any) => state.users.userLoggedIn)
  const assigneeName = useSelector((state: any) => state.operations.assigneeName)

  console.log(tasks)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let draftTasks: Task[] = []
  let unsolvedTasks: Task[] = []
  let underReviewTasks: Task[] = []
  let solvedTasks: Task[] = []

  if(assigneeName) {
    tasks = tasks.filter((task: Task) => task.assignee === assigneeName)
  }

  console.log(tasks)

  tasks.forEach((task: Task) => {
    if(task.status === 'Draft')
      draftTasks.push(task)
    else if(task.status === 'Unsolved')
      unsolvedTasks.push(task)
    else if(task.status === 'Under Review')
      underReviewTasks.push(task)
    else if(task.status === 'Solved')
      solvedTasks.push(task)
  })

  if(!userLoggedIn) {
    window.location.href = '/'
    return
  }

  return (
    <div className="p-10">
      <div className=" flex justify-between mb-10">
        <h1 className="text-xl md:text-3xl font-semibold">Vulnerabilities</h1>
        <button onClick={() => { dispatch(makeUserLogIn({ loggedIn: false, loggedInUsername: '' }))
                                 dispatch(populateAssigneeOption({ assigneeName: '' }))
                                 navigate('/')} } className="border border-red-400 bg-red-400 px-4 py-1 text-white rounded-lg">Logout</button>
      </div>

      {/* For all the options */}
      <div className="flex justify-between mb-10">
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

            <Dropdown menu={{ items: AssignedItems() }}>
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

      <div className="flex justify-between">
        <div className="flex-grow">
          <TasksColumn
            status="Draft"
            statusColor="#9fa19f"
            tasks={draftTasks}
          />
        </div>
        <div className="flex-grow">
          <TasksColumn
            status="Unsolved"
            statusColor="#4287f5"
            tasks={unsolvedTasks}
          />
        </div>
        <div className="flex-grow">
          <TasksColumn
            status="Under Review"
            statusColor="#f5bc11"
            tasks={underReviewTasks}
          />
        </div>
        <div className="flex-grow">
          <TasksColumn
            status="Solved"
            statusColor="#1dbf0b"
            tasks={solvedTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
