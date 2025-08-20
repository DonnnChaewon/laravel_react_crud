import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './App.css'

function List({topics, getTopic}) {  // Receive props from Home.js

    const deleteTopic = async (id) => {
        if(window.confirm('Confirm to delete topic?')) {
            try {
                await axios.delete(`http://localhost:8000/api/topicsdelete/` + id)
                alert('Success to delete topic!')
                getTopic() // Refresh the list after deletion
            } catch(error) {
                console.error('Error deleting topic: ', error)
                alert('Fail to delete topic!')
            }
        }
    }

    return (
        <React.Fragment>
            <div className='container container-overflow'>
                <div className='row'>
                    <div className='col-12'>
                        <h5 className='mb-4'><center>Topics List</center></h5>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th scope='col'><center>No.</center></th>
                                    <th scope='col'><center>Title</center></th>
                                    <th scope='col'><center>Description</center></th>
                                    <th scope='col'><center>Image</center></th>
                                    <th scope='col'><center>Actions</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics.map((data, i) => (
                                    <tr key={i}>
                                        <td><center>{i+1}</center></td>
                                        <td><center>{data.title}</center></td>
                                        <td><center>
                                            {/* View description with seperated paragraphs based on input */}
                                            {data.description ? data.description.split('\n').map((paragraph, index) => (
                                                <p key={index}>{paragraph}</p>
                                            )) : ''}
                                        </center></td>
                                        <td><center><img src={`http://localhost:8000/storage/${data.image}`} height='50%' width='50%' /></center></td>
                                        <td><div className='buttons'>
                                            <Link to={`/view/${data.id}/`} className='btn btn-success'>View</Link>
                                            <Link to={`/edit/${data.id}/`} className='btn btn-warning'>Edit</Link>
                                            <button onClick={() => deleteTopic(data.id)} className='btn btn-danger'>Delete</button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default List