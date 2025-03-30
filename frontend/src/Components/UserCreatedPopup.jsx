import { useState } from "react"


export const UserCreatedPopup = ({ message }) => { 

  const [isVisible, setIsVisible] = useState(true)

  return (
    (isVisible && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded shadow-lg relative">
        <i className="fa-solid fa-xmark absolute top-3 right-3" onClick={() => setIsVisible(false)}></i>
        <h2 className="text-xl text-pretty font-bold my-4">{message}</h2>
      </div>
    </div>
   ))
  )

}
 