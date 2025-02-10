import { NavLink } from "react-router-dom";

export default function Aside() {


  return (
    <>
      <aside className="flex flex-col mt-20 gap-8 px-6 h-full justify-start items-center bg-transparent fixed top-0 left-0">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `fa-solid fa-house text-white text-2xl size-12 rounded-lg hover:bg-white hover:bg-opacity-5 text-center content-center 
            ${isActive ? "bg-white bg-opacity-5" : ""}`
          }
        ></NavLink>
        <NavLink
          to={"/explore"}
          className={({ isActive }) =>
            `fa-solid fa-compass text-white text-2xl size-12 rounded-lg hover:bg-white hover:bg-opacity-5 text-center content-center 
            ${isActive ? "bg-white bg-opacity-5" : ""}`
          }
          title="Explore"
        ></NavLink>
        <NavLink
          to={"/playlist"}
          className={({ isActive }) =>
            `fa-solid fa-layer-group text-white text-2xl size-12 rounded-lg hover:bg-white hover:bg-opacity-5 text-center content-center 
            ${isActive ? "bg-white bg-opacity-5" : ""}`
          }
          title="Playlists"
        ></NavLink>
        <hr className="w-full" />
        <NavLink
          to={"/signup"}
          title="Sign in"
          className={({ isActive }) =>
            `fa-regular fa-circle-user text-transparent text-white text-2xl size-12 rounded-lg hover:bg-white hover:bg-opacity-5 text-center content-center 
            ${isActive ? "bg-white bg-opacity-5" : ""}`
          }
        ></NavLink>
      </aside>
    </>
  );
}
