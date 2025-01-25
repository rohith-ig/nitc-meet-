import React from 'react'

const Chat = (flag,text) => {
  return (
    <div className='w-full m-2 p-2 border-2 rounded'><span className={'font-bold'+flag?"text-red-700":"text-[#9ca3af]"}>{flag?"Stranger: ":"You :"}</span><span className='font-semibold'>{text}</span></div>
  )
}

export default Chat