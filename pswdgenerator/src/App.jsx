import { useState ,useCallback,useEffect,useRef} from 'react'



function App() {
  const [lenght,setlenght] = useState(8);
  const [numberallowed,setnumberallowed] = useState(false);
  const [charallowred,setcharallowed] = useState(false);
  const [pswd,setpassword] = useState("")
  const passwordRef = useRef(null)
  const pswdgenerator = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallowed) str+="0123456789"
    if(charallowred) str+="!@#%^&*-_+=[]{}`~"
    for(let i = 1;i<=lenght;i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass);
  },[lenght,numberallowed,charallowred,setpassword]);
  const copyPasswordToClipboard = useCallback(()=>{
      
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(pswd)

  },[pswd])
  useEffect(()=>{pswdgenerator()},[lenght,numberallowed,charallowred,pswdgenerator])
  return (
    <>
    <div className = 'w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-9 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={pswd} className='outline-none w-full py-1 px-3 bg-white' placeholder='password' readOnly ></input>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py=0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} value={lenght} className='cursor-pointer' onChange={(e)=>{setlenght(e.target.value)}} />
          <label>lenght:{lenght}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberallowed} id="numberInput" onChange={()=>{setnumberallowed((prev)=>!prev)}} />
         <label htmlFor='numberInput'>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charallowred} id="charInput" onChange={()=>{setcharallowed((prev)=>!prev)}} />
         <label htmlFor='charInput'>characters</label>
         </div>
      </div>
    </div>
  </>
  )
}

export default App
