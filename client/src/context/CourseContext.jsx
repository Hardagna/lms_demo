import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../main';

const CourseContext = createContext();

export const CourseContextProvider = ({ children }) => {
    
    const [courses, setCourses] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [course, setCourse] = useState([]);

    async function fetchCourses() {
        
        try {

            const { data } = await axios.get(`${server}/api/courses/course/all`);
            setCourses(data.courses);
        } catch (error) {
            console.error(error);
            // setError(error);
        }

    }

    async function fetchCourse( id ) {
        
        try {

            const { data } = await axios.get(`${server}/api/courses/course/${id}`);
            setCourse(data.course);
        } catch (error) {
            console.error(error);
            // setError(error);
        }

    }

    // async function fetchMyCourse() {
        
    //     try {

    //         const { data } = await axios.get(`${server}/api/courses/course/my`);
    //         setCourses(data.courses);
    //     } catch (error) {
    //         console.error(error);
    //         // setError(error);
    //     }

    useEffect(() => {
        fetchCourses();
    }, []);

  return (
    <CourseContext.Provider value={{ courses, fetchCourses, fetchCourse }}>
      {children}
    </CourseContext.Provider>
  )
};

export const CourseData = () => useContext(CourseContext);