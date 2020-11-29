import {Selector} from '../components/selector/selector3'
import { Select, MenuItem, Modal, Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link'

export default function Home(props) {
 const [state,setState] = useState(new Date(props.json[0]['1'].startTimeslot).toTimeString())

  const [modalState,setModalState] = useState(false)

  const handleChange = (event) => {
    setState(event.target.value)
  }
  const handleClick = () => {
    setModalState(true)
  }

  const body = (
    <div className="h-auto w-1/2 bg-white absolute top-2/4 left-2/4 transform -translate-x-2/4 translate-y-2/4" >
      <h2 className="text-3xl text-center font-bold" id="simple-modal-title">Congratulations!</h2>
      <p className="text-center" id="simple-modal-description">
          You have selected an available time.
      </p>
    </div>
  );

  return (
    <div className="flex justify-center h-screen  content-evenly">
      <div className="w-1/2 flex flex-col justify-between items-center">
        <h1 className="text-4xl text-black-400 p-4 font-bold text-center font-serif py-12">
          Photographer selection
        </h1>
        <Select
          className="my-36"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state}
          onChange={handleChange}
        >
          {props.json.map((item,index)=> (
            <MenuItem value={new Date(item[index+1].startTimeslot).toTimeString()}>{item[index + 1].name + ' ' + new Date(item[index +1].startTimeslot).toTimeString()}</MenuItem>
          ))}
        </Select>
        <Button variant="outlined" color="primary" onClick={handleClick} className="w-1/2 my-2">
            Select
        </Button>
        <Modal
            open={modalState}
            onClose={() => setModalState(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
        </Modal>
        <Link  href='/selectorPage' passHref>
          <Button variant="outlined" color="black" className="w-3/4">
          Calender view (experimental)
          </Button>  
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/?date=2020-11-25&bookingId=3`)
  const json = await res.json()
  return  { props: { json } }
}