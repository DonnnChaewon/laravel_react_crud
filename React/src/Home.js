import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import List from './List'
import './App.css'

function Home() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [topics, setTopics] = useState([])
    const fileInputRef = useRef(null)

    const getTopic = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/topics')
            setTopics(response.data.topics) // Update state
        } catch(error) {
            console.log(error)
        }
    }

    // Call getTopic on mount
    useEffect(() => {
        getTopic()
    }, [])

    const uploadTopic = async () => {
        console.log(image)
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', image)

        try {
            const response = await axios.post('http://localhost:8000/api/topics', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            console.log(response)
            setMessage(response.data.message)
            getTopic() // Refresh list after adding topic

            setTitle('')
            setDescription('')
            setImage('')

            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch(error) {
            console.error(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadTopic()

        setTitle('')
        setDescription('')
        setImage(null)

        if(fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <React.Fragment><br />
            <div className='container'>
                <div className='row'>
                    <h5 className='mb-4'><center>Add Topic</center></h5>
                    <p className='text-warning'>{message}</p>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4 row'>
                            <label className='col-sm-2'>Title</label>
                            <div className='col-sm-10'>
                                <input type='text' className='form-control' id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                        </div>

                        <div className='mb-4 row'>
                            <label className='col-sm-2'>Description</label>
                            <div className='col-sm-10'>
                                <textarea className='form-control' id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>

                        <div className='mb-4 row'>
                            <label className='col-sm-2'>Image</label>
                            <div className='col-sm-10'>
                                <input type='file' className='form-control' id='image' name='image' ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>

                        <div className='mb-4 row'>
                            <label className='col-md-2'></label>
                            <div className='col-sm-10'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <hr /><br />
            <div className='mb-4 row'>
                <List topics={topics} getTopic={getTopic} /> {/* Pass topics and getTopic */}
            </div>
        </React.Fragment>
    )
}

export default Home