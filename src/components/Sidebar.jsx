import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
//   {
//     name: 'Team',
//     icon: UsersIcon,
//     current: false,
//     children: [
//       { name: 'Create Role', href: '/add-role' },
//       { name: 'Add User', href: '/add-user' },
//       { name: 'Permision to User', href: '/permision' },
//     ],
//   },
//   {
//     name: 'Projects',
//     icon: FolderIcon,
//     current: false,
//     children: [
//       { name: 'GraphQL API', href: '#' },
//       { name: 'iOS App', href: '#' },
//       { name: 'Android App', href: '#' },
//       { name: 'New Customer Portal', href: '#' },
//     ],
//   },
//   {
//     name: 'Add Forms',
//     icon: UsersIcon,
//     current: false,
//     children: [
//       { name: 'Add Rice Mill', href: '/add-rice-mill' },
//       { name: 'Add Transporter', href: '/add-transporter' },
//       { name: 'Add Truck', href: '/add-truck' },
//       { name: 'Add Society', href: '/add-society' },
//       { name: 'Add Agrement', href: '/add-agrement' },
//       { name: 'Add Warehouse', href: '/add-warehouse' },
//       { name: 'Add kochia', href: '/add-Kochia' },
//       { name: 'Add Party', href: '/add-party' },
//       { name: 'Add Broker', href: '/add-broker' },
//       { name: 'Add Do', href: '/add-do' },
//     ],
//   },
//   {
//     name: 'Reports',
//     icon: ChartPieIcon,
//     current: false,
//     children: [
//       { name: 'Add Rice Mill Report', href: '/show-rice-mill-data' },
//       { name: 'Human Resources', href: '#' },
//       { name: 'Customer Success', href: '#' },
//       {
//         name: 'Add Form',
//         children: [
//           { name: 'Form 1', href: '#' },
//           { name: 'Form 2', href: '#' },
//           { name: 'Form 3', href: '#' },
//         ],
//       },
//     ],
//   },
//   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
//   { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
//   const navigate = useNavigate()

// const handleLogout = () => {
//   localStorage.removeItem('token')
//   navigate('/login')
// }

