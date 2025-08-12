import { Link, useNavigate } from "react-router-dom";
import { useContext, Fragment } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, Transition } from "@headlessui/react";

function Navbar({ setSidebarOpen }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white px-6 py-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="text-blue-600 text-2xl"
                >
                    ☰
                </button>
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    Auth App
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <Menu as="div" className="relative">
                        <div>
                            <Menu.Button className="focus:outline-none">
                                <img
                                    src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover border cursor-pointer"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <div className="p-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/profile"
                                                className={`${active ? "bg-blue-100 text-blue-700" : "text-gray-700"
                                                    } block rounded-md px-4 py-2 text-sm`}
                                            >
                                                Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${active ? "bg-red-100 text-red-700" : "text-red-600"
                                                    } block w-full text-left rounded-md px-4 py-2 text-sm`}
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-600 font-medium">
                            Login
                        </Link>
                        <Link to="/signup" className="text-blue-600 font-medium">
                            Signup
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;





