import React from 'react'
import Layout from '../Utils/Layout'
import './adminCourses.css'
import { useNavigate } from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import CourseCards from '../../components/courseCards/CourseCards'

const categories = ['Web Development', 'Mobile Development', 'Game Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence', 'Cyber Security', 'Ethical Hacking', 'UI/UX Design', 'Digital Marketing', 'SEO', 'Other'];

const AdminCourses = ({ user }) => {

    const navigate = useNavigate();

  if (user && user.role !== 'admin') {
    navigate('/');
  }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [instructor, setInstructor] = useState('');
    const [imgPreview, setImgPreview] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

    const changeImgHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setImage(file);
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(file);
        
    }; 

  const { courses, getCourses} = CourseData();

  return (
    <Layout>
        <div className="admin-courses">
            <div className="left">
                <h1>Courses</h1>
                <div className="dashboard-content">

                    {
                        courses && courses.length > 0 ? courses.map((e) =>  { 
                            return (
                                <CourseCards key={e._id} course={e} />
                            )
                        }) : <p>No courses</p>
                    }
                </div>
            </div>
            <div className="right">
                <div className="add-course">
                    <div className="course-form">
                        <form>
                            <label htmlFor='text'>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                            <label htmlFor='text'>Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

                            <label htmlFor='text'>Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                            <label htmlFor='text'>Instructor</label>
                            <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />

                            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">Select category</option>
                                {
                                    categories.map((e) => {
                                        <option value = {e} key= {e}>{e}</option>
                                    })
                                }
                            </select>

                            <label htmlFor='text'>Duration</label>
                            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                            
                            <input type="file" onChange={changeImgHandler} required />

                            {
                                imgPreview && <img src={imgPreview} alt='' width={300} />
                            }

                            <button type='submit' disabled={btnLoading} className='commonBtn'>
                                {btnLoading ? 'Loading...' : 'Add Course'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminCourses