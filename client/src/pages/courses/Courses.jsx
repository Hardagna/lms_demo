import React from 'react'
import './courses.css'
import { CourseData } from '../../context/CourseContext'

const Courses = () => {

  const { courses } = CourseData();
  console.log(courses);
  
  return (
    <div>Courses</div>
  )
}

export default Courses;