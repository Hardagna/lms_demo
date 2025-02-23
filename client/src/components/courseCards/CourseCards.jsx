import React from 'react'
import './courseCards.css'
import { server } from '../../main'
import { UserData } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

// const CourseCards = ({ course }) => {

//   const navigate = useNavigate();
//   const { user, isAuth } = UserData();
//   return (
//     <div className="course-cards">
//         <img src={`${server}/${course.image}`} alt="" className='course-img' />
//         <h3>{course.title}</h3>
//         <p>
//             Details: {course.description}
//         </p>
//         <p>
//             Price: {course.price}
//         </p>
//         <p>
//             Duration: {course.duration} weeks
//         </p>
//         <p>
//             Instructor: {course.instructor}
//         </p>
//         <p>
//             Category: {course.category}
//         </p>

//         {isAuth ? (
//         <>
//           {user && user.role !== "admin" ? (
//             <>
//               {user.subscription.includes(course._id) ? (
//                 <button
//                   onClick={() => navigate(`/courses/course/enroll/${course._id}`)}
//                   className="commonBtn"
//                 >
//                   Enroll
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate(`/courses/course/${course._id}`)}
//                   className="commonBtn"
//                 >
//                   Get Started
//                 </button>
//               )}
//             </>
//           ) : (
//             <button
//               onClick={() => navigate(`/courses/course/enroll/${course._id}`)}
//               className="commonBtn"
//             >
//               Enroll
//             </button>
//           )}
//         </>
//       ) : (
//         <button onClick={() => navigate("/login")} className="commonBtn">
//           Get Started
//         </button>
//       )}

//       <br />

//       {user && user.role === "admin" && (
//         <button
//           onClick={() => deleteHandler(course._id)}
//           className="commonBtn"
//           style={{ background: 'red' }}
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   )
// }

const CourseCards = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = UserData();

  // Debugging logs
  console.log("User Data:", user);
  console.log("User Subscription:", user?.subscription); // Avoids errors if undefined
  console.log("Course Data:", course);

  return (
    <div className="course-cards">
      <img src={`${server}/${course.image}`} alt="" className="course-img" />
      <h3>{course.title}</h3>
      <p>Details: {course.description}</p>
      <p>Price: {course.price}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Instructor: {course.instructor}</p>
      <p>Category: {course.category}</p>

      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user?.subscription?.includes(course._id) ? ( // Safe check
                <button
                  onClick={() => navigate(`/courses/course/enrolled/${course._id}`)}
                  className="commonBtn"
                >
                  Enroll
                </button>
              ) : (
                <button
                  onClick={() => navigate(`/courses/course/${course._id}`)}
                  className="commonBtn"
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate(`/courses/course/enroll/${course._id}`)}
              className="commonBtn"
            >
              Enroll
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="commonBtn">
          Get Started
        </button>
      )}

      <br />

      {user && user.role === "admin" && (
        <button
          onClick={() => deleteHandler(course._id)}
          className="commonBtn"
          style={{ background: "red" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};


export default CourseCards