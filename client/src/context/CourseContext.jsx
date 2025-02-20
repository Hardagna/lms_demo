import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../main';

const CourseContext = createContext();

export const CourseContextProvideer = ({ children }) => {
    
    const [courses, setCourses] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    async function fetchCourses() {
        
        try {

            const { data } = await axios.get(`${server}/api/courses/course/all`);
            setCourses(data.courses);
        } catch (error) {
            console.error(error);
            // setError(error);
        }

    }

    useEffect(() => {
        fetchCourses();
    }, []);

  return (
    <CourseContext.Provider value={{ courses, fetchCourses }}>
      {children}
    </CourseContext.Provider>
  )
};

export const CourseData = () => useContext(CourseContext);