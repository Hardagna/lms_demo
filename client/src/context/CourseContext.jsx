// import { createContext, useContext, useState } from 'react';
// import axios from 'axios';

// const CourseContext = createContext();

// export default CourseContextProvideer = ({ children }) => {
    
//     const [courses, setCourses] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     // const [error, setError] = useState(null);

//     async function fetchCourses() {
        
//         try {

//             const { data } = await axios.get('http://localhost:3000/api/courses/course/all');
//             setCourses(data);
//         } catch (error) {
//             console.error(error);
//             // setError(error);
//         }

//     }

//   return (
//     <CourseContext.Provider value={{}}>
//       {children}
//     </CourseContext.Provider>
//   )
// }

// export const CourseData = () => {
//   const { courses } = useContext(CourseContext);
//   return courses;
// }