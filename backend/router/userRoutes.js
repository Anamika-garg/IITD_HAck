const express = require('express');
const router = express.Router();
const {resumereview , personalisedCourses , getCourses} = require('../controllers/userControllers');
// const { verifyToken } = require('../middlewares/verify');
// const { uploadToCloudinary, upload } = require('../middlewares/fileUpload');


// router.post('/register' , registerUser);
// router.post('/userDetails' ,  verifyToken, upload.single('Avatar'), uploadToCloudinary,  userDetails);
// router.post('/login', login);
// router.post('/continueWithGoogle', continueWithGoogle);
// router.get('/profile', profile);
// router.post('/moodJournal', moodJournal);
router.post('/resumereview', resumereview);
// router.post('/resumereview', resumereview);
// router.get('/getJournals', getJournals);
// router.get('/author/:id', getAuthor);
router.get('/personalisedCourses', personalisedCourses);
router.post('/getCourses',  getCourses);
// router.post('/editProfile', editProfile);


module.exports = router;