import React, { useEffect } from 'react'
import './courseDetails.css'
import { useParams } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext';

const CourseDetails = () => {
    
    const params = useParams();
    // console.log(params.id);

    const { fetchCourse } = CourseData();
    
    useEffect(() => {
        fetchCourse(params.id);
    }
    ,[]);

  return (
    <div>CourseDetails</div>
  )
}

export default CourseDetails