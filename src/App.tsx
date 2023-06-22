import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [bucketList, setBucketList] = useState(localStorage.getItem(`bucketList`) || `[]`)
  const [thisItem, setThisItem] = useState(localStorage.getItem(`thisItem`) || ``)
  const [key, setKey] = useState(localStorage.getItem(`key`) || ``)
  const [loading, setLoading] = useState(false)
  const jbucketList = JSON.parse(bucketList)
  function getNewBucketList() {
    setLoading(loading => !loading)
    axios.request({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/bucketlist',
      headers: { 'X-Api-Key': key},
    })
    .then(res => res.data)
    .then(data => {
      console.log(data)
      localStorage.setItem(`thisitem`, data.item)
      setThisItem(data.item)
    })
    .finally(()=>setLoading(loading => !loading))
  }
  function addToBucketList() {
    console.log(thisItem)
    let temp = JSON.parse(bucketList || `[]`)
    
    localStorage.setItem(`bucketList`,JSON.stringify([...temp,thisItem]))
    setBucketList(localStorage.getItem(`bucketList`)!)
    getNewBucketList()
  }
  function clearBucketList() {
    localStorage.setItem(`bucketList`, `[]`)
    setBucketList(localStorage.getItem(`bucketList`)!)
  }

  return (
    <>
      <h1>BucketList</h1>
      <h3>{!loading ? thisItem : `LOADING`}</h3>
      <div className="">
        <input style={{width: `300px`}} type="password" value={key} onChange={(e) => {
          e.preventDefault()
          localStorage.setItem(`key`, e.currentTarget.value)
          setKey(e.currentTarget.value)
        }} />
      </div>
      {!loading  && 
      <div className="">
        <button onClick={addToBucketList}>+</button>
        <button onClick={getNewBucketList}>Random New Item</button>
        <button onClick={clearBucketList}>Clear Bucket</button>
      </div>
      }
      <ol>
        {jbucketList && jbucketList.map((item: string,index: number) => {
          return <li key={index}>{item}</li>
        })
        }
      </ol>
    </>
  )
}

export default App
