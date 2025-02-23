import Courses from "../models/Courses.js";
import Lecture from "../models/Lecture.js";
import User from "../models/User.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).json({ courses, });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    res.status(200).json({ course, });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find({ course: req.params.id });
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      return res.status(200).json({ lectures, });
    }

    if (!user.subscription.includes(req.params.id)) {
      return res.status(401).json({ message: "You need to subscribe to this course to access the lectures." });
    }
    res.status(200).json({ lectures, });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
      return res.status(200).json({ lecture, });
    }

    if (!user.subscription.includes(req.params.id)) {
      return res.status(401).json({ message: "You need to subscribe to this course to access the lectures." });
    }
    res.status(200).json({ lecture, });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyCourse = async (req, res) => {
  
  try {
    const courses = await Courses.find({ _id: req.user.subscription });
    res.status(200).json({ courses, });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};