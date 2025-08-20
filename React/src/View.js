import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, Link} from 'react-router-dom'
import './App.css'

function View() {
    const {id} = useParams()
    const [topic, setTopic] = useState(null) // Initialize as null to check loading state
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTopic()
    }, [id])

    const fetchTopic = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/topics/' + id)
            console.log(result.data.topic)
            setTopic(result.data.topic)
        } catch(err) {
            console.log('Topic not found! ', err)
        } finally {
            setLoading(false)
        }
    }

    if(loading) return (
        <>
        <br />
        <h2><center>Loading content...</center></h2>
        </>
    )

    if(!topic) return (
        <>
        <br />
        <h2><center>Topic not found!</center></h2>
        </>
    )

    return (
        <>
        <div className='container'>
            <br /><h1>Topic Details</h1><hr />
            <h3>{topic.title}</h3>
            {topic.image ? (
                <img src={`http://localhost:8000/storage/${topic.image}`} width='75%' height='75%' alt='Topic' />
            ) : (
                <p>The image link may be broken or invalid.</p>
            )}
            <br /><br />
            {/* View description with seperated paragraphs based on input */}
            {topic.description ? topic.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            )) : ''}
        </div>
        <div className='buttons'>
            <Link to={`/`} className='btn btn-primary'>Back to Home</Link>
        </div><br />
        </>
    )
}

export default View