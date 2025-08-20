import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link} from 'react-router-dom'
import './App.css'

function Edit() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [message, setMessage] = useState('')
    const [inputs, setInputs] = useState([])
    const [image, setImage] = useState('')

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    const uploadTopic = async () => {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('title', inputs.title)
        formData.append('description', inputs.description)
        formData.append('image', image)
        const response = await axios.post('http://localhost:8000/api/topicsupdate/' + id, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
        setMessage(response.data.message)
        console.log(response)
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadTopic()
    }

    useEffect(() => {
        getTopic()
    }, [])

    function getTopic() {
        axios.get('http://localhost:8000/api/topics/' + id).then(function (response) {
            console.log(response)
            setInputs(response.data.topic)
        })
    }

    return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-4'>
                        <h1 className='mb-4'>Edit Topic</h1><hr />
                        <p className='text-success'><b>{message}</b></p>

                        <form onSubmit={handleSubmit}>
                            <div className='mb-4 row'>
                                <label className='col-sm-2'>Title</label>
                                <div className='col-sm-10'>
                                    <input type='text' value={inputs.title} className='form-control' id='title' name='title' onChange={handleChange} />
                                </div>
                            </div>

                            <div className='mb-4 row'>
                                <label className='col-sm-2'>Description</label>
                                <div className='col-sm-10'>
                                    <textarea value={inputs.description} className='form-control' id='description' name='description' onChange={handleChange} />
                                </div>
                            </div>

                            <div className='mb-2 row'>
                                <label className='col-sm-2'>Image</label>
                                <div className='col-sm-10'>
                                    <img src={`http://localhost:8000/storage/${inputs.image}`} height='50%' width='50%' />
                                    <input type='file' className='form-control' id='image' name='image' onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                            </div>

                            <div className='mt-3 row'>
                                <div className='buttons-edit'>
                                    <Link to={`/`} className='btn btn-primary'>Back to Home</Link>
                                    <button type='submit' className='btn btn-primary'>Submit Changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Edit