//   return (
//     <>
//       <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
//         />
//         <div className="fixed inset-0 flex">
//           <DialogPanel
//             transition
//             className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
//           >
//             <TransitionChild>
//               <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
//                 <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
//                   <span className="sr-only">Close sidebar</span>
//                   <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
//                 </button>
//               </div>
//             </TransitionChild>
//             <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
//               <div className="flex h-16 shrink-0 items-center">
//                 <img
//                   alt="Your Company"
//                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                   className="h-8 w-auto"
//                 />
//               </div>
//               <nav className="flex flex-1 flex-col">
//                 <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                   <li>
//                     <ul role="list" className="-mx-2 space-y-1">
//                       {navigation.map((item) => (
//                         <li key={item.name}>
//                           {!item.children ? (
//                             <Link
//                               to={item.href}
//                               className={classNames(
//                                 item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
//                                 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
//                               )}
//                             >
//                               <item.icon
//                                 aria-hidden="true"
//                                 className={classNames(
//                                   item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
//                                   'h-6 w-6 shrink-0'
//                                 )}
//                               />
//                               {item.name}
//                             </Link>
//                           ) : (
//                             <Disclosure as="div">
//                               {({ open }) => (
//                                 <>
//                                   <DisclosureButton
//                                     className={classNames(
//                                       item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
//                                       'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6'
//                                     )}
//                                   >
//                                     <item.icon
//                                       aria-hidden="true"
//                                       className={classNames(
//                                         item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
//                                         'h-6 w-6 shrink-0'
//                                       )}
//                                     />
//                                     {item.name}
//                                     <ChevronRightIcon
//                                       aria-hidden="true"
//                                       className={classNames(
//                                         open ? 'rotate-90 text-gray-500' : 'text-gray-400',
//                                         'ml-auto h-5 w-5 shrink-0 transition-transform'
//                                       )}
//                                     />
//                                   </DisclosureButton>
//                                   <DisclosurePanel as="ul" className="mt-1 space-y-1 px-2">
//                                     {item.children.map((subItem) => (
//                                       <li key={subItem.name}>
//                                         <Link
//                                           to={subItem.href}
//                                           className={classNames(
//                                             subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
//                                             'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700'
//                                           )}
//                                         >
//                                           {subItem.name}
//                                         </Link>
//                                       </li>
//                                     ))}
//                                   </DisclosurePanel>
//                                 </>
//                               )}
//                             </Disclosure>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   </li>
// <li className="-mx-6 mt-auto">
//   <button
//     onClick={handleLogout}
//     className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
//   >
//     Logout
//   </button>
// </li>
//                 </ul>
//               </nav>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       {/* Static sidebar for desktop */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//         <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
//           <div className="flex h-16 shrink-0 items-center">
//             <img
//               alt="Your Company"
//               src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//               className="h-8 w-auto"
//             />
//           </div>
//           <nav className="flex flex-1 flex-col">
//             <ul role="list" className="flex flex-1 flex-col gap-y-7">
//               {navigation.map((item) => (
//                 <li key={item.name}>
//                   {!item.children ? (
//                     <Link
//                       to={item.href}
//                       className={classNames(
//                         item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
//                         'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
//                       )}
//                     >
//                       <item.icon
//                         aria-hidden="true"
//                         className={classNames(
//                           item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
//                           'h-6 w-6 shrink-0'
//                         )}
//                       />
//                       {item.name}
//                     </Link>
//                   ) : (
//                     <Disclosure as="div">
//                       {({ open }) => (
//                         <>
//                           <DisclosureButton
//                             className={classNames(
//                               item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
//                               'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6'
//                             )}
//                           >
//                             <item.icon
//                               aria-hidden="true"
//                               className={classNames(
//                                 item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
//                                 'h-6 w-6 shrink-0'
//                               )}
//                             />
//                             {item.name}
//                             <ChevronRightIcon
//                               aria-hidden="true"
//                               className={classNames(
//                                 open ? 'rotate-90 text-gray-500' : 'text-gray-400',
//                                 'ml-auto h-5 w-5 shrink-0 transition-transform'
//                               )}
//                             />
//                           </DisclosureButton>
//                           <DisclosurePanel as="ul" className="mt-1 space-y-1 px-2">
//                             {item.children.map((subItem) => (
//                               <li key={subItem.name}>
//                                 <Link
//                                   to={subItem.href}
//                                   className={classNames(
//                                     subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
//                                     'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700'
//                                   )}
//                                 >
//                                   {subItem.name}
//                                 </Link>
//                               </li>
//                             ))}
//                           </DisclosurePanel>
//                         </>
//                       )}
//                     </Disclosure>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }

("use client");

