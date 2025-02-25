import React, { useEffect, useState } from 'react';
import './lecture.css';
import axios from 'axios';
import { server } from '../../main';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { addProgress } from '../../../../server/controllers/course';
import { TiTick } from "react-icons/ti";
import { set } from 'mongoose';

const Lecture = ({ user }) => {
const [lectures, setLectures] = useState([]);
const [lecture, setLecture] = useState({});
const [loading, setLoading] = useState(true);
const [lecLoading, setLecLoading] = useState(false);
const [showAddForm, setShowAddForm] = useState(false);
const [showDeleteForm, setShowDeleteForm] = useState(false);

const params = useParams();

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [video, setVideo] = useState(null);
const [videoPreview, setVideoPreview] = useState('');
const [btnLoading, setBtnLoading] = useState(false);
const navigate = useNavigate();

async function getLectures() {
    try {
        const { data } = await axios.get(`${server}/api/courses/course/lectures/${params.id}`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });
        setLectures(data.lectures);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
}

async function getLecture(id) {
    setLecLoading(true);
    try {
        const { data } = await axios.get(`${server}/api/courses/course/lecture/${id}`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });
        setLecture(data.lecture);
        console.log("Lecture data", data.lecture);
        setLecLoading(false);
    } catch (error) {
        console.log(error);
        setLecLoading(false);
    }
}

const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    try {
        const { data } = await axios.post(`${server}/api/admin/course/add-lecture/${params.id}`, formData, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });

        toast.success(data.message);
        setBtnLoading(false);
        setShowAddForm(false);
        getLectures();
        setTitle('');
        setDescription('');
        setVideo('');
        setVideoPreview('');
    } catch (error) {
        toast.error(error.response.data.message);
        setBtnLoading(false);
    }
};

const deleteLectureHandler = async (id) => {
    try {
        const { data } = await axios.delete(`${server}/api/admin/course/delete-lecture/${id}`, {
            headers: {
                token: localStorage.getItem("token"),
            }
        });
        toast.success(data.message);
        getLectures();
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
        setVideo(file);
        setVideoPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
};

const [completed, setCompleted] = useState("");
const [completedLecture, setCompletedLecture] = useState([]);
const [lecLength, setLecLength] = useState("");
const [progress, setProgress] = useState([]);

// async function getProgress() {
//     try {
//         const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
//             headers: {
//                 token: localStorage.getItem("token"),
//             },
//         });
//         setProgress(data.progress);
//         setCompleted(data.progressPercentage);
//         setCompletedLecture(data.completedLecture);
//         setLecLength(data.allLectures);
//     } catch (error) {
//         console.log(error);
//     }
// };

async function getProgress() {
    try {
        const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
            headers: { token: localStorage.getItem("token") }
        });
        setProgress(data);
        setCompleted(data.progressPercentage);
        setCompletedLecture(data.completedLectures);
        setLecLength(data.allLectures);
    } catch (error) {
        console.error(error);
    }
};

// const addProgress = async (id) => {
//     // console.log("Adding progress", id);
//     try {
//         const { data } = await axios.post(`${server}/api/user/prgress?course=${params.id}&lectureId=${id}`, {}, {
//             headers: {
//                 token: localStorage.getItem("token"),
//             },
//         });
//         console.log(data.message);
//         getProgress();
//     } catch (error) {
//         console.log(error);
//     }
// };


const addProgress = async (id) => {
    try {
        await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`, {}, {
            headers: { token: localStorage.getItem("token") }
        });
        getProgress();
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    getLectures();
    // console.log("Lectures", lectures);
    getProgress();
}, [lecture]);

return (
    <>
        <div className="progress">
            <p>Lecture completed {completedLecture} out of {lecLength}</p>
            <br />
            <progress value={completed} max={100}></progress> {progress.progressPercentage}%
        </div>

        <div className="lec-page">
            <div className="left">
                {lecture?.video ? (
                    <>
                        {console.log("Lecture", `${server}/${lecture.video}`)}
                        <video
                            src={`${server}/${lecture.video}`}
                            width={"100%"}
                            controls
                            controlsList="nodownload noremoteplayback"
                            disablePictureInPicture
                            disableRemotePlayback
                            autoPlay
                            type="video/mp4"
                            onEnded={() => addProgress(lecture._id)}
                        />
                        <h1>{lecture.title}</h1>
                        <h3>{lecture.description}</h3>
                    </>
                ) : (
                    <h1>Choose a lecture</h1>
                )}
            </div>

            <div className="right">
                {user?.role === "admin" && (
                    <button className="commonBtn" onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? "Close Add Form" : "Add Lecture"}
                    </button>
                )}

                {showAddForm && (
                    <div className="lec-form">
                        <form onSubmit={submitHandler}>
                            <label htmlFor="title">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                            <label htmlFor="description">Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

                            <label htmlFor="video">Choose Video</label>
                            <input type="file" onChange={changeVideoHandler} required />

                            {videoPreview && <video src={videoPreview} width={300} controls />}

                            <button type="submit" className="commonBtn" disabled={btnLoading}>
                                {btnLoading ? "Uploading..." : "Add"}
                            </button>
                        </form>
                    </div>
                )}

                {lectures?.length > 0 ? (
                    lectures.map((e, i) => (
                        <div key={e._id}>
                            <div
                                onClick={() => getLecture(e._id)}
                                className={`lec-no ${lecture?._id === e._id ? "active" : ""}`}
                            >
                                {i + 1}. {e.title} {
                                    progress && progress[0]?.completedLectures?.includes(e._id) && <span style={{ color: "green" }}>
                                        <TiTick />
                                    </span>
                                }
                            </div>

                            {user?.role === "admin" && (
                                <button
                                    className="commonBtn"
                                    style={{ background: "red" }}
                                    onClick={() => deleteLectureHandler(e._id)}
                                >
                                    Delete {e.title}
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No lectures found</p>
                )}
            </div>
        </div>
    </>
);
}

export default Lecture