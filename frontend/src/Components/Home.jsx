import { useLoginContext } from "../Contexts/LoginContext";


function Home() {

  const { users, isLoggedOut } = useLoginContext();

  return (
    <>
      <div>
        <button onClick={() => { isLoggedOut();  console.log(users)}}>Logout</button>
      </div>  
    </>
  )
}

export default Home;