import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Team",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Create Role", href: "/add-role" },
      { name: "Add User", href: "/add-user" },
      { name: "Permision to User", href: "/permision" },
    ],
  },
  {
    name: "Add Forms",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "Add Rice Mill", href: "/add-rice-mill" },
      { name: "Add Transporter", href: "/add-transporter" },
      { name: "Add Truck", href: "/add-truck" },
      { name: "Add Society", href: "/add-society" },
      { name: "Add Agrement", href: "/add-agrement" },
      { name: "Add Warehouse", href: "/add-warehouse" },
      { name: "Add kochia", href: "/add-Kochia" },
      { name: "Add Party", href: "/add-party" },
      { name: "Add Broker", href: "/add-broker" },
      { name: "Add Do", href: "/add-do" },
    ],
  },
  {
    name: "Forms",
  icon: UsersIcon,
    current: false,
    children: [
      { name: "Cash Detail", href: "/cashdetail" },
      { name: "Rice Purchased", href: "/ricepurchased" },
      { name: "Dalali Dhan", href: "/dalalidhan" },
      { name: "Rice Deposit", href: "/ricedeposit" },
      { name: "Frk", href: "/frk" },
      { name: "Suda Patrak", href: "/sudapatrak" },
      { name: "Do Panding", href: "/dopanding" },
      { name: "Dhan Transporting", href: "/dhantransporting" },
    ],
  },
  {
    name: "Awak Form",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Dhan Awak", href: "/dhanawak" },
      { name: "Other Awak", href: "/otherawak" },
    ],
  },
  {
    name: "Jawak Form",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Other Jawak", href: "/other-jawak" },
      { name: "Broken Jawak", href: "/broken-jawak" },
      { name: "Husk Jawak", href: "/husk-jawak" },
      { name: "Nakkhi Jawak", href: "/nakkhi-jawak" },
      { name: "Bran Jawak", href: "/bran-jawak" },
      { name: "Bhusi", href: "/bhusi" },
    ],
  },
  {
    name: "Error Forms",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Paddy Sales", href: "/paddysales" },
      { name: "Lot Number Master", href: "/lotnumbermaster" },
      { name: "Dhan Rice Sociesties Rate", href: "/dhanricesocietiesrate" },
      { name: "Transporter Master", href: "/transportermaster" },
      { name: "Mohan Food Paddy", href: "/mohanfoodpaddy" },
    ],
  },
  {
    name: "Reports",
    icon: ChartPieIcon,
    current: false,
    children: [
      { name: "Rice Mill Report", href: "/show-rice-mill-data" },
      { name: "Transporter Report", href: "/show-transporter" },
      { name: "Truck Report", href: "/show-truck" },
      { name: "Society Report", href: "/show-society" },
      { name: "Agreements Report", href: "/show-agreements" },
      { name: "Warehouse Report", href: "/show-warehouse" },
      { name: "Kochia Report", href: "/show-kochia" },
      { name: "Party Report", href: "/show-party" },
      { name: "Broker Report", href: "/show-broker" },
      { name: "Do Report", href: "/show-do" },
      { name: "Dhan Awak Report", href: "/show-dhan-awak" },
      { name: "Other Awak Report", href: "/show-other-awak" },
      { name: "Other Jawak Report", href: "/show-other-jawak" },
      { name: "Broken Jawak Report", href: "/show-broken-jawak" },
      { name: "Husk Jawak Report", href: "/show-husk-jawak" },
      { name: "Nakkhi Jawak Report", href: "/show-nakkhi-jawak" },
      { name: "Bran Jawak Report", href: "/show-bran-jawak" },
      { name: "Bhushi Jawak Report", href: "/show-bhushi-jawak" },

    ],
  },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-indigo-600"
                                  : "text-gray-400 group-hover:text-indigo-600",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        ) : (
                          <Disclosure as="div">
                            {({ open }) => (
                              <>
                                <DisclosureButton
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6"
                                  )}
                                >
                                  <item.icon
                                    aria-hidden="true"
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                  />
                                  {item.name}
                                  <ChevronRightIcon
                                    aria-hidden="true"
                                    className={classNames(
                                      open
                                        ? "rotate-90 text-gray-500"
                                        : "text-gray-400",
                                      "ml-auto h-5 w-5 shrink-0 transition-transform"
                                    )}
                                  />
                                </DisclosureButton>
                                <DisclosurePanel
                                  as="ul"
                                  className="mt-1 space-y-1 px-2"
                                >
                                  {item.children.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        to={subItem.href}
                                        className={classNames(
                                          subItem.current
                                            ? "bg-gray-50"
                                            : "hover:bg-gray-50",
                                          "block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700"
                                        )}
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </DisclosurePanel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </li>
                    ))}
                    <li>
                      {/* <button
                        onClick={handleLogout}
                        // className="flex items-center  gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                        className="group relative overflow-hidden transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground"
                      >
                        Logout
                      </button> */}
                      <button
                        onClick={handleLogout}
                        className="group relative flex items-center justify-center gap-x-4 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:ring-4 ring-offset-2"
                        aria-label="Logout"
                      >
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                {/* Render the navigation items */}
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "h-6 w-6 shrink-0"
                                )}
                              />
                              {item.name}
                              <ChevronRightIcon
                                aria-hidden="true"
                                className={classNames(
                                  open
                                    ? "rotate-90 text-gray-500"
                                    : "text-gray-400",
                                  "ml-auto h-5 w-5 shrink-0 transition-transform"
                                )}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel
                              as="ul"
                              className="mt-1 space-y-1 px-2"
                            >
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    to={subItem.href}
                                    className={classNames(
                                      subItem.current
                                        ? "bg-gray-50"
                                        : "hover:bg-gray-50",
                                      "block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-gray-700"
                                    )}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )}
                  </li>
                ))}
                {/* Logout button after navigation items */}
                <li>
                  {/* <button
                    onClick={handleLogout}
                    // className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    className="group relative overflow-hidden transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground"
                  >
                    Logout
                  </button> */}
                  <button
                    onClick={handleLogout}
                    className="group relative flex items-center justify-center gap-x-4 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md transition-all duration-300 ease-out transform hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 hover:ring-4 ring-offset-2"
                    aria-label="Logout"
                  >
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full bg-gray-50"
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
